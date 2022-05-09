const getDateHour = () => {
  const date = new Date();
  const a = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours() - 3; 
  const min = date.getMinutes();
  const s = date.getSeconds(); 

  const result = `${a}-${m}-${d} ${h}:${min}:${s}`;

  return result;
};

module.exports = getDateHour;