/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import './ReactionDisplay.css'



const reactiondisplay = (props) => {

    const modalreactions = props.reactions.filter( data => props.usersreaction.some( val => val.reaction_id === data.id)) 
    const usersoriginal = props.users.filter(datausers => props.usersreaction.some(val => datausers.id === val.user_id))
    const val_temp = props.usersreaction.find( data => props.currentuser.id === data.user_id)
    const logo = val_temp ? props.reactions.find(data => val_temp.reaction_id === data.id) : undefined
    return <div className='reaction-display'>
        <div>
            <img alt='.' src={props.contentdata.src}
            />
        </div>
        <div className="reaction-emoji-display">
            {props.reactions.map((datareaction ,index) => {

                const users_per_reaction = props.usersreaction.filter(datauserreact => datauserreact.reaction_id === datareaction.id)
                //console.log(users_per_reaction)
                const usersnames = props.users.filter(datausers => users_per_reaction.some(val => datausers.id === val.user_id))
                //console.log(usersnames)
                const temp = usersnames.map(data => <p>{data.first_name + " " + data.last_name}</p>)
                if (users_per_reaction.length !== 0) {
                    return <div key={index} className="reaction-banner-hover">
                        <p className="reaction-banner-para"> {datareaction.emoji} </p>
                        <div className='reaction-names-hidden'>
                            {temp}
                        </div>
                    </div>
                }
                else
                    return null
            })
            }
            {
                props.usersreaction.some(data => data.user_id === props.currentuser.id) ?
                    <div style={{
                        display:"inline-flex",
                        width:"100px",
                        margin:" 0 0 0 5px",
                        
                    }}>
                        <p style={{margin:"22px 0 0 5px"}}>You</p>
                        <p style={{margin:"22px 0 0 5px"}}>and</p>
                        <a onClick={() => props.showmodal( modalreactions, usersoriginal, props.usersreaction)}>{props.usersreaction.length - 1}</a>
                        <p style={{margin:"22px 0 0 5px"}}>others</p>
                    </div> : <a onClick={() => props.showmodal( modalreactions, usersoriginal, props.usersreaction)} >{props.usersreaction.length - 1}</a>
            }
        </div>

        <div className='buttons-display'>
            <div className="buttons-bootstrap">
                {logo ? <p style={{
                    margin:"5px 0 0 0"
                }}>{logo.emoji}</p> : <Icon.HandThumbsUp className="bootstrap-icon" />}
                <p style={{ margin: "5px 0 0 7px" }}>Like</p>
                <div className="reactions-buttons">
                    {props.reactions.map(data => <div>
                        <p onClick={ () => props.likebuttonhandler(data.id, props.content_id)}className="react-emote">{data.emoji}</p>
                        <p className="react-name">{data.name}</p>
                    </div>)}
                </div>
            </div>
            <div className="buttons-bootstrap">
                <Icon.ChatLeftDots className="bootstrap-icon" />
                <p style={{ margin: "5px 0 0 7px" }}>Comment</p>
            </div>
            <div className="buttons-bootstrap">
                <Icon.Share className="bootstrap-icon" />
                <p style={{ margin: "5px 0 0 7px" }}>Share</p>
            </div>
        </div>

    </div>

}
const areEqual = (prevProps, nextProps) => {
    if(prevProps === nextProps)
        return true
    else
        return false
  }

export default React.memo(reactiondisplay, areEqual )