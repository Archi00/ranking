const apiKey = process.env.ETHERSCAN_API_KEY;

async function showTxs(address) {
  const internalTx = ```https://api.etherscan.io/api
   ?module=account
   &action=txlistinternal
   &address=${address}
   &startblock=0
   &endblock=2702578
   &page=1
   &offset=10
   &sort=asc
   &apikey=${apiKey}```;
  
  const normalTx = ```https://api.etherscan.io/api
   ?module=account
   &action=txlist
   &address=${address}
   &startblock=0
   &endblock=99999999
   &page=1
   &offset=10
   &sort=asc
   &apikey=${apiKey}```;
  
  await fetch(normalTx)
    .then(async response => {
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
    })
    .catch(error => {
      console.error("There was an error!", error);
    });
}

export default showTxs;