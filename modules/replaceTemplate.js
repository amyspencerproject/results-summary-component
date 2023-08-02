module.exports = (temp, rating) => {
  let output = temp.replace(/{%CATEGORY%}/g, rating.category);
  output = output.replace(/{%SCORE%}/g, rating.score);
  output = output.replace(/{%ICON%}/g, rating.icon);
};
