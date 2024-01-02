// OrderBook.js
import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { getOrderBook } from "../fetch";
import "./OrderBook.css";

const OrderBook = ({ selectedCoin }) => {
  const [orderBook, setOrderBook] = useState([]);
  const [price, setPrice] = useState([]);
  const [quantity, setQuantity] = useState([]);

  // useEffect(() => {
  //   const socket = socketIOClient("ws://localhost:3001", {
  //     query: {
  //       data: getOrderBook(selectedCoin), // Pass your data as a query parameter
  //     },
  //   });

  //   console.log("Socket connected");

  //   socket.on("orderBookUpdate", (newOrderBook) => {
  //     console.log("Order book update received:", newOrderBook);
  //     setOrderBook(newOrderBook);
  //   });

  //   return () => {
  //     socket.disconnect();
  //     console.log("Socket disconnected");
  //   };
  // }, [selectedCoin]);

  // useEffect(() => {
  //   const fetchAccountInfo = async () => {
  //     try {
  //       const response = await getOrderBook();
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Error fetching account info:", error);
  //     }
  //   };

  //   // Fetch account info immediately when the component mounts
  //   fetchAccountInfo();

  //   // Set up an interval to fetch account info every 10 seconds (adjust as needed)
  //   const intervalId = setInterval(() => {
  //     fetchAccountInfo();
  //   }, 1000); // 5 seconds

  //   // Clean up the interval when the component unmounts
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  useEffect(() => {
    if (price.length === 0) {
      orderBook.map((item, index) => price.push(item.price));
    }
  }, [orderBook, price]);

  useEffect(() => {
    if (quantity.length === 0) {
      orderBook.map((item, index) => quantity.push(item.quantity));
    }
  });

  return (
    <div className="component order-book">
      <h1>Live Order Book for {selectedCoin}</h1>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{price.map((data, index) => data)}</tbody>
      </table>
    </div>
  );
};

export default OrderBook;

{
  /* <tr key={index}>
  <td>{item.price}</td>
  <td>{item.quantity}</td>
</tr>; */
}
