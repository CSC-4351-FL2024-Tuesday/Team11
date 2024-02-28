import React, { useEffect, useState } from "react";
import "./index.css";
import Header from "../../shared/Header/header";
import MyComponent from "./map-c";

function Map(props) {

    function navToLink(storeUrl) {
        window.location = storeUrl
    }

    const [markers, setMarkers] = useState([]);

    const filterMarkersWithinRadius = (userLocation, markers, radius) => {
        const earthRadius = 6371; // Earth's radius in kilometers
        const filteredMarkers = markers.filter(marker => {
            const latDiff = (marker.lat - userLocation.lat) * (Math.PI / 180);
            const lngDiff = (marker.lng - userLocation.lng) * (Math.PI / 180);
            const distance = earthRadius * Math.acos(
                Math.cos(userLocation.lat * (Math.PI / 180)) * Math.cos(marker.lat * (Math.PI / 180)) *
                Math.cos(lngDiff) + Math.sin(userLocation.lat * (Math.PI / 180)) *
                Math.sin(marker.lat * (Math.PI / 180))
            );
            // Convert distance to miles
            const distanceInMiles = distance * 0.621371;
            console.log("Distance is")
            console.log(distanceInMiles)
            return distanceInMiles <= radius;
        });
        return filteredMarkers;
    };

    function getLonLan(location) {
        return [33.89, -84.3873];
    }

    useEffect(() => {
        let newMarkers = []
        if (props.stores.length !== 0) {
            for (let i = 0; i < props.stores.length; i++) {
                console.log(props.stores[i].storeLocation)
                let lonlan = getLonLan(props.stores[i].storeLocation)
                newMarkers.push({ lat: lonlan[0], lng: lonlan[1] })
            }
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log("A")
                    console.log(newMarkers)
                    // Filter markers within 10 miles radius
                    const filteredMarkers = filterMarkersWithinRadius(location, newMarkers, 10);
                    console.log("B")
                    console.log(filteredMarkers)
                    setMarkers(filteredMarkers)
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    // Handle error if needed
                }
            );

        } else {
            console.error('Geolocation is not supported by this browser.');
            // Handle lack of Geolocation support if needed
        }

    }, [props.stores]);



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
                            <MyComponent markers={markers} />
                        </div>
                        <div className="map_title" style={{ marginTop: '20px' }}>
                            Upcoming Events
                        </div>
                        <div className="events_stores">
                            {props.events.slice(0, 5).map((item, index) => (
                                <div key={index} className="event_store">
                                    {item.eventImageUrl ? <>
                                        <div className="event_store_img" style={{ backgroundImage: `url(${item.eventImageUrl})` }}>
                                        </div>
                                    </> : <>
                                        <div className="event_store_img">
                                        </div>
                                    </>}
                                    <div className="event_store_title">
                                        <div className="event_store_title_name">{item.eventName === '' ? "Loading..." : item.eventName}</div>
                                        <div className="event_store_title_sub">{item.eventFromDateTime === '' ? "Loading..." : item.eventFromDateTime}</div>
                                    </div>
                                    <div onClick={() => { navToLink(item.storeUrl) }} className="event_store_click">
                                        →
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="all_filters">
                        filter...
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Map;