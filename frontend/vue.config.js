module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTION"
        },
        port: 80,
        overlay: {
            warning: true,
	        error: true
        }
    }
}
