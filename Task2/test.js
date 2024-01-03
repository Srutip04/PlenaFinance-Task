const Web3 = require('web3');

const aaveContractAddress = '';
const erc20TokenAddress = '';
const privateKey = '';

const web3 = new Web3(window.ethereum);

// Connect to MetaMask
window.ethereum.enable().then(accounts => {
  const userAddress = accounts[0];

  // Aave contract ABI 
  const aaveContractAbi = [...]; // Replace with the actual ABI

  const aaveContract = new web3.eth.Contract(aaveContractAbi, aaveContractAddress);

  // ERC20 contract ABI 
  const erc20ContractAbi = [...]; // Replace with the actual ABI

  const erc20Contract = new web3.eth.Contract(erc20ContractAbi, erc20TokenAddress);

  // Deposit function in Aave contract
  const depositFunction = aaveContract.methods.deposit(erc20TokenAddress, 100); // Replace 100 with the amount you want to deposit

  // Encode ABI data
  const data = depositFunction.encodeABI();

  
  const transactionObject = {
    from: userAddress,
    to: aaveContractAddress,
    gas: 200000, // adjust gas limit 
    gasPrice: web3.utils.toWei('30', 'gwei'), // adjust gas price 
    data: data,
  };

  // Sign the transaction
  web3.eth.accounts.signTransaction(transactionObject, privateKey)
    .then(signedTransaction => {
      // Send the signed transaction
      web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
        .on('transactionHash', (hash) => {
          console.log(`Transaction Hash: ${hash}`);
        })
        .on('receipt', (receipt) => {
          console.log('Transaction Receipt:', receipt);
        })
        .on('error', (error) => {
          console.error('Transaction Error:', error);
        });
    })
    .catch(error => {
      console.error('Error signing transaction:', error);
    });
});
