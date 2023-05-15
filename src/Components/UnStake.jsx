import { useState } from "react";
import "../style.css";
import * as Constants from "../Constants/constants.js";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Link } from "react-router-dom";

const UnStake = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const [stakeID, setstakeID] = useState("");
  const handleChangestakeID = (event) => {
    setstakeID(event.target.value);
  };

  const handleStakeWithdrawal = async (e) => {
    e.preventDefault();
    await Constants.myContract.methods
      .unstake(stakeID)
      .send({ from: window.ethereum.selectedAddress });
    setstakeID("");
  };

  return (
    <form action="">
      <div className="stake-form" onSubmit={handleStakeWithdrawal}>
        <header className="header-stake">
          Enter your Stake ID in order to Unstake
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
              Stake ID:
              <input
                className="stake-input1"
                type="text"
                name="stakeID"
                onChange={handleChangestakeID}
                value={stakeID}
                required
              />
            </label>
          </div>
        </div>
        <button className="stake-button" type="submit">
          UnStake
        </button>
      </div>
    </form>
  );
};

export default UnStake;
