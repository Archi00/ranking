import axios from "axios";

const apiKey = process.env.ETHERSCAN_API_KEY;

function showTxs(address, tokenAddress) {
  axios
    .get(
      `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${address}`
    ,)
    .then(async response => {
      const data = await response;

      if (data.data.status === "0") {
        console.log("0 UNI tokens");
      } else {
        console.log("Transactions found");
        console.log(data)
        return data.data;
      }
    })
    .catch(error => {
      console.error("There was an error!", error);
    });
}

export default showTxs;
