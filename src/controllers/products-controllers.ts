import { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getProductService,
  updateProductService,
} from "../services/products-services";

//handle req dan res
export const createProductController = async (req: Request, res: Response) => {
  try {
    console.log("trigerrrr");
    const {
      product_code,
      product_name,
      category,
      supplier_name,
      unit_price,
      stock_quantity,
      minimum_stock,
      warehouse_zone,
      status,
      last_restock_date,
    } = req.body;

    await createProductService({
      product_code,
      product_name,
      category,
      supplier_name,
      unit_price,
      stock_quantity,
      minimum_stock,
      warehouse_zone,
      status,
      last_restock_date,
    });

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: {
        product_code,
        product_name,
        category,
        supplier_name,
        unit_price,
        stock_quantity,
        minimum_stock,
        warehouse_zone,
        status,
        last_restock_date,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
      data: {},
    });
  }
};

export const getProductController = async (req: Request, res: Response) => {
  try {
    console.log("trigerrrr");

    const products = await getProductService();

    res.status(200).json({
      success: true,
      message: "Product get successfully",
      data: products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error,
      data: {},
    });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    console.log("trigerrrr");
    const { product_id } = req.params;
    const {
      product_code,
      product_name,
      category,
      supplier_name,
      unit_price,
      stock_quantity,
      minimum_stock,
      warehouse_zone,
      status,
      last_restock_date,
    } = req.body;

    await updateProductService({
      product_id: Number(product_id),
      product_code,
      product_name,
      category,
      supplier_name,
      unit_price,
      stock_quantity,
      minimum_stock,
      warehouse_zone,
      status,
      last_restock_date,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: {
        product_code,
        product_name,
        category,
        supplier_name,
        unit_price,
        stock_quantity,
        minimum_stock,
        warehouse_zone,
        status,
        last_restock_date,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error,
      data: {},
    });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    console.log("trigerrrr");
    console.log("trigerrrr");
    const { product_id } = req.params;

    const deletedProduct = await deleteProductService(Number(product_id));

    if (!deletedProduct) {
      return res.status(444).json({
        success: false,
        message: "Product not found or already deleted",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct, // <-- Data produk otomatis tampil di sini
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
      data: {},
    });
  }
};
