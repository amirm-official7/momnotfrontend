const express = require('express');
const app = express();
const cors = require('cors');
const Mongoose = require('mongoose');
const fs = require('fs');


const { pas } = require('./pas') 
const { dates } = require('./db');
const { log } = require('console');

app.use(express.json());       
app.use(express.urlencoded( {extended: false}));
app.use(cors({
    origin: '*'
}));

const PORT = process.env.PORT || 5000;

Mongoose.connect("mongodb+srv://amir:amir.556655@cluster0.4ur0v.mongodb.net/mom?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{app.listen(PORT, ()=> {console.log("lestenning http");})})
.catch((err)=>{
	console.log(err);
	}
)




app.get('/dates', (req, res)=>{
    var p;
    fs.readFile('percentages.txt', 'utf-8', function(err, data) {
        if (err) res.status(500).send("something went wrong");
        else p = data
    })
    dates.find()
    .then((result)=>{
        res.status(200).send({
            p: p,
            dates: result
        });
    })
})

app.post('/date', (req, res)=> {
    const { data, password } = req.body
    console.log(req.body)
    if (password === pas){
        const siennalois = new dates(data)
        siennalois.save((err, date)=>{
            if (err) res.status(500).send("something went wrong")
            else res.status(200).send(date)
        })
    }
    else {
        res.status(403).send("you dont have permission")
    }
})

app.delete('/date', (req, res)=> {
    const { id, password } = req.body
    if (password === pas){
        dates.deleteOne({ _id: id }, (err)=> {
            if (err) res.status(500).send("something went wrong")
            else res.status(200).send("data successfully deleted")
        });
    }
    else {
        res.status(403).send("you dont have permission")
    }
    
})

app.put('/changep', (req, res)=> {
    const { id, password } = req.body
    if (password === pas){
        const { v } = req.body
        fs.writeFile('percentages.txt', v, 'utf-8', function(err, data) {
            if (err) res.status(403).send("something went wrong");
            else res.status(200).send('Done!');
        })  
    }
    else {
        res.status(403).send("you dont have permission")
    }

})

