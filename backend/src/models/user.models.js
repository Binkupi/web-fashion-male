exports.User = function(mongoose) {
    // Creating Product Schema
    const Schema = mongoose.Schema;
    const userSchema = new Schema({
        id_User:String,
        // name: String,
        username:String,
        address:String,
        email:String,
        phone: Number,
        password:String,
        isAdmin: Boolean,
        confirmedToken: String,
        // isMale: Boolean
    })

    // Creating User Model
    const User = mongoose.model('User', userSchema);

    return User;
}


