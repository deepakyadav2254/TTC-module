require('../db/mongoose')
const User = require('../models/user')
const Task = require('../models/task')
/*     
    User.findByIdAndUpdate('5f7cf948a1b5a336c0af16e4', { age: 1 }).then((user) => {
        console.log(user)
        return User.countDocuments({ age: 1 })
    }).then((count) => {
        console.log(count)
    }).catch((e) => {
        console.log(e)
    }) */
/* 
 
    Task.findByIdAndDelete('5f7d71d9d331f644f068dc4d').then((res)=>{
        console.log(res)
        return Task.countDocuments({completed:true})
    }).then((count)=>{
        console.log(count)
    }).catch((err)=>{
        console.log(err)
    }) */ // Promise chaining example


    const findAndUpdate =async ()=>{
        const updatedUser = await User.findByIdAndUpdate('5f7cf948a1b5a336c0af16e4',{age:5})
        const count =await User.countDocuments({age:5})
        return {user:updatedUser,count:count}
    }
    findAndUpdate().then(({user, count})=>{
        console.log(user)
        console.log(count)
    }).catch((err)=>{
        console.log(err)
    })