const express = require("express");
const { addTransection, getAllTransction ,editTransection,deleteTransection,} = require("../controllers/transectionCtrl");

//router object
const router = express.Router();

//routes
//add transection POST Method
router.post('/add-transection',addTransection);
//Edit transection POST Method
router.post('/edit-transection',editTransection);
//Delete transection POST Method
router.post('/delete-transection',deleteTransection);


//get transection
router.post("/get-transection",getAllTransction);

module.exports = router;