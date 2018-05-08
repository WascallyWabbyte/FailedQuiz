const express = require("express");
const router = express.Router();
const knex = require("../db");


router.get("/cluck", (req, res) => {
  res.render("posts/cluck");
});

router.post("/cluck", (req, res) => {
  res.send(req.body);
  knex.insert({ cluck: req.body.cluck,
                pictureUrl:  req.body.pictureUrl,
                username:    req.cookies.username
              })
              .into("posts")
              .returning("*")
            .then(([createdPost]) => {
              res.redirect(`./posts/index`, { posts:posts });
            })
            .catch(error => {
              next(error);
            });
});
router.get("/index", (req, res) => {
  knex
    .select("*")
    .from("posts")
    .orderBy("createAt", "DESC")
    .then(posts => {
      res.render("posts/index", { posts: posts });
    });
});

router.get('/index', (req, res) => {
  res.render('posts/index');
});

router.get("/cluck/:id", (req, res, next) => {
  const postId = req.params.id;
  knex.select("*").from("posts").where({id: postId}).then(([post]) => res.render("posts/index", {posts: posts}))
});

module.exports = router;
