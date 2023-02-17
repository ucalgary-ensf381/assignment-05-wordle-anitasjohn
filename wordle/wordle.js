var height = 4;
var width = 4;

var row = 0;
var col =0;

var gameOver =false;
var word = "PINK";

window.onload = function(){
    initialize();
};

function initialize(){
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
}
function update(){

    let correct = 0;
    


    for( let c =0; c< width; c++){
        let currTile = document.getElementById(row.toString() +'-'+c.toString());
        let letter = currTile.innerText;
        if(word[c] == letter){
            currTile.classList.add("correct");
            correct+=1;

        }
        else if(word.includes(letter)){
            currTile.classList.add("present");
        }
        else{
            currTile.classList.add("absent");
        }
        if(correct == width){
            gameOver= true;

        }

    }


}
function myForm(){
    document.getElementById("myForm").request();
}


