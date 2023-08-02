const fs = require("fs");
const http = require("http");
const url = require("url");

// FILES
const ratingInput = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const ratingObject = JSON.parse(ratingInput);

// console.log(ratingObject);

// SERVER

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/summary") {
    res.end("this is the results summary");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end(<h1>"Page not found!"</h1>);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
