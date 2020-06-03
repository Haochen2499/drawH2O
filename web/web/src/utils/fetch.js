import axios from "axios";

export default {
  get(url, params, headers) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params, headers })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },
  post(url, params, headers) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params, { headers })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },
};
