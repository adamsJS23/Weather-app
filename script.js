async function AJAX(url) {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error("Invalid city name, please enter a valid city name");

    const data = await response.json();
    console.log(data);
  } catch (err) {
    throw err;
  }
}
console.log(navigator.language.toString().slice(-2).toLowerCase());

AJAX(`https://api.openweathermap.org/data/3.0/onecall?lat=44.2227278&lon=-0.7339&lang=${navigator.language.toString().slice(-2).toLowerCase()}&units=metric&appid=9e36b47c420fcfbcdc845a3d92921bc9`)

AJAX(
  `http://api.openweathermap.org/geo/1.0/direct?q=forli&appid=9e36b47c420fcfbcdc845a3d92921bc9`
);

const date= new Date()
console.log(date.getMonth())



const date2=new Date(1682964694000)
console.log(date2.getDay(),'day')
console.log(date2.getMonth(),'month')
console.log(date2.getHours(),'hours')
console.log(date2.getFullYear(),'year')
console.log(date2.getMinutes(),'minutes')
console.log(date2.getSeconds(),'second')
console.log(date2.getDate(),'date')

console.log(date.getTime())

const unixTimestamp = 1575909015
const milliseconds = unixTimestamp * 1000;
const dateObject = new Date(milliseconds)
console.log(dateObject)

const unixTimestamp1 = 1575909015
const milliseconds1 = unixTimestamp * 1000 
const dateObject1 = new Date(milliseconds)
const humanDateFormat1 = dateObject.toLocaleString() 
console.log(humanDateFormat1)





// I city is compsed by 2 words then replace the space underscore bobo_dioulasso