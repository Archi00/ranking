import { Image } from "antd";

function NFTs({
  accountData: {
    NFTs: {
      0: { id, tokenID, tokenName, tokenSymbol, image, attributes },
    },
  },
}) {
  return (
    <div style={{ margin: 32 }}>
      <div style={{ margin: 32 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            margin: "auto",
            width: "25%",
          }}
          key={id}
        >
          <span style={{ margin: 8, flexgrow: 1, textAlign: "center" }}>
            <Image style={{ margin: 8 }} src={image} alt={tokenSymbol} height={64} width={64} loading="lazy" />
          </span>
          <span style={{ margin: 8, textAlign: "center", flexGrow: 1, alignSelf: "" }}>{tokenName}</span>
          <span style={{ margin: 8, textAlign: "center", flexGrow: 5 }}>{tokenSymbol}</span>
          <span style={{ margin: 8, textAlign: "center", flexGrow: 1 }}>{tokenID}</span>
        </div>
      </div>
    </div>
  );
}

export default NFTs;
