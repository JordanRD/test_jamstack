const { GET_LINKS,CREATE_LINK,DELETE_LINK,UPDATE_LINK } = require("./utils/linkQueries")

const sendQuery = require('./utils/sendQuery')

module.exports = {
    getLinks: async (_, res) => {
        try {
            const { allLinks } = await sendQuery(GET_LINKS)
            res.status(200).send(allLinks.data)
        } catch (error) {
            console.log('ternyata error')
            res.status(400).send(error.message)
        }
    },
    createLink: async (req, res) => {
        try {
            const { createLink } = await sendQuery(CREATE_LINK,req.body)
            res.status(200).send(createLink)
        } catch (error) {
            // console.log(error)
            res.status(400).send(error.message)
        }
    },
    deleteLink: async (req, res) => {
        try {
            // console.log('kena')
            const { id:_id } = req.params
            const { deleteLink } = await sendQuery(DELETE_LINK, { _id })
            res.status(200).send(deleteLink)
        } catch (error) {
            // console.log(error)
            res.status(400).send(error.message)
        }
    },
    updateLink: async (req, res) => {
        try {
            const {updateLink} = await sendQuery(UPDATE_LINK, req.body)
            res.status(200).send(updateLink)
        } catch (error) {
            // console.log(error)
            res.status(400).send(error.message)
        }
    },

}