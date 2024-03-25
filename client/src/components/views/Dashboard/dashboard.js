import React from "react";
import "./index.css";
import Header from "../../shared/Header/header";
import { useState, useEffect } from "react";
import Table from "./table";

function Dashboard(props) {
    const [storeData, setStoreData] = useState([])
    const [revenue, setRevenue] = useState(0)
    const [orders, setOrders] = useState(0)
    const [eventData, setEventData] = useState({});
    const [transactions, setTransactions] = useState([]);
    function openCreateStore() {
        window.location = "/create";
    }

    function openCreateEvent() {
        window.location = "/createEvent";
    }

    useEffect(() => {
        setStoreData(props.user.stores)

        if (props.user && props.user.stores && props.user.stores.length > 0) {
            let r = 0
            let o = 0
            for (let i = 0; i < props.user.stores.length ; i++) {
                r += props.user.stores[i]['storeRevenue']
                o += props.user.stores[i]['storeTotalOrders']
                console.log("ABS")
                console.log(props.user.stores[i]['storeTransactions'])
            }
            setRevenue(r)
            setOrders(o)
        } else {
            setRevenue(0)
            setOrders(0)
        }
    }, [props.user.stores])


    useEffect(() => {
        setEventData(props.user.events)
    }, [props.user.events])

    return <>
        <div className="page1">
            <div className="content">
                <Header setSignedIn={props.setSignedIn} signedIn={props.signedIn} openLogIn={props.openLogIn} closeLogIn={props.closeLogIn} openSignUp={props.openSignUp} closeSignUp={props.closeSignUp} />
                <div className="line"></div>
                <div className="dashboard_page">
                    <div className="dashboard_title">
                        <div className="dasboard_title_t">
                            Your Dashboard
                        </div>
                        <div className="create_store_event">
                        
                        <div onClick={openCreateStore} className="dasboard_title_btn">
                            + Create Store
                        </div>
                        <div onClick={openCreateEvent} className="dasboard_title_btn">
                            + Create Event
                        </div>
                        </div>
                    </div>
                    {transactions}
                    <div className="revenue_profit_orders">
                        <div className="rpo_tile">
                            <div className="rpo_tile_1">
                                ${Math.round(revenue * 100) / 100}
                            </div>
                            <div className="rpo_tile_2">
                                Total Revenue
                            </div>
                        </div>
                        <div className="rpo_tile">
                            <div className="rpo_tile_1">
                                {orders}
                            </div>
                            <div className="rpo_tile_2">
                                Total Orders
                            </div>
                        </div>
                        <div className="rpo_tile">
                            <div className="rpo_tile_1">
                                {Math.round((orders/7) * 100) / 100}
                            </div>
                            <div className="rpo_tile_2">
                                Average Orders/Week
                            </div>
                        </div>
                    </div>
                    <div className="revenue_and_sales">
                        <div className="ras_tile2">
                            <div className="ras_tile_1">
                                Revenue Over Time
                            </div>
                            <div className="ras_tile_2">

                            </div>
                        </div>
                        <div className="ras_tile2">
                            <div className="ras_tile_1">
                                Orders Over Time
                            </div>
                            <div className="ras_tile_2">

                            </div>
                        </div>
                    </div>
                    <div className="dashboard_title">
                        Store Overview
                    </div>
                    <div className="revenue_and_sales">
                        <div className="ras_tile">
                            {storeData && (
                            <Table data={storeData} fields={['storeName', 'storeLocation', 'storeRevenue', 'storeTotalOrders']}  />
                            )}
                        </div>
                    </div>
                    <div className="dashboard_title">
                        Events Overview
                    </div>
                    <div className="revenue_and_sales">
                        <div className="ras_tile">
                            {eventData && (
                            <Table data={eventData} fields={['eventName', 'eventLocation', 'eventFromDateTime', 'eventRSVP']}  />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Dashboard;