/**
 * Created by lzq on 2018/9/3.
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router/snapshot');
const artTem = require('koa-art-template');

const app = new Koa();

// 配置 模版
artTem(app, {
  root: path.join(__dirname, 'template'), // template 地址
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});


app.use(bodyParser({
  enableTypes:['json', 'form', 'text']
}));

app.use(router.routes());

app.listen(3000);
console.log('listening port is 3000');

