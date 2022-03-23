import * as vscode from 'vscode';

function base64(a: string) {
	return Buffer.from(a).toString('base64'); // TODO - handle different character encodings
}

function unbase64(a: string) {
	return Buffer.from(a, 'base64').toString("utf-8"); // TODO - handle different character encodings
}

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

export function activate(context: vscode.ExtensionContext) {
	console.log('Recombobulator is activated!');

	context.subscriptions.push(vscode.commands.registerCommand('recombobulator.base64', () => {
		applyEdit(base64);
		vscode.window.showInformationMessage('base64-encoded the selection!');
	}));
	context.subscriptions.push(vscode.commands.registerCommand('recombobulator.unbase64', () => {
		applyEdit(unbase64);
		vscode.window.showInformationMessage('base64-decoded the selection!');
	}));
}
