module.exports = {
	pageErrorHandler
};

function pageErrorHandler (page){
	page.on('onResourceError', function(resourceError){
		console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
		console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
	})

}