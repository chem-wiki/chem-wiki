const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|(?<!\\)\$(?!$)[^$]+(?<!\\)\$)/gm;
const text = "$ \\ce{2H₂S + SO₂ -> 3S↓ + 2H₂O} $";
const match = text.match(regex);
console.log(match);
