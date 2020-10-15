const express = require('express')
const User = require('../models/user')
const router = new express.Router()

// Create User
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    }
    catch (e) {
        res.status(500).send()
    }
})

//Login Route
router.post('/users/login', async (req, res) => {
    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})


// Get all users
router.get('/users', async (req, res) => {
    try {
        console.log('sup nigga')
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Get a specific User by ID
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        console.log(user)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch (e) {
        res.status(500).send(e)
    }

})

//Update user
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) //we are making changes to this line and re writing the same logic in traditional way so that it can does not bypass the middle ware functionality we are using.

        const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await User.save()
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// Delete User
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(400).send()
        }
        res.send(user)
    }
    catch (e) {
        res.status(500).send()
    }

})


/* app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)   // The promise chaining way. Under this the same code will be done in Async await way.
    }).catch((err) => {
        res.status(400).send(err)
    })
}) */


/* app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)  // The promise chaining way. Under this the same code will be done in Async await way.
    }).catch((err) => {
        res.status(500).send(err)
    })
})*/
/* 
app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)// The promise chaining way. Under this the same code will be done in Async await way.
    }).catch(() => {
        res.status(500).send()
    })
}) */

module.exports = router