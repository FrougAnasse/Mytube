import React from 'react'
import {useParams} from 'react-router-dom'

import './Nav.css'
import Video from './Video'
import './AdminVideo.css'

export const AdminVideoSelected = ({state,stateMytube,handleLike,isAlreadyLike,refCardVideo,refCard}) => {
    let slug = useParams()

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
                                    auteur={stateMytube[items].auteur}
                                    name={stateMytube[items].nom}
                                    url={stateMytube[items].url}
                                    tag={stateMytube[items].tag}
                                    vue={stateMytube[items].vue}
                                    like={stateMytube[items].like}
                                    handleLike={handleLike}
                                    isAlreadyLike={isAlreadyLike}
                                />
                        }
                        else{
                            result=''
                        }
                        return result
                })
   
    return (
        <div className='cardsVideo' ref={refCard}>
           
           { SelectedVideo}
        </div>
    )
}
export default AdminVideoSelected
