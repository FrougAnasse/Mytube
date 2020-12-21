import React, { Component } from 'react'

import firebase from 'firebase/app'
import 'firebase/auth'
import { firebaseInitApp} from '../base'


export default class Login extends Component {
    
    state={
        uid:null
    }
    


    handleAuth = async authData=>{
        

        this.setState({
            uid: authData.user.uid
        })
      this.props.getUser(this.state.uid)
    }


    authenticate=()=>{
        const authProvider=new firebase.auth.GoogleAuthProvider()
        firebaseInitApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.handleAuth)
    }

    logout = async ()=>{
        console.log('déconexion')
        await firebase.auth().signOut()
        this.setState({
            uid:null         
        })
        this.props.disconnecte();
    }

    render() {
         if(this.state.uid===null){
            return (
                <div>
                    <p onClick={this.authenticate}>Connexion</p>
                </div>
            )
        }
        else{
           
            return (
                <div>
                    <p 
                    onClick={()=>this.logout()}
                    >
                     {this.props.getPseudo(this.state.uid)}
                     </p>
                </div>
            )
        }
    }
}
