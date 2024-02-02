import * as fs from 'fs';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "extension" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from extension!');

		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				localResourceRoots: [
					vscode.Uri.joinPath(context.extensionUri, 'src'),
					vscode.Uri.joinPath(context.extensionUri, 'dist'),
				],
			}
		);

		const documentUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'src', 'index.html'));
		const styleUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'src', 'main.css'));
		const scriptUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'dist', 'main.wv.js'));

		panel.webview.html = interpolate(
			fs.readFileSync(documentUri.fsPath, 'utf8'),
			{
				webview: panel.webview,
				styleUri,
				scriptUri,
			},
		);
	}));
}

// evaluate given str as a template literal with obj as its variables
// could've used eval instead (`eval('`' + fs.readFileSync(documentUri.fsPath, 'utf8') + '`')`)
// this method was chosen because it's evident which variables are needed in the template
function interpolate(str: string, obj: Record<string, unknown>) {
	return new Function( // new Function(arg1, arg2, /* …, */ argN, functionBody)
		...Object.keys(obj),
		`return \`${str}\`;`,
		)(...Object.values(obj));
}

export function deactivate() {}
