/**
 * Created by lzq on 2018/9/3.
 */
const Router = require('koa-router');
const phantom = require('phantom');

let router = new Router();

// post请求
router.post('/snapshot', async function(ctx, next){

  let bodyParams = ctx.request.body;

  console.log(bodyParams.clipRect)

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

  page.property('clipRect',clipRect);

  // ./template.html
  const status = await page.open('https://www.baidu.com'); // 该步骤会将文件的内容转为代码字符串

  const content = '<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"> <title>template</title> </head> <body style="background-color:red;"> <div>iodfiodfoidfoufoidiufoidifiodio</div> </body> </html>';  // 获取page

  // setContent 接受两个参数，第一个参数是一个content, 为打开网页的代码字符串；
  // 第二个参数为这个打开的网页设置url（可以任意定）
  page.setContent(content, 'https://123');

  page.render('./src/img/google_home.jpeg', {format: 'jpeg', quality: '100'})

  console.log(status)

  if(status === 'success'){

  }

  await instance.exit(); // 退出phantom


});


module.exports = router;