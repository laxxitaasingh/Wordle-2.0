const express = require("express")
const router = express.Router()
const {checkWordController} = require("../controllers/gameController")

router.post("/check/:letters", checkWordController)


module.exports=router