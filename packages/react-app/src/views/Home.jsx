import React, { useState } from "react";
import { Button, Input } from "antd";
import showTxs from "../scripts/EtherscanData";


function Home({ address, lastBlock }) {
  const [txInfo, setTxInfo] = useState("Press button to search transactions...");
  const [inputAddress, setInputAddress] = useState();
  return (
    <div style={{ margin: 32 }}>
      <div style={{ margin: 32 }}>
        <Input style={{ textAlign: "center" }} onChange={(e) => setInputAddress(e.target.value)} />
        <Button style={{ margin: 8 }}
          onClick={() => {
            setTxInfo(showTxs(inputAddress, "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"));
          }}
        >
          Search Etherscan
        </Button>
      </div>
      <div>{txInfo || "No transactions found"}</div>
    </div>
  );
}

export default Home;
