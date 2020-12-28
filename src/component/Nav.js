import React,{useState,useRef,useEffect} from 'react'

import './Nav.css'

import Login from './Login'

import {Link} from 'react-router-dom'

const Nav = ({state,stateMytube,handleSearch,handleUser,getUser,getPseudo,disconnecte,refCard}) => {
   
   

     const allVideo=  Object.keys(stateMytube || {} )
               .map(key =>  
               <option key={stateMytube[key].nom} value={stateMytube[key].nom} 
               />)

     const [videoSelect,handleChangeSelect]=useState('')

    const getVideoByName=(name)=>{
        let id=null
        Object.keys(stateMytube || {} )
               .forEach(key =>  {
                        if(name===stateMytube[key].nom){
                            id=key
                        }
               }
            )
     
        return id;
    }


     const handleSubmit=(videoSelect)=>{
         handleSearch(videoSelect)
     } 

     const divStart=useRef(null)
     const divCenter=useRef(null)
     const divEnd=useRef(null)
     const btnSearch=useRef(null)
     

     //variable qui gére le mouvement du menu
     const info=useRef(null)
     const clone=useRef(null)
     const ul=useRef(null)

     useEffect(() => {
        //variable qui gére le mouvement du menu
        divStart.current.addEventListener('click',function(){
            info.current.classList.toggle('active')
            if(refCard.current!=null){
                refCard.current.classList.add('move')
            }
        })
        clone.current.addEventListener('click',function(){
            info.current.classList.toggle('active')
            if(refCard.current!=null){
                refCard.current.classList.remove('move')
            }
        })
        ul.current.addEventListener('click',function(){
            info.current.classList.toggle('active')
            if(refCard.current!=null){
                refCard.current.classList.toggle('move')
            }
        })
        /////////


         btnSearch.current.addEventListener('click',function(){
             divStart.current.classList.toggle('active');
             divCenter.current.classList.toggle('active');
             divEnd.current.classList.toggle('active');
         })

         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])

    return (
        <>
         <header>
            <div className='start' ref={divStart}>
                <i className="far fa-play-circle"></i>
                <h2>MyTube</h2>
            </div>

            <div className='nav-info' ref={info}>
                <div className='start cloneStart' ref={clone}>
                    <i className="far fa-play-circle"></i>
                    <h2>MyTube</h2>
                </div>
                <div className="list" ref={ul}>
                    <ul>
                        <Link  style={{textDecoration:'none',color:'#000'}}
                                to={'/'} >
                                <li>
                                    Accueil
                                </li>
                        </Link>
                            
                        <Link  style={{textDecoration:'none',color:'#000'}}
                                to={'/upload'} >
                            <li>
                                Upload video
                            </li>
                        </Link>
                        <Link  style={{textDecoration:'none',color:'#000'}}
                                to={'/video/likes'} >
                            <li className="liens">
                                Video aimés
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className="portfolio">
                            <span className="liens"   onClick={()=>window.open('https://portfolio-froug-anasse.netlify.app')}>
                               Vers portfolio
                            </span>
                </div>
            </div>



            <div className="center" ref={divCenter}>
                <form>
                    <input 
                        value={videoSelect} 
                        onChange={event => handleChangeSelect(event.target.value)} onClick={handleSubmit} 
                        type='text' 
                        list="video" 
                        id="search-video" 
                        name="video" 
                        placeholder="Recherche"
                    /> 
                        <datalist id="video">   
                            {allVideo}
                        </datalist>

                    <Link  style={{textDecoration:'none',color:'#000'}} to={`/video/${getVideoByName(videoSelect)}`}>
                    <i className="fas fa-search" ref={btnSearch} onClick={()=>{handleSubmit(videoSelect)
                        
                    }}></i>
                    </Link>
                </form>
            </div>


            <div className="end" ref={divEnd}>
              <Login
              disconnecte={disconnecte} 
              state={state} 
              getPseudo={getPseudo} 
              handleUser={handleUser}
               getUser={getUser}
               />
            </div>
        </header> 
    </>
    )
}


export default Nav



