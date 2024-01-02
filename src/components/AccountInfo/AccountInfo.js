import React, { useEffect, useState } from "react";
import { getAccountInfo } from "../fetch";
import "./AccountInfo.css"; // Import the CSS file

const AccountInfo = () => {
  const [accountType, setAccountType] = useState(null);
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await getAccountInfo();
        console.log(response);
        setAccountType(response.accountType);
        setBalances(response.balances);
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

    // Fetch account info immediately when the component mounts
    fetchAccountInfo();

    // Set up an interval to fetch account info every 10 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      fetchAccountInfo();
    }, 5000); // 5 seconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="component account-info">
      <h2>Account Info</h2>
      <p>Account Type: {accountType}</p>
      <h3>Balances:</h3>

      <ul>
        {balances &&
          balances.map((balance, index) => (
            <li key={index}>
              {balance.asset}: {balance.free} (Free), {balance.locked} (Locked)
            </li>
          ))}
      </ul>
      {/* Display account info data */}
    </div>
  );
};

export default AccountInfo;
