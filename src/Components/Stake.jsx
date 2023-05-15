import { useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import * as Constants from "../Constants/constants.js";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Stake = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const [tokenAddress, settokenAddress] = useState("");
  const [stakingAmount, setStakingAmount] = useState("");
  const [stakingDuration, setStakingDuration] = useState("");
  const [handleAddStake, setHandleAddStake] = useState(null);

  const handleChangeTokenAddress = (event) => {
    settokenAddress(event.target.value);
  };

  const handleChangeAmount = (event) => {
    setStakingAmount(event.target.value);
  };

  const handleChangeDuration = (event) => {
    setStakingDuration(event.target.value);
  };

  const handleAddStakes = async (e) => {
    e.preventDefault();
    console.log("Reached");
    let id = await Constants.myContract.methods
      .stake(tokenAddress, stakingAmount, stakingDuration)
      .send({ from: window.ethereum.selectedAddress });
    <div>Your id is: {id.events.StakeDeposit.returnValues._id}</div>;
    console.log("id is", id.events.StakeDeposit.returnValues._id);
    settokenAddress("");
    setStakingAmount("");
    setStakingDuration("");
  };

  return (
    <div>
      <div>
        <h1 className="header-stake">Welcome to Staking Site</h1>
      </div>
      <form className="stake-form" onSubmit={handleAddStakes}>
        <Link className="menu_link" to="/UnStake">
          {" "}
          UnStake
        </Link>

        <Link className="menu_link1" to="/WithDrawRewardToken">
          {" "}
          Withdraw Reward Token
        </Link>

        <div>
          <label className="stake-label1">
            Token Address:
            <input
              className="stake-input1"
              type="text"
              name="tokenAddress"
              onChange={handleChangeTokenAddress}
              value={tokenAddress}
              required
            />
          </label>
        </div>

        <div>
          <label className="stake-label2">
            Amount:
            <input
              className="stake-input2"
              type="number"
              name="amount"
              min="5"
              onChange={handleChangeAmount}
              value={stakingAmount}
              required
            />
          </label>
        </div>

        <div>
          <label className="stake-label3">
            Duration (seconds):
            <input
              className="stake-input3"
              type="number"
              name="duration"
              min="2592000"
              onChange={handleChangeDuration}
              value={stakingDuration}
              required
            />
          </label>
        </div>
        <button className="stake-button" type="submit">
          Stake
        </button>
      </form>

      <div>
        <button className="wallet-button" onClick={() => connect()}>
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Stake;
