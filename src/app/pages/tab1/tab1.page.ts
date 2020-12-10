import { Component } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public tareasService: TareasService,
              private router: Router,
            private alertCtrl: AlertController) {

              }
  async agregarLista(){
    //this.router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this.alertCtrl.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name:'titulo',
          type: 'text',
          placeholder:'Nombre de la lista'
        }
      ],
      buttons:[
        {
          text:'Cancelar',
          role:'cancel',
          handler:()=>{
            console.log('Cancelar')
          }
        },
          {
            text:'Crear',
            handler:(data)=>{
              console.log(data);
              if(data.titulo.lenght ===0){
                return;
              }
              // crear la listas
              const listaId = this.tareasService.crearLista(data.titulo);
              this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
            }
          }
      ]
    });
   alert.present();
  }

  ListaSeleccionada(lista: Lista){
    console.log(lista);
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  }
}
