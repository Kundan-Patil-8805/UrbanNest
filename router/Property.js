const express = require("express");
const router = express.Router();
const { listings,
    add,
    edit,
    show} = require("../controllers/Property");
const upload = require("../middlewares/multer"); // Use multer middleware

// Add a property with image upload
router.post("/add", upload.single("image"), add);

router.put('/listings/:id', edit);
router.get('/listings/:id', show);
router.get("/listings", listings);



module.exports = router;



