const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
/*
- Create new html file name home.html
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
// app.get('/Welcome', (req, res) => {
//   fs.readFile('myWebPage.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end();
//   });
// });
router.get("/home", (req, res) => {
  fs.readFile("home.html", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get("/profile", (req, res) => {
  fs.readFile("user.json", "utf8", (err, data) => {
    res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
    res.end(data);
  });
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post("/login", (req, res) => {
  fs.readFile("user.json", "utf8", (err, data) => {
    const userData = JSON.parse(data);
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({
        status: false,
        message: "Username or password is missing.",
      });
    }

    if (username === userData.username && password === userData.password) {
      res.json({ status: true, message: "User is valid." });
    } else if (username !== userData.username) {
      res.json({ status: false, message: "Username is invalid." });
    } else if (password !== userData.password) {
      res.json({ status: false, message: "Password is invalid." });
    }
  });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get("/logout", (req, res) => {
  const { username } = req.query;
  res.send(`<b>${username} successfully logged out.`);
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err, req, res, next) => {
  res.status(500).send("Server Error");
});

app.use("/", router);

app.listen(process.env.port || 8081);

console.log("Web Server is listening at port " + (process.env.port || 8081));
