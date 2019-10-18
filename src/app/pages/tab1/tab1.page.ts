import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor( public deseosService: DeseosService,
               private route: Router,
               private alertCtrl: AlertController) {
  }

  async agregarLista() {
    
     const alert = await this.alertCtrl.create ({
        header: 'Nueva Lista',
        inputs: [{
            name: 'titulo',
            type: 'text',
            placeholder: 'Nombre nueva lista'
        }],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            
            if ( data.titulo.length === 0 ) {
              return;
            }

           const ListaId = this.deseosService.crearLista(data.titulo);
           this.route.navigateByUrl(`/tabs/tab1/agregar/${ ListaId }`);    
          
          }
        }]
     });

     await alert.present();

  }

}
