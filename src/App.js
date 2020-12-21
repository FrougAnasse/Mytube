import React from 'react'
import './App.css';
import Nav from './component/Nav'
import AdminVideo from './component/AdminVideo'
import AdminVideoSelected from './component/AdminVideoSelected'
import AdminUpload from './component/AdminUpload'
import AdminVideoJaime from './component/AdminVideoJaime'

//firebase
import base from './base'

//react router
import{BrowserRouter as Router,Route} from 'react-router-dom'

class App extends React.Component{
  constructor(props) {
    super(props);
    this.refCard = React.createRef();
    this.refCardVideo = React.createRef();
    
    this.state ={
      mytube:{},
      search:'',
      videoSelected:'',
      user:{}
    }
  }
   

  componentDidMount(){
    this.ref=base.syncState(`/`,{
      context:this,
      state: 'mytube'
    })
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  handleSearch=(value)=>{
    this.setState({search:value})
  }

  disconnecte=()=>{
    this.setState({user:''})
  }

  handleUser=(value)=>{
    const id=this.state.user.uid
    this.setState({user:value})
  }
  
  handleVue=(key) => {
    const mytube= {...this.state.mytube}
    mytube.video[key].vue++;
    this.setState({mytube})
  
    const videoSelected=key
    this.setState({videoSelected})
  }


  isAlreadyLike=(keyVideo)=>{
    const mytube= {...this.state.mytube}
    let Already=false;
    if(mytube!==undefined){
      Object.keys(mytube.video[keyVideo].likeBy || {})
            .map(key =>{
                if(key===this.state.user.uid){
                  if(mytube.video[keyVideo].likeBy[this.state.user.uid]===1)
                  Already=true
                }
            })

      return  Already
    }
  }

  handleLike = (key) => {
    console.log(this.state.user.uid!==undefined)
    if(this.state.user.uid!==undefined ){
      const mytube= {...this.state.mytube}
      console.log(key)
      console.log(this.isAlreadyLike(key))
   
    if( mytube.video[key].likeBy===undefined){
          mytube.video[key].likeBy={};
    }
     if(mytube.video[key].likeBy[this.state.user.uid]===undefined || mytube.video[key].likeBy[this.state.user.uid]===0){
        mytube.video[key].like++
        mytube.video[key].likeBy[this.state.user.uid]=1
      }
      else
      {
        mytube.video[key].like--
        mytube.video[key].likeBy[this.state.user.uid]=0
      }
      this.setState({mytube})
    }
  }


  getPseudo=(uid)=>{
    console.log('in pseudo '+uid)
    const Testuser={...this.state.mytube.user}
    let pseudo=''
    Object.keys(Testuser || {})   //on vérifie que le compte n'a pas déja été créer
        .map(key => {
                      if((Testuser[key].uid===uid)){
                        pseudo=Testuser[key].pseudo
                      }
                   }
            );
    return pseudo
  }

  addNewUser= async (uid)=>{
    const Testuser={...this.state.mytube.user}
    console.log('in add new user '+uid)
    const mytube={...this.state.mytube}
    let pseudoUid=this.getPseudo(uid)
    console.log('new user pseudo trouver'+pseudoUid)
    
    if(pseudoUid===''){
        pseudoUid= prompt("Veuillez rentrer votre pseudo attention il est      définitive !")
        console.log('prompt======'+pseudoUid)
    }

    const newUser={
      uid:uid,
      pseudo:pseudoUid
    }
    mytube.user[`user-${Date.now()}`]=newUser
    this.setState({mytube})
    console.log(newUser)
    return newUser;
  }

  getUser=(uid)=>{
    console.log('in get user '+uid)
    const Testuser={...this.state.mytube.user}
    console.log('test  ')
    console.log(Testuser)
    let newUser={}
    Object.keys(Testuser)   //on vérifie que le compte n'a pas déja été créer
        .map(key => {
                  if((Testuser[key].uid===uid)){
                    newUser=Testuser[key];
                  }
             }
        );
    if(newUser.uid===undefined){    //si aucun compte n'a été ctrouver on en créer un
     console.log('new new new new')
      newUser=this.addNewUser(uid)
    }
    console.log(newUser)
    const user={...this.state.user}   //mise à jour du sate user local 
    this.setState({user:newUser})
  }


  addVideo=(nom,tags,url)=>{
    const mytube={...this.state.mytube}
    const NewVideo={
      auteur:this.state.user.pseudo,
      comment:'',
      like:0,
      likeBy:{},
      nom:nom,
      tag:tags,
      url:url,
      vue:0
    }
    mytube.video[`video${Date.now()}`]=NewVideo
    this.setState({mytube})
    console.log(mytube)
  }

  render(){
    
  //variable permettant la manipulation de la marge lors de l'activation du menu



    return (
      <>
       <Router>
         
          <Nav state={this.state}  getPseudo={this.getPseudo} 
                  stateMytube={this.state.mytube.video} 
                  handleSearch={this.handleSearch} 
                  handleUser={this.handleUser} 
                  getUser={this.getUser} 
                  disconnecte={this.disconnecte}
                  refCardVideo={this.refCardVideo}
                  refCard={this.refCard}
                  >
          </Nav>
        
         <Route path='/' exact 
                render={()=><AdminVideo state={this.state} 
                            stateMytube={this.state.mytube.video} 
                            handleVue={this.handleVue}
                            isAlreadyLike={this.isAlreadyLike}
                            stateMytube={this.state.mytube.video} 
                            refCard={this.refCard}
                          />
                        }/>
        
         <Route path='/video/:slug' exact 
                render={()=><AdminVideoSelected 
                        state={this.state}
                        isAlreadyLike={this.isAlreadyLike}
                        stateMytube={this.state.mytube.video} 
                        handleLike={this.handleLike}
                        refCardVideo={this.refCardVideo}
                        refCard={this.refCard}
                        />
                        }/> 

          <Route path='/upload' exact 
                render={()=><AdminUpload state={this.state} 
                              stateMytube={this.state.mytube.video} 
                              addVideo={this.addVideo}
                              refCard={this.refCard}
                              isAlreadyLike={this.isAlreadyLike}/> 
                        }/>
          
          <Route path='/video/likes' exact 
                render={()=><AdminVideoJaime state={this.state} 
                              stateMytube={this.state.mytube.video} 
                              refCard={this.refCard}
                              isAlreadyLike={this.isAlreadyLike}/> 
                        }/>
          
          

      </Router> 
      </>
    );
  }
}
export default App;
