module.exports = (temp, rating) => {
  let output = temp.replace(/{%CLASS%}/g, rating.class);
  output = output.replace(/{%CATEGORY%}/g, rating.category);
  output = output.replace(/{%SCORE%}/g, rating.score);
  output = output.replace(/{%ICON%}/g, rating.icon);
  return output;
};
