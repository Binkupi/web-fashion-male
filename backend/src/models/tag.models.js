exports.Tag = function(mongoose) {
    // Creating Product Schema
    const Schema = mongoose.Schema;
    const tagSchema = new Schema({
        name: String,
        desc: String
    })

    // Creating Tag Model
    const Tag = mongoose.model('Tag', tagSchema);

    return Tag;
}


