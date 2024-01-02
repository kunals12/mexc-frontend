import React, { useEffect, useState } from "react";
import {
  cancelAllOrdersWithSymbol,
  cancelOrder,
  getOpenOrders,
} from "../fetch";
// import io from "socket.io-client";
import "./OpenOrders.css";

const OpenOrders = ({ selectedCoin }) => {
  const [openOrders, setOpenOrders] = useState([]);
  // const [quantity, setQuantity] = useState();
  // const [price, setPrice] = useState();
  // const [side, setSide] = useState();
  // const [orderType, setOrderType] = useState();
  // const [quoteOrderQty, setQuoteOrderQty] = useState();

  // useEffect(() => {
  //   const socket = io("http://localhost:3000");

  //   // Listen for open orders updates
  //   socket.on("openOrdersUpdate", (updatedOrders) => {
  //     // Update the state with the new open orders data
  //     console.log("updated orders", updatedOrders);
  //     setOpenOrders(updatedOrders);
  //   });

  //   // Clean up the socket connection when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const fetchOpenOrders = async () => {
      if (openOrders.length === 0) {
        try {
          fetchOrders(selectedCoin);
        } catch (error) {
          console.error("Error fetching open orders:", error);
        }
      }
    };
    fetchOpenOrders();
  }, [openOrders, selectedCoin]);

  const fetchOrders = async (symbol) => {
    const response = await getOpenOrders(symbol);
    setOpenOrders(response);
    // console.log("open order", response);
  };

  const cancelAllOrders = async (symbol) => {
    const response = await cancelAllOrdersWithSymbol(symbol);
    console.log(await response);
    await fetchOrders(selectedCoin);
    // setOpenOrders(null);
  };

  const OpenOrders = () => {
    const cancelOpenOrder = async (symbol, orderId) => {
      const res = await cancelOrder(symbol, orderId);
      console.log(res);
      alert("Order Cancel");
      await fetchOrders(selectedCoin);
    };

    return (
      <div className="open-orders-container">
        {openOrders &&
          openOrders.map((data, index) => (
            <div key={index} className="order-box">
              <p>Symbol: {data.symbol}</p>
              <p>Quantity: {data.origQty}</p>
              <p>Amount Spent: {data.origQuoteOrderQty}</p>
              <p>Side: {data.side}</p>
              <p>Type: {data.type}</p>

              <button
                onClick={() => cancelOpenOrder(data.symbol, data.orderId)}
              >
                Cancel Order
              </button>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="component open-orders">
      <h2>Open Orders for {selectedCoin}</h2>
      {openOrders.length === 0 ? "No Open Orders" : <OpenOrders />}
      {openOrders.length === 0 ? (
        ""
      ) : (
        <button onClick={() => cancelAllOrders(selectedCoin)}>
          Cancel All
        </button>
      )}
    </div>
  );
};

export default OpenOrders;
