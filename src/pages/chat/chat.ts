import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  client: any;
  ref;
  typingStatus;
  name;
  newmessage;
  messagesList;
  typing = '';
  typeStatusId;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController) {
    this.ref = firebase.database().ref('messages');
    this.typingStatus = firebase.database().ref('typeStatus');
    this.name = '';
  }

  onChange(e) {
    this.newmessage = e.target.value;
    //this.events.publish('chat:typing', this.name);
    this.typingStatus.push({
      name: this.name.username,
      datetime: Date.now()
    });
  }

  send() {
    // add new data to firebase
    this.ref.push({
      name: this.name.username,
      message: this.newmessage,
      datetime: Date.now()
    });
    this.newmessage = '';
  }

  ionViewDidLoad() {
    // Presenting popup



    this.alert.create(
      {
      title: 'Username',
      inputs: [{
        name: 'username',
        placeholder: 'username'
      }],
      buttons: [{
        text: 'Continue',
        handler: username => {
          this.name = username;
          // need to check list of logout users remove them as well.
          this.typingStatus.on('value', data => {
            data.forEach(data => {
              console.log(data.val().id !== this.typeStatusId);
              if (typeof (data.val().name) !== 'undefined') {
                if (data.val().name === username) {
                  data.remove();
                }
              }
            });
          });
        }
      }]
    }).present();

    //reading data from firebase
    this.ref.on('value', data => {
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          key: data.key,
          name: data.val().name,
          message: data.val().message
        })
      });
      this.messagesList = tmp;
    });
  }

  ngOnInit() {
    // Handle is typing event
    this.typingStatus.on('value', data => {
      data.forEach(data => {
        if (typeof (data.val().name) !== 'undefined') {
          if (data.val().name !== this.name.username) {
            this.typing = data.val().name + ' is typing...'
            setTimeout(() => {
              this.typing = ''
            }, 2000)
          }
        }
      });
    });

  }

}
