import { Input, Button, Spin, Image } from "antd";
import ABI from "../store/ABI.json";
import NFTABI from "../store/NFTABI.json";
import ethTokens from "../store/ethTokens.json";
import { useState } from "react";
import Web3 from "web3";
import axios from "axios";
import { useEffect } from "react";

function Home({ provider, localAddress, setAccountData }) {
  const [wallet, setWallet] = useState();
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(false);
  const [NFTs, setNFTs] = useState();
  let [count, setCount] = useState(1);

  const apiKey = "XPGA3QNISI6X57VAB88NX4W2F4RVKQK7TP";

  const Web3Client = new Web3(new Web3.providers.HttpProvider(provider.connection.url));

  useEffect(
    () => (NFTs && balance ? (setAccountData({ NFTs: NFTs, Balance: balance }), setLoading(false)) : null),
    [balance, NFTs],
  );

  const getBalance = async walletAddress => {
    let temp = [];
    setBalance();
    setLoading(true);
    ethTokens.tokens.map(async ({ symbol, address, logoURI }) => {
      const contract = new Web3Client.eth.Contract(ABI, address);
      const result = await contract.methods.balanceOf(walletAddress).call();
      const format = Web3Client.utils.fromWei(result);
      if (format > 0) {
        temp.push({ symbol: symbol, logo: logoURI, balance: format, address });
      }
      setCount(count++);
    });
    Web3Client.eth.getBalance(walletAddress, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        const format = Web3Client.utils.fromWei(result);
        if (format > 0) {
          temp.push({
            symbol: "ETH",
            logo: "https://assets.trustwalletapp.com/blockchains/ethereum/info/logo.png",
            balance: format,
            address: "0x0000000000000000000000000000000000000000",
          });
        }
      }
    });
    setBalance(temp);
  };

  const getERC721 = async walletAddress => {
    setWallet();
    await axios
      .get(
        `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${walletAddress}&page=1&offset=10000&startblock=0&endblock=27025780&sort=asc&apikey=${apiKey}`,
      )
      .then(async ({ status, data }) => {
        let toArr = [];
        if (status === 200 && data.result.length > 0) {
          await data.result.map(async ({ contractAddress, to, tokenID, tokenName, tokenSymbol }, id) => {
            if (tokenSymbol != "ENS") {
              const contract = new Web3Client.eth.Contract(NFTABI, contractAddress);
              await contract.methods
                .tokenURI(tokenID)
                .call()
                .then(async uri => {
                  try {
                    await axios.get(uri).then(({ data: { attributes, image } }) =>
                      toArr.push({
                        id,
                        tokenID: tokenID,
                        tokenName: tokenName,
                        tokenSymbol: tokenSymbol,
                        image,
                        attributes: attributes,
                      }),
                    ),
                      setNFTs(toArr);
                    console.log(toArr);
                  } catch {
                    e => console.error(e);
                  }
                });
            } else {
              console.log(data);
            }
          });
        } else {
          console.log("No NFTs");
        }
      })
      .catch(e => console.error(e));
  };

  return (
    <div style={{ margin: 32 }}>
      <div style={{ margin: 32 }}>
        <Input style={{ textAlign: "center" }} onChange={e => setWallet(e.target.value)} />
        {wallet ? (
          <div style={{ margin: 8 }}>
            <Button
              onClick={async () => {
                await getBalance(wallet);
                await getERC721(wallet);
                setLoading(true);
              }}
            >
              Search Balance
            </Button>
          </div>
        ) : null}
        {loading ? <Spin style={{ margin: 16 }} /> : null}
        {localAddress ? (
          <div style={{ position: "fixed", bottom: 0, right: 0, left: 0 }}>
            <h4>Your address is: {localAddress}</h4>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
