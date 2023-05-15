import { useState } from "react";
import "../style.css";
import * as Constants from "../Constants/constants.js";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Link } from "react-router-dom";

const WithDrawRewardToken = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const [withdrawAmount, setwithdrawAmount] = useState("");
  const handleChangewithdrawAmount = (event) => {
    setwithdrawAmount(event.target.value);
  };

  const handleRewardWithdrawal = async (e) => {
    e.preventDefault();
    await Constants.myContract.methods
      .withdrawRewardToken(withdrawAmount)
      .send({ from: window.ethereum.selectedAddress });
    setwithdrawAmount("");
  };

  return (
    <form action="">
      <div className="stake-form" onSubmit={handleRewardWithdrawal}>
        <header className="header-stake">
          Enter Amount of Reward Token to Unstake
        </header>
        <div>
          <button className="wallet-button" onClick={() => connect()}>
            Connect Wallet
          </button>
          <div>
            <Link className="menu_link" to="/">
              {" "}
              Main
            </Link>
            <label className="stake-label1">
              Amount:
              <input
                className="stake-input1"
                type="number"
                name="amount"
                min={1}
                onChange={handleChangewithdrawAmount}
                value={withdrawAmount}
                required
              />
            </label>
          </div>
        </div>
        <button className="stake-button" type="submit">
          WithDraw
        </button>
      </div>
    </form>
  );
};

export default WithDrawRewardToken;
