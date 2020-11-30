import axios from './http'
import qs from 'qs'


//获取区块列表
var getBlockList = function(data){
  return axios.get('/api/get_block_list?per_page='+data.per_page+'&page='+data.page)
}

//获取事务列表
var getTransactionList = function(data){
  return axios.get('/api/get_transaction_list?per_page='+data.per_page+'&page='+data.page)
}

//获取交易hash详情
var getTransactionByTxHash = function(data){
  return axios.get('/api/get_transaction_by_hash?tx_hash='+data.hash)
}

//获取from交易地址详情
var getTransactionByFrom = function(data){
  return axios.get('/api/get_transaction_by_from?from='+data.from+'&per_page='+data.per_page+'&page='+data.page)
}

//获取to交易地址详情
var getTransactionByTo = function(data){
  return axios.get('/api/get_transaction_by_to?to='+data.to+'&per_page='+data.per_page+'&page='+data.page)
}

//区块高度获取区块详情
var getBlockByHeight = function(data){
  return axios.get('/api/get_block_by_height?height='+data.height)
}

//区块hash获取区块详情
var getBlockByHash = function(data){
  return axios.get('/api/get_block_by_hash?block_hash='+data.blockHash)
}

//获取合约事务列表
var getContractList = function(data){
  return axios.get('/api/get_contract_list?per_page='+data.per_page+'&page='+data.page)
}

//获取合约事务详情
var getContractByHash = function(data){
  return axios.get('/api/get_contract_by_hash?hash='+data.hash)
}

//地址获取合约事务列表
var getCallContractList = function(data){
  return axios.get('/api/get_call_contract_list?address='+data.address+'&per_page='+data.per_page+'&page='+data.page)
}

//地址获取合约ABI
var getABIByAddress = function(data){
  return axios.get('/api/get_abi_by_address?address='+data.address)
}

//地址获取binary
var getPayloadByAddress = function(data){
  return axios.get('/api/get_payload_by_address?address='+data.address)
}

//地址获取智能合约源代码
var getCodeByAddress = function(data){
  return axios.get('/api/get_code_by_address?address='+data.address)
}

//获取节点参数
var getRpcStat = function(data){
  return axios.get('/api/stat')
}

//上传合约
var uploadContractCode = function(data) {
  return axios.post('/api/upload_contract_code',data,{headers: {'Content-Type': 'application/json'}})
}

//根据地址获取事务列表
var getTransactionListByAddress= function(data) {
  return axios.get('/api/get_transaction_list_by_address?address='+data.address+'&per_page='+data.per_page+'&page='+data.page)
}

//根据事务池大小
var getTransactionSize= function() {
  return axios.get('/api/pool')
}

//地址获取nonce和余额
var getNonceAndBalance= function(address) {
  return axios.get('/api/account/'+address)
}



export{
  getBlockList,getTransactionList,getTransactionByTxHash,getTransactionByFrom,getTransactionByTo,getBlockByHeight,getContractList,
  getContractByHash,getCallContractList,getABIByAddress,getPayloadByAddress,getCodeByAddress,getBlockByHash,getRpcStat,uploadContractCode,
  getTransactionListByAddress,getTransactionSize,getNonceAndBalance
}

function getJson (data) {
  return qs.stringify(data)
}
