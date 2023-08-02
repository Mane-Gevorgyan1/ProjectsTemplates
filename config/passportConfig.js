const bcrypt = require("bcrypt")
const db = require('../model/model')
const localStrategy = require("passport-local")
const Users = db.users.Users

module.exports = function (passport) {
    passport.use(
        new localStrategy.Strategy(async (username, password, done) => {
            await Users.findOne({ where: { email: username } }).then((user) => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) throw err;
                        if (result === true) {
                            if (user.roleId === 3) {
                                return done(null, { message: 'no access', id: user.id })
                            } else {
                                return done(null, user);
                            }
                        } else {
                            return done(null, false)
                        }
                    })
                } else {
                    return done(null, false)
                }
            })
        })

    )

    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    })

    passport.deserializeUser(async (id, cb) => {
        await Users.findOne({ where: { id } }).then(user => {
            const userInfo = {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email
            }
            cb(null, userInfo)
        })
    })
}