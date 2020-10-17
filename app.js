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
var rounds = 25;
var roundsSoFar = 0;
// array that holds each objects number of clicks
var objectClickTotals = [];
// array that holds the names of the objects only
var objectNamesList = [];
// array that holds the number of times an object was seen
var objectSeenTotals = [];

//check if there is something in local storage and get storage or create items
if(!localStorage.getItem('products')){
  constructAllItems();
} else {
  // get items out of storage
  var productsFromLocalStorage = localStorage.getItem('products');
  // parse array back into data
  var parsedProducts = JSON.parse(productsFromLocalStorage);
  // create objects for data from local storage
  for (var i = 0; i < parsedProducts.length; i++){
    new Product(parsedProducts[i].source, parsedProducts[i].title, parsedProducts[i].seen, parsedProducts[i].clicks);
  }
}

//Constructor function:
//constructor function for product object
function Product(source, name, seen = 0, clicks = 0){
  this.source = source;
  this.title = name;
  this.alt = name;
  this.seen = seen;
  this.clicks = clicks;

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
  //checks the generated index against the array to make sure it is not a dupe
  while(recentRandomIndex.includes(randomIndex)){
    randomIndex = getRandomIndex(0, allProducts.length - 1);
  }

  recentRandomIndex.push(randomIndex);
  allProducts[randomIndex].seen++;
  console.log(allProducts[randomIndex] + ' seen: ' + allProducts[randomIndex].seen++);
  //populates image element
  imageElement.src = allProducts[randomIndex].source;
  imageElement.alt = allProducts[randomIndex].title;
  imageElement.title = allProducts[randomIndex].title;

  //pulls data out of the array once it becomes 5 indecises long
  if(recentRandomIndex.length >= 5){
    recentRandomIndex.shift();
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
  console.log('rounds: ' + roundsSoFar);

  //removes click handler once the maximum amount of rounds has been reached
  if(roundsSoFar >= rounds){
    imgContainer.removeEventListener('click', handleClick);
    // turn the array into JSON
    var stringifyProducts = JSON.stringify(allProducts);

    // put JSON into local storage
    localStorage.setItem('products', stringifyProducts);
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
  //displays chart
  var myChart = new Chart(chartBase, {
    type: 'bar',
    data: {
      labels: objectNamesList,
      datasets: [{
        label: 'Votes Per Item',
        data: objectClickTotals,
        backgroundColor: ('rgba(255, 245, 112, 0.8'),
        borderColor: ('rgba(255,252, 198, 0.9'),
        borderWidth: 4,
        hoverBorderWidth: 8,
        hoverBackgroundColor: ('rgba(255, 245, 112, 0.8)'),
        hoverBorderColor: ('rgba(255,252, 198, 0.9)'),
      }, {
        label: 'Views Per Item',
        data: objectSeenTotals,
        backgroundColor: ('rgba(255, 172, 46, 0.8)'),
        borderColor: ('rgba(255, 189, 88, 0.9)'),
        borderWidth: 4,
        hoverBorderWidth: 8,
        hoverBackgroundColor: ('rgba(255, 172, 46, 0.8)'),
        hoverBorderColor: ('rgba(255, 189, 88, 0.9)'),
      }],
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
//puts the seen totals for each object into the objectSeenTotals array
function populateSeenArray(){
  for(var i = 0; i < allProducts.length; i++){
    objectSeenTotals.push(allProducts[i].seen);
  }
}


//creates object for each product
function constructAllItems(){
  var bag = new Product('img/bag.jpg', 'bag');
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
}

// render initial images
imageRender(imgElementOne);
imageRender(imgElementTwo);
imageRender(imgElementThree);

//adds event listeners
imgContainer.addEventListener('click', handleClick);
document.getElementById('submit').addEventListener('click', renderStats);



