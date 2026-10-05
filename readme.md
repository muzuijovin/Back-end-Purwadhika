CREATE DATABASE warehouse_db;

CREATE TABLE products (
    product_id          SERIAL PRIMARY KEY,
    product_code        VARCHAR(10) UNIQUE NOT NULL,
    product_name        VARCHAR(100) NOT NULL,
    category            VARCHAR(50) NOT NULL,
    supplier_name       VARCHAR(100) NOT NULL,
    unit_price          NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    stock_quantity      INT NOT NULL CHECK (stock_quantity >= 0),
    minimum_stock       INT NOT NULL CHECK (minimum_stock >= 0),
    warehouse_zone      VARCHAR(10) NOT NULL,
    status              VARCHAR(20) NOT NULL DEFAULT 'Available',
    last_restock_date   DATE,
    deleted_at          TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (product_code, product_name, category, supplier_name,
  unit_price, stock_quantity, minimum_stock, warehouse_zone, status,
  last_restock_date) VALUES
('PRD-001','Kardus Packing Ukuran L','Packaging','PT Packindo Utama',8500.00,150,50,'Zone A','Available','2026-08-10'),
('PRD-002','Bubble Wrap 50m','Packaging','PT Packindo Utama',45000.00,20,30,'Zone A','Available','2026-07-15'),
('PRD-003','Lakban Bening 2 Inch','Packaging','CV Solusi Lakban',12000.00,200,100,'Zone A','Available','2026-09-01'),
('PRD-004','Stretch Film 500mm','Packaging','PT Packindo Utama',65000.00,15,25,'Zone A','Available','2026-06-20'),
('PRD-005','Palet Kayu Pinus','Equipment','CV Kayu Bersama',120000.00,45,10,'Zone B','Available','2026-05-12'),
('PRD-006','Forklift Hand Stacker','Equipment','PT Heavy Lift',3500000.00,2,2,'Zone B','Available','2025-12-01'),
('PRD-007','Timbangan Digital 100kg','Equipment','PT Heavy Lift',850000.00,0,5,'Zone B','Out of Stock','2026-01-10'),
('PRD-008','Barcode Scanner Wireless','Electronics','PT Tech Supply',450000.00,12,10,'Zone C','Available','2026-08-25'),
('PRD-009','Printer Thermal Label','Electronics','PT Tech Supply',1250000.00,5,8,'Zone C','Available','2026-04-18'),
('PRD-010','Kertas Thermal 80mm','Supplies','CV Solusi Lakban',15000.00,300,50,'Zone C','Available','2026-09-15'),
('PRD-011','Helm Keselamatan Kerja','Safety','PT Safety First',75000.00,30,15,'Zone D','Available',NULL),
('PRD-012','Sarung Tangan Karet','Safety','PT Safety First',8500.00,8,50,'Zone D','Available','2026-02-14'),
('PRD-013','Sepatu Safety Steel Toe','Safety','PT Safety First',320000.00,18,20,'Zone D','Available','2026-07-01'),
('PRD-014','Kardus Packing Ukuran M','Packaging','PT Packindo Utama',6500.00,0,50,'Zone A','Discontinued','2025-10-05'),
('PRD-015','Cairan Pembersih Lantai Gudang','Supplies','CV Bersih Bersama',35000.00,40,15,'Zone C','Available','2026-08-01');

select * from products;

--tugas 1
select 
	product_code,
	product_name,
	category,
	stock_quantity
from products
where deleted_at IS null;

--tugas 2 semua produk kategori 'Packaging' yang stoknya kurang dari atau sama dengan minimum_stock.
SELECT 
    product_code, 
    product_name, 
    category, 
    stock_quantity 
FROM 
    products
WHERE 
    category = 'Packaging' 
    AND deleted_at IS NULL 
    AND stock_quantity <= minimum_stock;

-- tugas 3, tampilkan 3 produk termahal
SELECT 
    product_code, 
    product_name, 
    unit_price
FROM 
    products
where 
	deleted_at IS NULL 
order by
	unit_price desc 
limit 3;

-- tugas ke-4 update data
UPDATE products
SET stock_quantity = 50, updated_at = CURRENT_TIMESTAMP
WHERE product_code = 'PRD-002' AND deleted_at IS NULL;


-- tugas ke 5 soft delete
UPDATE products 
SET deleted_at = CURRENT_TIMESTAMP
WHERE product_code = 'PRD-007' AND deleted_at IS NULL;

-- untuk mengembalikkan
UPDATE products 
SET deleted_at = NULL
WHERE product_code = 'PRD-007';

select * from products
where deleted_at IS NULL;




