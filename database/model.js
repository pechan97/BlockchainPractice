let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let BlockChainSchema = Schema({
  //block index
  index: {
    required: true,
    type: Schema.Types.Number
},
//creation date 
timestamp: {
    required: true,
    type: Schema.Types.Date,
    default: Date.now()
},
//Ongoing transactions 
transactions: {
    required: true,
    type: Schema.Types.Array
},
//prevBlock on the chain hash (not required cause first chain's block has no prevHash)
prevHash: {
    required: false,
    type: Schema.Types.String
},
//Current Block hash (every block should have a unique hash)
hash: {
    required: true,
    type: Schema.Types.String
}
});

module.exports = mongoose.model("BlockChain", BlockChainSchema);    