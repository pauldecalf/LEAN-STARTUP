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
import {  NotFoundException, BadRequestException } from '@nestjs/common';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
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
    private usersService: UtilisateursService,
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
  
  @Post('/join-family')
  async joinFamily(@Body() { email, code }: { email: string, code: string }, @Res() response: Response) {
    try {
      const families = await this.famillesService.findAll();
      const family = families.find(f => f.id.toString().endsWith(code));

      if (!family) {
        throw new NotFoundException('Code d\'invitation invalide');
      }

      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        throw new NotFoundException('Utilisateur non trouvé');
      }

      user.idFamille = family.id;
      await this.usersService.update(user.id, user);

      return response.status(200).json({ message: 'Rejoint la famille avec succès' });
    } catch (error) {
      console.error('Error joining family:', error);
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      } else {
        return response.status(500).json({ message: 'Une erreur est survenue' });
      }
    }
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
            imgProfil: createUtilisateurDto.imgProfil || '/img/img-default.png',
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
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            console.error('User not found');
            return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Email ou mot de passe incorrect' });
        }

        const isPasswordMatch = await this.authService.comparePasswords(password, user.password);
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
        createdAt: new Date(),
      };


      const family = await this.famillesService.create(famille);


      // Mettre à jour l'utilisateur avec le nouvel idFamille
      const user = await this.usersService.findOneByEmail(createdBy);
      if (!user) {
        throw new NotFoundException('Utilisateur non trouvé');
      }

      user.idFamille = family.id;
      await this.usersService.update(user.id, user);

      // Extraire les 5 derniers chiffres de l'ID de la famille
      const familyId = family.id.toString();
      const invitationCode = familyId.slice(-6);


      // Retourner un JSON avec le code d'invitation
      return response.status(HttpStatus.CREATED).json({
        message: 'Famille créée avec succès',
        invitationCode: invitationCode,
      });
    } catch (error) {
      console.error('Error during family creation:', error.message, error.stack);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Une erreur est survenue lors de la création de la famille',
      });
    }
  }

  

  
  


  
  
  
  @Get('/family-invitation')
  @Render('family-invitation')
  getFamilyInvitation(@Query('invitationCode') invitationCode: string) {
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

@Post('/dashboard')
async getDashboardPost(@Body() body: { email: string }, @Res() res: Response) {
  const email = body.email;

  try {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Utilisateur non trouvé' });
    }
    const usersInFamily = await this.usersService.findByFamilleId(user.idFamille);
    return res.status(HttpStatus.OK).json(usersInFamily);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue', error: error.message });
  }
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


@Get('/profil')
@Render('profil')
getProfil() {
  return this.appService.getProfil();
}

@Post('/profil')
async getProfilPost(@Body() body: { email: string }, @Res() res: Response) {
  const email = body.email;
  try {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Utilisateur non trouvé' });
    }
    const family = await this.famillesService.findOne(user.idFamille);
    if (!family) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Famille non trouvée' });
    }
    // Retourner un objet JSON complet
    return res.json({ nomFamily: family.nom, role: user.role, prenom: user.prenom, email: user.email, imageProfil: user.imgProfil });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue', error: error.message });
  }
}


@Get('/profil-onboarding')
@Render('profil-onboarding')
geProfilOnboarding() {
  return this.appService.geProfilOnboarding();
}


@Get('/profil-onboarding-2')
@Render('profil-onboarding-2')
geProfilOnboarding2() {
  return this.appService.geProfilOnboarding2();
}


@Post('/upload-profile-image')
@UseInterceptors(FileInterceptor('image', {
  storage: diskStorage({
    destination: './public/img/', // Assurez-vous que ce répertoire existe
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    },
  }),
}))
async postProfilOnboarding2(@UploadedFile() file, @Body('email') email: string) {
  if (!file) throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
  if (!email) throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
  
  const user = await this.usersService.findOneByEmail(email);
  if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

  // Mettre à jour l'URL de l'image dans la base de données
  const result = await this.usersService.update(user.id, { imgProfil: `/img/${file.filename}` });
  if (!result) {
    throw new HttpException('Error updating user profile', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  return { message: 'Image uploaded successfully', filePath: `/img/${file.filename}` };
}

@Get('/profil-onboarding-3')
@Render('profil-onboarding-3')
geProfilOnboarding3() {
  return this.appService.geProfilOnboarding3();
}

}