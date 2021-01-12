require('dotenv').config();
const cors = require('cors');
const express= require('express')
const fetch = require('node-fetch');

const app=express();
app.use(cors())



app.get('/api/rates' ,async (req,res)=>{
    try{
        
        let results; 
        
        await fetch(`https://api.exchangeratesapi.io/latest?base=${req.query.base}&symbols=${req.query.currency}`).then(response=>response.json()).then(jsonResponse=>results=jsonResponse)
        .catch(err=>console.log(err))
        res.send({results})
    }
    catch(err){
        res.send(`The HTTP status of the reponse:${err.statusText} ${err.status}` )
    }
})


app.get('/*' ,(req,res)=>{
    res.send("Route Not Available")
})
app.listen(process.env.PORT,()=>{
    console.log(` app listening on port${process.env.PORT}`)
})
