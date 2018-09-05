/**
 * Created by lzq on 2018/9/3.
 */
const Router = require('koa-router');
const phantom = require('phantom');

let router = new Router();

// post请求
router.post('/snapshot', async function(ctx, next){

  let bodyParams = ctx.request.body;

  console.log(bodyParams.viewPort)

  /*
  * @param <Number> width
  * @param <Number> height
  * viewPortSize 打开的模版的视口
  * */
  const viewPortSize = {
    width: parseInt(bodyParams.viewPort.w || 0) ,
    height: parseInt(bodyParams.viewPort.h || 0)
  };

  /*
  * 矩形区域
  * */
  const clipRect = {
    top: parseInt(bodyParams.clipRect.top),
    left: parseInt(bodyParams.clipRect.left),
    width: parseInt(bodyParams.clipRect.width),
    height: parseInt(bodyParams.clipRect.height)

  };

  // 这里之后会改为两个渠道：1.支持外部直接传渲染好的模版字符串（html字符串）；2.支持使用本地模版，提供模版编号id 这部分涉及到template
  let templateStr = bodyParams.htmlStr.toString(); // 强制转为字符串；

  const instance = await phantom.create();
  const page = await instance.createPage();

  page.property('viewportSize', viewPortSize); //设置viewport

  



  await instance.exit(); // 退出phantom


});





module.exports = router;