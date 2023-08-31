import axios from 'axios';
import { API_DOMAIN } from './../data/config.jsx'

// import { showErrorToast } from './commonFunc'

let token = localStorage.getItem('operator_token');

const apiClient = axios.create({
  baseURL: API_DOMAIN,
  headers: new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json"
  }),
})

export const post = async (url, body, headers, jwt_token = token) => {
  headers = { ...headers,Accept:"application/json", Authorization: `Bearer ${jwt_token}` };
  try {
    const response = await apiClient.post(url, body, { headers });
    console.log("resposne from api", response);
    if (response.status == 200) {
      let meta = {
          current_page:response?.data?.data?.current_page,
          from:response?.data?.data?.from,
          to:response?.data?.data?.to,
          total:response?.data?.data?.total,
          per_page:response?.data?.data?.per_page,
          first_page_url:response?.data?.data?.first_page_url,
          last_page_url:response?.data?.data?.last_page_url,
          next_page_url:response?.data?.data?.next_page_url,
          prev_page_url:response?.data?.data?.prev_page_url,
          path:response?.data?.data?.path,
          last_page:response?.data?.data?.last_page,
          links:response?.data?.data?.links,
      }
      return {
        data: response?.data,
        pagination: meta
      }
    }else{
      console.log(response?.data?.message)
      // response.data.message
    }
  } catch (error) {
    console.log("error", error)
  }
}

export const put = async (url, body, headers = {}, jwt_token = token) => {
  headers = { ...headers, Authorization: `Bearer ${jwt_token}` };
  try {
    return await apiClient.put(url, body, { headers })
  } catch (error) {
    console.log(error)
  }
}


export const del = async (url, headers = {}, jwt_token = token) => {
  headers = { ...headers, Authorization: `Bearer ${jwt_token}` };
  try {
    return await apiClient.post(url, { headers })
  } catch (err) {
    console.log(err)
  }

}