require('dotenv').config()


const { UPDATE_LINK } = require('./utils/linkQueries')
const formattedResponse = require('./utils/formattedResponse')
const sendQuery = require('./utils/sendQuery')

exports.handler = async (event) => {
    console.log(event.httpMethod);
    if (event.httpMethod !== 'PUT') return formattedResponse(400, { err: 'Method not supported' })

    const { name, url, description, _id, archived } = JSON.parse(event.body)
    const variables = { name, url, description, _id, archived }
    try {
        const { updateLink } = await sendQuery(UPDATE_LINK, variables);
        return formattedResponse(200, updateLink)
    } catch (error) {
        console.log(error)
        return formattedResponse(400, { err: 'something wrong' })
    }
}