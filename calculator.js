const calc = document.querySelector('.calculator');
const display = document.querySelector('#display');
const keyPad = calc.querySelectorAll('.keypad > div');
window.addEventListener('keydown', (e) => {
    keySelection(e, 'keydown');    
})

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
            break;
        case ('A'):
            keyID = '#key-A';
            keyActiveClassName = 'keyPressActiveAC';
            break;
        case ('c'):
            keyID = '#key-C';
            keyActiveClassName = 'keyPressActiveAC';            
            break;
        case ('C'):
            keyID = '#key-C';
            keyActiveClassName = 'keyPressActiveAC';
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
            break;

    }
    keyPressed = document.querySelector(keyID);
    keyPressActiveStd(keyPressed, keyActiveClassName);
    console.log(keyID);
}

function keyPressActiveStd(keyPressed, activeClassName) {
    if (keyPressed) {
        keyPressed.classList.add(activeClassName);
        keyPressed.onanimationend = () => {keyPressed.classList.remove(activeClassName)}
    }
}