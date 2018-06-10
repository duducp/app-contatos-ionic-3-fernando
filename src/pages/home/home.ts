import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contacts, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contactsfound = [];
  search = false;

  constructor(
    public navCtrl: NavController,
    private contacts: Contacts
  ) {
  }

  newContact() {
    // this.navCtrl.push(AddContactPage);
  }

  findContact(ev: any) {
    const options = new ContactFindOptions();
    options.filter = ev.target.value;
    options.multiple = true;
    options.hasPhoneNumber = true;

    this.contacts.find(["displayName", "phoneNumbers", "addresses"], options).then((contacts) => {
      this.contactsfound = contacts;
      console.log(JSON.stringify(contacts[0]));
    });

    if (this.contactsfound.length == 0) {
      this.contactsfound.push({ displayName: 'No Contacts found' });
    }
    this.search = true;
  }

}
