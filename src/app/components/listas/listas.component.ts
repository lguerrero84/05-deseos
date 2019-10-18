import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;


  constructor(public deseosService: DeseosService,
    private route: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista) {
    if ( this.terminada ) {
      this.route.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.route.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrarLista( lista: Lista) {
    console.log(lista);
    this.deseosService.borrarLista( lista);
  }

  async editarLista( lista: Lista) {
    
    const alert = await this.alertCtrl.create ({
       header: 'Editar Lista',
       inputs: [{
           name: 'titulo',
           type: 'text',
           value: lista.titulo,
           placeholder: 'Nombre de la lista'
       }],
       buttons: [{
         text: 'Cancelar',
         role: 'cancel',
         handler: () => {
           console.log('Cancelar');
         }
       },
       {
         text: 'Guardar',
         handler: (data) => {
           lista.titulo = data.titulo;
              this.deseosService.guardarStorage();
         }
       }]
    });
    await alert.present();
    }
}