const addSoldIdOnObj = (array, insertId) => {
  array.forEach((s) => {
    const sold = s;
    sold.soldId = insertId;
  });
};

const removeSoldIdOnObj = (array) => {
  array.forEach((sale) => {
    const s = sale;
    delete s.soldId;
  });
};

module.exports = {
  addSoldIdOnObj,
  removeSoldIdOnObj,
};
