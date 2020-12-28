import React from 'react'

import './Miniature.css'

export default function Miniature({id,name,auteur , url,vue,like,addVue,isAlreadyLike}) {

    let pouce= <i  className="far fa-thumbs-up"></i>
    if(isAlreadyLike(id)){
        pouce= <i  className="fas fa-thumbs-up"></i>
    }

    if(addVue===undefined){
        return (
            <div className='cardMiniature'>
                <div className='div-video'>
                  <video>
                        <source src={url}
                        type="video/mp4"></source>
                   </video>
                </div>
                <div className='div-text'>
                   <h3>{name}</h3>
                   <div className="info">
                        <span>de {auteur}</span>
                        <span>vues par {vue} personnes</span>
                        <span>avec {like} likes</span>
                        {pouce}
                    </div>
                </div>
            </div>
        )
    }else{
    
    return (
        <div className='cardMiniature'>
            <div className='div-video'>
              <video onClick= {()=>addVue(id)}>
                    <source src={url}
                    type="video/mp4"></source>
               </video>
            </div>
            <div className='div-text'>
               <h3>{name}</h3>
               <div className="info">
                    <span>de {auteur}</span>
                    <span>vues par {vue} personnes</span>
                    <span>avec {like} likes</span>
                    {pouce}
                </div>
            </div>
        </div>
    )
    }
}
