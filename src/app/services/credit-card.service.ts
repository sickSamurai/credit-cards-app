import { Injectable } from '@angular/core'
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  FirestoreError,
  updateDoc,
} from '@angular/fire/firestore'
import { ToastrService } from 'ngx-toastr'
import { Subject } from 'rxjs'

import { CreditCard } from '../models/CreditCard'

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private collectionRef: CollectionReference<CreditCard>
  private creditCardToEdit = new Subject<CreditCard>()

  async saveCreditCard(creditCard: CreditCard) {
    try {
      addDoc(this.collectionRef, { ...creditCard })
      this.toastr.success('Tarjeta registrada exitosamente', 'Atención!')
    } catch (error) {
      if (error instanceof FirestoreError) this.toastr.error(error.message, 'Error!')
      throw error
    }
  }

  getCreditCards = () => collectionData(this.collectionRef)

  deleteCreditCard = (id: string) => deleteDoc(doc(this.collectionRef, id))

  setCreditCardToEdit = (creditCard: CreditCard) => this.creditCardToEdit.next(creditCard)

  getCreditCardToEdit = () => this.creditCardToEdit.asObservable()

  async editCreditCard(creditCard: CreditCard) {
    if (creditCard.id == null) throw new Error('id not provided')
    try {
      const docRef = doc(this.firestore, 'creditCards', creditCard.id)
      await updateDoc(docRef, { ...creditCard })
      this.toastr.success('Edición exitosa', 'Atención!')
    } catch (error) {
      if (error instanceof FirestoreError) this.toastr.error(error.message, 'Error!')
      throw error
    }
  }

  constructor(private firestore: Firestore, private toastr: ToastrService) {
    this.collectionRef = collection(this.firestore, 'creditCards').withConverter({
      toFirestore(creditCard) {
        return { ...creditCard }
      },
      fromFirestore(snapshot, options) {
        const data = snapshot.data(options)
        return {
          id: snapshot.id,
          cardholder: data['cardholder'],
          cardNumber: data['cardNumber'],
          cvv: data['cvv'],
          creationDate: data['creationDate'],
          expirationDate: data['expirationDate'],
          updateDate: data['updateDate']
        }
      }
    })
  }
}
