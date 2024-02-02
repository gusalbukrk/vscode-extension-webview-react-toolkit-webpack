import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
      <div>
          <h2>Hello, world!</h2>
      </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

// @ts-ignore
const vscode = acquireVsCodeApi();

console.log(vscode);