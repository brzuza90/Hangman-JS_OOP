import { Quote } from './Quate.js';

class Game {
    currentStep = 0;
    lastStep = 7;
    quotes = [
        {
        text: 'Pan Tadeusz',
        category: 'Utwór literacki'
        },
        {
            text: 'Harry Potter',
            category: 'Książka'
        },
        {
            text: 'Gwiezdne wojny',
            category: 'Film'
        },
        {
            text: 'Metallica',
            category: 'Zespół muzyczny'
        },
        {
            text: 'Rajdy samochodowe',
            category: 'Sport'
        }
    ]
    constructor({lettersWraper,categoryWrapper,wordWraper,outputWraper,resetBtn}) {
        this.lettersWraper = lettersWraper;
        this.categoryWrapper = categoryWrapper;
        this.wordWraper = wordWraper;
        this.outputWraper = outputWraper;
        this.resetBtn = resetBtn;
        const {text,category} = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.categoryWrapper.innerHTML = category;
        this.quote = new Quote(text.toLowerCase());
    }
    startGame() {
        document.querySelectorAll('.step')[this.currentStep].style.opacity=1;
        this.showLetter();
        this.drawQuote();

    }
    guess(letter, event) {
        event.target.disabled = true;
        if (this.quote.guess(letter)) {
            this.drawQuote();
        } else {
            this.currentStep++;
            document.querySelectorAll('.step')[this.currentStep].style.opacity=1;
            if(this.currentStep == this.lastStep) {
                this.losing();
            }
        }
        

    }
    showLetter() {
        for( let i = 0; i<26 ;i++) {
            const label = (i+10).toString(36);
            const button = document.createElement('button');
            button.innerHTML = label;
            button.addEventListener('click', (event)=> {
                this.guess(label, event)
            })
            this.lettersWraper.appendChild(button)
        }
    }
    drawQuote() {
        const content = this.quote.getContent();
        this.wordWraper.innerHTML = content;
        if (!content.includes('_')) {
            this.winnig();
        }
    }
    winnig() {
        this.wordWraper.innerHTML = "Gratulacje wygrałeś!";
        this.lettersWraper.innerHTML= "";
    }
    losing() {
        this.wordWraper.innerHTML = "Niestety przegrałeś";
        this.lettersWraper.innerHTML= "";
    }

}
const game = new Game({
    lettersWraper: document.querySelector('#letters'),
    categoryWrapper: document.querySelector('#category span'),
    wordWraper: document.querySelector('#word'),
    outputWraper: document.querySelector('#output'),
    resetBtn: document.querySelector('#reset button'),
})
game.startGame()