const label = document.querySelector('label');
const button = document.querySelector('button');
const body = document.querySelector('body');


function changeColor(){
  const R = Math.floor(Math.random() * 255);
  const G = Math.floor(Math.random() * 255);
  const B = Math.floor(Math.random() * 255);
  body.style.backgroundColor = `rgb(${R},${G},${B})`;
  label.innerText = `rgb(${R},${G},${B})`;
}

button.addEventListener('click', changeColor);

