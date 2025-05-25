import { sql } from "../config/db.js";
import { StatusCodes } from "http-status-codes";

export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`
        SELECT * FROM products ORDER BY createdat DESC
    `;

    console.log("fetched products", products);
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.log("ERROR at getAllProducts function", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, image, price } = req.body;

    if (!name || !image || !price) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("All fields are required");
    }

    const newProduct = await sql`
        INSERT INTO products (name, image, price) VALUES (${name}, ${image}, ${price}) 
        RETURNING *   
    `;

    console.log("created a product", newProduct[0]);
    res.status(StatusCodes.CREATED).json(newProduct[0]);
  } catch (error) {
    console.log("ERROR at createProduct function", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await sql`
        SELECT * FROM products WHERE id=${id}
    `;

    if (product.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json("Product NOT FOUND");
    }

    console.log("fetched a product", product[0]);
    res.status(StatusCodes.OK).json(product[0]);
  } catch (error) {
    console.log("ERROR AT getProduct function", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price } = req.body;

    const updatedProduct = await sql`
        UPDATE products
        SET name=${name}, image=${image}, price=${price} 
        WHERE id=${id}
        RETURNING *
    `;

    if (updatedProduct.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json("Product NOT FOUND");
    }

    console.log("updated product", updatedProduct[0]);
    res.status(StatusCodes.OK).json(updatedProduct[0]);
  } catch (error) {
    console.log("ERROR AT updateProduct function", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await sql`
        DELETE FROM products WHERE id=${id}
        RETURNING *
    `;

    if (deletedProduct.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json("Product NOT FOUND");
    }

    console.log("deleted a product", deletedProduct[0]);
    res.status(StatusCodes.NO_CONTENT).json(deletedProduct[0]);
  } catch (error) {
    console.log("ERROR AT deleteProduct function", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
