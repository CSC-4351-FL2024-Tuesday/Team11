import { useEffect, useState } from "react"
import "./index.css"

export default function Table(props) {
    console.log("A")
    console.log(props)

    function editStore(row) {
        console.log(row)
        window.location = `/${row.storeName}`
    }

    return (
        <table className="table">
            {props.data && props.data.length > 0 && props.fields && props.fields.length > 0 && (
                <thead className="table_head">
                    <tr className="table_head_row">
                        <th className="table_head_h">{props.fields[0]}</th>
                        <th className="table_head_h">{props.fields[1]}</th>
                        <th className="table_head_h">{props.fields[2]}</th>
                        <th className="table_head_h">{props.fields[3]}</th>
                    </tr>
                </thead>
            )}
            <tbody className="table_body">
                {props.data && props.data.length > 0 && props.data.map((row, index) => (
                    <tr className="table_body_row" key={index}>
                        {row.storeName ?                         
                            <td className="table_store_data"><div onClick={() => {editStore(row)}} className="table_body_data_btn">{row.storeName ? row.storeName : row.eventName}</div></td>:
                            <td className="table_store_data"><div>{row.storeName ? row.storeName : row.eventName}</div></td>
                        }
                        <td className="table_body_data">{row.storeLocation ? row.storeLocation : row.eventLocation}</td>
                        <td className="table_body_data">{row.storeRevenue ? row.storeRevenue : row.eventFromDateTime}</td>
                        <td className="table_body_data">{row.storeTotalOrders ? row.storeTotalOrders : row.eventRSVP}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
