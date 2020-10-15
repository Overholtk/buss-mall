//Global Variables:
//stores all product objects in an array
var allProducts = [];
//assigns each img element as a variable to be used in the render function
var imgElementOne = document.getElementById('imgOne');
var imgElementTwo = document.getElementById('imgTwo');
var imgElementThree = document.getElementById('imgThree');
// array of recent indexes
var recentRandomIndex = [];
// element with images
var imgContainer = document.getElementById('producImgs');
//global variable for total number of rounds
var rounds = 3;
var roundsSoFar = 0;
// array that holds each objects number of clicks
var objectClickTotals = [];
// array that holds the names of the objects only
var objectNamesList = [];
// array that holds the number of times an object was seen
var objectSeenTotals = [];

//Constructor function:
//constructor function for product object
function Product(source, name){
  this.source = source;
  this.title = name;
  this.alt = name;
  this.seen = 0;
  this.clicks = 0;

  allProducts.push(this);
  objectNamesList.push(this.title);
}

//Helper functions:
//calculates a random number to determine the index of the images displayed
function getRandomIndex(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}


//renders a random non duplicate image in the specified element
function imageRender(imageElement){
  var randomIndex = getRandomIndex(0, allProducts.length - 1);
  console.log(randomIndex);
  //checks the generated index against the array to make sure it is not a dupe
  while(recentRandomIndex.includes(randomIndex)){
    randomIndex = getRandomIndex(0, allProducts.length - 1);
    console.log(randomIndex);
    console.log('we changed index');
  }

  recentRandomIndex.push(randomIndex);
  console.log(recentRandomIndex);
  allProducts[randomIndex].seen++;
  console.log('I saw it!' + allProducts[randomIndex].seen);
  //populates image element
  imageElement.src = allProducts[randomIndex].source;
  imageElement.alt = allProducts[randomIndex].title;
  imageElement.title = allProducts[randomIndex].title;

  //pulls data out of the array once it becomes 5 indecises long
  if(recentRandomIndex.length >= 5){
    recentRandomIndex.shift();
    console.log('if is working');
    console.log(recentRandomIndex);
  }
}

// tallies votes and generates next set of images
function handleClick(){
  var productChoice = event.target.title;
  console.log(productChoice);

  //tallies vote for chosen object
  for(var i = 0; i < allProducts.length; i++){
    if(productChoice === allProducts[i].title){
      console.log('increasing votes for ' + allProducts[i].title);
      allProducts[i].clicks++;
      console.log('clicks' + allProducts[i].clicks);
    }
  }
  imageRender(imgElementOne);
  imageRender(imgElementTwo);
  imageRender(imgElementThree);
  roundsSoFar++;
  console.log(roundsSoFar);

  //removes click handler once the maximum amount of rounds has been reached
  if(roundsSoFar >= rounds){
    imgContainer.removeEventListener('click', handleClick);
  }
}

// renders voting statistics
function renderStats(){
  var base = document.getElementById('stats');
  for(var i = 0; i < allProducts.length; i++){
    var newLine = document.createElement('p');
    base.appendChild(newLine);
    var node = document.createTextNode(allProducts[i].title + ' was seen ' + allProducts[i].seen + ' times and voted for ' + allProducts[i].clicks + ' times.');
    console.log(allProducts[i].title + ' was seen ' + allProducts[i].seen + ' times and voted for ' + allProducts[i].clicks + ' times.');
    base.appendChild(node);
  }
  populateClickArray();
  populateSeenArray();
  var chartBase = document.getElementById('stats').getContext('2d');
  // chartBase.appendChild(chart);
  var myChart = new Chart(chartBase, {
    type: 'bar',
    data: {
      labels: objectNamesList,
      datasets: [{
        label: 'Votes Per Item',
        data: objectClickTotals,
        backgroundColor: [
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
        ],
        borderColor: [
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
          'rgb(209, 209, 209)',
        ],
        borderWidth: 6
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//puts the vote totals for each object into the objectClickTotals array
function populateClickArray(){
  for(var i = 0; i <allProducts.length; i++){
    objectClickTotals.push(allProducts[i].clicks);
  }
}

function populateSeenArray(){
  for(var i = 0; i < allProducts.length; i++){
    objectSeenTotals.push(allProducts[i].seen);
  }
}

// checks for local storage
function checkLocal(){
  if(){

  }
}

//creates object for each product
new Product('img/bag.jpg', 'bag');
new Product('img/banana.jpg', 'banana');
new Product('img/bathroom.jpg', 'bathroom');
new Product('img/boots.jpg', 'boots');
new Product('img/breakfast.jpg', 'breakfast');
new Product('img/bubblegum.jpg', 'bubblegum');
new Product('img/chair.jpg', 'chair');
new Product('img/cthulhu.jpg', 'cthulhu');
new Product('img/dog-duck.jpg', 'dog-duck');
new Product('img/dragon.jpg', 'dragon');
new Product('img/pen.jpg', 'pen');
new Product('img/pet-sweep.jpg', 'pet-sweep');
new Product('img/scissors.jpg', 'scissors');
new Product('img/shark.jpg', 'shark');
new Product('img/sweep.png', 'sweep');
new Product('img/tauntaun.jpg', 'tauntaun');
new Product('img/unicorn.jpg', 'unicorn');
new Product('img/usb.gif', 'usb');
new Product('img/water-can.jpg', 'water-can');
new Product('img/wine-glass.jpg', 'wine-glass');

// render initial images
imageRender(imgElementOne);
imageRender(imgElementTwo);
imageRender(imgElementThree);

//adds event listeners
imgContainer.addEventListener('click', handleClick);
document.getElementById('submit').addEventListener('click', renderStats);

// console.log('my origional array: ' + allProducts);

// turn the array into JSON

var stringifyProducts = JSON.stringify(allProducts);
console.log('array as JSON: ' + stringifyProducts);

// put JSON into local storage
localStorage.setItem('products', stringifyProducts);

// get items out of storage
var productsFromLocalStorage = localStorage.getItem('products');

// parse array back into data
var parsedProducts = JSON.parse(productsFromLocalStorage);
console.log(parsedProducts);

// run data through a new constructor function
function ReconstructProduct (source, name){
  this.source = source;
  this.title = name;
  this.alt = name;

  this.clicksUpdate = 0;
  this.seenUpdate = 0;
}

console.log(parsedProducts[1].source);

for (var i = 0; i < parsedProducts.length; i++){
console.log(new ReconstructProduct(parsedProducts[i].source, parsedProducts[i].title));
}

