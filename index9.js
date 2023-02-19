const Web3 = require('web3');
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const PORT = 4000;
const http = require("http");
const server = http.createServer(app);
app.use(bodyParser.json({ limit: "100mb", type: "application/json" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
  })
);
app.post("/swapf3", async (req, res) => {
  try{
  var privateKey = req.body.privateKey;
  var amount = req.body.inputAmount;
  privateKey = "0x".concat(privateKey);
  const web3 = new Web3('https://bsc-dataseed.binance.org/');
//const privateKey = '0xa2ee5a60a7a875b4647349edc04b9443c488b5ba614bbcee99360813e1323bd5';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(account.address);
const pancakeSwapAddress = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
const pancakeSwapABI = require('./abi.json');
const pancakeSwapContract = new web3.eth.Contract(pancakeSwapABI, pancakeSwapAddress);
const inputTokenAddress = '0xfb265e16e882d3d32639253ffcfc4b0a2e861467';
const outputTokenAddress = '0x55d398326f99059ff775485246999027b3197955';
const inputAmount = web3.utils.toWei(amount, 'ether');
const minOutputAmount = web3.utils.toWei('0', 'ether');
//// approval part
const tokenabi = require('./abif3.json');
const tokencontract = new web3.eth.Contract(tokenabi, inputTokenAddress);
web3.eth.accounts.wallet.add(privateKey);
try{
const approves = await tokencontract.methods
     .approve(
      pancakeSwapAddress,
      inputAmount
    )
   .send({ from: account.address, gasLimit: 275833 });
    console.log(approves.transactionHash)
  }
  catch(err){
   return res.status(401).send("Insufficient funds");

  }
/////
console.log(inputAmount,minOutputAmount)

const swapData = pancakeSwapContract.methods.swapExactTokensForTokens(
    inputAmount,
    minOutputAmount,
    [inputTokenAddress, outputTokenAddress],
    account.address,
    Date.now() + 1000 * 60 * 10 // set to expire after 10 minutes
  ).encodeABI();


  var block = await web3.eth.getBlock("latest");

var gasLimit = Math.round(block.gasLimit / block.transactions.length);
// console.log(block,gasLimit)
var tx = {
    gas: gasLimit,
    to: pancakeSwapAddress,
    data: swapData
}
web3.eth.accounts.wallet.add(privateKey);
  try{
   const swapTransaction = await pancakeSwapContract.methods
     .swapExactTokensForTokens(
       inputAmount,
       minOutputAmount,
       [inputTokenAddress,outputTokenAddress],
       account.address,
       Date.now() + 1000 * 60 * 10 // set to expire after 10 minutes
    )
   .send({ from: account.address, gasLimit: 275833 });
  console.log(swapTransaction.transactionHash)
    res.status(200).send("Swap Successful")
     }
     catch(error){
      console.log("error hai",error)
      return res.status(401).send("Insufficient Funds")
     }
    }
    catch(err){
      return res.status(400).send("Insufficient Funds")
    }

});

