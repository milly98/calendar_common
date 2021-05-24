const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

// express 인스턴스 생성
const app = express();

//
app.get('/getRestDeInfo', function(req, res) {
  const params = `serviceKey=b%2Bs0OmI7q0%2B5rtcOg9cPQ8NlFZ0eWbdVKEJdA1riLNYJ3M7y%2Brmyxe5jHfCWC8NR4CzemZvBZ%2B2EALje81R85A%3D%3D&solYear=${req.query.year}&solMonth=${req.query.date}`
  axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?${params}`,{}
   ).then((resp) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.send(resp.data.response.body);
  }).catch((e) => {
    if (e.response) {
      res.status(e.response.status).send(e.response.data);
    } else {
      res.status(500).send(e);
    }
  });
});

// 모듈로 사용할 수 있도록 export
// 앱의 /api/* 라우트로 접근하는 모든 요청은 모두 app 인스턴스에게 전달된다.
module.exports = {
  path: '/api',
  handler: app,
}
