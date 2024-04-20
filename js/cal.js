const input = document.querySelector('.input');
const output = document.querySelector('.output');
const blinkDash = document.querySelector('.blink')

const text = document.getElementById('text-screen');
const displayMode = document.getElementById('mode-control')
const mode = document.getElementById('mode');
const temperature = document.getElementById('temp');


const screen = document.getElementById('screen_display')
const onButton = document.querySelector('.On');
const offButton = document.querySelector('.Off-Key');
const Keys = document.querySelectorAll('.key');

onButton.addEventListener('click', handleOnButton);

function handleOnButton () {
    let inp = document.querySelector('.large-holder');
    inp.style.display = 'flex';
    output.style.display = 'block';
}

offButton.addEventListener('click', handleOffButton);

function handleOffButton () {
    let inp = document.querySelector('.large-holder');
    inp.style.display = 'none';
    output.style.display = 'none';
}

Keys.forEach(key => {
    key.addEventListener('click', CalKey);
});

function CalKey () {
    let buttonText = this.innerHTML;

    if (buttonText === 'on') {
        input.innerHTML = '';
        blinkDash.innerHTML = '-';
        output.innerHTML = "0"
    } else if (buttonText === 'd') {
        input.innerHTML = input.innerHTML.slice(0, -1)
        blinkDash.innerHTML = '-';
    } else if (buttonText === 'del') {
        input.innerHTML = '';
        blinkDash.innerHTML = '-';
    } else if (buttonText === '=') {
        try {
            let answer = eval(sendInput(input.innerHTML));
            output.innerHTML = checkOutput(answer);
            blinkDash.innerHTML = '';
        } catch {
            output.innerHTML = "Error"
        }
    } else {
        input.textContent += buttonText;
        return;
    }
}


document.addEventListener('keydown', (event) => {
    const keyCode = event.key;

    if(/[0-9+\-*./]/.test(keyCode)){
        input.innerHTML += keyCode
    }

    if(keyCode === 'Backspace'){
        input.innerHTML = input.innerHTML.slice(0, -1)
        blinkDash.innerHTML = '-';
    }

    if(keyCode === 'Delete'){
        input.innerHTML = '';
        blinkDash.innerHTML = '-';
        output.innerHTML = '0'
    }

    if(keyCode === 'Enter'){
        let answer = eval(sendInput(input.innerHTML));
        output.innerHTML = checkOutput(answer);
        blinkDash.innerHTML = '';
    }

    if(keyCode === '='){
        let answer = eval(sendInput(input.innerHTML));
        output.innerHTML = checkOutput(answer);
        blinkDash.innerHTML = '';
    }
})

function sendInput (inp) {
    let input_array = inp.split('');

    for (let i = 0; i < input_array.length; i++) {

        if (input_array[i] == '%') {
            input_array[i] = '/100';
        } else if (input_array[i] == '÷') {
            input_array[i] = '/';
        } else if (input_array[i] == '×') {
            input_array[i] = '*';
        } else if (input_array[i] == '^') {
            input_array[i] = '**';
        } else if (input_array[i] == 'x²') {
            input_array[i] = '**2';
        } else if (input_array[i] == 'x³') {
            input_array[i] = '**3';
        }
    }

    return input_array.join('');
}

function checkOutput (output) {
    let output_string = output.toString();
    let decimal = output_string.split('.')[1];
    output_string = output_string.split('.')[0];

    let output_array = output_string.split('');

    if (output_array.length > 3) {
        for (let i = output_array.length - 3; i > 0; i -= 3) {
            output_array.splice(i, 0, ",");
        }
    }

    if (decimal) {
        output_array.push('.');
        output_array.push(decimal);
    }

    return output_array.join('')
}

function sin() {
    output.textContent = Math.sin(input.textContent)
}

function cos() {
    output.textContent = Math.cos(input.textContent)
}

function tan() {
    output.textContent = Math.tan(input.textContent)
}