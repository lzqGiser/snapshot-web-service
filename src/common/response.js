/*
* 处理response请求
* */

// response 模版
module.exports = function response(ctx){
	let temResponse = {
		code:200,
		msg: 'sucess',
		data: {}
	};

	const resState = {

	}

	return function(code, msg, data){

		temResponse.code = code;
		temResponse.msg = msg;
		temResponse.data = data;
		ctx.response = temResponse;
	}
};