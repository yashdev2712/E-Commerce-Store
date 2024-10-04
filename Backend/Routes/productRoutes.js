import express from "express";
import {
  createProduct,
  updateProduct,
  getProduct,
  getAllProduct,
  addToCart,
  fetchCart,
  getNewProduct,
  getDiscountedProduct,
  deleteProduct,
  lowToHigh,
  highToLow,
} from "../Controllers/productController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const router = express.Router();

/* basic routes */

router.post("/createProduct", createProduct);
router.post("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

/* get product */

router.get("/getProduct/:id", getProduct);
router.get("/getAllProduct", getAllProduct);

/* cart */

router.post("/addToCart/:id", authMiddleware, addToCart);
router.get("/fetchCart", authMiddleware, fetchCart);

/* filter for searching */

router.get("/getNewProduct", getNewProduct);
router.get("/getDiscountedProduct");

/* sorting filter */

router.get("/highToLow", highToLow);
router.get("/lowToHigh", lowToHigh);

export default router;
