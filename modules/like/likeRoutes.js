const express = require("express");
const router = express.Router();
const likeController = require("./likeController");
constauthMiddleware = require("../../middleware/auth");

//Rota para alternar o like (curtir/descurtir)
router.post("/video/:videoId/toggle-like", authMiddleware, likeController.toggleLike);

//Rota para verificar o status do like de um video para o usuáro logado
router.get("/video/:videoId/like-status", authMiddleware, likeController.checkLikeStatus);

module.exports = router;

