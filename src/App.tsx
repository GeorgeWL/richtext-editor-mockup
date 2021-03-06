import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import RichTextEditor from './components/editor/RichTextEditor';
import AlertEditor from './components/editor/AlertEditor';
import TagListInput from './components/TagListInput';
const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Rich Text Editor Alert/Messages Mockup</h1>
        </header>
        <nav className="App-nav">
          <ul>
            <li>
              <NavLink to="/" activeClassName="App-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/posts" activeClassName="App-link">
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink to="/alerts" activeClassName="App-link">
                Alerts
              </NavLink>
            </li>
          </ul>
        </nav>
        <main>
          <Switch>
            <Route exact path="/">
              <h1>Edit or Create Posts and Alerts</h1>
              <TagListInput />
            </Route>
            <Route exact path="/posts">
              <>
                <h1>Create Post</h1>
                <RichTextEditor />
              </>
            </Route>
            <Route exact path="/alerts">
              <>
                <h1>Create Alert</h1>
                <AlertEditor onSave={data => console.warn('onSave', data)} />
              </>
            </Route>
            <Route path="/posts/:id">
              <>placeholder posts id</>
            </Route>
            <Route path="/alerts/:id">
              <>placeholder alerts id</>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
