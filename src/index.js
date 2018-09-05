/**
 * Created by lzq on 2018/9/3.
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router/snapshot');

const app = new Koa();

app.use(bodyParser({
  enableTypes:['json', 'form', 'text']
}));

app.use(router.routes());

app.listen(3000);
console.log('listening port is 3000');

