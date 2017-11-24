const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
var cors = require('koa-cors');

const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(controller());

//在端口3000监听
app.listen(3001);
console.log('app started at port 3001...');