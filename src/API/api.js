import axios from './http'
import qs from 'qs'

//获取区块列表
var getBlockList = function(data){
  return axios.get('/get_block_list?per_page='+data.per_page+'&page='+data.page)
}

export{
  getBlockList
}

function getJson (data) {
  return qs.stringify(data)
}
