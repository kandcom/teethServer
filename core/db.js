const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dental', {useNewUrlParser: true, useUnifiedTopology: true }).catch(function(error) {
    throw Error(error)
})

module.exports = mongoose;