// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

class Cred {
  constructor() {
    // Your web app's Firebase configuration
    this._firebaseConfig = {
      // Missing code
      // Add you Fire Base config here
      // ...

      apiKey: 'AIzaSyAmFtZxAjC1_OxwmgFtRmOkCYw9J3eAn6Q',
      authDomain: 'fir-authdemo-1fc7a.firebaseapp.com',
      projectId: 'fir-authdemo-1fc7a',
      storageBucket: 'fir-authdemo-1fc7a.appspot.com',
      messagingSenderId: '889501804888',
      appId: '1:889501804888:web:1c1b9a5bb9cc5d87d6dd2d',
    };

    // Initialize Firebase
    this._app = initializeApp(this._firebaseConfig);

    // Initialize Firebase Authentication and get a reference to the service
    this._auth = getAuth(this._app);

    //Create an instance of the Google provider object:
    this._provider = new GoogleAuthProvider();

    //Specify additional OAuth 2.0 scopes that you want to request from the authentication provider. To add a scope, call addScope. For example:
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    /*
    Authenticate with Firebase using the Google provider object
    You can prompt your users to sign in with their Google 
    Accounts either by opening a pop-up window or by redirecting
    to the sign-in page. The redirect method is preferred on
    mobile devices.
    */

    this._btn = document.querySelector('#btn');
    // check If user is loged
    localStorage.getItem('username')
      ? this.configSingOut()
      : this.configSingIn();

    this.addEventListeners();
  }

  addEventListeners() {
    this._btn.addEventListener('click', this.openModalSign.bind(this));
  }
  openModalSign(event) {
    event.target.id === 'btn-sign-in' ? this.signinUser() : this.signOutUser();
    // console.log(event.target.id);
  }

  // will rended the UI after successfull Sign in
  render() {
    // this._btn.innerHTML =
    //   '<a href="#" class="btn btn-rounded" id="btn-sign-out">sign Out </a>';
  }

  signOutUser() {
    signOut(this._auth)
      .then(() => {
        // Sign-out successful.

        // @todo(dev) render UI
        this._btn.setAttribute('id', 'btn-sign-in');
        this._btn.innerText = 'Sign In'; // @todo (Dev) Photo and stuff

        // @todo(dev) Remove From local Storage

        localStorage.removeItem('username');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  signinUser() {
    console.log('Sign in');
    signInWithPopup(this._auth, this._provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(result);

        // Sign in success, update UI
        // this._render();
        this._btn.setAttribute('id', 'btn-sign-out');
        this._btn.innerText = 'Sign Out'; // @todo (Dev) Photo and stuff

        localStorage.setItem('username', user.email);
      })
      .catch((error) => {
        console.log(error);
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  configSingOut() {
    console.log('configSingOut');
    this._btn.setAttribute('id', 'btn-sign-out');
    this._btn.innerText = 'Sign Out'; // @todo (Dev) Photo and stuff
  }
  configSingIn() {
    console.log('configSingIn');
    this._btn.setAttribute('id', 'btn-sign-in');
    this._btn.innerText = 'Sign In';
  }
}

export default Cred;
