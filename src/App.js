import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My daily Todo List</h1>
        <TodoList />
      </header>
    </div>
  );
}

export default App;
