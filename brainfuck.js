let brainfuck = {
  run(code, input) {
    if (!code) return;
    input = input || '';

    let memory = [0];
    let pointer = 0;
    let output = '';
    let loops = [];

    for (let i = 0; i < code.length; i ++) {
      switch(code[i]) {
        case '>':
        pointer ++;
        if (!memory[pointer]) memory[pointer] = 0;
        break;
        case '<':
        pointer --;
        if (!memory[pointer]) memory[pointer] = 0;
        break;
        case '+':
        memory[pointer] ++;
        if (memory[pointer] > 255) memory[pointer] = 0;
        break;
        case '-':
        memory[pointer] --;
        if (memory[pointer] < 0) memory[pointer] = 255;
        break;
        case '.':
        output += String.fromCharCode(memory[pointer]);
        break;
        case ',':
        memory[pointer] = input.charCodeAt(0) || 0;
        input = input.substr(1);
        break;
        case '[':
        if (memory[pointer] != 0) loops.push(i);
        break;
        case ']':
        if (memory[pointer] != 0) i = loops.slice(-1)[0];
        else loops.pop(1);
        break;
        default:
        // probably a comment
      }
    }

    return output;
  }
};
