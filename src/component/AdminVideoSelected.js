import React from 'react'
import {useParams} from 'react-router-dom'

import './Nav.css'
import Video from './Video'
import './AdminVideo.css'

import Miniature from './Miniature'

import {Link} from 'react-router-dom'

export const AdminVideoSelected = ({state,addComment,stateMytube,handleLike,isAlreadyLike,refCard,handleVue}) => {
    let slug = useParams()
    const addVue=(value)=>{
        handleVue(value)
    }
    const tags=Object.keys(stateMytube || {})
                    .map(items =>
                        {
                            let tag=''
                            if(items==""+slug.slug){
                                return tag=stateMytube[items].tag
                            }
                        }
                    )
    
    let tag=''

    tags.forEach(element => {
        if(element!=undefined){
            tag=element
        }
    });



    const SelectedVideo=Object.keys(stateMytube || {})
                .map(items =>
                    {
                        let result=''
                        if(items==""+slug.slug){
                            result=
                                <Video 
                                    key={items} 
                                    id={items}
                                    state={state}
                                    stateMytube={stateMytube}
                                    auteur={stateMytube[items].auteur}
                                    name={stateMytube[items].nom}
                                    url={stateMytube[items].url}
                                    tag={stateMytube[items].tag}
                                    vue={stateMytube[items].vue}
                                    like={stateMytube[items].like}
                                    handleLike={handleLike}
                                    isAlreadyLike={isAlreadyLike}
                                    addComment={addComment} 
                                />
                        }
                        else{
                            result=''
                        }
                        return result
                })

    
        const videoRecommander=Object.keys(stateMytube || {})
                .map(items=>{
                                    
                     if(stateMytube[items].tag===tag){
                                       
                        const path=`/videoSelect/${items}`

                    return    <Link key={path}  style={{textDecoration:'none',color:'#000'}}
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
                    
                     }
        })
    
  
  
    return (
        <div className="flex-cards">
            <div className='cardsVideo' ref={refCard}>
                { SelectedVideo}
            </div>
            <div className="flexVideo">
                <div className="text">
                    <h2>Recommandations</h2>
                </div>
                <div className="videoReco">
                    {videoRecommander}
                </div>
            </div>
        </div>
    )
}
export default AdminVideoSelected
