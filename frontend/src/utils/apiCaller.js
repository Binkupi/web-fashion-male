import axios from 'axios'

export default function callApi(endpoint,method='GET',body, config){
    return axios({
        method:method,
        url:`/api/${endpoint}`,
        data:body,
        config: config      
    })
}