import { Schema, model} from "mongoose";

const currencySchema = new Schema({
   timestamp: Number,
   base: String,
   date: String,
   "UYU": Number 
})

const currencyModel = model("currency", currencySchema);

export default  currencyModel 