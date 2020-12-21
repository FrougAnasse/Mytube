import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

const firebaseInitApp=firebase.initializeApp({
    apiKey: "AIzaSyAsC4_WP_tfBFcGqXFUB4HSAZWn9RLXNVw",
    authDomain: "mytube-app-cbe9c.firebaseapp.com",
    databaseURL: "https://mytube-app-cbe9c.firebaseio.com",
    projectId: "mytube-app-cbe9c",
    storageBucket: "mytube-app-cbe9c.appspot.com",
    messagingSenderId: "522740483409",
    appId: "1:522740483409:web:bfc6200cb150d3d181ff70"
})

const base = Rebase.createClass(firebaseInitApp.database())


export { firebaseInitApp }

export default base