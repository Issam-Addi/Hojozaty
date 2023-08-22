const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "ZhQrZ951";
let generatedUserId

app.post("/records", async function (req, res) {
  try {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const checkEmail = await pool.query("SELECT email FROM users where email = $1",[email]);
    if (checkEmail.rows.length == 0) {
      const all_records = await pool.query("INSERT INTO users (username,phone_number, email, password,type_id,flags) VALUES($1, $2, $3 , $4 , $5, $6) RETURNING *",
        [name, phone, email, password, 0, 1]);
      res.json(all_records.rows);
    } else {
      res.json("taken");
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/records", async function (req, res) {
  try {
    const all_records = await pool.query("SELECT * FROM users where flags=1 and type_id=0 or type_id=1 ");
    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/records/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const record = await pool.query("SELECT * FROM users WHERE userid = $1", [id,]);
    res.json(record.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/records/:userid", async function (req, res) {
  try {
    const { userid } = req.params;
    let id = req.body.id;
    if (id == 0) {
      id = 1;
    } else {
      id = 0;
    }
    const record = await pool.query("UPDATE users SET type_id = $1 WHERE userid = $2",[id, userid]);
    res.send("Updated Successfully");
  } catch (err) {
    console.log(err.message);
  }
});

let useremail = "";
let userpassword = "";
let generatedRes;

app.post("/recordp", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    useremail = email;
    userpassword = password;
    const all_records = await pool.query("SELECT * FROM users");
    const res_id = await pool.query(`SELECT *  FROM restaurant JOIN users ON restaurant.user_id = users.userid WHERE users.email = $1`, [useremail]);
    generatedRes = res_id.rows;
    let persons = all_records.rows;
    persons.map((user) => {
      if (user.email == email) {
        if (user.password == password) {
          const token = jwt.sign({ email: user.email, password: user.password }, secretKey, { expiresIn: "9weeks" });
          generatedUserId = user.userid;
          res.json([token, user.type_id, user]);
        }
      }
    });
      res.json({email,password});
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/generatedRes", async function (req, res) {
  try {
    res.json(generatedRes);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/recordpId", async function (req, res) {
  try {
    const email = useremail;
    const password = userpassword;
    const currentRecord = await pool.query("SELECT * FROM users WHERE email = '" + email + "' AND password = '" + password + "'");
    let person = currentRecord.rows;
    res.json(person);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/recordrId/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const currentRecord = await pool.query("SELECT * FROM restaurant WHERE restaurant_id = '" + id + "'");
    let person = currentRecord.rows;
    res.json(person);
  } catch (err) { }
});

app.get("/recordtable/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const currentRecord = await pool.query("SELECT * FROM res_table WHERE restaurant_id = '" + id + "' AND flags = '" + 1 + "' AND table_status = 'available' ");
    let table = currentRecord.rows;
    res.json(table);
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/recordss/:userid", async function (req, res) {
  try {
    const { userid } = req.params;
    const deleteRecord = await pool.query("UPDATE users SET flags = 0 WHERE userid = $1",[userid]);
    res.send("Deleted Successfully");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/restaurants", async function (req, res) {
  try {
    const all_records = await pool.query("SELECT * FROM restaurant JOIN users ON users.userid = restaurant.user_id WHERE users.flags = 1 ;");
    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});

let generatedId;
app.post("/restaurants", async function (req, res) {
  try {
    const name = "";
    const phone = "";
    const email = req.body.email;
    const password = "aaa";
    const all_records_to_user = await pool.query("INSERT INTO users (username,phone_number, email, password,type_id,flags) VALUES($1, $2, $3 , $4 , $5,$6) RETURNING userid",[name, phone, email, password, 2, 1]);
    generatedId = all_records_to_user.rows[0].userid;
    const restaurant_name = "";
    const contact_number = "";
    const user_id = generatedId;
    const all_records_to_restaurant = await pool.query("INSERT INTO restaurant (restaurant_name ,contact_number, user_id) VALUES($1, $2, $3) RETURNING *",[restaurant_name, contact_number, user_id]);
    const all = { user: all_records_to_user.rows, restaurant: all_records_to_restaurant.rows };
    res.json(all);
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/restaurants/:userid", async function (req, res) {
  try {
    const { userid } = req.params;
    const deleteRecord = await pool.query("UPDATE users SET flags = 0 WHERE userid = $1",[userid]);
    res.send("Deleted Successfully");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/reporters", async function (req, res) {
  try {
    const all_records = await pool.query("SELECT * FROM contacts");
    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/aboutEdit/:about_id", async function (req, res) {
  try {
    const { about_id } = req.params;
    const about_title = req.body.content;
    const record = await pool.query("UPDATE aboutus SET about_title = $1  WHERE about_id = $2",[about_title, about_id]);
    res.send("Updated Successfully");
  } catch (err) {
    console.log(err.message);
  }
});

// بدي اعدل هون واحط الايميل وقت الانتهاء

app.post("/orders", async function (req, res) {
  try {
    const email = req.body.email;
    const table_number = req.body.tableNumber;
    const order_time = req.body.time;
    const order_date = req.body.date;
    const userid = req.body.userid;
    const restaurant_id = req.body.restaurant_id;
    const all_records = await pool.query(
      "INSERT INTO orders (table_number,order_time, order_date ,user_id ,restaurant_id ,status ,guest_number ) VALUES($1, $2, $3 , $4,$5,$6,$7 ) RETURNING *",
      [ table_number, order_time, order_date, userid, restaurant_id, "pending", 2, ]);
    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/contacts", async function (req, res) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;
    const all_records = await pool.query(
      "INSERT INTO contacts (name,email, phone, message ,user_id) VALUES($1, $2, $3 , $4 ,$5) RETURNING *",
      [name, email, phone, message, generatedUserId]
    );
    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/restaurants/:type_food", (req, res) => {
  const { type_food } = req.params;
  pool.query("SELECT * FROM restaurant WHERE type_food = $1",[type_food],(error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(results.rows);
      }
    }
  );
});


app.get("/aboutus", async (req, res) => {
  try {
    const query = "SELECT about_title, about_us FROM aboutus";
    const { rows } = await pool.query(query);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put("/aboutus", async (req, res) => {
  const { about_title, about_us } = req.body;
  try {
    const query = "UPDATE aboutus SET about_title = $1, about_us = $2";
    await pool.query(query, [about_title, about_us]);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/restaurant", async function (req, res) {
  try {
    const { restaurant_name, address, contact_number, type_food, des, img, food_image } = req.body;
    const newRecord = await pool.query(
      "INSERT INTO restaurant (restaurant_name, address, contact_number, type_food, des, img, food_image) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [ restaurant_name, address, contact_number, type_food, des, img, food_image ]);
    res.json(newRecord.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/restaurant/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const restaurant = await pool.query(
      "SELECT * FROM restaurant WHERE restaurant_id = $1",
      [id]
    );

    res.json(restaurant.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/restaurant/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { restaurant_name, address, contact_number, type_food, des, img, food_image, password } = req.body;
    const updated_restaurant = await pool.query(
      "UPDATE restaurant SET restaurant_name = $1, address = $2, contact_number = $3, type_food = $4, des = $5, img = $6, food_image = $7 WHERE restaurant_id = $8",
      [ restaurant_name, address, contact_number, type_food, des, img, food_image, id ]);
    const updatePassword = await pool.query("UPDATE users SET password = $1 WHERE email = $2", [password, useremail]);
    res.json(updated_restaurant.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/table", async function (req, res) {
  try {
    const { table_number, available_time_start, guest_number, available_time_end, img, table_status, restaurant_id } = req.body;
    const check_table_number = await pool.query("SELECT * FROM res_table WHERE table_number = $1", [table_number]);
    if (check_table_number.rows.length === 0) {
      const newRecord = await pool.query(
        "INSERT INTO res_table (table_number, available_time_start, guest_number, available_time_end, img, table_status, flags, restaurant_id) VALUES($1, $2, $3, $4, $5, $6,'0', $7) RETURNING *",
        [ table_number, available_time_start, guest_number, available_time_end, img, table_status, restaurant_id ]);
      res.json(newRecord.rows);
    } else {
      res.send("Table number is Already taken!");
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await pool.query("SELECT * FROM orders WHERE restaurant_id = $1", [id]);
    res.json(order.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/tableStatus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const status = req.body.status;
    const table_status = await pool.query("UPDATE res_table SET table_status = $1 WHERE table_number = $2", [status, id]);
    res.json(table_status.rows);
  } catch (err) {
    console.log(err.message);
  }
})

app.get("/orderedEmail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const orderedEmail = await pool.query("SELECT email FROM users WHERE userid = $1", [id]);
    res.json(orderedEmail.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await pool.query("UPDATE orders SET status = $2 WHERE orders_id = $1", [id, status]);
    res.json(order.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/payment", async function (req, res) {
  try {
    const username = req.body.username;
    const cardnumber = req.body.cardNumber;
    const hashedCardNumber = bcrypt.hashSync(cardnumber, 10);
    const datecard = req.body.datecard;
    const cvc = req.body.cvc;
    const userid = req.body.userid;
    const newPayment = await pool.query(
      "INSERT INTO payment (username, cardnumber, datecard, cvc, userid) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [username, hashedCardNumber, datecard, cvc, userid]);
    res.json(newPayment.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/paymentData", async (req, res) => {
  try {
    const paymentData = await pool.query(
      "SELECT * FROM payment "
    );
    res.json(paymentData.rowCount);
  } catch (err) {
    console.log(err.message);
  }
});


app.get("/ordersData", async (req, res) => {
  try {
    const ordersData = await pool.query(
      "SELECT * FROM orders "
    );
    res.json(ordersData.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/restaurantTables", async (req, res) => {
  try {
    const restaurantTablesData = await pool.query("SELECT * FROM res_table");
    const pendingTablesData = await pool.query("SELECT * FROM res_table WHERE flags = 0 ");
    const restaurantTables = restaurantTablesData.rows
    const pendingTables = pendingTablesData.rows
    res.json({ restaurantTables, pendingTables });
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/user/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE userid = $1 ", [id]);
    res.json(user.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/user/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { username, email, phone_number, password } = req.body;
    const user = await pool.query(
      "UPDATE users SET username = $1 ,email = $2 ,phone_number = $3 , password = $4 WHERE userid = $5 ",
      [username, email, phone_number, password, id]);
    res.json(user.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/userOrders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await pool.query("SELECT * FROM orders WHERE user_id = $1",[id]);
    res.json(order.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/oldOrders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await pool.query("SELECT * FROM orders WHERE user_id = $1 and status = 'completed' ", [id]);
    res.json(order.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/deleteOrders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await pool.query("DELETE FROM orders WHERE orders_id = $1 ", [id]);
    res.json(order.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/restaurantsAll", (req, res) => {
  pool.query("SELECT * FROM restaurant", (error, results) => {
    if (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results.rows);
    }
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

