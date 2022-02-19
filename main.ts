import './style.css'

import GPT3Tokenizer from 'gpt3-tokenizer';

const tokenizer = new GPT3Tokenizer({ type: 'gpt3' }); // or 'codex'
const str = "hello 👋 world 🌍";
const encoded: { bpe: number[], text: string[] } = tokenizer.encode(str);
const decoded = tokenizer.decode(encoded.bpe);


document.querySelector('#app').innerHTML = decoded