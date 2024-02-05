import React from 'react';
import ReactDOM from 'react-dom';
import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeButton());

const App = () => {
  return (
      <div>
          <h2>Hello, world!</h2>
          <vscode-button id="howdy" onClick={handleButtonClick}>Howdy!</vscode-button>
      </div>
  );
};

function handleButtonClick() {
  vscode.postMessage({
      command: 'howdy',
      text: 'Hey there partner!'
  });
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

// @ts-ignore
const vscode = acquireVsCodeApi();

console.log(vscode);