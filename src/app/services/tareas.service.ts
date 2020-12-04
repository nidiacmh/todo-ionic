import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  listas: Lista[] = [];


  constructor() {
    //console.log('servicio inicializado');
    const lista1 = new Lista('Recolectar piedras');
    const lista2 = new Lista('Heroes a desaparecer');

    this.listas.push(lista1, lista2);

    //console.log(this.listas);
  }
}
