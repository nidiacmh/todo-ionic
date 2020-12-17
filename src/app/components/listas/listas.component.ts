import { Component, OnInit, Input } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() terminada = true;

  constructor(public tareasService: TareasService,
              private router: Router) { }

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

}
