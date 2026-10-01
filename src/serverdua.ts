import express, { Request, Response } from "express";
import fs from "fs";

const PORT: number = 8003;
const app = express();

// parser
app.use(express.json());

app.post("/database/users", (req: Request, res: Response) => {
  try {
    const { username, email, password, isVerivied } = req.body;
    // validasi password
    if (password.length < 8 || password.length > 15)
      throw {
        statusCode: 409,
        message: "Password have between 5-15 characters",
      };

    // membaca & mendapatkan data users
    const userJSON = fs.readFileSync("./src/database/users.json", "utf-8"); //buffer atau gajelas pas di console
    const users = JSON.parse(userJSON); //hasilnya {users:[]}

    // cek validasi perulangan
    const isDuplicate = users.users?.find((user: any) => {
      return user.email === email;
    });
    // jika duplicate gagalkann proses
    if (isDuplicate)
      throw {
        statusCode: 400,
        message: "gagal, email sudah terdaftar",
      };

    users?.users?.push({ username, email, password, isVerivied }); //masukan data ke array
    fs.writeFileSync("./src/database/users.json", JSON.stringify(users)); //ngubah file object jadi tulisan

    //
    return res.status(201).json({
      success: true,
      message: "user created successfuly",
      data: {
        username,
        email,
        isVerivied,
      },
    });
  } catch (error: any) {
    return res.status(error?.statusCode).json({
      success: false,
      message: error?.message,
      data: {},
    });
  }
});

app.get("/database/users", (req: Request, res: Response) => {
  try {
    const userJSON = fs.readFileSync("./src/database/users.json", "utf-8"); //buffer atau gajelas pas di console
    const users = JSON.parse(userJSON); //hasilnya {users:[]}

    return res.status(201).json({
      success: true,
      message: "user created successfuly",
      data: users?.users,
    });
  } catch (error: any) {
    return res.status(error?.statusCode).json({
      success: false,
      message: error?.message,
      data: {},
    });
  }
});

app.put("/database/users/:email", (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { username, password } = req.body;

    // membaca & mendapatkan data users
    const userJSON = fs.readFileSync("./src/database/users.json", "utf-8"); //buffer atau gajelas pas di console
    const users = JSON.parse(userJSON); //hasilnya {users:[]}

    // 2. Cari indeks user berdasarkan emailTarget
    const userIndex = users.users?.findIndex((user: any) => {
      return user.email === email;
    });

    // 3. Validasi jika user tidak ditemukan
    if (userIndex === -1)
      throw {
        statusCode: 404,
        message: `User with email = ${email} not found`,
      };

    // 4. Proses Update data
    users.users[userIndex] = {
      ...users.users[userIndex],
      username: username,
      password: password,
    };

    // 5. Tulis kembali ke file JSON
    fs.writeFileSync("./src/database/users.json", JSON.stringify(users));

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        email,
        username,
      },
    });
  } catch (error: any) {
    return res.status(error?.statusCode).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
});

app.delete("/database/users/:email", (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    // membaca & mendapatkan data users
    const userJSON = fs.readFileSync("./src/database/users.json", "utf-8"); //buffer atau gajelas pas di console
    const users = JSON.parse(userJSON); //hasilnya {users:[]}

    // 2. Cari indeks user berdasarkan emailTarget
    const userIndex = users.users?.findIndex((user: any) => {
      return user.email === email;
    });

    // 3. Validasi jika user tidak ditemukan
    if (userIndex === -1)
      throw {
        statusCode: 404,
        message: `User with email = ${email} not found`,
      };

    // 4. Proses delete data
    users.users?.splice(userIndex, 1);

    // 5. Tulis kembali ke file JSON
    fs.writeFileSync("./src/database/users.json", JSON.stringify(users));

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: {
        email,
      },
    });
  } catch (error: any) {
    return res.status(error?.statusCode).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
});

app.listen(PORT, () => {
  console.log(`Application Running On Port ${PORT}`);
});
