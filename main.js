function interpretBrainfuck(code, input) {
    let data = new Uint8Array(30000);
    let dataPtr = 0;
    let inputPtr = 0;
    let output = "";

    for (let i = 0; i < code.length; i++) {
        let c = code.charAt(i);
        switch (c) {
            case '>':
                dataPtr++;
                break;
            case '<':
                dataPtr--;
                break;
            case '+':
                data[dataPtr]++;
                break;
            case '-':
                data[dataPtr]--;
                break;
            case '.':
                output += String.fromCharCode(data[dataPtr]);
                break;
            case ',':
                data[dataPtr] = input.charCodeAt(inputPtr++);
                break;
            case '[':
                if (data[dataPtr] === 0) {
                    let bracketCount = 1;
                    while (bracketCount > 0) {
                        i++;
                        if (code.charAt(i) === '[') {
                            bracketCount++;
                        } else if (code.charAt(i) === ']') {
                            bracketCount--;
                        }
                    }
                }
                break;
            case ']':
                if (data[dataPtr] !== 0) {
                    let bracketCount = 1;
                    while (bracketCount > 0) {
                        i--;
                        if (code.charAt(i) === ']') {
                            bracketCount++;
                        } else if (code.charAt(i) === '[') {
                            bracketCount--;
                        }
                    }
                }
                break;
        }
    }
    return output;
}

function updateOutput() {
    const code = document.getElementById("inputCode").value;
    const output = interpretBrainfuck(code, "");
    document.getElementById("output").innerText = output;
}