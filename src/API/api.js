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

export{
  getBlockList,getTransactionList,getTransactionByTxHash,getTransactionByFrom,getTransactionByTo
}

function getJson (data) {
  return qs.stringify(data)
}
