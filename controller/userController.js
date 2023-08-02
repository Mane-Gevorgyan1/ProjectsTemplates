const db = require('../model/model')
const Users = db.users.Users
const bcrypt = require('bcrypt')

class UsersController {

    static async getUsers(req, res) {
        await Users.findAll().then(users => {
            res.send({ success: true, users })
        }).catch(error => {
            res.send({ success: false, message: 'Something happened in the server', error })
        })
    }

    static async register(req, res) {
        if (!req.body.name) {
            res.send({ sucess: false, message: 'name field is required' })
        } else if (!req.body.surname) {
            res.send({ sucess: false, message: 'surname field is required' })
        } else if (!req.body.email) {
            res.send({ sucess: false, message: 'email field is required' })
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
            res.send({ sucess: false, message: 'email must be a valid email' })
        } else if (!req.body.password) {
            res.send({ sucess: false, message: 'password field is required' })
        } else {
            await Users.findOne({
                where: {
                    email: req.body.email
                }
            }).then(async user => {
                if (user) {
                    res.send({ success: false, message: 'email is already registered' })
                } else {
                    const hash = bcrypt.hashSync(req.body.password, 10)
                    await Users.create({ ...req.body, password: hash }).then(newUser => {
                        res.send({ success: true, message: 'User created', newUser })
                    }).catch(error => {
                        req.send({ success: false, message: 'something happened when trying to create a new user', error })
                    })
                }
            }).catch(error => {
                res.send({ sucess: false, message: 'Something happened in the server', error })
            })
        }
    }

    static async login(req, res) {
        // vorpes login partadir uxarkum enq username
        res.send({ user: req.user })
    }

    static async editRoleId(req, res) {
        if (!req.body.roleId) {
            res.send({ success: false, message: 'roleId field is required' })
        } else if (!req.body.userId) {
            res.send({ success: false, message: 'userId field is required' })
        } else {
            await Users.update({ ...req.body }, {
                where: {
                    id: req.body.userId
                }
            }).then(() => {
                res.send({ success: true, message: 'user roleId is updated' })
            }).catch(error => {
                res.send({ sucess: false, message: 'Something happend in the server', error })
            })
        }
    }
}

module.exports = UsersController