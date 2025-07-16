//公共的请求方法
import axios from 'axios';
import base from './base'

const api = {
    // 获取首页统计数据
    totalInfo() {
        return axios.get(base.totalInfo)
    },
};

export default api;