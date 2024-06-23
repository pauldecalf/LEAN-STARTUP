import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  Post,
  Query,
  Render
} from "@nestjs/common";
import { AppService } from "./app.service";
import { ArticlesService } from "./articles/articles.service";
import { Article } from "./articles/interfaces/article.interface";
import { AuthService } from './auth.service';
import { UtilisateursService } from './utilisateurs/utilisateurs.service'
import { CreateUtilisateurDto } from './utilisateurs/dto/create-utilisateur.dto';
@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly articlesService: ArticlesService,
      private readonly authService: AuthService,
       private readonly usersService: UtilisateursService,


  ) {}

  @Get()
  @Render('index')
  async getArticles() {
    const articles: Article[] = await this.articlesService.findAll(); // Par défaut, affiche les 6 premiers articles
    return { articles };
  }

  @Get('/contact')
  @Render('contact')
  getContact() {
    return this.appService.getContact();
  }

  @Get('/blog')
  @Render('blog')
  async getBlog(@Query('page') page: string = '1') {
    const pageNumber = parseInt(page, 10) || 1;
    const limit = 6;
    const skip = (pageNumber - 1) * limit;
    const [articles, totalArticles] = await Promise.all([
      this.articlesService.findAllWithPagination(limit, skip),
      this.articlesService.countAll()
    ]);
    const totalPages = Math.ceil(totalArticles / limit);
    return { articles, currentPage: pageNumber, totalPages };
  }

  @Get('articles/:id')
  @Render('article')
  async getArticle(@Param('id') id: string) {
    const article: Article = await this.articlesService.findOne(id);
    const articles: Article[] = await this.articlesService.findAll(); // Par défaut, affiche les 6 premiers articles
    return { article, articles };
  }

  @Get('articles/')
  @Render('maintenance')
  getError() {
  }

  @Get('/maintenance')
  @Render('maintenance')
  getMaintenance() {
    return this.appService.getMaintenance();
  }

  @Get('/mentionslegales')
  @Render('mentionslegales')
  getMentionsLegales() {
    return this.appService.getMentionsLegales();
  }

  @Get('/politiqueconfidentialite')
  @Render('politiqueconfidentialite')
  getPolitiqueConfidentialite() {
    return this.appService.getPolitiqueConfidentialite();
  }

  @Get('/faq')
  @Render('faq')
  getFaq() {
    return this.appService.getFaq();
  }

  @Get('/accueil')
  @Render('accueil')
  getAccueil() {
    return this.appService.getAccueil();
  }

  @Get('/register')
  @Render('register')
  getInscription() {
    return this.appService.getInscription();
  }

  @Post('/register')
  async register(@Body() createUtilisateurDto: CreateUtilisateurDto) {
      const hashedPassword = await this.authService.hashPassword(createUtilisateurDto.password);

    // Pré-remplir les champs manquants avec des valeurs par défaut
    const newUser = await this.usersService.create({
      ...createUtilisateurDto,
      idFamille: createUtilisateurDto.idFamille || 'default-idFamille',
      nom: createUtilisateurDto.nom || 'default-nom',
      email: createUtilisateurDto.email || 'default-email',
      prenom: createUtilisateurDto.prenom || 'default-prenom',
      pseudo: createUtilisateurDto.pseudo || 'default-pseudo',
      imgProfil: createUtilisateurDto.imgProfil || 'default-imgProfil',
      anniversaire: createUtilisateurDto.anniversaire || '2000-01-01',
      genre: createUtilisateurDto.genre || 'default-genre',
      loisirs: createUtilisateurDto.loisirs || 'default-loisirs',
      passions: createUtilisateurDto.passions || 'default-passions',
      nourriture: createUtilisateurDto.nourriture || 'default-nourriture',
      reves: createUtilisateurDto.reves || 'default-reves',
      aspirations: createUtilisateurDto.aspirations || 'default-aspirations',
      faits: createUtilisateurDto.faits || 'default-faits',
      role: createUtilisateurDto.role || 'default-role',
      createdAt: createUtilisateurDto.createdAt || new Date(),
      password: hashedPassword
    });

   return { message: 'Inscription réussie' };
    } catch (error) {
      throw new HttpException('Une erreur est survenue lors de votre inscription', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @Post('/register/google')
  async registerWithGoogle(@Body() createGoogleUserDto: CreateUtilisateurDto) {
    try {
      await this.usersService.create(createGoogleUserDto);

      return { message: 'Inscription réussie avec Google' };
    } catch (error) {
      throw new HttpException('Une erreur est survenue lors de votre inscription avec Google', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
