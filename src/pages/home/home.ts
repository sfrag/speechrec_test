import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bgcolor: string = 'white';
  textreco: string = '';

  constructor(public navCtrl: NavController, private speechRecognition: SpeechRecognition) {
  }

  ngOnInit(){

    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      if(!hasPermission){
        this.speechRecognition.requestPermission()
        .then(
          () => console.log('Granted'),
          () => console.log('Denied')
        )
      }
    });
  }


  start(){
    
    let options = {
      language: "es-ES"
    }

    // Get the list of supported languages
    this.speechRecognition.getSupportedLanguages()
    .then(
      (languages: Array<string>) => console.log(languages),
      (error) => console.log(error)
    )

    this.speechRecognition.startListening(options).subscribe(
      (matches: Array<string>)=> {
        this.bgcolor = matches[0];
        this.textreco = matches[0];
      },
      (onerror) => console.log('error:', onerror)
    )
  }

}
