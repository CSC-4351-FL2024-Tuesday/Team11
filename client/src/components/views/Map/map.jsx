import React, { useEffect, useState } from "react";
import "./index.css";
import Header from "../../shared/Header/header";
import MyComponent from "./map-c";

function Map(props) {

    function navToLink(storeUrl) {
        window.location = storeUrl
    }

    const [markers, setMarkers] = useState([]);
    const [event_markers, setEventMarkers] = useState([]);

    async function getLonLan(location) {
        console.log(location)
        let res = await props.getAddress(location)
        console.log(res)
        console.log(res['lat'])
        return [res['lat'], res['lng']]; // Dummy coordinates, replace with actual values
    }
    
    useEffect(() => {
        let newMarkers = []
        if (props.stores[0]['imageUrl'] !== "") {
            const fetchLonLan = async () => {
                for (let i = 0; i < props.stores.length; i++) {
                    console.log(props.stores[i].storeLocation)
                    let lonlan = await getLonLan(props.stores[i].storeLocation)
                    newMarkers.push({ lat: lonlan[0], lng: lonlan[1] })
                }
                setMarkers(newMarkers)
            };
            fetchLonLan();
        }
    }, [props.stores]); // Make sure to include props.stores in the dependency array to trigger useEffect on change
    
    useEffect(() => {
        let newEMarkers = []
        if (props.events[0]['imageUrl'] !== "") {
            const fetchLonLan = async () => {
                for (let i = 0; i < props.events.length; i++) {
                    console.log(props.events[i].eventLocation)
                    let lonlan = await getLonLan(props.events[i].eventLocation)
                    newEMarkers.push({ lat: lonlan[0], lng: lonlan[1] })
                }
                setEventMarkers(newEMarkers)
            };
            fetchLonLan();
        }
    }, [props.events]); // Make sure to include props.stores in the dependency array to trigger useEffect on change


    return <>
        <div className="page1">
            <div className="content">
                <Header setSignedIn={props.setSignedIn} signedIn={props.signedIn} openLogIn={props.openLogIn} closeLogIn={props.closeLogIn} openSignUp={props.openSignUp} closeSignUp={props.closeSignUp} />
                <div className="line"></div>
                <div className="map_page">
                    <div className="map_and_events">
                        <div className="map_title">
                            Map
                        </div>
                        <div className="map_load">
                            <MyComponent markers={markers} event_markers={event_markers}/>
                        </div>
                        <div className="map_title" style={{ marginTop: '20px' }}>
                            Upcoming Events
                        </div>
                        <div className="events_stores">
                            {props.events.slice(0, 5).map((item, index) => { 
                                return (

                                <div key={index} className="event_store">
                                    {item.eventImageUrl ? <>
                                        <div className="event_store_img" style={{ backgroundImage: `url(${item.eventImageUrl})` }}>
                                        </div>
                                    </> : <>
                                        <div className="event_store_img">
                                        </div>
                                    </>}
                                    <div className="event_store_title">
                                        <div className="event_store_title_name">{item.imageUrl === '' ? "Loading..." : item.eventName}</div>
                                        <div className="event_store_title_sub">{item.imageUrl === '' ? "Loading..." : item.eventFromDateTime}-{item.eventToDateTime === '' ? "Loading..." : item.eventToDateTime}</div>
                                        <div className="event_store_title_sub sub_2">{item.imageUrl === '' ? "Loading..." : item.eventLocation}</div>
                                        <div className="event_store_title_sub sub_2">{item.imageUrl === '' ? "Loading..." : item.eventRSVP + " people going"}</div>
                                    </div>
                                    <div onClick={() => { navToLink(item.storeUrl) }} className="event_store_click">
                                        →
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Map;