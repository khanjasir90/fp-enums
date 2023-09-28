const vscode = require('vscode');

function generateEnum(enums, enumName) {
  const enumHeader = `enum ${enumName} { \n`;
  var enumBody = ``;
  for (var i = 0; i < enums.length; i++) {
    enumBody = enumBody + `${enums[i]}, \n`;
  }

  var genEnum = enumHeader + enumBody + `\n}`;

  return genEnum;
}


function generateEnumExtension(enums, enumName) {
  const enumExtHeader = `extension ${enumName}X on ${enumName} {\n`;
  var enumExtBody = ``;
  for (var i = 0; i < enums.length; i++) {
    enumExtBody += `bool get is${enums[i].charAt(0).toUpperCase() + enums[i].slice(1)} => this == ${enumName}.${enums[i]};\n`;
  }

  var genEnumExt = enumExtHeader + enumExtBody + `\n }`;

  return genEnumExt;
}

function applyQuickFix() {
  // Your code to apply the quick fix goes here
  vscode.window.showInformationMessage('Quick Fix Applied!');

  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const fileContents = document.getText();
    const enumRegex = /enum\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\{([^}]*)\}/g;

    const enums = [];

    // Use a while loop to find all enum declarations in the file
    let match;
    while ((match = enumRegex.exec(fileContents)) !== null) {
      const enumName = match[1];
      const enumValuesText = match[2];

      // Extract enum values from the matched text
      const enumValues = enumValuesText
        .split(',')
        .map(value => value.trim())
        .filter(Boolean);

      enums.push({ name: enumName, values: enumValues });

    }

    var enumsExt = ``;

    for (var i = 0; i < enums.length; i++) {
      enumsExt += `\n` + generateEnumExtension(enums[i].values, enums[i].name);
    }

    editor.insertSnippet(new vscode.SnippetString(enumsExt));

  }

}


module.exports = {
  generateEnum,
  generateEnumExtension,
  applyQuickFix,
}