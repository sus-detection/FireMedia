const express = require("express")
const app = express()
const router = express.Router()

const dotenv = require("dotenv")
dotenv.config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

router.get("/", (req, res, next) => {
	res.redirect("/")
})

router.get("/:id", (req, res, next) => {

	if(!req.session.user) {
		return res.redirect("/")
	}

    var payload = {
        pageTitle: "Genuine AI",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        postId: req.params.id
    }

    res.status(200).render("genuineai", payload);
})

module.exports = router
