const mongoose=require('mongoose');

module.exports.connection = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/post_blog');
        console.log("database connection success");
    } catch (error) {
        console.log("connection failed");
    }
}