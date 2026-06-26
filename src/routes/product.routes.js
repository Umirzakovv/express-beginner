import { Router } from "express";
import * as ProductController from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadProductImage } from "../middlewares/upload.middleware.js";

const router = Router();

router.post(
  "/product",
  authMiddleware,
  uploadProductImage,
  ProductController.createProduct,
);

router.get("/product", authMiddleware, ProductController.getProducts);

router.get("/product/:id", authMiddleware, ProductController.getProduct);

router.patch(
  "/product/:id",
  authMiddleware,
  uploadProductImage,
  ProductController.updateProduct,
);

router.delete("/product/:id", authMiddleware, ProductController.deleteProduct);

export default router;
