import React, { useState } from "react";
import "./App.css";
import AccountInfo from "./components/AccountInfo/AccountInfo";
import OpenOrders from "./components/OpenOrders/OpenOrders";
import OrderBook from "./components/OrderBook/OrderBook";
import PlaceOrderButton from "./components/PlaceOrder/PlaceOrder";

function App() {
  const [selectedCoin, setSelectedCoin] = useState("");
  return (
    <div className="container">
      <AccountInfo />
      <hr />
      <PlaceOrderButton
        selectedCoin={selectedCoin}
        onCoinSelect={(coin) => setSelectedCoin(coin)}
      />
      <hr />
      {selectedCoin ? <OrderBook selectedCoin={selectedCoin} /> : <></>}
      <hr />
      {selectedCoin ? <OpenOrders selectedCoin={selectedCoin} /> : <></>}
    </div>
  );
}

export default App;
