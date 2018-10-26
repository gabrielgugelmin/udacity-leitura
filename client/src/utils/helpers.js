export function convertDate(timestamp) {
  var date = new Date(timestamp);

  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());
  const year = String(date.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${day}/${month}/${year}`;
}

// https://gist.github.com/gordonbrander/2230317
export function generateID() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

// https://medium.com/dailyjs/rewriting-javascript-converting-an-array-of-objects-to-an-object-ec579cafbfc7
export function arrayToObject (array, keyField) {
  return array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {})
}


export function copyToClipboard (text) {
  var body = document.querySelector('body');
  var tempInput = document.createElement('input');
  body.appendChild(tempInput);
  tempInput.setAttribute('value', text)
  tempInput.select();
  document.execCommand('copy');
  body.removeChild(tempInput);
};
