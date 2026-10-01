import express, { Request, Response } from "express";

const PORT: number = 8001;
const app = express();

//body parser --> json brbah jadi object di js
app.use(express.json());

//get cuma bisa menggunakan url
app.get("/", (req: Request, res: Response) => {
  
  res.status(200).send({ massage: "hello world!" });
  /* handle request
  1. body
  2. url = params (/:slug), dan query (/bca?search=)
  3. headers
  */

  return res.json({
    message: "wellcome to API intro express!",
  });
});

//post bisa menggunakan di body
app.post("/handle-request/:slug", (req: Request, res: Response) => {
  const data = req.body;
  const params = req.params;
  console.log(params?.slug);
  const queries = req.query;
  console.log(queries?.search);
  console.log(queries?.sort);

  return res.json({
    message: "handle request successfull!",
  });
});

app.listen(PORT, () => {
  console.log(`Application Running On Port ${PORT}`);
});
