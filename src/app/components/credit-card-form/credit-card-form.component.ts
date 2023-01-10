import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { CreditCard } from '../../models/CreditCard'
import { CreditCardService } from '../../services/credit-card.service'

@Component({
  selector: 'credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css']
})
export class CreditCardFormComponent implements OnInit {
  titles = { 'editionMode': 'Editar Tarjeta', 'creationMode': 'Crear Tarjeta' }
  mode: 'creationMode' | 'editionMode' = 'creationMode'
  creditCardForm: FormGroup
  creditCardData: CreditCard

  getTitle = () => this.titles[this.mode]

  async saveCreditCard() {
    if (this.mode == 'editionMode') {
      const { cardholder, cardNumber, cvv, expirationDate } = this.creditCardForm.value
      this.creditCardData = { ...this.creditCardData, cardholder, cardNumber, cvv: +cvv, expirationDate }
      await this.creditCardService.editCreditCard(this.creditCardData)
      this.creditCardForm.reset()
      this.mode = 'creationMode'
    } else await this.createCreditCard()
  }

  async createCreditCard() {
    const { cardholder, cardNumber, cvv, expirationDate } = this.creditCardForm.value
    this.creditCardData = new CreditCard(cardholder, cardNumber, +cvv, expirationDate)
    await this.creditCardService.saveCreditCard(this.creditCardData)
    this.creditCardForm.reset()
  }

  isFormControlValid(formControlName: string) {
    const control = this.creditCardForm.get(formControlName)
    if (control == null) throw new Error(`Don't exist a form control with name ${formControlName}`)
    return control.valid
  }

  isFormControlTouched(formControlName: string) {
    const control = this.creditCardForm.get(formControlName)
    if (control == null) throw new Error(`Don't exist a form control with name ${formControlName}`)
    return control.touched
  }

  isFormGroupValid = () => this.creditCardForm.valid

  formControlIconClass = (formControlName: string) => ({
    'green-icon': this.isFormControlValid(formControlName),
    'red-icon': !this.isFormControlValid(formControlName) && this.isFormControlTouched(formControlName)
  })

  subscribeToCreditCardEdition() {
    this.creditCardService.getCreditCardToEdit().subscribe(creditCard => {
      this.mode = 'editionMode'
      this.creditCardData = creditCard
      this.creditCardForm.setValue({
        cardholder: creditCard.cardholder,
        cardNumber: creditCard.cardNumber,
        expirationDate: creditCard.expirationDate,
        cvv: creditCard.cvv.toString()
      })
    })
  }

  ngOnInit() {
    this.subscribeToCreditCardEdition()
  }

  constructor(private creditCardService: CreditCardService) {
    this.creditCardData = {} as CreditCard
    this.creditCardForm = new FormGroup({
      cardholder: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern('[0-9]+')
      ]),
      expirationDate: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.pattern('[0-9]{2}/[0-9]{2}')
      ]),
      cvv: new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
        Validators.minLength(3),
        Validators.pattern('[0-9]+')
      ])
    })
  }
}
