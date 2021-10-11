const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/StduntManageDev');

const db = mongoose.connection;

db.on('err',console.error.bind(console,`❌ error connecting to DB --->`))

db.once('open',()=>{
    console.log('✅ successfully connected to DB')
})

module.exports = db;