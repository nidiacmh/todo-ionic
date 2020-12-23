import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild(IonList) lista: IonList;//busca en el html un elemento con ese nombre
  @Input() terminada = true;
  listas: Lista;

  constructor(public tareasService: TareasService,
              private router: Router,
            private alertCtrl: AlertController) { }

  ngOnInit() {}

  ListaSeleccionada(lista: Lista){
    console.log(lista);
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: Lista){
    this.tareasService.borrarLista(lista);
  }

  async editarLista(lista: Lista){
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name:'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder:'Editar nombre de la lista'
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
            text:'Cambiar',
            handler:(data)=>{
              console.log(data);
              if(data.titulo.lenght ===0){
                return;
              }
              // editar la listas
            lista.titulo = data.titulo;
            this.tareasService.guardarStorage();
            this.lista.closeSlidingItems();
            }
          }
      ]
    });
   alert.present();
  }

}
