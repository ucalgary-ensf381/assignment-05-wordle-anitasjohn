var height = 4;
var width = 4;

var row = 0;
var col =0;

var gameOver =false;
var words ="";
var hints = ""; 
let wordArray = [];

var startOver;
var darkModeToggle = document.querySelector('#darkMode');
var body = document.querySelector('body');
const winImage = document.getElementById('win-image');
const hideOnWinElements = document.querySelectorAll('.hide-on-win');

async function init(){
    const res = await fetch("https://api.masoudkf.com/v1/wordle",{
        headers:{
            "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv", 
        }
    });
    const data = await res.json();
    return { words: data.dictionary.map((word)=> word.word), hints: data.dictionary.map((word)=> word.hint)};

}
window.onload = function(){
    initialize();
};

async function initialize(){
    const data = await init();
    words = data.words;
    hints = data.hints;
    const randomIndex = Number.parseInt(Math.random()* words.length);
    var rawWord = words[randomIndex];
    word = rawWord.toUpperCase();
    var hint = hints[randomIndex];
    console.log(word);
    wordArray = word.split("");


    for(let r = 0; r <height; r++){
        for(let c = 0; c < width; c++){
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
           
            document.getElementById("board").appendChild(tile);
        }
    }

    document.addEventListener("keyup", (e) => {
        if(gameOver) return;
        if("KeyA"<= e.code && e.code <= "KeyZ"){
            if(col < width){
                let currTile = document.getElementById(row.toString() +'-'+col.toString());
                if(currTile.innerText ==""){
                    currTile.innerText = e.code[3];
                    col+=1;
                }


            }
        }
        if(e.code == "Backspace"){
            if(0 < col && col <= width){
                col -= 1;
            }
            let currTile = document.getElementById(row.toString() +'-'+col.toString());
            currTile.innerText = "";
        }
        else if (e.code =="Enter"){
            update();
            row +=1;
            col =0;


        }
        if(!gameOver && row == height){
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })

    startOver = document.getElementById("startOver");
    startOver.addEventListener("click",gameRestart );
   

    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    toggleButton.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');
});


    
}
function showWinImage() {
    // Add the "dark-theme" class to the body element if it already exists
    if (body.classList.contains('dark-theme')) {
      winImage.classList.add('dark-theme');
    }
    
    // Hide all elements except the start button
    const elementsToHide = document.querySelectorAll('body > *:not(#startOver)');
    elementsToHide.forEach(element => element.style.display = 'none');
    
    // Show the congrats icon
    winImage.style.display = 'block';
  }
function update() {
    let correct = 0;
  
    for(let c = 0; c < width; c++) {
      let currTile = document.getElementById(row.toString() + '-' + c.toString());
      let letter = currTile.innerText;
      if(wordArray[c] === letter) {
        currTile.classList.add("correct");
        correct += 1;
      } 
      else if(wordArray.includes(letter)) {
        currTile.classList.add("present");
      } 
      else {
        currTile.classList.add("absent");
      }
      if(correct === width) {
        gameOver = true;
        showWinImage();
      }
    }
  }
  
  
  
function myForm(){
    document.getElementById("myForm").request();
}
function gameRestart(){
    location.reload();
}


