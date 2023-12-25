import React, { useEffect, useState } from "react";
import { getAccountInfo } from "../fetch";
import "./AccountInfo.css"; // Import the CSS file

const AccountInfo = () => {
  const [accountType, setAccountType] = useState(null);
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      if (accountType == null) {
        try {
          const response = await getAccountInfo();
          console.log(response);
          setAccountType(response.accountType);
          // console.log(response.balances[0].free);
          setBalances(response.balances);
          // console.log(balances);
        } catch (error) {
          console.error("Error fetching account info:", error);
        }
      }
    };

    fetchAccountInfo();
  }, [accountType, balances]);

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
