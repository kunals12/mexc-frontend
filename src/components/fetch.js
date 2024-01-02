// fetch.js

import axios from "axios";

const fetchApi = async (endpoint) => {
  // console.log("endpoint", endpoint);
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

export const getExchangeInfo = async () => {
  return await fetchApi("/exchange");
};

export const getTokenInfo = async (symbol) => {
  const endpoint = `/exchange/${symbol}`;
  return await fetchApi(endpoint);
};

export const getRecentTrades = async (symbol) => {
  const endpoint = `/trades/recent/${symbol}`;
  return await fetchApi(endpoint);
};

export const getOldTrades = async (symbol) => {
  const endpoint = `/trades/old/${symbol}`;
  return await fetchApi(endpoint);
};

export const getAggregateTrades = async (symbol) => {
  const endpoint = `/trades/aggregate/${symbol}`;
  return await fetchApi(endpoint);
};

export const getKlineData = async (symbol, interval) => {
  const params = { symbol, interval };
  const response = await axios.get("/trades/data/kline", params);
  console.log("Response:", response);
  return response.data;
};

export const getPriceChangeStats = async (symbol) => {
  const endpoint = `/price/stats/${symbol}`;
  return await fetchApi(endpoint);
};

export const getTickerPrice = async (symbol) => {
  const endpoint = `/price/ticker/${symbol}`;
  return await fetchApi(endpoint);
};

export const getOrderBook = async (symbol) => {
  console.log("sym", symbol);
  const endpoint = `/price/depth/${symbol}`;
  return await fetchApi(endpoint);
};

export const getCurrentAveragePrice = async (symbol) => {
  const endpoint = `/price/${symbol}`;
  return await fetchApi(endpoint);
};

export const createOrder = async (
  symbol,
  side,
  price,
  quantity,
  quoteOrderQty,
  orderType
) => {
  console.log({ symbol, side, price, quantity, quoteOrderQty, orderType });
  const params = { symbol, side, price, quantity, quoteOrderQty, orderType };
  const response = await axios.post("/order", params);
  console.log("Response:", response);
  return response.data;
};

export const cancelOrder = async (symbol, orderId) => {
  // console.log(symbol, side, price, quantity, orderType);
  const params = { symbol, orderId };
  const response = await axios.post("/orders/cancel", params);
  return response.data;
};

export const getOpenOrders = async (symbol) => {
  const endpoint = `/orders/open/${symbol}`;
  return await fetchApi(endpoint);
};

export const cancelAllOrdersWithSymbol = async (symbol) => {
  const endpoint = `/orders/cancel/all/${symbol}`;
  const response = await axios.post(endpoint);
  return response.data;
};
