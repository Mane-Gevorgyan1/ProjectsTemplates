const db = require('../model/model')
const Requests = db.requests.Requests
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

class RequestController {

    static async createRequest(req, res) {
        if (!req.body.name) {
            res.send({ sucess: false, message: 'Name field is required' })
        } else if (!req.body.email) {
            res.send({ sucess: false, message: 'email field is required' })
        } else if (!req.body.phone) {
            res.send({ sucess: false, message: 'phone field is required' })
        } else if (!req.body.description) {
            res.send({ sucess: false, message: 'description field is required' })
        } else if (!req.body.productId) {
            res.send({ sucess: false, message: 'productId field is required' })
        } else {
            const message = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Sending Email using Node.js',
                html: `${req.body.description}`
            };
            transporter.sendMail(message, async (err, info) => {
                if (err) {
                    res.send({ message: "email is invalid", err });
                } else {
                    await Requests.create({ ...req.body }).then((async request => {
                        res.send({ success: true, message: 'Request created', request })
                    })).catch(error => {
                        res.send({ success: false, message: 'Something happened in the server', error })
                    })
                }
            })
        }
    }

    static async getRequests(req, res) {
        await Requests.findAll().then(request => {
            res.send({ success: true, request })
        }).catch(error => {
            res.send({ success: false, message: 'Something happened in the server', error })
        })
    }

}

module.exports = RequestController;      