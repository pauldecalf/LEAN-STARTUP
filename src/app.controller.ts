import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticlesService } from './articles/articles.service';
import { Article } from './articles/interfaces/article.interface';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly articlesService: ArticlesService
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

  @Get('/login')
  @Render('login')
  getLogin() {
    return this.appService.getLogin();
  }
}
