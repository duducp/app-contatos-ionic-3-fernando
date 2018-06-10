import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contacts, ContactFindOptions } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Contacts]
})
export class HomePage {
  contactsfound = [];
  search = false;
  msg = 'Nenhum contato encontrado';

  constructor(
    public navCtrl: NavController,
    private contacts: Contacts,
    private emailComposer: EmailComposer,
    private callNumber: CallNumber
  ) {
  }

  newContact(): void {
    this.navCtrl.push('AddContactPage');
  }

  findContact(ev: any) {
    const options = new ContactFindOptions();
    options.filter = ev.target.value;
    options.multiple = true;
    options.hasPhoneNumber = true;

    this.contacts.find(["displayName", "phoneNumbers", "emails"], options).then((contacts) => {
      this.contactsfound = contacts;
      console.log(contacts[0]);
    });

    console.log(this.contactsfound)
    if (this.contactsfound.length == 0) {
      return this.search = false;
    }
    return this.search = true;
  }

  call(number) {
    console.log(number);
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  sendEmail(email) {
    console.log(email)
    let e = {
      to: email,
      cc: 'teste@hotmail.com',
      subject: 'Contato',
      body: 'Ei, segue em anexo a foto do contato selecionado.',
      isHtml: false
    };

    // Send a text message using default options
    this.emailComposer.open(e);
  }

}
