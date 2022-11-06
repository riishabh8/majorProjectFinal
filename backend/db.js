const mongoose = require('mongoose');


const connect = (dbObject) => {

    const {username,password,database} = dbObject;

    url = `mongodb+srv://${username}:${password}@cluster0.i8e4g.mongodb.net/${database}?retryWrites=true&w=majority`;

    const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
    return mongoose.connect(url,connectionParams)
        
}

const getClient = () => {
    return mongoose.connection.getClient();
}

module.exports={connect,getClient};