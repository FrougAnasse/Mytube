import React from 'react'

import './Nav.css'
import Miniature from './Miniature'

import './AdminVideo.css'

import {Link} from 'react-router-dom'

export const AdminVideo = ({stateMytube,handleVue,state,isAlreadyLike,refCard}) => {

    //valeur des tag 1=>nature 2=>musique  3=>dessin

    const trieParNom=(tabItems)=>{
            if(state.search!=='' && state.search!==null){
                for(let i=0;i<state.search.length || 0 ;i++){
                    if( state.search[i]!==tabItems[i] && state.search[i]!==tabItems[i].toUpperCase() && state.search[i]!==tabItems[i].toLowerCase()){
                        return false
                    }
                }
            
        }
        return true
    } 

    

    const addVue=(value)=>{
        handleVue(value)
    }

    const allVideo=Object.keys(stateMytube || {})
                .map(items =>
                {
                    let test=''
                    const path=`video/${items}`

                    trieParNom(stateMytube[items].nom) 
                    ?  test=
                        <Link key={path}  style={{textDecoration:'none',color:'#000'}}
                             to={path} >
                            <Miniature 
                                key={items} 
                                id={items}
                                auteur={stateMytube[items].auteur}
                                name={stateMytube[items].nom}
                                url={stateMytube[items].url}
                                tag={stateMytube[items].tag}
                                vue={stateMytube[items].vue}
                                like={stateMytube[items].like}
                                isAlreadyLike={isAlreadyLike}
                                addVue={addVue}
                            />
                        </Link>
                    : test=''

                    return test
                })
   
    return (
        <div className="cards" ref={refCard}>
           {allVideo}
       </div>
    )
}
export default AdminVideo
