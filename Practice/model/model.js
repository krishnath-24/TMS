var mongoose= require('mongoose');
var userschema = mongoose.Schema(
    {
        Name:String,
        Empid:String,
        Role:String,
        Gender:String,
        Email:String,
        phone:String,
        Password:String,
        marks:{
            "java":String,
            "unix":String
        }
        
    }
);
module.exports= mongoose.model('User',userschema);