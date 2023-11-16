const getTableHeading = (title) => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let heading = "";
  for (let index = 0; index < title.length; index++) {
    if (uppercase.includes(title[index])) {
      heading += ` ${title[index].toLowerCase()}`;
    } else {
      heading += title[index];
    }
  }
  return heading;
};

export default getTableHeading;
