import { Input, Button, Spin, Image } from "antd";
import ABI from "../store/ABI.json";
import ethTokens from "../store/ethTokens.json";
import { useState } from "react";
import Web3 from "web3";

function Home({ provider }) {
  const [wallet, setWallet] = useState();
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(false);

  const Web3Client = new Web3(new Web3.providers.HttpProvider(provider.connection.url));

  async function getBalance(walletAddress) {
    let temp = [];
    ethTokens.tokens.map(async ({ symbol, address, logoURI }) => {
      try {
        const contract = new Web3Client.eth.Contract(ABI, address);
        const result = await contract.methods.balanceOf(walletAddress).call();
        const format = Web3Client.utils.fromWei(result);
        if (format > 0) temp.push({ symbol: symbol, logo: logoURI, balance: format, address });
      } catch {
        e => console.error(e);
      }
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
  }

  return (
    <div style={{ margin: 32 }}>
      <div style={{ margin: 32 }}>
        <Input style={{ textAlign: "center" }} onChange={e => setWallet(e.target.value)} />
        {wallet ? (
          <div style={{ margin: 8 }}>
            <Button
              onClick={async () => {
                setLoading(true);
                await getBalance(wallet);
                setTimeout(() => setLoading(false), 3000);
                setWallet();
              }}
            >
              Search Balance
            </Button>
          </div>
        ) : null}
        {loading ? (
          <div style={{ margin: 32 }}>
            <Spin />
          </div>
        ) : null}
        {balance
          ? balance.map(({ logo, symbol, balance, address }) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  margin: "auto",
                  width: "25%",
                }}
                key={address}
              >
                <span style={{ margin: 8, flexgrow: 1, textAlign: "center" }}>
                  <Image style={{ margin: 8, borderRadius: 16 }} src={logo} alt={symbol} height={32} width={32} />
                </span>
                <span style={{ margin: 8, textAlign: "center", flexGrow: 1, alignSelf: "" }}>{symbol}</span>
                <span style={{ margin: 8, textAlign: "center", flexGrow: 5 }}>{balance}</span>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Home;
