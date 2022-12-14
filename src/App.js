import './App.css';
import Toolbox from './components/toolbox/Toolbox.js';
import Workspace from './components/workspace/Workspace';
import Optionbox from './components/optionbox/Optionbox';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div className='App-bar'>
            <Toolbox />
          </div>
          <div className='App-content'>
            <Workspace />
            <Optionbox />
          </div>
      </header>
    </div>
  );
}

export default App;
