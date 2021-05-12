

const express = require('express');
const Datastore = require('nedb'); 
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Starting server at ${port}`));
app.use(express.static('public'));
app.use(express.json({
    limit: '1mb'
}));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
    console.log("i got a request");
    const data = request.body;
    const timestamp = Date.now();
    database.insert({data, timestamp});
    console.log(data);
    response.json({
        status: 'success',
        data: data,
        timestamp: timestamp,

    });
    //response.end(); //bare minimum require to make it work, needs to send something back
});

app.get('/api', (request, response)=>{
    database.find({}, (err, data) => {
        if(err){
            response.end();
            return;
        }
        response.json(data);
    });
    
});