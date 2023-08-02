const fs = require("fs");
const http = require("http");
const url = require("url");
// const replaceTemplate = require("./modules/replaceTemplate");

// FILES
const ratingInput = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const ratingObject = JSON.parse(ratingInput);

const tempSummary = fs.readFileSync(
  `${__dirname}/template-summary.html`,
  "utf-8"
);
const tempRatingCard = fs.readFileSync(
  `${__dirname}/template-rating-card.html`,
  "utf-8"
);

// SERVER
const replaceTemplate = (temp, rating) => {
  let output = temp.replace(/{%CATEGORY%}/g, rating.category);
  output = output.replace(/{%SCORE%}/g, rating.score);
  output = output.replace(/{%ICON%}/g, rating.icon);
  return output;
};
const server = http.createServer((req, res) => {
  const pathName = req.url;

  // summary page
  if (pathName === "/" || pathName === "/summary") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const resultsHtml = ratingObject
      .map((el) => replaceTemplate(tempRatingCard, el))
      .join("");
    const output = tempSummary.replace("{%RATINGCARD%}", resultsHtml);

    console.log(resultsHtml);
    console.log(typeof resultsHtml);

    res.end(output);

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
