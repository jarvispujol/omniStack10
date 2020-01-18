const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://devradar:devRadarOmniStack2020@cluster0-pqbg9.mongodb.net/devRadar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

app.use(express.json());
app.use(routes);

app.get('/', (request, response)=>{
    console.log(request.query);
    return response.json({message: 'Hello OmniStack'});
});

app.listen(3333);