
const Router = require('koa-router');
const router = new Router();
const snapshot = require('./snapshot/snapshot');

// 截图服务
router.post('/snapshot', snapshot);

module.exports = router;