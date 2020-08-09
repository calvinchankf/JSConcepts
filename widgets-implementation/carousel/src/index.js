// import "./styles.css";

const imageList = [
	"https://picsum.photos/750/850.jpg",
	"https://picsum.photos/600/600.jpg",
	"https://picsum.photos/500/500.jpg",
	"https://picsum.photos/700/900.jpg",
	"https://picsum.photos/900/700.jpg",
];

/**
 * Implement a carousel using the five images in the list above.
 *
 * 1) It should display the image corresponding to the url at index 0
 *    initially.
 *
 * 2) When you click "Next", it should display the image
 *    corresponding to a url at the next index in the list.
 *
 * 3) When you click "Previous", it should display the image
 *    corresponding to a url at the preceding index in the list.
 *
 * 4) If the carousel's at the last index, click on "Next" should
 *    display the image at the 0-th index (and vice versa).
 */

// TODO: Your code here

const createImgDiv = (images, idx) => {
	const imgDiv = document.createElement("img");
	imgDiv.setAttribute("class", "image image-init");
	imgDiv.setAttribute("src", images[idx]);
	return imgDiv;
};

const n = imageList.length;
let curIdx = 0;
let isAnimating = false;

const carouselDisplay = document.querySelector(".carouselDisplay");

let prevImgDiv = createImgDiv(imageList, n - 1);
carouselDisplay.appendChild(prevImgDiv);

let imgDiv = createImgDiv(imageList, 0);
carouselDisplay.appendChild(imgDiv);

let nextImgDiv = createImgDiv(imageList, 1);
carouselDisplay.appendChild(nextImgDiv);

const rotate = (delta) => {
	if (isAnimating) return;

	const nextIdx = (curIdx + n + delta) % n;
	curIdx = nextIdx;

	const dir = delta == -1 ? "left" : "right";
	prevImgDiv.setAttribute("class", `image image-slide-${dir}`);
	imgDiv.setAttribute("class", `image image-slide-${dir}`);
	nextImgDiv.setAttribute("class", `image image-slide-${dir}`);

	let newImgDiv;
	if (delta == -1) {
		newImgDiv = createImgDiv(imageList, (curIdx + n - 1) % n);
	} else {
		newImgDiv = createImgDiv(imageList, (curIdx + n + 1) % n);
	}

	isAnimating = true;
	setTimeout(() => {
		isAnimating = false;

		if (delta == -1) {
			carouselDisplay.removeChild(nextImgDiv);
			nextImgDiv = imgDiv;
			imgDiv = prevImgDiv;
			carouselDisplay.insertBefore(newImgDiv, imgDiv);
			prevImgDiv = newImgDiv;
		} else {
			carouselDisplay.removeChild(prevImgDiv);
			prevImgDiv = imgDiv;
			imgDiv = nextImgDiv;
			carouselDisplay.appendChild(newImgDiv);
			nextImgDiv = newImgDiv;
		}

		prevImgDiv.setAttribute("class", "image");
		imgDiv.setAttribute("class", "image");
		nextImgDiv.setAttribute("class", "image");
	}, 300);
};

const buttonLeft = document.querySelector(".buttonLeft");
buttonLeft.addEventListener("click", () => rotate(-1));

const buttonRight = document.querySelector(".buttonRight");
buttonRight.addEventListener("click", () => rotate(1));
