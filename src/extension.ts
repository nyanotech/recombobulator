import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Recombobulator is activated!');

	context.subscriptions.push(vscode.commands.registerCommand('recombobulator.base64', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;

			editor.edit(editBuilder => {
				editor.selections.forEach(selection => {
					const text = document.getText(selection);
					const processed = Buffer.from(text).toString('base64'); // TODO - handle different character encodings
					editBuilder.replace(selection, processed);
				});
			});
		}

		vscode.window.showInformationMessage('base64-encoded the selection!');
	}));
}
