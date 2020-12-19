module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',
    devServer: {
        port: 80,
        overlay: {
            warning: true,
	        error: true
        }
    }
}
