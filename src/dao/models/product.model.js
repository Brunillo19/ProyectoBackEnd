const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	category: { type: String, required: true },
	status: { type: Boolean, default: true,required:true },
	price: { type: Number, required: true },
	code: { type: Number, required: true },
	stock: { type: Number, required: true },
	thumbnails: {required:false}
});

const productModel = mongoose.model('Products', productSchema);

module.exports = productModel;