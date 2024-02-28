import React, { useState } from 'react';
import Header from "../../shared/Header/header";
import "./index.css"

function Create_Event(props) {

    const [loadingText, setLoadingText] = useState("...")

    const [eventData, setEventData] = useState({
        eventName: "",
        eventLocation: "",
        eventFromDateTime: "", // Consider using Date type if handling dates
        eventToDateTime: "",   // Consider using Date type if handling dates
        eventDescription: "",
        eventImageUrl: "",
        eventRSVP: 0
    });

    const handleStoreChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveEvent = async () => {
        setLoadingText("Submitting Request...")
        props.CreateEvent(props.user.email, eventData)
        setLoadingText("Updated Event!")
    };


    return (
        <div className="page1">
            <div className="content">
                <Header setSignedIn={props.setSignedIn} signedIn={props.signedIn} openLogIn={props.openLogIn} closeLogIn={props.closeLogIn} openSignUp={props.openSignUp} closeSignUp={props.closeSignUp} />
                <div className="line"></div>
                <div className="discover_page">
                    <h2 className='subtitle' >Create an Event</h2>
                    <form className='store_form'>
                        <div className='store_form_first'>
                            <label className="store_form_label" htmlFor="eventName">Event Name:</label>
                            <input className="store_form_input" type="text" id="eventName" name="eventName" value={eventData.eventName} onChange={handleStoreChange} />
                            <label className="store_form_label" htmlFor="eventLocation">Event Location:</label>
                            <input className="store_form_input" type="text" id="eventLocation" name="eventLocation" value={eventData.eventLocation} onChange={handleStoreChange} />
                        </div>
                        <div className='store_form_first'>
                            <label className="store_form_label" htmlFor="eventImageUrl">Event Image URL:</label>
                            <input className="store_form_input" type="text" id="eventImageUrl" name="eventImageUrl" value={eventData.eventImageUrl} onChange={handleStoreChange} />
                            <label className="store_form_label" htmlFor="eventDescription">Event Description:</label>
                            <input className="store_form_input" type="text" id="eventDescription" name="eventDescription" value={eventData.eventDescription} onChange={handleStoreChange} />
                        </div>
                        <div className='store_form_first'>
                            <label className="store_form_label" htmlFor="eventFromDateTime">Event From:</label>
                            <input className="store_form_input" type="text" id="eventFromDateTime" name="eventFromDateTime" value={eventData.eventFromDateTime} onChange={handleStoreChange} />
                            <label className="store_form_label" htmlFor="eventToDateTime">Event To:</label>
                            <input className="store_form_input" type="text" id="eventToDateTime" name="eventToDateTime" value={eventData.eventToDateTime} onChange={handleStoreChange} />
                        </div>
                    </form>
                    <hr />
                    <div className='loading_text'>{loadingText}</div>
                    <button className="store_save_submit" type="button" onClick={saveEvent}>Save Store</button>
                </div>
            </div>
        </div>
    );
}

export default Create_Event;
