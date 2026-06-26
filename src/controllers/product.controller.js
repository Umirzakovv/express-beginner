import Product from "../models/Product.js";

// CREATE
export async function createProduct(req, res) {
  try {
    const { name, price, description } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image: req.file ? `/uploads/products/${req.file.filename}` : undefined,
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
    const { name, minPrice, maxPrice } = req.query;
    const filter = {};

    if (name) {
      const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.name = {
        $regex: escapedName,
        $options: "i",
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};

      if (minPrice !== undefined) {
        const parsedMinPrice = Number(minPrice);

        if (!Number.isFinite(parsedMinPrice)) {
          return res.status(400).json({
            message: "minPrice son bo'lishi kerak",
          });
        }

        filter.price.$gte = parsedMinPrice;
      }

      if (maxPrice !== undefined) {
        const parsedMaxPrice = Number(maxPrice);

        if (!Number.isFinite(parsedMaxPrice)) {
          return res.status(400).json({
            message: "maxPrice son bo'lishi kerak",
          });
        }

        filter.price.$lte = parsedMaxPrice;
      }

      if (
        filter.price.$gte !== undefined &&
        filter.price.$lte !== undefined &&
        filter.price.$gte > filter.price.$lte
      ) {
        return res.status(400).json({
          message: "minPrice maxPrice'dan katta bo'lmasligi kerak",
        });
      }
    }

    const products = await Product.find(filter);

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
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = `/uploads/products/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
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
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product topilmadi",
      });
    }

    return res.status(204).send();
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
