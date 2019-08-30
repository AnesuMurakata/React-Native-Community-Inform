import React from 'react';
import * as firebase from 'firebase';

//The core Firebase JS SDK is always required and must be listed first
<section>
<script src="https://www.gstatic.com/firebasejs/6.4.2/firebase-app.js"></script>

<script src="/__/firebase/6.4.1/firebase-auth.js"></script>
</section>

//TODO: Add SDKs for Firebase products that you want to use
//https://firebase.google.com/docs/web/setup#config-web-app

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDxrwv1X5BCwg5_Qi4cMXykO4FGABU-BgI",
    authDomain: "communityinform-41357.firebaseapp.com",
    databaseURL: "https://communityinform-41357.firebaseio.com",
    projectId: "communityinform-41357",
    storageBucket: "",
    messagingSenderId: "819627767027",
    appId: "1:819627767027:web:018f1b7424ec63aa"
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;