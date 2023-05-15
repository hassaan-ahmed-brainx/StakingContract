import Web3 from "web3";
import ContractAbi from "../abi.json";

export const provider = window.ethereum;
export const contractAddress = '0x6F4Bcc3fb95B5b3AaF766ae6CdbA7DC15c1FE7BD';
export const web3 = new Web3(provider);
export const myContract = new web3.eth.Contract(
    ContractAbi,
    contractAddress
  );