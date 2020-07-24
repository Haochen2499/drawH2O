import axios from "axios";
import { Message } from "view-design";

const interceptCode = [
  100000 // 表单验证类错误
];
axios.interceptors.response.use(response => {
  if (response.data.error_code !== 0) {
    if (interceptCode.indexOf(response.data.error_code) !== -1) {
      return response;
    }
    if (response.data.error_msg) {
      Message.error(response.data.error_msg);
    }
  }
  return response;
});

export default {
  get(url, params, headers) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params, headers })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },
  post(url, params, headers) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params, { headers })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }
};
