const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;
const cors = require('cors');
const bodyParser = require("body-parser");


// CORS 설정
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "bbs",
});

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

// app.get("/", (req, res) => {
//   const sqlQuery = "INSERT INTO requested (rowno) VALUES (1)";
//   db.query(sqlQuery, (err, result) => {
//     res.send("success!");
//   });
// });

app.get("/list", (req, res) => {
    const sqlQuery = "SELECT BOARD_ID, BOARD_TITLE, REGISTER_ID, DATE_FORMAT(REGISTER_DATE, '%Y-%m-%d') AS REGISTER_DATE FROM BOARD;";
    db.query(sqlQuery, (err, result) => {
      res.send(result);
    });
  });


  app.post("/insert", (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let username = req.body.username;
  
    const sqlQuery =
      "INSERT INTO BOARD (BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) VALUES (?,?,?);";
    db.query(sqlQuery, [title, content, username], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error inserting data.");
        return;
      }
      res.send(result);
    });
});


  
  app.post("/update", (req, res) => {
    var title = req.body.title;
    var content = req.body.content;
  
    const sqlQuery =
      "UPDATE BOARD SET BOARD_TITLE = ?, BOARD_CONTENT = ?, UPDATER_ID) FROM (?,?,?);";
    db.query(sqlQuery, [title, content, username], (err, result) => {
      res.send(result);
    });
  });

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

