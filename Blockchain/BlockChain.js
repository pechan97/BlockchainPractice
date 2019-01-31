let hash = require('object-hash');
const TARGET_HASH = hash(1560);
let validator = require('../Blockchain/validator'); 
let mongoose =  require('mongoose');
let blockChainModel = require("../database/model");
let chalk = require('chalk');
class BlockChain{
    constructor(){
    //Crear el chain
    this.chain = [];
    this.curr_transactions = [];
    }
    getLastBlock(callback){
    //GET last block from db
      return blockChainModel.findOne({}, null, {sort: { _id: -1 }, limit: 1}, (err,block) => {
          if(err) return console.error("Cannot find Last Block");
          return callback(block);
      })
    }
    addNewBlock() {
        let block = {
            timestamp: Date.now(),
            transactions: this.curr_transactions,
        };
       
        if(validator.proofOfWork() == TARGET_HASH){
            block.hash = hash(block);
            this.getLastBlock((lastBlock) => {
                if(lastBlock){
                    block.prevHash = lastBlock.hash;
                    block.index = lastBlock.index + 1;
                }
               
                let newBlock = blockChainModel(block);
                newBlock.save((err) => {
                    if(err) return console.log(chalk.red('Cannot save Block to DB ', err.message));
                    console.log(chalk.green('Block Saved on the DB'));
                });
                this.chain.push(block);
               this.curr_transactions = [];
               return block;
            });
        }
    }
    addNewTransactions(sender,recipient, amount){
        this.curr_transactions.push({sender, recipient,amount})
    }
    lastBlock(){
        return this.chain.slice(-1)[0]; 
    }
    isEmpty(){
        return this.chain.length == 0;
    }
}
module.exports = BlockChain;