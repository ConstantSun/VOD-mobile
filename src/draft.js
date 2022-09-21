import axios from "axios";

const res = await axios.post('https://httpbin.org/post', { hello: 'world' }, {
  headers: {
    // 'application/json' is the modern content-type for JSON, but some
    // older servers may use 'text/json'.
    // See: http://bit.ly/text-json
    'content-type': 'text/json'
  }
});

res.data.headers['Content-Type']; 