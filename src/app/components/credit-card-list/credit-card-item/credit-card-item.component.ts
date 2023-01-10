import { Component, Input } from '@angular/core'
import { CreditCard } from 'src/app/models/CreditCard'

import { CreditCardService } from '../../../services/credit-card.service'

@Component({
  selector: '[credit-card-item]',
  templateUrl: './credit-card-item.component.html',
  styleUrls: ['./credit-card-item.component.css']
})
export class CreditCardItemComponent {
  @Input() creditCard: CreditCard

  delete() {
    if (this.creditCard.id != null) this.creditCardService.deleteCreditCard(this.creditCard.id)
    else throw new Error('Ocurrió un problema inesperado')
  }

  edit() {
    this.creditCardService.setCreditCardToEdit(this.creditCard)
  }

  constructor(private creditCardService: CreditCardService) {
    this.creditCard = {} as CreditCard
  }
}
