"use strict"

const URL = "https://api.thecatapi.com/v1/images/search?limit=10";
const btnGetPictures = document.querySelector(".gallery__button");
const imagesContainer = document.querySelector(".gallery__items");
const loader = document.getElementById("loader");

const makeImage = (arr) => {
	for (let elem of arr) {
		let imageblock = document.createElement("div");
		imageblock.classList.add("galery__item");
		imagesContainer.appendChild(imageblock);
		let image = document.createElement("img");
		image.src = elem.url;
        image.addEventListener('error', () => image.src = "../leo.jpg");
		image.alt = "nice cat";
		image.classList.add("gallery__item-img");
		imageblock.appendChild(image);
	}
}


const getImages = async () => {
	try {
		loader.style.display = "flex";
		const res = await fetch(URL);
		if (!res.ok) {
       	throw new Error("Image upload failed");
     	}
		const data = await res.json();
		if (data) {
			makeImage(data);
		}
	} catch (error) {
        console.error("Error:" + error.message);
	} finally {
		loader.style.display = "none";
	}
}

btnGetPictures.addEventListener("click", getImages);
