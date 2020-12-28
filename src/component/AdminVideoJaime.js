import React from 'react'


import './Nav.css'
import Miniature from './Miniature'
import './AdminVideo.css'

import {Link} from 'react-router-dom'

export const AdminVideoJaime = ({state,stateMytube,refCard,isAlreadyLike,typeJaime}) => {

    if(state.user.pseudo===undefined || state.user.pseudo===''){
             return <div className='cards-form'>
                    <h2>Connectez-vous pour pouvoir voir vos video j'aime !</h2>
                    </div>
    }else{
        return (
            <div className='cards' ref={refCard}>
                {Object.keys(stateMytube || {})
                .map(items =>
                    {
                        if(stateMytube[items].likeBy!==undefined){
                            if(stateMytube[items].likeBy[state.user.uid]!==undefined && stateMytube[items].likeBy[state.user.uid]===1){
                                let result=''
                                const path=`/videoSelect/${items}`
                               result=
                                <Link key={path}  style={{textDecoration:'none',color:'#000'}}
                                         to={path} >
                                        <Miniature 
                                            key={items} 
                                            id={items}
                                            state={state}
                                            auteur={stateMytube[items].auteur}
                                            name={stateMytube[items].nom}
                                            url={stateMytube[items].url}
                                            tag={stateMytube[items].tag}
                                            vue={stateMytube[items].vue}
                                            like={stateMytube[items].like}
                                            isAlreadyLike={isAlreadyLike}
                                        />
                                </Link>

                            return result
                            }
                        }
                        return 0
                })}
            </div>
        )
    }
}
export default AdminVideoJaime
