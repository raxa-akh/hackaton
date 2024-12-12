import React from "react";

export default function DeliveryCard ({ deliveryData }) {

    return (
        <tr>
            <th>{deliveryData.id}</th>
            <th>{deliveryData.date}</th>
            <th>{deliveryData.quantity}</th>
            <th>{deliveryData.loaderName}</th>
            <th>{deliveryData.isCompleted}</th>
        </tr>
    )
}