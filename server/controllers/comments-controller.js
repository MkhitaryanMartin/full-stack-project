const CommentService = require("../service/cooment-service")

class CommentsController{

    async getComments(req, res, next){
        try {
            const {id} = req.query;
            const comments = await CommentService.getComments(id)
            return res.json(comments)
        } catch (error) {
            console.log(error)
            return res.status(500).json("Error")
        }
    }
    async addComment(req, res, next){
        try {
            const body = req.body;
            const comment = await CommentService.addComment(body)
            return res.json(comment)
        } catch (error) {
            console.log(error)
            return res.status(500).json("Error")
        }
    }
}

module.exports = new CommentsController()