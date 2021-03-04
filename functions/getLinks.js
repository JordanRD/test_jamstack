require('dotenv').config()


const { GET_LINKS } = require('./utils/linkQueries')
const formattedResponse=require('./utils/formattedResponse')
const sendQuery=require('./utils/sendQuery')

exports.handler = async (event) => {
    if (event.httpMethod !== 'GET') return formattedResponse(400, { err: 'Method not supported' })
    
    try {
        const { allLinks} = await sendQuery(GET_LINKS)
        const data = allLinks.data;
        return formattedResponse(200,data)
    } catch (error) {
        console.log(error)
        return formattedResponse(400,{err:'something wrong'})
    }
}