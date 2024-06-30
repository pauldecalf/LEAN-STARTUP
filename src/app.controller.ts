import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Query,
  Render,
  Res
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';
import { ArticlesService } from './articles/articles.service';
import { Article } from './articles/interfaces/article.interface';
import { AuthService } from './auth.service';
import { UtilisateursService } from './utilisateurs/utilisateurs.service';
import { CreateUtilisateurDto } from './utilisateurs/dto/create-utilisateur.dto';
import { FamillesService } from './familles/familles.service';
import { CreateFamilleDto } from './familles/dto/create-famille.dto';
import { OAuth2Client } from 'google-auth-library';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
config();

const clientId = '152404122949-28cgi4vta9vreupt8m4armb4h0l886ck.apps.googleusercontent.com';
const clientSecret = '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';

const client = new OAuth2Client(clientId, clientSecret);

@Controller()
export class AppController {
  private client: OAuth2Client;

  constructor(
    private readonly appService: AppService,
    private readonly articlesService: ArticlesService,
    private readonly authService: AuthService,
    private readonly usersService: UtilisateursService,
    private readonly famillesService: FamillesService,
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

  @Get('articles/:slugUrl')
  @Render('article')
  async getArticle(@Param('slugUrl') slugUrl: string) {
    const article: Article = await this.articlesService.findOneBySlug(slugUrl);
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

        return response.status(HttpStatus.CREATED).json({
            message: 'Inscription réussie',
            user: {
                prenom: newUser.prenom,
                nom: newUser.nom,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de votre inscription' });
    }
}

@Post('/register/google')
async registerWithGoogle(@Body() body: { idToken: string }, @Res() response: Response) {
    try {
        const ticket = await this.client.verifyIdToken({
            idToken: body.idToken,
            audience: clientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token Google invalide' });
        }

        const existingUser = await this.usersService.findOneByEmail(payload.email);
        if (existingUser) {
            return response.status(HttpStatus.OK).json({
                message: 'Connexion réussie',
                user: {
                    prenom: existingUser.prenom,
                    nom: existingUser.nom,
                    email: existingUser.email
                }
            });
        }

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

        return response.status(HttpStatus.CREATED).json({
            message: 'Inscription réussie avec Google',
            user: {
                prenom: newUser.prenom,
                nom: newUser.nom,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Error during Google registration:', error);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de votre inscription avec Google' });
    }
}


@Post('/login')
async login(@Body() { email, password }: { email: string, password: string }, @Res() response: Response) {
    try {
        console.log(`Login attempt: email=${email}, password=${password}`);
        const user = await this.usersService.findOneByEmail(email);
        console.log(`User found: ${JSON.stringify(user)}`);

        if (!user) {
            console.error('User not found');
            return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Email ou mot de passe incorrect' });
        }

        const isPasswordMatch = await this.authService.comparePasswords(password, user.password);
        console.log(`Password match: ${isPasswordMatch}`);
        if (!isPasswordMatch) {
            return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Email ou mot de passe incorrect' });
        }

        return response.status(HttpStatus.OK).json({
            message: 'Connexion réussie',
            user: {
                prenom: user.prenom,
                nom: user.nom,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de votre connexion' });
    }
}

@Post('/login/google')
async loginWithGoogle(@Body() body: { idToken: string }, @Res() response: Response) {
    try {
        const ticket = await this.client.verifyIdToken({
            idToken: body.idToken,
            audience: clientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token Google invalide' });
        }

        let user = await this.usersService.findOneByEmail(payload.email);

        if (!user) {
            const [prenom, ...rest] = payload.name.split(' ');
            const nom = rest.join(' ');

            user = await this.usersService.create({
              prenom,
              nom,
              email: payload.email,
              googleId: payload.sub,
              imgProfil: payload.picture,
              password: undefined // You can set a default password or handle this as needed
              ,
              idFamille: '',
              pseudo: '',
              anniversaire: '',
              genre: '',
              loisirs: '',
              passions: '',
              nourriture: '',
              reves: '',
              aspirations: '',
              faits: '',
              role: '',
              createdAt: undefined
            });
        }

        return response.status(HttpStatus.OK).json({
            message: 'Connexion réussie',
            user: {
                prenom: user.prenom,
                nom: user.nom,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error during Google login:', error);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de votre connexion avec Google' });
    }
}


  @Get('/login')
  @Render('login')
  getLogin() {
    return this.appService.getLogin();
  }

  



  @Get('/loading')
  @Render('loading')
  getLoading() {
    return this.appService.getLoading();
  }

  @Get('/family-setup')
  @Render('family-setup')
  getFamilySetup() {
    return this.appService.getFamilySetup();
  }

  @Get('/create-family')
  @Render('create-family')
  getCreateFamily() {
    return this.appService.getCreateFamily();
  }

  @Post('/create-family')
  async create(@Body() { name, createdBy }: { name: string, createdBy: string }, @Res() response: Response) {
    console.log('Received request to create family with name:', name);
    console.log('Created by:', createdBy);

    try {
      // Vérifiez si une famille existe déjà pour cet utilisateur
      const existingFamily = await this.famillesService.findByCreatedBy(createdBy);
      if (existingFamily) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'Un utilisateur ne peut avoir qu\'une seule famille',
        });
      }

      const famille = {
        nom: name,
        createdBy: createdBy,
        createdAt: new Date()
      };

      console.log('Creating family with details:', famille);

      const family = await this.famillesService.create(famille);

      console.log('Family created successfully with ID:', family.id);

      // Extraire les 5 derniers chiffres de l'ID de la famille
      const familyId = family.id.toString();
      const invitationCode = familyId.slice(-5);

      console.log('Invitation code generated:', invitationCode);

      // Retourner un JSON avec le code d'invitation
      return response.status(HttpStatus.CREATED).json({
        message: 'Famille créée avec succès',
        invitationCode: invitationCode
      });
    } catch (error) {
      console.error('Error during family creation:', error.message, error.stack);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Une erreur est survenue lors de la création de la famille'
      });
    }
  }
  

  
  


  
  
  
  @Get('/family-invitation')
  @Render('family-invitation')
  getFamilyInvitation(@Query('invitationCode') invitationCode: string) {
      console.log('Received invitationCode parameter:', invitationCode);
      if (!invitationCode) {
          console.error('No invitationCode received');
      }
      return { invitationCode };
  }
  

@Get('/choix-role')
@Render('choix-role')
getChoixRole() {
  return this.appService.getChoixRole();
}


@Get('/success-register')
@Render('success-register')
getSuccessRegister() {
  return this.appService.getSuccessRegister();
}

@Get('/join-family')
@Render('join-family')
getJoinFamily() {
  return this.appService.getJoinFamily();
}

@Get('/dashboard')
@Render('dashboard')
getDashboard() {
  return this.appService.getDashboard();
}

@Post('/update-role')
async updateRole(@Body() { email, role }: { email: string, role: string }, @Res() response: Response) {
    try {
        const updatedUser = await this.usersService.updateUserRole(email, role);
        return response.status(HttpStatus.OK).json({
            message: 'Rôle mis à jour avec succès',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user role:', error.message, error.stack);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Une erreur est survenue lors de la mise à jour du rôle'
        });
    }
}


}