const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

//REGISTER
// body.email !== findOne({ email: req.body.email })
// newUser => save()
router.post("/register", async (req, res) => {
    const registerInfo = req.body;
    // I am not sure the validation
    const emailUser = User.findOne({ email: req.body.email });

    if (registerInfo.email !== emailUser) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                username: registerInfo.username,
                email: registerInfo.email,
                password: hashedPassword,
            });

            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        res.status(500).json("the account already exist!");
    }
});

// LOGIN
//  user.findone() => bcrypt.compare(req.body, user)
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword && res.status(400).json("wrong password");
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
