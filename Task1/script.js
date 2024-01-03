const Web3 = require('web3');
const TestArtifact = require('./build/contracts/test.sol/Test.json');
const PayloadArtifact = require('./build/contracts/payload.sol/Payload.json');

const testnetRPC = 'https://data-seed-prebsc-1-s1.bnbchain.org:8545/';
//Replace with your addresses
const TestContractAddr = "";
const PayloadContractAddr = "";

const accountAddr = "";
const privKey = "";

const web3 = new Web3(testnetRPC);

const testContract = new web3.eth.Contract(TestArtifact.abi, TestContractAddr);
const payloadContract = new web3.eth.Contract(PayloadArtifact.abi, PayloadContractAddr);

const encodedPayload = payloadContract.methods.transferFunds(accountAddr).encodeABI();
const encodedData = testContract.methods.transferFunds(PayloadContractAddr, encodedPayload).encodeABI();

const transactionObject = {
  from: accountAddr,
  to: TestContractAddr,
  gas: 200000, // set an appropriate gas limit
  gasPrice: web3.utils.toWei('30', 'gwei'), // set an appropriate gas price
  data: encodedData,
};

web3.eth.accounts.signTransaction(transactionObject, privKey)
  .then(signedTransaction => {
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
