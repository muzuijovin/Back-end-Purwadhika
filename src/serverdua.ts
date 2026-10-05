import express from "express";
import pool from "./config/pool-connection-config";
import { productRouter } from "./routes/products-routes";

const PORT: number = 8003;
const app = express();

// parser
app.use(express.json());

app.use('/api/v1', productRouter)

// untuk ngetes apakah koneksi ke data base berhasil atau tidak
pool.connect((err, client, release) => {
  if (err) return console.log(`Error acquiring client ${err.stack}`);

  console.log("Connection Successful");

  release();
});

app.listen(PORT, () => {
  console.log(`Application Running On Port ${PORT}`);
});
