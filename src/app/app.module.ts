import { NgModule } from '@angular/core'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'

import { environment } from '../environments/environment.prod'
import { AppComponent } from './app.component'
import { CreditCardFormComponent } from './components/credit-card-form/credit-card-form.component'
import { CreditCardListComponent } from './components/credit-card-list/credit-card-list.component';
import { CreditCardItemComponent } from './components/credit-card-list/credit-card-item/credit-card-item.component'

@NgModule({
  declarations: [AppComponent, CreditCardFormComponent, CreditCardListComponent, CreditCardItemComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
