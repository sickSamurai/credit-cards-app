export class CreditCard {
  id?: string
  cardholder: string
  cardNumber: string
  cvv: number
  expirationDate: string
  creationDate: Date
  updateDate: Date

  constructor(cardholder: string, cardNumber: string, cvv: number, expirationDate: string) {
    this.cardholder = cardholder
    this.cardNumber = cardNumber
    this.cvv = cvv
    this.expirationDate = expirationDate
    this.creationDate = new Date()
    this.updateDate = new Date()
  }
}
