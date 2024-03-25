import React from "react";
import "./index.css";
import Header from "../../shared/Header/header";
import { useState } from "react";

function Home(props) {

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
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
                const day = String(currentDate.getDate()).padStart(2, '0');
                
                const formattedDate = `${year}-${month}-${day}`;
                props.UpdateStoreTransactions(props.product.productStore, props.product.productPrice, formattedDate)
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

    function gotoDashboard(e) {
        e.preventDefault();
        window.location = "/dashboard"
    }
    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && searchTerm.trim() !== '') {
            // Call your function here, passing the searchTerm if needed
            console.log('Enter key pressed! Search term:', searchTerm);
        }
    };


    return <>
        <div className="page1">
            <div className="content">
                <Header setSignedIn={props.setSignedIn} signedIn={props.signedIn} openLogIn={props.openLogIn} closeLogIn={props.closeLogIn} openSignUp={props.openSignUp} closeSignUp={props.closeSignUp} />
                <div className="line"></div>
                <div className="hero_page">
                    <div className="hero_img">
                        <div className="dark_layer">
                            <div className="hero_img_content">
                                <div className="hero_img_content_title">
                                    Connecting Communities through Food
                                </div>
                                <div className="hero_img_content_search">
                                    Find, Share, and Save With The Power Of Artifical Intelligence
                                </div>
                                <div className="hero_img_content_search_bar">
                                    <input
                                        type='text'
                                        className="searchbar"
                                        placeholder="🔍 show me cheap pizza under 5$ ..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    >
                                    </input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hero2_title">
                        Popular Near Me
                    </div>
                    <div className="hero2_text">
                        Explore our curated collections for inspiration and discover the perfect menu for your next gathering
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
                                    <div className="t2">{item.productPrice}</div>
                                </div>
                                {item.productImageUrl ? <>
                                    <div className="like">
                                        <LikeButton msg={"Order"} type={"food"} product={item} UpdateStoreTransactions={props.UpdateStoreTransactions} UpdateStoreOrders={props.UpdateStoreOrders} UpdateStoreRevenue={props.UpdateStoreRevenue} />
                                    </div>
                                </> : <>
                                </>}
                            </div>
                        ))}
                    </div>
                    <div className="hero2_title">
                        Restaurants Near Me 🔥
                    </div>
                    <div className="hero2_text">
                        Find local restaurants and view their catalog. Like the food? View directions to go there or order directly online!
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
                                    <div className="t2">{item.storeDescription}</div>
                                </div>
                                <div className="local_store_card_text">
                                    <div className="t1">{item.productName}</div>
                                    <div className="t2">{item.productDescription}</div>
                                    <div className="t2">{item.productPrice}</div>
                                </div>
                                {item.storeImageUrl ? <>
                                    <div className="like">
                                        <LikeButton msg={"Like"} />
                                    </div>
                                </> : <>
                                </>}
                            </div>
                        ))}
                    </div>
                    <div className="hero2_title">
                        Explore Events
                    </div>
                    <div className="hero2_text">
                        Discover a world of events tailored to your interests, where every gathering promises unforgettable experiences                    </div>
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

export default Home;