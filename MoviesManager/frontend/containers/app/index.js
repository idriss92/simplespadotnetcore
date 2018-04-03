import React from 'react';
import { Route, Link } from 'react-router-dom';
// import Home from '../home';
// import About from '../about';
import Movies from '../movies';
import CreateMovie from '../movies/add';
import EditMovie from '../movies/edit';
import DetailMovie from '../movies/details';



const App = () => (
  <div className="mui-container-fluid">
    <header className="mui-appbar mui--z1" style={{ backgroundColor: 'white' }}>
      <div className="mui-container">
        <table style={{ width: '100%' }}>
          <tbody>
            <tr className="mui--appbar-height" style={{ verticalAlign: 'middle' }}>
              <td className="mui--text-title">Movies Manager</td>
              <td className="mui--text-right"><Link to="/movies">Movies</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </header>

    <main className="mui-container">
      <Route exact path="/movies" component={Movies} />
      <Route exact path="/moviesadd" component={CreateMovie} />
      <Route exact path="/moviesedit/:id" component={EditMovie} />
      <Route exact path="/moviesdetails/:id" component={DetailMovie} />
    </main>
  </div>
);

export default App;
