require('dotenv').config()

const
    express = require('express'),
    serverless = require('serverless-http'),
    app = express()
    ;

    const linkRouter=require('./linkRouter')

    app.use(express.json())

app.use('/.netlify/functions/withExpress',linkRouter)

module.exports.handler = serverless(app);