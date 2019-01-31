"use strict"
const express = require('express');
let Blockchain = require("../Blockchain/BlockChain");
let blockChainModel = require("../database/model");
let api = express.Router();
let blockchain = new Blockchain();
let bodyParser = require("body-parser");
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

api.post('/newTransaction',function (req, res, next){
    var sender = req.body.sender;
    var recipient = req.body.recipient;
    var amount = req.body.amount;
    blockchain.addNewTransactions(sender, recipient, amount);
    res.json(
        {
            message: `Transaction is added to block`
        }
    );
});
api.get('/blockchain', function(req, res, next){
    blockChainModel.find({}, (err, blocks) => {
        if(err) return res.status(500).send({ message: `Error making the request: ${err}`})
        if(!blocks) return res.status(404).send({ message: 'In db not exist blocks'})
        res.send(200, {blocks})
    });
});

api.get('/mine',function (req, res, next){
   let newblock = blockchain.addNewBlock(null, null);
    res.json(
        {
            message: `Blockchain added`,
            newblock
        }
    );
});

module.exports = api