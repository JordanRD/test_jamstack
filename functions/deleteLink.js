require('dotenv').config()


const { DELETE_LINK } = require('./utils/linkQueries')
const formattedResponse = require('./utils/formattedResponse')
const sendQuery = require('./utils/sendQuery')

exports.handler = async (event) => {
    console.log(event.httpMethod)
    if(event.httpMethod !== 'DELETE') return formattedResponse(400,{ err:'Method not supported'})
    const {  _id } = JSON.parse(event.body)
    const variables = { _id }
    console.log('working =>', _id)
    try {
        const { deleteLink } = await sendQuery(DELETE_LINK, variables);
        return formattedResponse(200, deleteLink)
    } catch (error) {
        console.log(error)
        return formattedResponse(400, { err: 'something wrong' })
    }
}