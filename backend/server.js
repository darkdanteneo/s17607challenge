const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config;

const ur = "mongodb+srv://shubu:shubu@cluster0.sa9wu.mongodb.net/as?retryWrites=true&w=majority";
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(ur, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB databa connection estbalished sucessfully.");
})

const teamRouter = require('./routes/team');
app.use('/team', teamRouter);

app.listen(port, () =>{
    console.log(`server is running on port: ${port}`);
});