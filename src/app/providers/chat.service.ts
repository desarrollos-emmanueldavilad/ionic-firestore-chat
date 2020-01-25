import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Mensaje} from '../interface/mensaje.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore,private afauth: AngularFireAuth) { }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'asc'));
    return this.itemsCollection.valueChanges()
                          .subscribe((mensajes: Mensaje[]) => {
                                  this.chats = [];
                                  for (let mensaje of mensajes){
                                    this.chats.unshift(mensaje);
                                  }
                                  return this.chats;
                                });
  }

  agregarMensaje(texto: string, nombre:string){

    // TODO falta uid del usuario
    const currentUser = firebase.auth().currentUser;
    let mensaje: Mensaje = {
      nombre: nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: currentUser.uid
    }
return this.itemsCollection.add(mensaje);
  }
}
