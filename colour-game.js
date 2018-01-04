var numSquares = 6;
var colours = [];
var pickedColour;
// selectors
var squares = document.querySelectorAll(".square");
var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", function(){
	reset();
})

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		})
	}
}

function setupSquares(){
	for (var i = 0; i < squares.length; i++){
	// add click listeners to squares
		squares[i].addEventListener("click", function(){
			// grab colour of clicked sqaure
			var clickedColour = this.style.backgroundColor;
			//compare colour to pickedColour
			if (clickedColour === pickedColour){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColours(clickedColour);
				h1.style.backgroundColor = clickedColour;
			}
			else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function reset(){
	// generate random colours based on numSquares
	colours = generateRandomColours(numSquares);
	// pick new random colour from array
	pickedColour = pickColour();
	// change color display to match picked color
	colourDisplay.textContent = rgbToHex(pickedColour);
	resetButton.textContent = "New Colours";
	messageDisplay.textContent = "";
	// change colours of squares
	for(var i = 0; i < squares.length; i++){
		if(colours[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colours[i];
		}
		else{
			squares[i].style.display = "none"; 
		}
	}
	h1.style.backgroundColor = "#e37222";
}

function changeColours(colour){
	// loop through all squares
	for(var i = 0; i < squares.length; i++){
		// change each colour to match given colour
		squares[i].style.backgroundColor = colour;
	}	
}

function pickColour(){
	var random = Math.floor(Math.random() * colours.length);
	return colours[random];
}

function generateRandomColours(num){
	// make array
	var arr = [];
	// repeat num times
	for(var i = 0; i < num; i++){
		// get random colour and push into array
		arr.push(randomColour());
	}
	// return array
	return arr;
}

function randomColour(){
	// pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	// pick a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0 - 255 
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function rgbToHex(rgbColour) {
	//convert string of format rgb(r, g, b) to integer array [r, g, b]
	var hexColourString = rgbColour.replace('rgb(','');
	hexColourString = hexColourString.replace(',', '');
	hexColourString = hexColourString.replace(')', '');
	hexColourString = hexColourString.replace(' ', ',');
	var hexColourNum = hexColourString.split(',').map(Number);
	
	var hex = "#";
	// convert rgb colour values to hex values
	for (var i = 0; i < hexColourNum.length; i++){
		hexColourNum[i] = Number(hexColourNum[i]).toString(16);
		if (hexColourNum[i].length < 2){
			hexColourNum[i] = "0" + hexColourNum[i];
		}
		hex+=hexColourNum[i]
	}
	return hex
}
