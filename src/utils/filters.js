export function toAge(value) {
  if (!value) return 'No Data';
  let today = new Date();
  let birthday = new Date(value);
  // console.log(today, birthday);
  let thisYear = today.getFullYear();
  let birthYear = birthday.getFullYear();
  let yearAge = thisYear - birthYear;
  let thisBirth = birthday.getFullYear(thisYear);
  if (today.getTime() > thisBirth) {
    yearAge--;
  }
  return `${birthYear}년생 / 만 ${yearAge}세`;
}
