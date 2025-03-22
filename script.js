// URL=https://www.youtube.com/watch?v=6qfmoUS-rE0&ab_channel=ThapaTechnical

import mysql from "mysql2/promise";

// Async Function
const setupDatabase = async () => {
  try {
    // 1️⃣ MySQL Server- Connect (Without Database)
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "my!sql@",
    });

    console.log("✅ Connected to MySQL Server");

    // 2️⃣ Database Create
    await db.execute("CREATE DATABASE IF NOT EXISTS stock_db");
    console.log("✅ Database Created: stock_db");

    // 🔹 Database Create করার পর **নতুন Connection** নিতে হবে
    await db.end(); // পুরানো Connection বন্ধ করো

    // 3️⃣ MySQL Server- Connect (With Database)
    const dbWithDatabase = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "my!sql@",
      database: "stock_db", // এখন Database Select করা আছে
    });

    console.log("✅ Connected to Database: stock_db");
    // console.log(await dbWithDatabase.execute("show databases"));

    // 4️⃣ Table Create
//     await dbWithDatabase.execute(`
//         CREATE TABLE stock_data (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     date DATE,
//     trade_code VARCHAR(50),
//     high FLOAT,
//     low FLOAT,
//     open FLOAT,
//     close FLOAT,
//     volume BIGINT
// );

//     `);
//     console.log("✅ Table Created: users");

    // 5️⃣ CRUD operations (Insert) Create
    // await dbWithDatabase.execute(`
    //   INSERT INTO users (username, email) VALUES ('dev','dev@example.com')
    // `);
    // console.log("✅ Data Inserted into users table");

    // using preapared statements
    // await dbWithDatabase.execute(
    //   "INSERT INTO users (username, email) VALUES (?,?)",
    //   ["dev1", "dev1@example.com"]
    // );

    // insert multiple data
    // const data = [
    //   ["dev2", "dev2@example.com"],
    //   ["dev3", "dev3@example.com"],
    //   ["dev4", "dev4@example.com"],
    //   ["dev5", "dev5@example.com"],
    //   ["dev6", "dev6@example.com"],
    //   ["dev7", "dev7@example.com"],
    //   ["dev8", "dev8@example.com"],
    //   ["dev9", "dev9@example.com"],
    //   ["dev10", "dev10@example.com"],
    // ];
    // await dbWithDatabase.query(
    //   "INSERT INTO users (username, email) VALUES ?", [data]
    // );

    // 7️��� CRUD operations (Update) Update
    // const [rows]= await dbWithDatabase.execute(
    //   "UPDATE users SET email = 'dev0@example.com' WHERE username = 'dev0'"
    // );
    // console.log(rows);

    // recommended way to do this
    // const [rows] = await dbWithDatabase.execute(
    //   "UPDATE users SET username = ? WHERE email = ?",
    //   ["dev000", "dev0@example.com"]
    // );
    // console.log(rows);

    // 6️⃣ CRUD operations (Select) Read
    const [rows] = await dbWithDatabase.execute("SELECT * FROM stock_data");
    // const [rows] = await dbWithDatabase.execute("SELECT * FROM users where username = 'dev'");
    console.log("✅ Data Retrieved from stock_data table:", rows);

    // 8️��� CRUD operations (Delete) Delete
    // const [rows] = await dbWithDatabase.execute(
    //   "DELETE FROM users WHERE username = 'John Doe'"
    // );
    // const [rows] = await dbWithDatabase.execute(
    //   "DELETE FROM users WHERE username = ?",['dev000']
    // );
    // console.log(rows);

    // ✅ MySQL Connection Close
    await dbWithDatabase.end();
  } catch (error) {
    console.error("❌ Error Occurred:", error);
  }
};

// Function Call
setupDatabase();
