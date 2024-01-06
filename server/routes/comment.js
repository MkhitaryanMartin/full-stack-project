const Router = require("express");
const CommentController = require("../controllers/comments-controller.js");

const router = new Router();

router.get("/getComments", CommentController.getComments);
router.post("/addComment", CommentController.addComment);

module.exports = router