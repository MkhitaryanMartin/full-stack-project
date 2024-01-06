const CommentModel = require("../models/comment");
const UserModel = require("../models/user-model")

class CommentService{
  async getComments(id) {
    const comments = await CommentModel.find({
      $or: [
        { "parent._article": id },
        { "parent._id": id }
      ]
    });
  
    const count = await CommentModel.countDocuments({
      $or: [
        { "parent._article": id },
        { "parent._id": id }
      ]
    });
  
    return { results: { items: comments, count: count } };
  }
    async addComment(body){
        const user = await UserModel.findById(body._id);
      let parent =  body.parent
      if(body.parent._type === "comment"){
        const  parentAuthor = await CommentModel.findOne({_id: body.parent._id})
        parent = {...body.parent, text: `${parentAuthor.text.substring(0, 4)}...`, name: parentAuthor.author.profile.name}
      }
        const newComment = new CommentModel({
            text: body.text,
            author: {
              profile: {
                name: user.firstName,
                photo: user.photo
              },
              _id: body._id, // ID пользователя, создавшего комментарий
            },
            parent: parent,
          });
        const comment = newComment.save()
        return comment
     }
}

module.exports = new CommentService()