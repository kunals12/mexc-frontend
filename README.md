# ReactJS Project

This is a simple ReactJS project with components for managing account information, open orders, and an order book. The project allows users to place orders with various options.

## Project Structure

Certainly! Here is a basic README.md file for your ReactJS project based on the documentation provided:

markdown

# ReactJS Project

This is a simple ReactJS project with components for managing account information, open orders, and an order book. The project allows users to place orders with various options.

## Project Structure

```
├── node_modules
├── public
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── components
│   │   ├── AccountInfo
│   │   │   ├── AccountInfo.css
│   │   │   ├── AccountInfo.js
│   │   ├── OpenOrders
│   │   │   ├── OpenOrders.css
│   │   │   ├── OpenOrders.js
│   │   ├── OrderBook
│   │   │   ├── OrderBook.css
│   │   │   ├── OrderBook.js
│   │   ├── PlaceOrder
│   │   │   ├── PlaceOrder.css
│   │   │   ├── PlaceOrder.js
|   |   ├── fetch.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Component Descriptions

1. **AccountInfo:**

   - Displays account information such as account type and balances.
   - Fetches data using the `getAccountInfo` API endpoint.
   - Styles are defined in `AccountInfo.css`.

2. **OpenOrders:**

   - Shows a list of open orders.
   - Fetches data using the `getCurrentOpenOrder` API endpoint.
   - Styles are defined in `OpenOrders.css`.

3. **OrderBook:**

   - Displays the order book with live orders using socket.io.
   - Fetches data using the `getDepth` API endpoint.
   - Styles are defined in `OrderBook.css`.

4. **PlaceOrderButton:**

   - Allows users to place orders with options like selecting a coin, order type, price, and quantity.
   - Fetches data using the `testOrder` API endpoint.
   - Styles are defined in `PlaceOrderButton.css`.

5. **fetch.js:**
   - Contains utility functions for making API requests using Axios.
   - Includes functions like `getAccountInfo`, `getDepth`, `getCurrentOpenOrder`, `getCurrentAveragePrice`, and `testOrder`.

## Data Flow

1. **App.js:**

   - The main component that serves as a container for other components.
   - Manages the `selectedCoin` state and passes it down to `PlaceOrderButton` and `OrderBook` components.

2. **PlaceOrderButton.js:**

   - Allows users to place orders with options.
   - Receives the `selectedCoin` and `onCoinSelect` prop from `App.js`.
   - Fetches account data and allows users to place orders.
   - Notifies the parent component (`App.js`) of the selected coin using the `onCoinSelect` prop.

3. **OrderBook.js:**
   - Displays live orders in the order book.
   - Receives the `selectedCoin` prop from `App.js`.
   - Fetches account data and order book data for the selected coin.

## Running the Project

1. Ensure you have Node.js installed.

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start dev
   ```

4. Open your browser and navigate to http://localhost:3000 to view the application.
