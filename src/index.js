console.log('%c HI', 'color: firebrick');

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
fetch(imgUrl)
.then(res => res.json())
.then(json => {
  const dog_image_container = document.querySelector("#dog-image-container");

  for(const url of json.message) {
    let img = document.createElement('img');
    img.setAttribute("src", url);
    dog_image_container.append(img);
  }
});

const breedUrl = 'https://dog.ceo/api/breeds/list/all';
fetch(breedUrl)
.then(res => res.json())
.then(json => {
  const dog_breeds = document.querySelector("#dog-breeds");

  for (const [key, value] of Object.entries(json.message)) {
    // console.log(`${key}: ${value}`);
    let li = document.createElement("li");
    li.textContent = key;
    li.addEventListener("click", () => {
      li.classList.toggle('red')
    });
    dog_breeds.append(li);
  }

  const breed_dropdown = document.querySelector("#breed-dropdown");
  
  breed_dropdown.addEventListener('change', () => {
    dog_breeds.innerHTML = ""
    let counter = 0;

    for (const [key, value] of Object.entries(json.message)) {
      if(key[0] === breed_dropdown.value) {
        counter++;
        let li = document.createElement("li");
        li.textContent = key;
        li.addEventListener("click", () => {
          li.classList.toggle('red')
        });
        dog_breeds.append(li);
      } else if(breed_dropdown.value === "*") {
        let li = document.createElement("li");
        li.textContent = key;
        li.addEventListener("click", () => {
          li.classList.toggle('red')
        });
        dog_breeds.append(li);
      }
    }

    if(counter === 0 && breed_dropdown.value !== "*") {
      let li = document.createElement('li');
      li.textContent = "No list found..."
      dog_breeds.append(li);
    }
  });
});

