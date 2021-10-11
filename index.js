const express = require('express');
const port = 8080;

const app = express();

app.set('views','views');
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.end('running');
})

app.listen(port,(err)=>{
    if(err){
        console.log(`❌ error starting server ---> ${err}`);
        return;
    }
    console.log(`✅ server is up and running on port ${port}`);
})