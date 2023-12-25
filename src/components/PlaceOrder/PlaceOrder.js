// PlaceOrderButton.js

import React, { useEffect, useState } from "react";
import { getCurrentAveragePrice, getExchangeInfo, testOrder } from "../fetch";
import "./PlaceOrder.css";

const PlaceOrderButton = ({ onCoinSelect }) => {
  const [orderResult, setOrderResult] = useState(null);
  const [avgPrice, setAvgPrice] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [price, setPrice] = useState(avgPrice);
  const [quantity, setQuantity] = useState();
  const [coinList, setCoinList] = useState([]);
  const [orderType, setOrderType] = useState([
    "LIMIT",
    "MARKET",
    "STOP_LOSS",
    "STOP_LOSS_LIMIT",
    "TAKE_PROFIT",
    "TAKE_PROFIT_LIMIT",
    "LIMIT_MAKER",
  ]); // 'buy' by default
  const [selectedOrderTypes, setSelectedOrderTypes] = useState(orderType[0]); // Initial state for selected order types
  const [side, setSide] = useState("");

  useEffect(() => {
    const fetchAvgPrice = async () => {
      // if (avgPrice == null) {
      try {
        const price = await getCurrentAveragePrice(selectedCoin);
        console.log(price);
        setAvgPrice(price.price);
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
      // }
    };

    fetchAvgPrice();
  }, [avgPrice, selectedCoin]);

  useEffect(() => {
    const fetchCoinList = async () => {
      if (coinList.length === 0) {
        try {
          const res = await getExchangeInfo();
          console.log(res.symbols);
          setCoinList(res.symbols);
          // console.log("coins", coinList);
        } catch (error) {
          console.error("Error fetching account info:", error);
        }
      }
    };

    fetchCoinList();
  }, [coinList]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      // console.log(selectedCoin, side, price, quantity, selectedOrderTypes);
      const orderData = await testOrder(
        selectedCoin,
        side,
        price,
        quantity,
        selectedOrderTypes
      ); // Assuming `testOrder` takes price and quantity
      setOrderResult(orderData);
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderResult(null);
    }
  };

  const handlePriceChange = (event) => {
    const amount = event.target.value;
    // console.log(amount);
    setPrice(Number(amount));
    const equivalentAmount = amount / avgPrice;
    console.log(equivalentAmount);

    setQuantity(equivalentAmount);
  };

  const handleQuantityChange = (event) => {
    const amount = event.target.value;
    setQuantity(amount);
  };

  return (
    <div className="component place-order-button">
      <h2>Place Order</h2>
      <h4>Current Average Price: {avgPrice}</h4>
      <form onSubmit={handlePlaceOrder}>
        {/* Select Coin */}
        <label>
          Select Coin:
          <select
            value={selectedCoin}
            onChange={(e) => {
              setSelectedCoin(e.target.value);
              onCoinSelect(e.target.value);
            }}
            required
          >
            {coinList.length === 0
              ? "Empty"
              : coinList.map((coin, index) => (
                  <option key={index} value={coin.symbol}>
                    {coin.symbol}
                  </option>
                ))}
          </select>
        </label>

        {/* Order Type */}
        <label>
          Select Type:
          <select
            // defaultValue="LIMIT"
            value={selectedOrderTypes}
            onChange={(e) => {
              setSelectedOrderTypes(e.target.value);
            }}
            required
          >
            {orderType.length === 0
              ? "Empty"
              : orderType.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
          </select>
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            placeholder={avgPrice}
            onChange={handlePriceChange}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            readOnly
            value={quantity}
            onChange={handleQuantityChange}
            required
          />
        </label>
        <div>
          <button
            type="submit"
            className="buy-button"
            onClick={() => {
              setSide("BUY");
              // setOrderType("sell");
            }}
          >
            Buy
          </button>
          <button
            type="submit"
            className="sell-button"
            onClick={() => {
              setSide("SELL");
              // setOrderType("sell");
            }}
          >
            Sell
          </button>
        </div>
      </form>
      {orderResult && (
        <div>
          <h3>Order Result:</h3>
          <p>Status Code: {orderResult.statusCode}</p>
          {/* Display additional order result data as needed */}
        </div>
      )}
    </div>
  );
};

export default PlaceOrderButton;
