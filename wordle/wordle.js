// remove this line
// it's just here to shows it works
document.addEventListener("DOMContentLoaded", ()=>{
    createSquares();
    getNewWord();

    let guessedWords= [[]];
    let availableSpace = 1;
    let word;
    let guessWordCount =0;

    const keys = document.querySelectorAll(".keyboard-row button");

    async function getNewWord(){
        fetch(`https://api.masoudkf.com/v1/wordle`,{
            
            headers: {
                "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
             },
        }




        )
        .then((response)=>{
            return response.json();
        })
        .then((res)=>{
            word = res.word;
        })
        .catch((err)=>{
            console.error(err);
        });
    }







    function getCurrentWordArr(){
      const numberOfGuessedWords = guessedWords.length
      return guessedWords[numberOfGuessedWords-1]
    }
    function updateGuessedWords(letter){
        const currentWordArr = getCurrentWordArr()
        if(currentWordArr && currentWordArr.length <5){
            currentWordArr.push(letter);
            const availableSpaceEl =  document.getElementById(String(availableSpace))
                availableSpace = availableSpace +1
                availableSpaceEl.textContent = letter;

        }

    }

    function getTileColor(letter, index){
        const isCorrectLetter = word.includes(letter);

        if(!isCorrectLetter){
            return "rgb(58, 58, 60";
        }
        const letterInThatPosition =  word.charAt(index)
        const isCorrectPosition = (letter === letterInThatPosition);
        if(isCorrectPosition){
            return"rgb(83, 141, 78)";
        }
        return "rgb(181, 159, 59)";
        
    }

    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr()
        if(currentWordArr.length !==5){
            window.alert("Word must be 5 letters")
        }
        const currentWord = currentWordArr.join("");
        fetch(`https://api.masoudkf.com/v1/wordle/${currentWord}`,{
           
            headers: {
                "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
             },
        }
        ).then((res)=>{
            if(!res.ok){
                throw Error()
            }
            const firstLetterId = guessWordCount *5 +1;
            const interval = 200;
            currentWordArr.forEach((letter, index)=>{
            setTimeout(()=>{
                const tileColor = getTileColor(letter, index);
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId)
                letterEl.style = `background-color: ${tileColor}; border-color: ${tileColor}`;
            }, interval*index);
        });
        guessWordCount += 1;

        if(currentWord === word){
            window.alert("Congratulations!");
        }
        if(guessedWords.length === 6){
            window.alert('Sorry, you have no more guesses! The word is '+ word+'.')
        }
        guessedWords.push([])


        }).catch(()=>{
            window.alert("Word is not recognised!");
        })


        
    }
    function createSquares(){
        const gameBoard = document.getElementById("board")
        for(let index =0; index < 30; index++){
            let square = document.createElement("div")
            square.classList.add("square")
            square.setAttribute("id", index +1);
            gameBoard.appendChild(square);
        }
    }
    for(let i = 0; i< keys.length; i++){
        keys[i].onclick = ({target}) =>  {
            const letter = target.getAttribute("data-key");

            if(letter === 'enter'){
                handleSubmitWord()
                return;
            }
           updateGuessedWords(letter)
        };
        
    }
});
