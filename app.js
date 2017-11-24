const express = require('express');

const app = express();

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});

app.get('/test',function (req,res){
    res.jsonp({
        serverIP: '127.0.0.1',
        name:'乘风',
        github:'https://github.com/Faithree',
        sex:'男',
        examTime:'2017-04-13',
        province:'广东',
        city:'广州',
        country:'中国',
        age:22,
    })
})

//在端口3000监听
var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})