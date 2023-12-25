import React, { useEffect, useState } from "react";
import { getOpenOrders } from "../fetch";
import "./OpenOrders.css";

const OpenOrders = ({ selectedCoin }) => {
  const [openOrders, setOpenOrders] = useState([]);

  useEffect(() => {
    const fetchOpenOrders = async () => {
      try {
        const response = await getOpenOrders(selectedCoin);
        console.log("open order", response);
        setOpenOrders(response);
      } catch (error) {
        console.error("Error fetching open orders:", error);
      }
    };

    fetchOpenOrders();
  }, [selectedCoin]);

  return (
    <div className="component open-orders">
      <h2>Open Orders for {selectedCoin}</h2>
      {openOrders.length === 0 ? "No Open Orders" : openOrders}
    </div>
  );
};

export default OpenOrders;
