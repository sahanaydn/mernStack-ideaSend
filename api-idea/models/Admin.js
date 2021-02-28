const mongoose = require("mongoose");

const schema = mongoose.Schema;
const AdminSchema = new schema({
username :{type:String,required:true},
password:{type:String,required:true},
referans:{type:String,required:true},
});

const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;
