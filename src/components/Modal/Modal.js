import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import './Modal.css'


const modal = (props) => {

    //console.log(props.showmodalusers)
    let temp = []
    return <div>
        <Backdrop show={props.showmodal} showmodalhandler={props.showmodalhandler} />
        <div className={props.showmodal ? "modal" : "modal-hide"}>
            <div className="modal-inner1">

                <div>
                    <p onClick = {() => props.reactionsnamehandler(props.users)}>All</p>
                    {
                        props.modaldata.map(
                            (data, index) => {
                            temp.push(props.users.filter( val =>  props.usersreaction.some( val1 => val1.user_id === val.id && data.id === val1.reaction_id)))
                            return <p onClick = {() => props.reactionsnamehandler(temp[index]) }>{data.emoji}</p>
                        }
                    )
                    }
                </div>
            </div>
            <div className="modal-inner2">
                <ul>
                    {
                        props.showmodalusers.map(data => <li>
                            <div style={{
                                display: "inline-flex",
                                height: "40px",
                                margin: "0 0 0 -20px"
                            }}>
                                <img alt="1" height="24px" width="24px" style={{
                                    borderRadius: "50px"
                                }} src={data.avatar}></img>
                                <p style={
                                    {
                                        margin: "-1px 0 0 10px"
                                    }
                                }>{data.first_name + " " + data.last_name}</p>
                            </div>
                        </li>)
                    }
                </ul>
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

  export default React.memo(modal, areEqual )