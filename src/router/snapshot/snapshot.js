/**
 * Created by lzq on 2018/9/3.
 */

const phantom = require('phantom');
const path = require('path');
const { pageErrorHandler } = require('../../common/error')

/*
* post请求
* htmlStr <string>  如果不传，则直接走存储在本地的模版
* */

module.exports = async function (ctx, next){
	const TIMEOUT = 3000; //超时
	let bodyParams = ctx.request.body;
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
		top: parseInt(bodyParams.clipRect.top || 0),
		left: parseInt(bodyParams.clipRect.left || 0),
		width: parseInt(bodyParams.clipRect.width || 1000),
		height: parseInt(bodyParams.clipRect.height || 1000)
	};

	// 这里之后会改为两个渠道：1.支持外部直接传渲染好的模版字符串（html字符串）；2.支持使用本地模版，提供模版编号id 这部分涉及到template
	let templateStr = bodyParams.htmlStr.toString(); // 强制转为字符串；
	const instance = await phantom.create();
	const page = await instance.createPage();

	pageErrorHandler(page);

	page.property('viewportSize', viewPortSize); //设置viewport
	page.property('clipRect',clipRect);

	/*
	* ctx.render 是art-template挂载的方法
	* render(param1, param2)  param1 模版名称  param2 渲染的数据
	* */
	const img = 'https://static.paixin.com/paixin-vision/static/img/98.71bf8d1.jpg';
	try{
		const content = ctx.render('test', { title: '9dfodfodufoidfoifofoidfiodoiduof',imgUrl: img});
		// setContent 接受两个参数，第一个参数是一个content, 为打开网页的代码字符串；
		// 第二个参数为这个打开的网页设置url（可以任意定）
		await page.setContent(content, './123.html'); // 这里是一个异步的过程，需要等待page将content的内容展开
		const targetPath = path.join(__dirname, `../../img/home${new Date().valueOf()}.png`);
		let loadFinishedPromise = new Promise(function(resolve, reject){
			const timer = setTimeout(function(){
				console.log('phantom 处理超时！！');
				ctx.status = 500;
				reject()
			}, TIMEOUT);

			page.on('onLoadFinished', async function(){
				console.log('页面加载完毕！！');
				clearTimeout(timer);
				resolve()
			});
		});

		await loadFinishedPromise;
		const status = await page.render(targetPath, {format: 'png', quality: '10'});
		if(status) console.log(`result img path is ${targetPath}`);

	}catch(e){
		console.log(e)
	}
	await instance.exit(); // 退出phantom
	await next();
};