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
				localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'src')],
			}
		);

		const styleUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'src', 'main.css'));
		const scriptUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'src', 'main.ts'));

		panel.webview.html = getWebviewContent(panel.webview, styleUri, scriptUri);
	}));
}


function getWebviewContent(webview: vscode.Webview, styleUri: vscode.Uri, scriptUri: vscode.Uri) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
		<!-- https://code.visualstudio.com/api/extension-guides/webview#content-security-policy -->
		<meta
			http-equiv="Content-Security-Policy"
			content="default-src 'none'; img-src ${webview.cspSource} https:; script-src ${webview.cspSource}; style-src ${webview.cspSource};"
		/>
	
		<link rel="stylesheet" href="${styleUri}">
</head>
<body>
		<h1>Coding</h1>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
		<script src="${scriptUri}"></script>
</body>
</html>`;
}

export function deactivate() {}
