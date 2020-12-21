import React from 'react'

import './Video.css'


export default function Video({id,name,auteur,isAlreadyLike , url,vue,like,handleLike}) {
   
    let pouce= <i onClick={()=>handleLike(id)} className="far fa-thumbs-up"></i>
    if(isAlreadyLike(id)){
        pouce= <i onClick={()=>handleLike(id)} className="fas fa-thumbs-up"></i>
    }
   
    return (
        <div className='cardVideo'>
            <div className='div-video'>
                <video controls>
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
