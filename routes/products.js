const express = require("express")
const router = express.Router()
const multer = require("multer")
const controller = require("../controlers/productsController")

router.use("/images", express.static("uploads"))

// The multer object configurations to accept files 
const storage = multer.diskStorage({
      destination: (req, file, cb) => {

        cb(null, "uploads")
      },
      filename: (req, file, cb) => {

        cb(null, file.originalname)        
      }
})

const upload = multer({storage: storage})

// The route to get all products
router.get("/", controller.getAllProducts)

// The route to get all product categories
router.get("/categories", controller.getProductCategories)

router.get("/categories-with-image", controller.categoriesWithImage )

// The route do get products by desired category 
router.get("/by-category/:category", controller.getByCategory)

// The route do get products by desired id
router.get("/by-id/:id", controller.getById)

// The route to add new products
router.post("/add/:id", upload.single("image"),  controller.addProduct )
 
// The route to change a product's image
router.post("/update-image/:id", upload.single("newImage"), controller.changeImage)

// The route to modify the product's attributes
router.put("/update-characteristics/:id", controller.editProduct)

// The route to delete a product
router.delete("/delete-product/:id", controller.deleteProduct)

module.exports = router