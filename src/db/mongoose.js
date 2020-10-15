const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(res => {
    console.log('connection successful')
}).catch((err) => {
    console.log('connection got fucked' + err)
})


module.exports =mongoose