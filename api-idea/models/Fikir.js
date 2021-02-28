const mongoose = require("mongoose");

const schema = mongoose.Schema;
const FikirSchema = new schema({
  tamIsım: {type:String,required:true},
  emailAdres: {type:String,required:true},
  fikirTuru:  {type:String,required:true},
  fikir:  {type:String,required:true},
});

const Fikir = mongoose.model("Fikir", FikirSchema);

module.exports = Fikir;
