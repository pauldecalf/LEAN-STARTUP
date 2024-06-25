import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Render,
  Res
} from "@nestjs/common";
import { Response } from 'express';
import { AppService } from "./app.service";
import { ArticlesService } from "./articles/articles.service";
import { Article } from "./articles/interfaces/article.interface";
import { AuthService } from './auth.service';
import { UtilisateursService } from './utilisateurs/utilisateurs.service';
import { CreateUtilisateurDto } from './utilisateurs/dto/create-utilisateur.dto';
import { OAuth2Client } from 'google-auth-library';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
config();

const clientId = "152404122949-28cgi4vta9vreupt8m4armb4h0l886ck.apps.googleusercontent.com";
const clientSecret = "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";

const client = new OAuth2Client(clientId, clientSecret);

@Controller()
export class AppController {
  private client: OAuth2Client;

  constructor(
    private readonly appService: AppService,
    private readonly articlesService: ArticlesService,
    private readonly authService: AuthService,
    private readonly usersService: UtilisateursService,
    private configService: ConfigService
  ) {
    this.client = new OAuth2Client(clientId, clientSecret);
  }

  @Get()
  @Render('index')
  async getArticles() {
    const articles: Article[] = await this.articlesService.findAll();
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
    const articles: Article[] = await this.articlesService.findAll();
    return { article, articles };
  }

  @Get('articles/')
  @Render('maintenance')
  getError() {}

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
  async register(@Body() createUtilisateurDto: CreateUtilisateurDto, @Res() response: Response) {
    try {
      const existingUser = await this.usersService.findOneByEmail(createUtilisateurDto.email);
      if (existingUser) {
        return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Un compte avec cet email existe déjà' });
      }

      const hashedPassword = await this.authService.hashPassword(createUtilisateurDto.password);
      const newUser = await this.usersService.create({
        ...createUtilisateurDto,
        idFamille: createUtilisateurDto.idFamille || 'default-idFamille',
        nom: createUtilisateurDto.nom || 'default-nom',
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
      const token = await this.authService.generateToken(newUser);
      return response.status(HttpStatus.CREATED).json({ message: 'Inscription réussie', token });
    } catch (error) {
      console.error('Error during registration:', error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de votre inscription' });
    }
  }

  @Post('/register/google')
  async registerWithGoogle(@Body() createGoogleUserDto: CreateUtilisateurDto, @Res() response: Response) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: createGoogleUserDto.googleId,
        audience: clientId,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token Google invalide' });
      }

      const existingUser = await this.usersService.findOneByEmail(payload.email);
      if (existingUser) {
        // Utilisateur existe déjà, générer un token JWT pour lui
        const token = await this.authService.generateToken(existingUser);
        return response.status(HttpStatus.OK).json({ message: 'Connexion réussie', token });
      }

      // Split the payload.name into prenom and nom
      const [prenom, ...rest] = payload.name.split(' ');
      const nom = rest.join(' ');

      const userPayload = {
        idFamille: 'default-idFamille',
        nom: nom || 'default-nom',
        prenom: prenom || 'default-prenom',
        pseudo: payload.name,
        email: payload.email,
        googleId: payload.sub,
        imgProfil: payload.picture,
        anniversaire: '2000-01-01',
        genre: 'default-genre',
        loisirs: 'default-loisirs',
        passions: 'default-passions',
        nourriture: 'default-nourriture',
        reves: 'default-reves',
        aspirations: 'default-aspirations',
        faits: 'default-faits',
        role: 'default-role',
        createdAt: new Date(),
        password: undefined
      };

      const newUser = await this.usersService.create(userPayload);
      const token = await this.authService.generateToken(newUser);

      return response.status(HttpStatus.CREATED).json({ message: 'Inscription réussie avec Google', token });
    } catch (error) {
      console.error('Error during Google registration:', error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de votre inscription avec Google' });
    }
  }

  @Get('/login')
  @Render('login')
  getLogin() {
    return this.appService.getLogin();
  }
  @Post('/login')
  async login(@Body() { email, password }: { email: string, password: string }, @Res() response: Response) {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (!user || !await this.authService.comparePasswords(password, user.password)) {
        return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Email ou mot de passe incorrect' });
      }
      const token = await this.authService.generateToken(user);
      return response.status(HttpStatus.OK).json({ message: 'Connexion réussie', token });
    } catch (error) {
      console.error('Error during login:', error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de votre connexion' });
    }
  }


  @Get('/loading')
  @Render('loading')
  getLoading() {
    return this.appService.getLoading();
  }
}
