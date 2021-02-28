const mongoose = require("mongoose");

const schema = mongoose.Schema;
const ReferansSchema = new schema({

referans:{type:String,required:true},
});

const Referans = mongoose.model("Referans", ReferansSchema);

module.exports = Referans;