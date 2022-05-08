const addSoldIdOnObj = (array, insertId) => {
  array.forEach((s) => {
    const sold = s;
    sold.soldId = insertId;
  });
};

const removeSoldIdOnObj = (array) => {
  // const newArray = [];
  array.forEach((sale) => {
    const s = sale;
    delete s.soldId;
    // newArray.push(sale);
  });
  // return newArray;
};

module.exports = {
  addSoldIdOnObj,
  removeSoldIdOnObj,
};
