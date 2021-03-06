import { useState, useEffect } from "react";
import Cards from "./Home/Cards";
const Web3 = require("web3");

function ConnectedWallet() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [instruction, setInstruction] = useState(
    "Waiting for connection with wallet..."
  );

  useEffect(() => {
    const connectWallet = async () => {
      if (!window.ethereum) return;

      try {
        await window.ethereum.send("eth_requestAccounts");
        window.Web3 = new Web3(window.ethereum);
      } catch (error) {
        setInstruction(
          "Wallet connection denied, reload the page to try again."
        );
        return;
      }

      setInstruction("");
      setWalletConnected(true);
    };
    connectWallet();
  }, []);

  return (
    <div>
      {window.ethereum ? (
        walletConnected ? (
          <Cards />
        ) : (
          instruction
        )
      ) : (
        "Metamask or any other compatible wallet not found."
      )}
    </div>
  );
}

export default ConnectedWallet;
