// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { privateEncrypt } = require('crypto');
const vscode = require('vscode');

const { generateEnum, generateEnumExtension, applyQuickFix } = require('./utils');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	 //Register a command for generating enums
	 const disposable = vscode.commands.registerCommand('fpenum.GenerateEnum', async () => {
		const enumName = await vscode.window.showInputBox({
		prompt: 'Enter Enum Name',
        placeHolder: '',
		})


		const enumValues = await vscode.window.showInputBox({
			prompt: 'Enter Comma(,) seperated enum values',
			placeHolder: '',
		})


		const enums = enumValues.split(',');

		const genEnum = generateEnum(enums, enumName);

		const genEnumExt = generateEnumExtension(enums, enumName);

		const editor = vscode.window.activeTextEditor;

		if(editor) {
			editor.insertSnippet(new vscode.SnippetString(genEnum + `\n`+ genEnumExt));
		}
		context.subscriptions.push(disposable);
	 });


	context.subscriptions.push(vscode.commands.registerCommand('fpenum.ExtQuicfix', applyQuickFix));
}


// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

