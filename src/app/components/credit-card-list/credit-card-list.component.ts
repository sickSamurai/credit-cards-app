import { Component } from '@angular/core'
import { CreditCard } from 'src/app/models/CreditCard'

import { CreditCardService } from '../../services/credit-card.service'

@Component({
  selector: 'credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css']
})
export class CreditCardListComponent {
  creditCards: CreditCard[]
  creditCardsExists = () => this.creditCards.length > 0

  constructor(private creditCardService: CreditCardService) {
    this.creditCards = []
    this.creditCardService.getCreditCards().subscribe(retrievedCreditCards => {
      this.creditCards = retrievedCreditCards
    })
  }
}
