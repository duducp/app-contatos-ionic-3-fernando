import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, ContactField } from '@ionic-native/contacts';

@IonicPage()
@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
  providers: [Contacts]
})
export class AddContactPage {

  contactObject = {
    displayName: '',
    email: '',
    emailType: '',
    phoneNumber: '',
    phoneType: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactPage');
  }

  addContact(newContact: any) {
    var contact = this.contacts.create();
    contact.displayName = newContact.displayName;

    var field = new ContactField();
    field.type = newContact.phoneType;
    field.value = newContact.phoneNumber;
    field.pref = true;

    var numberSection = [];
    numberSection.push(field);
    contact.phoneNumbers = numberSection;

    var fieldEmail = new ContactField();
    fieldEmail.type = newContact.emailType;
    fieldEmail.value = newContact.email;
    fieldEmail.pref = true;

    var emailSection = [];
    emailSection.push(fieldEmail);
    contact.emails = emailSection;

    contact.save().then((value) => {
      console.log('saved', value);
      this.navCtrl.pop();
    }, (error) => {
      console.log(error);
    })
  }
}