/*
Description: Test Channel entry Form Page
Authors: Sami
Date: 10/18/2019
*/

import React, {useState} from 'react'
import fire from '../../config/Fire'

const AddChannelEntryForm = () => {
    const [Title, setTitle] = useState('')
    const [Password, setPassword] = useState('')
    const [OneTime, setOneTimePassword] = useState('')
    const [ValidDate, setValidDate] = useState('')
    const [ValidTime, setValidTime] = useState('')
    const [CreatorID, setCreatorID] = useState('')

    function onSubmit(e) {
        e.preventDefault()

        fire
        .firestore()
        .collection('channels')
        .add({
            Title,
            Password,
            OneTime,
            ValidDate,
            ValidTime,
            CreatorID
        })
        .then(() => {
            setTitle('')
            setPassword('')
            setOneTimePassword('')
            setValidDate('')
            setValidTime('')
            setCreatorID('')

        })
    } 

    return (
        <form onSubmit= {onSubmit}>
            <h4>Create Channel Entry</h4>
            <div>
            <div>
                <label>Title </label>
                <input Type = 'text' value={Title}  onChange={e => setTitle(e.currentTarget.value)}/>
            </div>
            <div>
                <label> Password </label>
                <input  Type = 'text' value={Password}  onChange={e => setPassword(e.currentTarget.value)}/>
            </div>
            <div>
                <label> One Time Password </label>
                <input  Type = 'text' value={OneTime}  onChange={e => setOneTimePassword(e.currentTarget.value)} />
            </div>
            <div>
                <label> Valid Date </label>
                <input  Type = 'text' value={ValidDate}  onChange={e => setValidDate(e.currentTarget.value)} />
            </div>
            <div>
                <label> Valid Time </label>
                <input  Type = 'text' value={ValidTime}  onChange={e => setValidTime(e.currentTarget.value)}/>
            </div>
            <div>
                <label> Createor ID </label>
                <input  Type = 'text' value={CreatorID}  onChange={e => setCreatorID(e.currentTarget.value)}/>
            </div>
            

            <button> Add Channel Entry </button>
            </div>

        </form>
    )
}

export default AddChannelEntryForm