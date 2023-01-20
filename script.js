let letters = document.querySelectorAll('.letter');
let finalWord = document.querySelector('.word');

let finalMsg = document.querySelector('.final-msg');
let playAgainBtn = document.querySelector('.play-again');

let submit = document.querySelector('.submit');

let hangmanParts = document.querySelectorAll('.hangman-part');



let randomWord = [
    'kamion', 'telefon', 'računar', 'programer', 'automobil'
]

let getRandomWord = (wordList) => {
    let w =  wordList[Math.floor(Math.random() * wordList.length)]; 
    console.log(w)
    return(w)
}

// getRandomWord(randomWord);
// console.log(permWord);

// let br = permWord.length;

// let wordArr = permWord.split("");

function populateWord() {
    let permWord = getRandomWord(randomWord);
    console.log(permWord)
    let wordArr = permWord.split("");
    for(let i = 0; i < permWord.length; i++){
        let finalWordLetter = document.createElement('input');
        finalWordLetter.classList.add('word-letter')
        finalWord.appendChild(finalWordLetter);
    }

    for (let pom of letters) {
        pom.addEventListener('click', () => {
            for(let i = 0; i < wordArr.length; i++){
                if(wordArr[i] === pom.textContent){
                    wordLetters[i].value = pom.textContent;
                    pom.setAttribute('disabled', '');
                }
            }
            if(!permWord.includes(pom.textContent)){
                lives.textContent = Number(lives.textContent) - 1;
                hangmanParts[Number(lives.textContent)].classList.remove('visibility');
                pom.setAttribute('disabled', '');
            }
            if(lives.textContent == '0'){
                finalMsg.textContent = 'You lose';
                for (let btn of letters) {
                    btn.setAttribute('disabled', '')
                }
            }
        });
    }

    submit.addEventListener('click', () => {
        let wordLettersValues = [];
    
        for (let pom of wordLetters) {
            wordLettersValues.push(pom.value);
        }
        let arrWord = ''
        for (let pom of wordLettersValues) {
            arrWord += pom;
        }
        if(arrWord.toLocaleLowerCase() === permWord){
            finalMsg.textContent = 'You win';
            // for(let pom of wordLetters){
            //     pom.value = '';
            // }
            for (let btn of letters) {
                btn.setAttribute('disabled', '')
            }
        }
    })

}
populateWord();

let wordLetters = document.querySelectorAll('.word-letter');
console.log(wordLetters);


let lives = document.querySelector('.lives');

// submit.addEventListener('click', () => {
//     let wordLettersValues = [];

//     for (let pom of wordLetters) {
//         wordLettersValues.push(pom.value);
//     }
//     let arrWord = ''
//     for (let pom of wordLettersValues) {
//         arrWord += pom;
//     }
//     if(arrWord.toLocaleLowerCase() === permWord){
//         finalMsg.textContent = 'You win';
//         for(let pom of wordLetters){
//             pom.value = '';
//         }
//         for (let btn of letters) {
//             btn.setAttribute('disabled', '')
//         }
//     }
// })

playAgainBtn.addEventListener('click', () => {
    for (let btn of letters) {
        btn.disabled = false;
    }
    finalMsg.textContent = '';
    lives.textContent = '10';
    for(let pom of wordLetters){
        pom.value = '';
    }
    for (let pom of hangmanParts) {
        pom.classList.add('visibility')
    }
    for(let i = 0; i < wordLetters.length; i++){
        finalWord.removeChild(wordLetters[i]);
    }
    populateWord();
})
