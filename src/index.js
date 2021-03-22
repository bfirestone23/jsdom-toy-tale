let addToy = false;
let parentDiv = document.getElementById('toy-collection');


document.addEventListener("DOMContentLoaded", () => {
  getToyData().then(toys => {
    toys.forEach(toy => {
      renderToyData(toy)
    })
  })
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getToyData() {
  return fetch("http://localhost:3000/toys")
    .then(response => response.json());
};

function likes(e) {
  e.preventDefault();
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
  .then(res => res.json())
  .then((like_obj => {
    e.target.previousElementSibling.innerText = `${more} likes`;
    e.target.reset;
  }))
};

function renderToyData(toy) {
  let h2 = document.createElement('h2');
  h2.innerText = toy.name;

  let img = document.createElement('img');
  img.className = 'toy-avatar';
  img.src = toy.image;

  let p = document.createElement('p');
  p.innerText = `${toy.likes} Likes`;

  let button = document.createElement('button');
  button.className = 'like-btn';
  button.id = toy.id;
  button.innerText = "Like <3";
  button.addEventListener("click", (e) => {
    console.log(e.target.dataset);
    likes(e);
  })


  let divCard = document.createElement('div');
  divCard.className = 'card';
  divCard.append(h2, img, p, button);

  parentDiv.append(divCard);
};

function submitNewToy(toy_data) {
  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
  };

  return fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    response.json()
  })
  .then(function(object) {
    renderToyData(object)
  })
};




