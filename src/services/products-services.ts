import pool from "../config/pool-connection-config";

interface Products {
  product_id?: number;
  product_code: string;
  product_name: string;
  category: string;
  supplier_name: string;
  unit_price: number;
  stock_quantity: number;
  minimum_stock: number;
  warehouse_zone: string;
  status: string;
  last_restock_date: Date;
  deleted_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

export const createProductService = async ({
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
}: Products) => {
  await pool.query(
    `insert into products(
      product_code,
      product_name,
      category,
      supplier_name,
      unit_price,
      stock_quantity,
      minimum_stock,
      warehouse_zone,
      status,
      last_restock_date) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
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
    ],
  );
};

export const getProductService = async () => {
  const result = await pool.query(
    `SELECT * FROM products ORDER BY product_id DESC`,
  );
  return result.rows;
};

export const updateProductService = async ({
  product_id,
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
}: Products) => {
  await pool.query(
    `update products set product_code=$1, product_name=$2, category=$3, supplier_name=$4, unit_price=$5, stock_quantity=$6, minimum_stock=$7, warehouse_zone=$8, status=$9, last_restock_date=$10 where product_id=$11 and deleted_at IS NULL`,
    [
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
      product_id,
    ],
  );
};

export const deleteProductService = async (product_id: Number) => {
 const result = await pool.query(
    `UPDATE products 
     SET deleted_at = CURRENT_TIMESTAMP 
     WHERE product_id = $1 AND deleted_at IS NULL 
     RETURNING *;`, // <-- Menampilkan data yang baru di-soft delete
    [product_id]
  );
  return result.rows[0];
};
