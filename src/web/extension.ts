import * as vscode from 'vscode';

function applyEdit(transform: Function) {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const document = editor.document;

		editor.edit(editBuilder => {
			editor.selections.forEach(selection => {
				const text = document.getText(selection);
				const processed = transform(text);
				editBuilder.replace(selection, processed);
			});
		});
	}
}

function base64(a: string) {
	return btoa(a); // TODO - figure out how to handle different character encodings
}

function unbase64(a: string) {
	return atob(a); // TODO - figure out how to handle different character encodings
}

function generateUUID(a: string) {
	return crypto.randomUUID();
}

function rot13(a: string) {
	const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const rotatedAlphabet = "nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM";
	return a.replace(/[a-zA-Z]/g, letter => rotatedAlphabet[alphabet.indexOf(letter)]);
}

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('recombobulator.base64', () => {
		applyEdit(base64);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('recombobulator.unbase64', () => {
		applyEdit(unbase64);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('recombobulator.generate-uuid', () => {
		applyEdit(generateUUID);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('recombobulator.rot13', () => {
		applyEdit(rot13);
	}));
}
