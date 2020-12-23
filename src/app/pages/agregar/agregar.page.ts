import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import {ActivatedRoute} from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(private tareasService: TareasService,
              private route: ActivatedRoute) {
    const listaId = this.route.snapshot.paramMap.get('listaId');
    console.log(listaId);
    this.lista = this.tareasService.obtenerLista(listaId);
  }

  ngOnInit() {
  }

  agregarItem(){
    if (this.nombreItem.length === 0){
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem='';
    this.tareasService.guardarStorage();
  }

  cambioCheck(item: ListaItem){
    console.log(item);
    const pendientes =this.lista.items
                      .filter(itemData => !itemData.completado)
                      .length;
    console.log({pendientes});
    if(pendientes === 0){
      this.lista.terminadaEn=new Date();
      this.lista.terminada =true;
    }else{
      this.lista.terminadaEn=null;
      this.lista.terminada=false;
    }
    this.tareasService.guardarStorage();
    //console.log(this.tareasService.listas);
  }

  borrar(i: number){

    this.lista.items.splice(i, 1);
    this.tareasService.guardarStorage();
  }



}
