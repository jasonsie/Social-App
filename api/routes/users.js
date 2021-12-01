const router = require("express").Router();
const User = require("../models/User.js");

//update user
// find User => update
// findByIdAndUpdate()
router.put("/:id", async (req, res) => {
    const userData = req.params; // {id:~~~~~~~~~~}
    if (userData.id === req.body.id) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("data update successfully");
        } catch (err) {
            return res.status(500).json("fail to update");
        }
    } else {
        res.status(403).json("the account does not exit");
    }
});

//delete user
router.delete("/:id", async (req, res) => {
    const userData = req.params;

    if (userData.id === req.body.id) {
        try {
            const user = await User.findByIdAndDelete(req.body.id);
            res.status(200).json("data delete successfully");
        } catch (err) {
            return res.status(500).json("fail to delete");
        }
    } else {
        res.status(403).json("the account does not exit");
    }
});

//get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const userName = req.query.username;
    try {
        const userInfo = userId
            ? await User.findById(userId)
            : await User.findOne({ username: userName });
        const { password, updatedAt, ...other } = userInfo._doc;

        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json("the account does not exit");
    }
});

// get not friends yet
router.get(":useId/notfriendyet", ( req, res ) => {
    try{
        
    }catch(err){
        res.status(500).json(err)
    }

}) 

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList);
    } catch (err) {
        res.status(500).json(err);
    }
});

//follow a user
// active A    - (follow) ->  passive B
// following        &&         followers
// push to both of the array
router.put("/follow/:id", async (req, res) => {
    const data = {
        followerId: req.params.id,
        followingId: req.body.id,
    };
    try {
        if (data.followerId !== data.followingId) {
            const activeA = await User.findById(data.followerId);
            const passiveB = await User.findById(data.followingId);
            await activeA.updateOne({
                $push: { followings: data.followingId },
            });
            await passiveB.updateOne({ $push: { followers: data.followerId } });
            res.status(200).json("well done, following");
        } else {
            res.status(404).json("No following the same");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

//unfollow a user
router.put("/unfollow/:id", async (req, res) => {
    const followerId = req.params.id;
    const followingId = req.body.id;
    console.log("1");

    try {
        console.log("2");
        const activeA = await User.findById(followerId);
        const passiveB = await User.findById(followingId);

        if (activeA.followings.includes(followingId)) {
            console.log(followingId)
            await activeA.updateOne({ $pull: { followings: followingId } });
            await passiveB.updateOne({ $pull: { followers: followerId } });
            res.status(200).json("unfollowing");
            console.log("3");
        } else {
            res.status(404).json("no Following");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
