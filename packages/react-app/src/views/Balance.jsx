import { Image } from "antd";

function Balance({ accountData: { Balance } }) {
  console.log(Balance);
  return Balance.map(({ logo, symbol, balance, address }) => (
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
  ));
}
export default Balance;
