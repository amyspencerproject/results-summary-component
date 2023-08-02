const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

// FILES
const ratingInput = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const ratingObject = JSON.parse(ratingInput);

const tempSummary = fs.readFileSync(
  `${__dirname}/template-summary.html`,
  "utf-8"
);

// SERVER

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // summary page
  if (pathName === "/" || pathName === "/summary") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const resultsHtml = ratingObject
      .map((id) => replaceTemplate(tempSummary, id))
      .join("");
    res.end(resultsHtml);

    //page not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
