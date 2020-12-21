import React,{useState} from 'react'

import {firebaseInitApp} from '../base'

import './AdminUpload.css'

export default function AdminUpload({state,stateMytube,addVideo,refCard}) {

    const [fichier,changeFichier]=useState('')
    const [name,changeName]=useState('')
    const [tags,changeTags]=useState('')
    
    
    function renameFile(originalFile, newName) {
        return new File([originalFile], newName, {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }

     const onChange=(event)=>{
        event.preventDefault()
        console.log({fichier})
        const file= renameFile(fichier, name)
        const storageRef=firebaseInitApp.storage().ref()
        const  fileRef=storageRef.child('video/'+file.name)
        fileRef.put(file).then(()=>{
            console.log("Upload a file");
             fileRef.getDownloadURL().then(function (url) {
                 console.log(url)

                 addVideo(name,tags,url)
             });
        }).catch((error)=>{
            console.log(error)
        })

    }
    console.log(state.user.pseudo)
    if(state.user.pseudo===undefined || state.user.pseudo===''){
        return <div className='cards-form'>
                    <h2>Connectez-vous pour pouvoir poster des video !</h2>
                 </div>
    }else{
        return (
            <div className="cards-form" ref={refCard}>
                <h2>Formulaire Upload video</h2>
                <form> 
                    <div className="element">
                       
                        <input id="input-file" type="file" 
                              onChange={(e)=>changeFichier(e.target.files[0])}/>
                        <label htmlFor="input-file">Votre video</label>
                    </div>
    
                    <div className="element">
                        <label>Nom de la video</label>
                        <input type="text" value={name} onChange={(e)=>changeName(e.target.value) } />

                    </div>
    
                    <div className="element">
                        <label>Les tags de la video</label>
                        <input type="text"  value={tags} onChange={(e)=>changeTags(e.target.value) }/>
                    </div>
    
                    <div className="element">
                        <button onClick={(e)=>onChange(e)}>Envoyer votre video !</button>
                    </div>
                </form>
            </div>
        )
    }
 
}
