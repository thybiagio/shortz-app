var express = require("express");
var router = express.Router();
const userController = require("./userController");
const authMiddleware = require("../../middlewares/auth");
const upload = require("../../middlewares/profileMulter");
const videoController = require("../video/videoController");

// Rota para exibir o formulario de cadastro
router.get("/register", (req, res) => {
    res.render("register", { title: "Criar Conta", layout: false });
});

// Rota que processa o formulario de cadastro
router.post("/register", userController.register);

// Rota para exibir o formulario de login
router.get("/login", (req, res) => {
    res.render("login", { title: "Entrar", layout: false });
});

// Rota para processar o formulario de login
router.post("/login", userController.login);

// Rota para processar o logout
router.get("/logout", userController.logout);

// Rota para exibir o perfil do usuario
router.get("/profile/edit", authMiddleware, async (req, res) => {
    res.render("edit-profile", { title: "Editar Perfil | Shortz-App", layout: false });
});

router.get("/feed", authMiddleware, async (req, res) => {
    try {
        const videos = await videoController.getAllVideos();
        res.render("feed", { title: "Feed | Shortz-App", videos, layout: false });
    } catch (error) {
        console.error("Erro ao carregar o feed:", error);
        req.flash("error", "Erro ao carregar o feed de videos");
        res.redirect("/login");
    }
});

// Rota de atualizacao do perfil
router.post(
    "/profile/edit",
    authMiddleware,
    upload.single("profilePicture"),
    userController.updateProfile
);

// Rota para exibir o perfil publico de um usuario
router.get("/profile/:username", userController.renderPublicProfile);

module.exports = router;
