const calc = document.querySelector('.calculator');
const display = document.querySelector('#display-text');
const keyPad = calc.querySelectorAll('.keypad > div');

const calculator = {
    numA: false,
    numB: false,
    operator: false,
    result: false,
    pi: false,
    decimal: false,
    currentNum: 'numA',
    displayText: [],
    updateScreen() {
        display.textContent = this.displayText.join('');
    },
    clear() {
        this.numA = false;
        this.numB = false;
        this.operator = false;
        this.result = false;
        this.pi = false;
        this.decimal = false;
        this.displayText = [];
        display.textContent = '0';
        this.currentNum = 'numA';
    },
    inputNum(val) {
        if (this.displayText.length < 10 && this.pi === false) {
            this.displayText.push(val);
            this.updateScreen();
        } else if (this.pi === true) {
            this.displayText = [val];
            this.updateScreen;
        }
        calculator[calculator.currentNum] = Number(this.displayText.join(''));
    },
    inputPi() {
        calculator.pi = true;
        this.displayText = ['3.14159'];
        this.updateScreen();
        calculator[calculator.currentNum] = 3.14159;
    },
    inputDecimal() {
        if (calculator.decimal === false) {
            this.inputNum('.');
            calculator.decimal = true;
        }
    },
    inputOperator(op) {
        this.operator = op;
        this.swapCurrentNum();
        this.pi = false;
        this.displayText = [];
    },
    erase() {
        if (this.pi === false) {
            if (this.displayText[this.displayText.length-1] === '.') {
                this.decimal = false;   
            }
            this.displayText.pop();
            if (this.displayText.length < 1) {
                this.displayText.push('0');
            }
            this.updateScreen();
            calculator[calculator.currentNum] = Number(this.displayText.join(''));
        }
        
    },
    swapCurrentNum() {
        if (this.currentNum === 'numA') {
            this.currentNum = 'numB';
        } else {
            this.currentNum = 'numA';
        }
        this.decimal = false;
    },
    operate(a, o, b) {
        if (typeof a === 'number' && o && typeof b === 'number') {
            switch(o) {
                case ('+'):
                    this.result = a + b;
                    break;
                case ('-'):
                    this.result = a - b;
                    break;
                case ('*'):
                    this.result = a * b;
                    break;
                case ('/'): 
                    if (b === 0) {
                        this.result = ('bad idea');
                    } else {
                        this.result = a / b;
                    }
                    break;
            }
            console.log(`result = ${this.result}`);
            if (this.result === 'bad idea') {
                this.clear();
                this.displayText = [];
                this.displayText.push('bad idea');
                this.updateScreen();
            } else {
                if (this.result.toString().length > 10) {
                    let trimmedResult = this.result.toString().slice(0, 10);
                    console.log(`trimmed: ${trimmedResult}`);
                    this.result = Number(trimmedResult);
                }
                
                this.displayText = [];
                this.displayText.push(this.result);
                this.updateScreen();
                this.numA = Number(this.result);
                this.numB = Number(this.result);
                this.currentNum = 'numA';
                this.result = false;
                this.displayText = [];
            }


        }


    }
}

keyPad.forEach(key => {
    key.addEventListener('click', (e) => {
        clickedNode = e.currentTarget;
        keyVal = clickedNode.dataset.keyVal;
        keyType = clickedNode.dataset.keyType;
        if (keyType === 'num') {
            calculator.inputNum(keyVal);
        } else if (keyVal === 'backspace') {
            calculator.erase();
        } else if (keyVal === 'add') {
            calculator.inputOperator('+');
        } else if (keyVal === 'subtract') {
            calculator.inputOperator('-');
        } else if (keyVal === 'multiply') {
            calculator.inputOperator('*');
        } else if (keyVal === 'divide') {
            calculator.inputOperator('/');
        } else if (keyVal === 'equals') {
            calculator.operate(calculator.numA, calculator.operator, calculator.numB);
        } else if (keyVal === 'pi') {
            calculator.inputPi();
        } else if (keyVal === 'decimal') {
            calculator.inputDecimal();
        }


        // Button animations
        if (keyVal === 'C') {
            clickedNode.classList.add('keyPressActiveAC');
            clickedNode.onanimationend = () => {clickedNode.classList.remove('keyPressActiveAC')}
            calculator.clear();
        } else {
            clickedNode.classList.add('keyPressActive');
            clickedNode.onanimationend = () => {clickedNode.classList.remove('keyPressActive')}
        }
        
    });
})

window.addEventListener('keydown', (e) => {
    keySelection(e, 'keydown');    
})

function keySelection(e, eventType) {
    
}

/*
keyPad.forEach(key => {
    key.addEventListener('click', (e) => {
        keySelection(e.currentTarget.id, 'click');
});
})

function keySelection(e, eventType) {
    let keyChoice;
    let keyPressed;
    let keyID;
    let keyActiveClassName = 'keyPressActive';
    if (eventType === 'keydown') {
        keyChoice = e.key;
    } else if (eventType === 'click') {
        keyChoice = e.slice(4);
    } else {
        return 'Error';
    }

    switch(keyChoice) {
        case ('.'):
            keyID = `#key-decimal`;
            break;
        case ('a'):
            keyID = '#key-A';
            keyActiveClassName = 'keyPressActiveAC';
            calculator.clear();
            break;
        case ('A'):
            keyID = '#key-A';
            keyActiveClassName = 'keyPressActiveAC';
            calculator.clear();
            break;
        case ('c'):
            keyID = '#key-C';
            keyActiveClassName = 'keyPressActiveAC';
            calculator.clear();            
            break;
        case ('C'):
            keyID = '#key-C';
            keyActiveClassName = 'keyPressActiveAC';
            calculator.clear();
            break;
        case ('x'):
            keyID = '#key-multiply';
            break;
        case ('X'):
            keyID = '#key-multiply';
            break;
        case ('*'):
            keyID = '#key-multiply';
            break;
        case ('/'):
            keyID = '#key-divide';
            break;
        case ('+'):
            keyID = '#key-add';
            break;
        case ('-'):
            keyID = '#key-subtract';
            break;
        case ('='):
            keyID = '#key-equals';
            break;
        case ('Enter'):
            keyID = '#key-equals';
            break;
        default:
            keyID = `#key-${keyChoice}`;
            calculator.inputNum(keyChoice);
            break;

    }
    keyPressed = document.querySelector(keyID);
    keyPressActiveStd(keyPressed, keyActiveClassName);
    
}

function keyPressActiveStd(keyPressed, activeClassName) {
    let keyVal;
    if (keyPressed) {
        keyPressed.classList.add(activeClassName);
        keyPressed.onanimationend = () => {keyPressed.classList.remove(activeClassName)}
    }
    if (keyPressed.dataset.keyVal) {
        keyVal = keyPressed.dataset.keyVal;

    }
}
*/


