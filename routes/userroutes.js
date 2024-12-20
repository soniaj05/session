const express = require("express");
const { registerUser, loginUser, getProfile, getall, updateUser,deleteUser } = require("../controller/usercontroller");

const router = express.Router();


router.post("/register", registerUser);

router.post("/login", loginUser);


router.get("/profile", getProfile);

router.get("/all",getall)

router.put('/update/:id',updateUser)

router.delete('/delete/:id',deleteUser)


module.exports = router;