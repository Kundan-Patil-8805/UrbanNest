const express = require("express");
const router = express.Router();
const { listings,
    add,
    edit,
    show} = require("../controllers/Property");
const upload = require("../middlewares/multer"); // Use multer middleware

// Add a property with image upload
router.post("/add", upload.single("image"), add);

module.exports = router;

// router.post('/add', upload.single('image'), propertyController.add); // Use multer upload middleware
// router.put('/:id', propertyController.edit);
// router.get('/:id', propertyController.show);

