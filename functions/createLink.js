require('dotenv').config()


const { CREATE_LINK } = require('./utils/linkQueries')
const formattedResponse = require('./utils/formattedResponse')
const sendQuery = require('./utils/sendQuery')

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') return formattedResponse(400, { err: 'Method not supported' })
    
    const { name, url, description } = JSON.parse(event.body)
    const variables = { name, url, description }
    try {
        const {createLink} = await sendQuery(CREATE_LINK, variables);
        return formattedResponse(200, createLink)
    } catch (error) {
        console.log(error)
        return formattedResponse(400, { err: 'something wrong' })
    }
}