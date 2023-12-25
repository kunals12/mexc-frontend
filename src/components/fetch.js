// fetch.js

import axios from "axios";

const fetchApi = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error for the calling component to handle
  }
};

export const getAccountInfo = async () => {
  return await fetchApi("/info");
};

export const getOrderBook = async (symbol) => {
  console.log("sym", symbol);
  const endpoint = `/depth/${symbol}`;
  return await fetchApi(endpoint);
};

export const getCurrentAveragePrice = async (symbol) => {
  const endpoint = `/price/${symbol}`;
  return await fetchApi(endpoint);
};

export const getOpenOrders = async (symbol) => {
  const endpoint = `/open-orders/${symbol}`;
  return await fetchApi(endpoint);
};

export const getExchangeInfo = async () => {
  return await fetchApi("/exchange");
};

export const testOrder = async (symbol, side, price, quantity, orderType) => {
  // console.log(symbol, side, price, quantity, orderType);
  const params = { symbol, side, price, quantity, orderType };
  const response = await axios.post("/test-order", params);
  console.log("Response:", response);
  return response.data;
};
