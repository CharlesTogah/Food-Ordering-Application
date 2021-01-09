const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const User = require("../models/user");
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct);

router.post('/add-user', isAuth, adminController.postadduser);

// router.get('/add-user', isAuth, adminController.getadduser);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

router.get("/add-user", (req, res) => {
    User.find()
      .then((user) => {
        // console.log(user);
        let adminCounter = 0;
        let staffCounter = 0;
        let traineeCounter = 0;
        let managerCounter = 0;
   
        for (let person of user) {
          if (person.role === "admin") {
            adminCounter++;
          } else if (person.role === "manager") {
            managerCounter++;
          } else if (person.role === "staff") {
            staffCounter++;
          } else {
            traineeCounter++;
          } 
        }
             
        res.locals.user = user;
        res.render("admin/add-user", {
          user: user,
          adminCounter : adminCounter,
          traineeCounter :traineeCounter,
          managerCounter : managerCounter,
          staffCounter: staffCounter,
        });
      })
   
      .catch((err) => console.log(err));
   
    // res.render("admin/allusers")
  });

  router.get("/deleteuser/:userId", (req, res) => {
    const uId = req.params.userId;
    User.findById(uId).deleteOne()
    .then(user => {
      res.redirect("/admin/add-user")
    })
  });
   
  router.post("/deleteuser/:userId", (req, res) => {
    const uId = req.params.userId;
    User.findById(uId).deleteOne()
    .then(user => {
      res.redirect("admin/add-user")
    })
  });

module.exports = router;
