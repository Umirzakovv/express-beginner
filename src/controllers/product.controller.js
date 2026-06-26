import Product from "../models/Product.js";

// CREATE
export async function createProduct(req, res) {
  try {
    const { name, price, description } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
    });

    return res.status(201).json(product);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      message: err.message,
    });
  }
}

// GET ALL
export async function getProducts(req, res) {
  try {
    const products = await Product.find();

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

// GET ONE
export async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product topilmadi",
      });
    }

    return res.status(200).json(product);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        message: "Product ID noto'g'ri formatda",
      });
    }

    return res.status(500).json({
      message: err.message,
    });
  }
}

// PATCH
export async function updateProduct(req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product topilmadi",
      });
    }

    return res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.name === "CastError" || err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      message: err.message,
    });
  }
}

// DELETE
export async function deleteProduct(req, res) {
  
}


