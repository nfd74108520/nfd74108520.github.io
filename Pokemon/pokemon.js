let container = document.getElementById("container");
let timer = document.getElementById("timer");
let index = 1;

var xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
  true
);
xhr.onload = function () {
  if (xhr.status == 200) {
    console.log("success");
  }
};
xhr.send();

window.onload = setPokemon();

function setPokemon() {
  document.getElementsByTagName("h1")[0].innerHTML = "Pokemon Album";
}

function fetchPokemon() {
  let pokemons = "";
  for (let i = 1; i < 899; i++) {
    let img = document.createElement("img");
    let fileName = i.toString().padStart(3, "0");
    img.setAttribute(
      "src",
      `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${fileName}.png`
    );
    img.addEventListener("click", removeSingleImg);
    container.appendChild(img);
    index = i;
  }
}

let btn = document.getElementById("btn");
btn.onclick = fetchPokemon;

let btn2 = document.getElementById("btn2");
btn2.addEventListener("click", fetchPokemon);

function fetchPokemon_clear() {
  container.innerHTML = "";
  index = 1;
  clearTime();
}

function removeImg() {
  let len = container.childNodes.length;
  if (len > 0) {
    container.removeChild(container.childNodes[len - 1]);
    if (index > 1) {
      index--;
    } else {
      index = 1;
    }
  }
}

function removeSingleImg() {
  container.removeChild(event.target);
}

function addPokemon() {
  let img = document.createElement("img");
  if (index < 899) {
    let fileName = index.toString().padStart(3, "0");
    img.setAttribute(
      "src",
      `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${fileName}.png`
    );
    img.addEventListener("click", removeSingleImg);
    container.appendChild(img);
    index++;
  }
}

timer.onclick = setTime;

let setID = [];

function setTime() {
  setID.push(setInterval(addPokemon, 50));
}

function clearTime() {
  setID.forEach((item) => {
    clearInterval(item);
  });
}
