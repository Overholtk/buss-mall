//stores all product objects in an array
var allProducts = [];
//assigns each img element as a variable to be used in the render function
var imgElementOne = document.getElementById('labelOne');
var imgElementTwo = document.getElementById('labelTwo');
var imgElementThree = document.getElementById('labelThree');

//constructor function for product object
function Product(source, name){
  this.source = source;
  this.title = name;
  this.alt = name;
  this.totalDisplay = 0;
  this.totalClicks = 0;

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

function getRandomIndex(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function imageRender(imageElement){
  var randomIndex = getRandomIndex(0, allProducts.length - 1);

  imageElement.src = allProducts[randomIndex].source;
  imageElement.alt = allProducts[randomIndex].name;
  imageElement.title = allProducts[randomIndex].name;
}

