const http = require("http");
const fs = require("fs");

const ERROR = {
  ERROR: "[ERROR] There was an error. Debug Website to get more info.",
  SET_ERROR:
    "[ERROR] Invalid set value {x}. Must be not negative and less than 1_000_000.",
};
const SUCCESS = {
  INC: "[INC] Counter increased to {x}.",
  DEC: "[DEC] Counter decreaset to {x}.",
  RES: "[RESET] Counter reset to 0.",
  SET: "[SET] Counter set to {x}.",
};


let path = ".";
let logObj = { msg: "" };
const server = http.createServer(function (req, res) {
  path = "." + req.url;
  console.log(`\${req.method} request received at \${req.url}`);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200; // 200 = OK
    displayHTML(res);
    res.end();
  } else if (req.url === "/inc") {
    // increment
    // front end calls json
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200; // 200 = OK
    let data = readData();
    data.counter = Number.parseInt(data.counter) + 1;
    data.playSound = true;
    writeData(data);

    logObj.msg = SUCCESS.INC.replace("{x}", data.counter);
    res.write(JSON.stringify(logObj));
    res.end();
  } else if (req.url === "/dec") {
    // front end calls json
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200; // 200 = OK
    let data = readData();
    data.counter = Number.parseInt(data.counter) - 1;
    data.playSound = true;
    writeData(data);

    logObj.msg = SUCCESS.DEC.replace("{x}", data.counter);
    res.write(JSON.stringify(logObj));
    res.end();
  } else if (req.url === "/reset") {
    // front end calls json
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200; // 200 = OK
    let data = readData();
    data.counter = 0;
    writeData(data);

    logObj.msg = SUCCESS.RES.replace("{x}", data.counter);
    res.write(JSON.stringify(logObj));
    res.end();
  } else if (req.url.match(/set\?/g)) {
    // front end calls json
    //TODO: zu tun
    let query = req.url.split("?")[1];
    let param = new URLSearchParams(query);
    let number = param.get("n");
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200; // 200 = OK
    if (isNaN(number) || number < 0 || number > 1000000) {
      res.statusCode = 400; // 200 = OK
      logObj.msg = ERROR.SET_ERROR.replace("{x}", number);
      res.write(JSON.stringify(logObj));
      res.end();
      return;
    }
    let data = readData();
    data.counter = number;
    writeData(data);

    logObj.msg = SUCCESS.SET.replace("{x}", data.counter);
    res.write(JSON.stringify(logObj));
    res.end();
  } else if (req.url === "/json") {
    // front end calls json
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200; // 200 = OK
    let data = readData();
    res.write(JSON.stringify(data));
    res.end();
  } else if (req.url === "/played") {
    // front end calls json
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200; // 200 = OK
    let data = readData();
    data.playSound = false;
    writeData(data);
    res.write("{}");
    res.end();
  }

  //Images
  else if (req.url.match(/\.png/g)) {
    fs.access(path, fs.constants.F_OK | fs.constants.R_OK, (err) => {
      console.log(`${path} ${err ? "does not exist" : "exists"}`);
      if (err === null) {
        res.setHeader("Content-Type", "image/png");
        res.statusCode = 200; // 200 = OK
        res.write(fs.readFileSync(path));
        res.end();
      } else {
        res.setHeader("Content-Type", "text/html");
        res.statusCode = 400; // 400 = Bad request
        res.write("<h1>Sorry, this page is not available</h1>");
        res.end();
      }
    });
  }
  // CSS Files
  else if (req.url.match(/\.css/g)) {
    fs.access(path, fs.constants.F_OK | fs.constants.R_OK, (err) => {
      console.log(`${path} ${err ? "does not exist" : "exists"}`);
      if (err === null) {
        res.setHeader("Content-Type", "text/css");
        res.write(fs.readFileSync(path));
        res.statusCode = 200;
        res.end();
      } else {
        res.setHeader("Content-Type", "text/html");
        res.statusCode = 400; // 400 = Bad request
        res.write("<h1>Sorry, this page is not available</h1>");
        res.end();
      }
    });
    // Javascript
  } else if (req.url.match(/\.js/g)) {
    fs.access(path, fs.constants.F_OK | fs.constants.R_OK, (err) => {
      console.log(`${path} ${err ? "does not exist" : "exists"}`);
      if (err === null) {
        res.setHeader("Content-Type", "text/javascript");
        res.write(fs.readFileSync(path));
        res.statusCode = 200;
        res.end();
      } else {
        res.setHeader("Content-Type", "text/html");
        res.statusCode = 400; // 400 = Bad request
        res.write("<h1>Sorry, this page is not available</h1>");
        res.end();
      }
    });
  
} else if (req.url.match(/\.mp3/g)) {
      res.write(fs.readFileSync(path));
      res.statusCode = 200;
      res.end();
}
   else {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 400; // 400 = Bad request
    res.write("<h1>Sorry, this page is not available</h1>");
    res.end();
  }
});

server.listen(8000, function () {
  console.log("Listening on port http://localhost:8000");
});


function displayHTML(res) {
  let data = fs.readFileSync("./index.html", "utf-8");
  res.write(data);
  
}

function writeData(data) {
  let strData = JSON.stringify(data);
  fs.writeFileSync("./data.json", strData);
}

function readData() {
  let data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
  return data;
}
