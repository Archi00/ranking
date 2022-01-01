import { Spin } from "antd";

function Ranking({ users }) {
  users.map(user => console.log(user.data));
  return users ? (
    users.map(({ data: { address, NFTs, balance } }) => (
      <div>
        {address} has {NFTs.length} NFTs, {balance.length - 1} Tokens
      </div>
    ))
  ) : (
    <Spin />
  );
}

export default Ranking;
