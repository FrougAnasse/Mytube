import React,{useState} from 'react'

import './Video.css'


export default function Video({stateMytube,id,name,auteur,isAlreadyLike , url,vue,like,handleLike,addComment}) {
   

    const [msg, setmsg] = useState('')

    let pouce= <i onClick={()=>handleLike(id)} className="far fa-thumbs-up"></i>
    if(isAlreadyLike(id)){
        pouce= <i onClick={()=>handleLike(id)} className="fas fa-thumbs-up"></i>
    }

  
   
    const comment=Object.keys(stateMytube[id].comment||{})
                        .map(items=>{
                            return <div key={items} className="comment"><h3>{stateMytube[id].comment[items].auteur }:</h3> <p>{stateMytube[id].comment[items].comment}</p> </div>
                        })
    let style=<label htmlFor="msg">Entrer votre commentaire</label>;
    if(msg!==''){
        style=<label className='move' htmlFor="msg">Entrer votre commentaire</label>
    }
    
    return (
      <>
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

            
            <form className="form-content">
                <h2>Espace Commentaire</h2>
                {style}
                <textarea id="msg" name="msg" value={msg} onChange={(e)=>setmsg(e.target.value)}/>
                <button onClick={
                    (e)=>{
                        e.preventDefault()
                        addComment(id,msg)
                        setmsg('')
                    }
                }>Envoyer votre commentaire</button>
            </form>
            {comment}
      </>     
       
    )
}
