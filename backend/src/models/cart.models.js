
exports.Cart = function(mongoose) {
    // Creating Product Schema
    const Schema = mongoose.Schema;
    const cartSchema = new Schema({
        id_User:String,
        products:Array
    })

    // Creating Cary Model
    const Cart = mongoose.model('Cart', cartSchema);


    return Cart;
}


