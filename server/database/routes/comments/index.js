const express = require("express");
const router = express.Router();

router
.router("/comment")
.get((req.res) => {
    return new req.database.Comment()
    .fetchAll()
        .then(users => {
            return res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
})
    .post((req, res) => {
        console.log("hitting");
        const username = req.body.username;
        const name = req.body.name;
        const email = req.body.email;
        const address = req.body.address;
        console.log("post", req.body);
        return new req.database.User({ username, name, email, address })
            .save()
            .then(user => {
                return res.json({ success: true });
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    });

module.exports = router;
} )