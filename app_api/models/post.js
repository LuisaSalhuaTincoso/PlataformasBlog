var mongoose = require( 'mongoose' );

//Post de un usuario
var PostSchema = new mongoose.Schema({
    title: { type: String, reuired: true},
    postBlog: { type : String, required: true },
    date: { type: Date,"default":Date.now  },
    comments: [String],
    author_name: { type: String, required: true }
});

mongoose.model('Post', PostSchema)
