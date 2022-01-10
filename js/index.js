function CSimplefyFactory() {
  var palavrasReservadas = [
    "I",
    "E",
    "F",
    "W",
    "#",
    "0",
    "1",
    "[]",
    "$",
    "N",
    "D",
    "S",
    ">>",
    "<<",
    "?",
    "(0)",
    "(V)",
    "@",
    "<>",
    ":=",
    "(",
    ")",
    "{",
    "}",
    "?",
    ":",
    "++",
    ".",
    '"',
  ];

  var palavrasCorrespondentes = {
    I: "Condicional if",
    E: "Condicional else",
    F: "for",
    W: "while",
    "#": "return ",
    "0": "true",
    "1": "false",
    "[]": "[]vetor",
    $: "funcao ",
    N: "inteiro ",
    D: "double ",
    S: "string ",
    ">>": "entrada ",
    "<<": "saida ",
    "?": "include",
    "(0)": "null",
    "(V)": "void",
    "@": "Variavel ",
    "<>": "!=",
    ":=": "+=",
    "(": "inicio de condicao",
    ")": "termino de condicao",
    "{": "Abre Bloco de Comandos",
    "}": "Fecha Bloco de Comandos",
    "?": "include",
    ":": "Comentario",
    "++": "Contador",
    ".": "Final de Linha",
    '"': "Aspas",
  };


  const transformation = (codeString) => {
    palavrasReservadas.map((palavra) => {
      if (codeString.split(palavra).length > 1) {
        const resposta = codeString
          .split(palavra)
          .join(palavrasCorrespondentes[palavra]);
        codeString = resposta;
      }
    });

    document.getElementById("codigoResult").innerHTML = codeString;
  };

  const caracterByLine = (codeString) => {
    var linesCode = codeString.split("\n");
    var wordsFind = [];
    let caracterByLineAux = {};

    palavrasReservadas.map((palavra) => {
      if (codeString.split(palavra).length > 1) {
        wordsFind.push(palavra);
      }
    });

    linesCode.map((line, index) => {
      wordsFind.map((word) => {
        if (line.split(word).length > 1) {
          if (caracterByLineAux[word]?.lines?.length > 0)
            caracterByLineAux[word]?.lines?.push(index + 1);
          else
            caracterByLineAux[word] = {
              lines: [index + 1],
              token: palavrasCorrespondentes[word],
              word,
            };
        }
      });
    });

    var resposta = [];
    for (var [key, value] of Object.entries(caracterByLineAux))
      resposta.push(value);

    return resposta;
  };

  const clearTable = (table) => {
    for (var i = table.rows.length - 1; i > 0; i--) {
      table.deleteRow(i);
    }
  };

  const incrementsTable = (caracterByLineObject) => {
    var table = document.getElementById("analise");
    clearTable(table);

    caracterByLineObject.map((rowNew, index) => {
      var row = table.insertRow(index + 1);
      row.insertCell(0).innerHTML = rowNew.word;
      row.insertCell(1).innerHTML = rowNew.token;
      row.insertCell(2).innerHTML = rowNew.lines?.join(", ");
    });
  };

  const main = () => {
    var codeString = document.getElementById("codigo").value;
    var caracterByLineObject = caracterByLine(codeString);
    incrementsTable(caracterByLineObject);
    transformation(codeString);
  };

  return {
    status,
    main,
  };
}
function limpar() {
  location.reload();
return false;
}

const csimplefy = CSimplefyFactory();
