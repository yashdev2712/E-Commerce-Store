import { z } from "zod";
import Product from "../Models/productSchema.js";
import User from "../Models/userSchema.js";

export const createProduct = async (req, res) => {
  try {
    const { category, title, price, description, rating } = req.body;
    const { rate, count } = rating;

    if (!category || !title || !price || !description) {
      return res.status(401).json({
        message: "all field are required",
      });
    }

    const productBody = z.object({
      category: z.string(),
      title: z.string(),
      price: z.number(),
      description: z.string(),
      rating: z.object({
        rate: z.number().min(0).max(5).optional(),
        count: z.number().min(0).optional(),
      }),
    });

    const result = productBody.safeParse(req.body);
    if (!result.success) {
      return res.status(401).json({
        message: "error in input validation",
      });
    }

    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      console.log("product already exists");
      return res.status(409).json({
        message: "product already exists",
      });
    }

    const product = await Product.create({
      category,
      title,
      price,
      description,
      rating: {
        rate,
        count,
      },
    });

    res.status(201).json({
      productId: product._id,
      title: product.title,
      price: product.price,
    });
  } catch (error) {
    console.log("an error occured in create product route:", error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findOne(productId);
    if (!product) {
      console.log("product does not exists");
      return res.status(409).json({
        message: "product does not exists",
      });
    }

    const { category, title, price, description, rating } = req.body;

    const productBody = z.object({
      category: z.string().optional(),
      title: z.string().optional(),
      price: z.number().optional(),
      description: z.string().optional(),
      rating: z
        .object({
          rate: z.number().min(0).max(5).optional(),
          count: z.number().min(0).optional(),
        })
        .optional(),
    });

    const result = productBody.safeParse(req.body);
    if (!result.success) {
      return res.status(401).json({
        message: "error in input validation",
      });
    }

    const updateBody = {
      category: category || product.category,
      title: title || product.title,
      price: price !== undefined ? price : product.price,
      description: description || product.description,
      rating: {
        rate: rating?.rate !== undefined ? rating.rate : product.rating.rate,
        count:
          rating?.count !== undefined ? rating.count : product.rating.count,
      },
    };

    const update = await Product.findByIdAndUpdate(product._id, updateBody, {
      new: true,
    });

    res.status(200).json({
      id: update._id,
      title: update.title,
      price: update.price,
    });
  } catch (error) {
    console.log("an error occured in update product route:", error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      console.log("the product does not exists");
      return res.status(404).json({
        message: "the product does not exists",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      message: "the product has been deleted",
    });
  } catch (error) {
    console.log("an error occured in delete product route:", error);
    res.status(500).json({
      message: "an error occured in delete product route",
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      console.log("the product does not exists");
      return res.status(404).json({
        message: "the product does not exists",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log("an error occured in get product route:", error);
    return res.status(500).json({
      message: "an error occured in the get product route",
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const productArr = await Product.aggregate([{ $sample: { size: 9 } }]);
    if (productArr.length === 0) {
      console.log("connot fetch product list");
      return res.status(404).json({
        message: "cannot fetch the products",
      });
    }

    return res.status(200).json(productArr);
  } catch (error) {
    console.log("an error occured in get featured product route:", error);
    return res.status(500).json({
      message: "an error occured in the get featured product",
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      console.log("the product does not exist");
      return res.status(500).json({
        message: "the product does not exist",
      });
    }

    const user = await User.findById(userId);

    const existingProduct = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (existingProduct) {
      existingProduct.count += 1;
    } else {
      user.cart.push({ product: productId, count: 1 });
    }

    await user.save();

    return res.status(200).json({
      message: "successfully updated cart",
    });
  } catch (error) {
    console.log("an error occured in add to cart route:", error);
  }
};

export const fetchCart = async (req, res) => {
  try {
    const userId = req.body;
    const user = await User.findById(userId);

    return res.status(200).json(user.cart);
  } catch (error) {
    console.log("an error occured in fetch cart route:", error);
  }
};

export const getNewProduct = async (req, res) => {
  try {
    const newProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(9)
      .select("-createdAt -updatedAt -__v");

    if (!newProducts.length) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(newProducts);
  } catch (error) {
    console.log("An error occurred in get new product route:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDiscountedProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log("an error occured in get discounted product route:", error);
  }
};

export const lowToHigh = async (req, res) => {
  try {
    const product = await Product.find()
      .sort({ price: 1 })
      .limit(9)
      .select("-createdAt -updatedAt -__v");

    if (product.length === 0) {
      return res.status(404).json({
        message: "unable to fetch the list",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log("an error occured in sorting route:", error);
  }
};

export const highToLow = async (req, res) => {
  try {
    const product = await Product.find()
      .sort({ price: -1 })
      .limit(9)
      .select("-createdAt -updatedAt -__v");

    if (product.length === 0) {
      return res.status(404).json({
        message: "unable to fetch the list",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log("an error occured in sorting route:", error);
  }
};
