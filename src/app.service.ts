import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getMaintenance(): { title: string; message: string } {
    return {
      title: 'Maintenance en cours',
      message: 'Nous sommes en train d\'améliorer notre site web. Veuillez nous excuser pour la gêne occasionnée.',
    };
  };

  getHome() {
    const maintenanceInfo = this.getMaintenance();
    return {
      title: maintenanceInfo.title,
      message: maintenanceInfo.message
    }
  }

  getAboutMessage(): string {
    return 'À propos de nous!';
  }
}
