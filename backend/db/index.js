const mongoose = require('mongoose');

exports.connect = (app) => {
	const options = {
		useNewUrlParser: true,
		autoIndex: false,
		maxPoolSize: 10,
	}

	const connectWithRetry = () => {
		mongoose.Promise = global.Promise;
		console.log("MongoDb connection with retry");
		mongoose
			.connect(process.env.MONGODB_URI, options)
			.then(() => {
				console.log('MongoDb is connect');
				app.emit("ready");
			})
			.catch(err => {
				console.log("MongoDb connection unsucceful, retry after 2 seconds.", err);
				setTimeout(connectWithRetry, 2000);
			})
	};

	connectWithRetry();
}
