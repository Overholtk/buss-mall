//stores all product objects in an array
var allProducts = [];
//assigns each img element as a variable to be used in the render function
var imgElementOne = document.getElementById('labelOne');
var imgElementTwo = document.getElementById('labelTwo');
var imgElementThree = document.getElementById('labelThree');
// array of recent indexes
var recentRandomIndex = [];
// element with images
var imgContainer = document.getElementById('productImgs');
//global variable for total number of rounds
var rounds = 5;
var roundsSoFar = 1;

//constructor function for product object
function Product(source, name){
  this.source = source;
  this.title = name;
  this.alt = name;
  this.seen = 0;
  this.clicks = 0;

  allProducts.push(this);
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


//calculates a random number to determine the index of the images displayed
function getRandomIndex(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//renders a random non duplicate image in the specified element
function imageRender(imageElement){
//wipes the array if it contains 6 elements
  if(recentRandomIndex.length >= 6){
    recentRandomIndex = [];
    console.log('if is working');
    console.log(recentRandomIndex);
  }
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
}

imageRender(imgElementOne);
imageRender(imgElementTwo);
imageRender(imgElementThree);

function handleClick(){
  var productChoice = event.target.title;
  console.log(productChoice);

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

  if(roundsSoFar >= rounds){
    imgContainer.removeEventListener('click', handleClick);
  }
}

imgContainer.addEventListener('click', handleClick);
document.getElementById('submit').addEventListener('click', renderStats);

function renderStats(){
  var base = document.getElementById('stats');
  for(var i = 0; i < allProducts.length; i++){
    var newLine = document.createElement('p');
    base.appendChild(newLine);
    var node = document.createTextNode(allProducts[i].title + ' was seen ' + allProducts[i].seen + ' times and voted for ' + allProducts[i].clicks + ' times.');
    console.log(allProducts[i].title + ' was seen ' + allProducts[i].seen + ' times and voted for ' + allProducts[i].clicks + ' times.');
    base.appendChild(node);
  }
}



