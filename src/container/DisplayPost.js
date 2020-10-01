import React, { Component } from 'react'
import './DisplayPost.css'
import ReactionDisplay from '../components/ReactionDisplay/ReactionDisplay'
import Modal from '../components/Modal/Modal'
import axios from 'axios'
import image from '../content_data/imagesdata.json'



class DisplayPost extends Component {


    state = {
        reactions: [],
        users: [],
        usersreaction: [],
        reaction_update: [],
        contents: [
            ...image
        ],
        showmodal: false,
        modaldata: [],
        currentuser: {},
        modalusersreaction: [],
        modalusers:[],
        showmodalusers:[]
    }

    componentDidMount = () => {

        axios.get('https://artful-iudex.herokuapp.com/user_content_reactions').then(response => {

            this.setState({ usersreaction: [...response.data] })
        }
        ).catch(err => {
            console.log(err)
        })
        axios.get('https://artful-iudex.herokuapp.com/reactions').then(response => {

            this.setState({ reactions: [...response.data] })
        }
        ).catch(err => {
            console.log(err)
        })
        axios.get('https://artful-iudex.herokuapp.com/users').then(response => {

            this.setState({ users: [...response.data] })
        }
        ).catch(err => {
            console.log(err)
        })
        axios.get('https://artful-iudex.herokuapp.com/users/4').then(response => {

            this.setState({ currentuser: { ...response.data } })
        }
        ).catch(err => {
            console.log(err)
        })

    }


    likebuttonhandler = async (data, id) => {
        let temp
        let val = this.state.usersreaction.find(datafind => datafind.user_id === this.state.currentuser.id && datafind.content_id === id && data !== datafind.reaction_id)
        //console.log(val)
        temp = val ? val.id : undefined

        //if reaction is there but no the same one (e.g xD is there but the requested one is :( ))
        if (temp) {
            try {
                const del_res = await axios.delete("https://artful-iudex.herokuapp.com/user_content_reactions/" + temp)
                console.log({
                    message: "del_res!!",
                    ...del_res
                })
            }
            catch (err) {
                console.log(err)
            }

            try {
                const post_res = await axios.post("https://artful-iudex.herokuapp.com/user_content_reactions", {


                    "user_id": 4,
                    "reaction_id": data,
                    "content_id": id

                })
                console.log({
                    message: "post_res!!",
                    ...post_res
                })
            }
            catch (err) {
                console.log(err)
            }


            try {
                const get_res = await axios.get("https://artful-iudex.herokuapp.com/user_content_reactions")
                this.setState({ usersreaction: [...get_res.data] })
            }
            catch (err) {
                console.log(err)
            }
            return 0
        }


        // if reaction is already there or not
        val = this.state.usersreaction.find(datafind => datafind.reaction_id === data && datafind.user_id === this.state.currentuser.id)
        temp = val ? val.id : undefined

        if (temp) {
            try {
                const del_res = await axios.delete("https://artful-iudex.herokuapp.com/user_content_reactions/" + temp)
                console.log({
                    message: "del_res!!",
                    ...del_res
                })
            }
            catch (err) {
                console.log(err)
            }

            try {
                const get_res = await axios.get("https://artful-iudex.herokuapp.com/user_content_reactions")
                this.setState({ usersreaction: [...get_res.data] })
            }
            catch (err) {
                console.log(err)
            }

        }

        else {
            try {
                await axios.post("https://artful-iudex.herokuapp.com/user_content_reactions", {


                    "user_id": 4,
                    "reaction_id": data,
                    "content_id": id

                })
            }
            catch (err) {
                console.log(err)
            }


            try {
                const get_res = await axios.get("https://artful-iudex.herokuapp.com/user_content_reactions")
                this.setState({ usersreaction: [...get_res.data] })
            }
            catch (err) {
                console.log(err)
            }
        }

    }

    showmodalhandler = (data, users, usersreaction) => {

        if (this.state.showmodal === false) {
            this.setState({
                showmodalusers: [...users],
                showmodal: !this.state.showmodal,
                modaldata: [...data],
                modalusers: [...users],
                modalusersreaction: [...usersreaction]
            })
        }
        else
            this.setState({
                showmodal: !this.state.showmodal
            })
    }

    reactionsnamehandler = (data) => {
       // console.log(data)
        this.setState({
            showmodalusers: [...data]
        })
    }

    render() {


        return <div className="viewport">
            <Modal
                showmodal={this.state.showmodal}
                modaldata={this.state.modaldata}
                usersreaction={this.state.modalusersreaction}
                users={this.state.modalusers}
                showmodalhandler={this.showmodalhandler}
                showmodalusers={this.state.showmodalusers}
                reactionsnamehandler={this.reactionsnamehandler}
            />
            {this.state.contents.map((data, index) => {


                return <ReactionDisplay
                    key={index}
                    usersreaction={this.state.usersreaction.filter(val => {
                        return val.content_id === data.id
                    })}
                    contentdata={data}
                    users={this.state.users}
                    reactions={this.state.reactions}
                    showmodal={this.showmodalhandler}
                    content_id={data.id}
                    currentuser={this.state.currentuser}
                    likebuttonhandler={this.likebuttonhandler} />

            }
            )}

        </div>

    }





}


export default DisplayPost