import React from "react";
import "./index.css";
import Header from "../../shared/Header/header";
import { useState } from "react";

function Discover(props) {

    function LikeButton(props) {
        const [liked, setLiked] = useState(false);
        const [e, setE] = useState("");
        const [debug_message, setDebug_Message] = useState(props.msg);
        console.log(props.product && props.product.productStore && props.product.productStore)

        const handleLikeClick = () => {
            if (props.type === "food") {
                setDebug_Message("Processing...")
                props.UpdateStoreOrders(props.product.productStore)
                props.UpdateStoreRevenue(props.product.productStore, props.product.productPrice)
                setE("e")
                setDebug_Message("💖")
            }
            else if (props.type === "event") {
                setDebug_Message("Processing...")
                props.UpdateRSVP(props.product.eventName)
                setE("e")
                setDebug_Message("💖")
            }
        };

        return (
            <button
                className={`like-button ${e}`}
                onClick={handleLikeClick}
            >
                {debug_message}
                <i className="fas fa-thumbs-up"></i>
            </button>
        );
    };

    function navToItem(url) {
        window.location = url
    }

    const [loading, setLoading] = useState(false)

    const [searchTerm, setSearchTerm] = useState('');
    const [debug_message, setDebugMessage] = useState('');

    async function handleKeyPress(event) {
        if (event.key === 'Enter' && searchTerm.trim() !== '') {
            setLoading(true)
            setDebugMessage("Loading...")
            await props.getSortedProductsEventsStores(searchTerm)
            setLoading(false)
            setDebugMessage("Here's the top choices according to your search:")
            console.log('Enter key pressed! Search term:', searchTerm);
        }
    };


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
                        <input type='text' className="discover_searchbar" placeholder="🔍 search"

                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleKeyPress}

                        ></input>
                    </div>
                    <div className="loading_discover">
                        {loading ? "Loading..." : debug_message}
                    </div>
                    <div className="discover_othertitle">
                        Food
                    </div>
                    <div className="local_stores">
                        {props.food.map((item, index) => (
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
                                    <div className="t2">{item.productPrice}</div>
                                    <div className="t2">{item.productStore}</div>
                                </div>
                                {item.productImageUrl ? <>
                                    <div className="like">
                                        <LikeButton msg={"Order"} type={"food"} product={item} UpdateStoreOrders={props.UpdateStoreOrders} UpdateStoreRevenue={props.UpdateStoreRevenue} />
                                    </div>
                                </> : <>
                                </>}
                            </div>
                        ))}
                    </div>
                    <div className="discover_othertitle">
                        Stores
                    </div>
                    <div className="local_stores">
                        {props.stores.map((item, index) => (
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
                                {item.storeImageUrl ? <>
                                    <div className="like">
                                        <LikeButton msg={"Like"} type={"store"} />
                                    </div>
                                </> : <>
                                </>}
                            </div>
                        ))}
                    </div>
                    <div className="discover_othertitle">
                        Events
                    </div>
                    <div className="local_stores">
                        {props.events.map((item, index) => (
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
                                {item.eventImageUrl ? <>
                                    <div className="like">
                                        <LikeButton msg={"RSVP"} type={"event"} product={item} UpdateRSVP={props.UpdateRSVP} />
                                    </div>
                                </> : <>
                                </>}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Discover;