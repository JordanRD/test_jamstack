// require('dotenv').config()

const axios = require('axios')


module.exports = async (query, variables={}) => {
        const { data:{data,errors} } = await axios({
            method: 'POST',
            url: 'https://graphql.fauna.com/graphql',
            headers: {
                Authorization: `Bearer ${process.env.FAUNADB_KEY}`
            },
            data: {
                query,
                variables
            }
        })
    console.log(data)
    if (errors) {
        console.log(errors)
        throw new Error ('Something wrong')
    }
        return data
}
