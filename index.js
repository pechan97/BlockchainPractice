"use strict"
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const api = require('./routes/routes');
const passport = require('passport');
let mongoose = require("mongoose");
let config = require("./config");
mongoose.connect(config.db, (err) => {
    if (err)
        return console.log("Cannot connect to DB");
    //Success Message 
    console.log("Database is Connected");
/*Here where we will do the mining and block creation process once we are successfully connected to 
the Database so we would face no problems. */
app.use("/", api);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
    "Access-Control-Allow-Headers":"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    'preflightContinue': false
  }));
app.use(passport.initialize());
app.use(passport.session());
app.listen(config.port, () =>{
console.log(`API REST RUNNING IN ${config.port}`)
});
});