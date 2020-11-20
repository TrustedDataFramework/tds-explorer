import axios from './http'
import qs from 'qs'

//获取区块列表
var getBlockList = function(data){
  return axios.get('/get_block_list?per_page='+data.per_page+'&page='+data.page)
}

//获取交易列表
var getTransactionList = function(data){
  return axios.get('/get_transaction_list?per_page='+data.per_page+'&page='+data.page)
}

//获取交易hash详情
var getTransactionByTxHash = function(data){
  return axios.get('/get_transaction_by_hash?tx_hash='+data.tx_hash)
}

//获取from交易地址详情
var getTransactionByFrom = function(data){
  return axios.get('/get_transaction_by_from?from='+data.from+'&per_page='+data.per_page+'&page='+data.page)
}

//获取to交易地址详情
var getTransactionByTo = function(data){
  return axios.get('/get_transaction_by_to?to='+data.to+'&per_page='+data.per_page+'&page='+data.page)
}

//区块高度获取区块详情
var getBlockByHeight = function(data){
  return axios.get('/get_block_by_height?height='+data.height)
}

//区块hash获取区块详情
var getBlockByHash = function(data){
  return axios.get('/get_block_by_hash?block_hash='+data.blockHash)
}

//获取合约事务列表
var getContractList = function(data){
  return axios.get('/get_contract_list?per_page='+data.per_page+'&page='+data.page)
}

//获取合约事务详情
var getContractByHash = function(data){
  return axios.get('/get_contract_by_hash?hash='+data.hash)
}

//地址获取合约事务列表
var getCallContractList = function(data){
  return axios.get('/get_call_contract_list?address='+data.address+'&per_page='+data.per_page+'&page='+data.page)
}

//地址获取合约ABI
var getABIByAddress = function(data){
  return axios.get('/get_abi_by_address?address='+data.address)
}

//地址获取binary
var getBinaryByAddress = function(data){
  return axios.get('/get_binary_by_address?address='+data.address)
}

//地址获取智能合约源代码
var getCodeByAddress = function(data){
  return axios.get('/get_code_by_address?address='+data.address)
}


export{
  getBlockList,getTransactionList,getTransactionByTxHash,getTransactionByFrom,getTransactionByTo,getBlockByHeight,getContractList,
  getContractByHash,getCallContractList,getABIByAddress,getBinaryByAddress,getCodeByAddress,getBlockByHash
}

function getJson (data) {
  return qs.stringify(data)
}
