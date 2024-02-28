import React from "react";
import "./index.css";
import Header from "../../shared/Header/header";

function Discover(props) {

    function navToItem(url) {
        window.location = url
    }

    return <>
        <div className="page1">
            <div className="content">
                <Header setSignedIn={props.setSignedIn} signedIn={props.signedIn} openLogIn={props.openLogIn} closeLogIn={props.closeLogIn} openSignUp={props.openSignUp} closeSignUp={props.closeSignUp} />
                <div className="line"></div>
                <div className="discover_page">
                    <div className="discover_title">
                        Discover
                    </div>
                    <div className="discover_search">
                        <input type='text' className="discover_searchbar" placeholder="🔍 search"></input>
                    </div>
                    <div className="discover_othertitle">
                        Food
                    </div>
                    <div className="local_stores">
                        {props.food.slice(0, 5).map((item, index) => (
                            <div className="local_store_card" key={index}>
                                {item.productImageUrl ? <>
                                    <div className="local_store_card_img" style={{ backgroundImage: `url(${item.productImageUrl})` }}>
                                    </div>
                                </> : <>
                                    <div className="local_store_card_img">
                                    </div>
                                </>}
                                <div className="local_store_card_text">
                                    <div className="t1">{item.productName}</div>
                                    <div className="t2">{item.productDescription}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="discover_othertitle">
                        Stores
                    </div>
                    <div className="local_stores">
                        {props.stores.slice(0, 5).map((item, index) => (
                            <div className="local_store_card" key={index}>
                                {item.storeImageUrl ? <>
                                    <div className="local_store_card_img" style={{ backgroundImage: `url(${item.storeImageUrl})` }}>
                                    </div>
                                </> : <>
                                    <div className="local_store_card_img">
                                    </div>
                                </>}
                                <div className="local_store_card_text">
                                    <div className="t1">{item.storeName}</div>
                                    <div className="t2">{item.storeTagline}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="discover_othertitle">
                        Events
                    </div>
                    <div className="local_stores">
                    {props.events.slice(0, 5).map((item, index) => (
                        <div className="local_store_card" key={index}>
                            {item.eventImageUrl ? <>
                                <div className="local_store_card_img" style={{ backgroundImage: `url(${item.eventImageUrl})` }}>
                                </div>
                            </> : <>
                                <div className="local_store_card_img">
                                </div>
                            </>}
                            <div className="local_store_card_text">
                                <div className="t1">{item.eventName}</div>
                                <div className="t2">{item.eventFromDateTime}</div>
                            </div>
                        </div>
                    ))}
                </div>

                </div>
            </div>
        </div>
    </>
}

export default Discover;