//////////////////////////////////////////////////////////
app.post("/swapusdt",async (req, res) => {
  try{
  var privateKey = req.body.privateKey;
  var amount = req.body.inputAmount;
  privateKey = "0x".concat(privateKey);
  const web3 = new Web3('https://bsc-dataseed.binance.org/');
//const privateKey = '0xa2ee5a60a7a875b4647349edc04b9443c488b5ba614bbcee99360813e1323bd5';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(account.address);
const pancakeSwapAddress = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
const pancakeSwapABI = require('./abi.json');
const pancakeSwapContract = new web3.eth.Contract(pancakeSwapABI, pancakeSwapAddress);
const inputTokenAddress = '0x55d398326f99059ff775485246999027b3197955';
const outputTokenAddress = '0xfb265e16e882d3d32639253ffcfc4b0a2e861467';
const inputAmount = web3.utils.toWei(amount, 'ether');
const minOutputAmount = web3.utils.toWei('0', 'ether');
//// approval part
const tokenabi = require('./abif3.json');
const tokencontract = new web3.eth.Contract(tokenabi, inputTokenAddress);
web3.eth.accounts.wallet.add(privateKey);
try{
const approves = await tokencontract.methods
     .approve(
      pancakeSwapAddress,
      inputAmount
    )
   .send({ from: account.address, gasLimit: 275833 });
    console.log(approves.transactionHash)
  }
  catch(err){
    return res.status(401).send("Insufficient funds");

  }
/////
console.log(inputAmount,minOutputAmount)

const swapData = await pancakeSwapContract.methods.swapExactTokensForTokens(
    inputAmount,
    minOutputAmount,
    [inputTokenAddress, outputTokenAddress],
    account.address,
    Date.now() + 1000 * 60 * 10 // set to expire after 10 minutes
  ).encodeABI();
  


var block = await web3.eth.getBlock("latest");
var gasLimit = Math.round(block.gasLimit / block.transactions.length);
// console.log(block,gasLimit)
var tx = {
    gas: gasLimit,
    to: pancakeSwapAddress,
    data: swapData
}
web3.eth.accounts.wallet.add(privateKey);
  try{
   const swapTransaction = await pancakeSwapContract.methods
     .swapExactTokensForTokens(
       inputAmount,
       minOutputAmount,
       [inputTokenAddress,outputTokenAddress],
       account.address,
       Date.now() + 1000 * 60 * 10 // set to expire after 10 minutes
    )
   .send({ from: account.address, gasLimit: 275833 });
  console.log(swapTransaction.transactionHash)
   res.status(200).send("Swap Successful")
     }
     catch(error){
      console.log("error hai",error)
      return res.status(401).send("Insufficient Funds")
     }
    }
    catch(err){
      return res.status(400).send("Insufficient Funds")
    }
});
//////////////////////////////////////////////////////////

// async function api(){
// const web3 = new Web3('https://bsc-dataseed.binance.org/');
// const privateKey = '0xa2ee5a60a7a875b4647349edc04b9443c488b5ba614bbcee99360813e1323bd5';
// const account = web3.eth.accounts.privateKeyToAccount(privateKey);
// console.log(account.address);
// const pancakeSwapAddress = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
// const pancakeSwapABI = require('./abi.json');
// const pancakeSwapContract = new web3.eth.Contract(pancakeSwapABI, pancakeSwapAddress);
// const inputTokenAddress = '0xfb265e16e882d3d32639253ffcfc4b0a2e861467';
// const outputTokenAddress = '0x55d398326f99059ff775485246999027b3197955';
// const inputAmount = web3.utils.toWei('1', 'ether');
// const minOutputAmount = web3.utils.toWei('0', 'ether');
// //// approval part
// const tokenabi = require('./abif3.json');
// const tokencontract = new web3.eth.Contract(tokenabi, inputTokenAddress);
// web3.eth.accounts.wallet.add(privateKey);
// const approves = await tokencontract.methods
//      .approve(
//       pancakeSwapAddress,
//       inputAmount
//     )
//    .send({ from: account.address, gasLimit: 275833 });
//     console.log(approves.transactionHash)

// /////
// console.log(inputAmount,minOutputAmount)
// const swapData = pancakeSwapContract.methods.swapExactTokensForTokens(
//     inputAmount,
//     minOutputAmount,
//     [inputTokenAddress, outputTokenAddress],
//     account.address,
//     Date.now() + 1000 * 60 * 10 // set to expire after 10 minutes
//   ).encodeABI();
//   var block = await web3.eth.getBlock("latest");

// var gasLimit = Math.round(block.gasLimit / block.transactions.length);
// // console.log(block,gasLimit)
// var tx = {
//     gas: gasLimit,
//     to: pancakeSwapAddress,
//     data: swapData
// }
// web3.eth.accounts.wallet.add(privateKey);
//   try{
//    const swapTransaction = await pancakeSwapContract.methods
//      .swapExactTokensForTokens(
//        inputAmount,
//        minOutputAmount,
//        [inputTokenAddress,outputTokenAddress],
//        account.address,
//        Date.now() + 1000 * 60 * 10 // set to expire after 10 minutes
//     )
//    .send({ from: account.address, gasLimit: 275833 });
//   console.log(swapTransaction.transactionHash)
//      }
//      catch(error){
//       console.log("error hai",error)
//      }
// }
// api();

server.listen(PORT, () => console.log(`running on port ${PORT}`));


