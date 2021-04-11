import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import * as fn from './functions/functions';

import TableContext from './contexts/TableContext';
import NavMenu from './components/NavMenu/NavMenu';
import HomePage from './components/Pages/HomePage';
import Page2 from './components/Pages/Page2';
import Page3 from './components/Pages/Page3';
import Page4 from './components/Pages/Page4';
import NotFoundPage from './components/Pages/NotFoundPage';
import StatPage from './components/Pages/StatPage';

const data = {
  '2021-04-09': {
    'test1': {'tср': 200, 'error': 0, 'tmin': 50},
    'test2': {'tср': 200, 'error': 1, 'tmin': 50},
    'test3': {'tср': 200, 'error': 0, 'tmin': 50},
  },
  '2021-04-08': {
    'test1': {'tср': 200, 'error': 0, 'tmin': 50},
    'test2': {'tср': 200, 'error': 0, 'tmin': 50},
    'test3': {'tср': 200, 'error': 1, 'tmin': 50},
  },
  '2021-04-07': {
    'test1': {'tср': 200, 'error': 0, 'tmin': 50},
    'test2': {'tср': 200, 'error': 0, 'tmin': 50},
    'test3': {'tср': 200, 'error': 0, 'tmin': 50, 'smthelse': 50},
  },
  '2021-04-06': {
    'test1': {'tср': 200, 'error': 0, 'tmin': 50},
    'test2': {'tср': 200, 'error': 0, 'tmin': 50},
    'test3': {'tср': 200, 'error': 0, 'tmin': 50},
    'test4': {'tср': 200, 'error': 0, 'tmin': 50, 'another': 5},
  },
};

function App() {
   //const {url} = props;
  //const [posts] = useJsonFetch(`${url}posts`, 'GET');
  //const {data} = data;
  
  const [tabs, /*setTabs*/] = useState(fn.getTestTabs(data));
  const [selectedTab, setSelectedTab] = useState(fn.getTestTabs(data)[0]);
  const [tests, /*setTests*/] = useState(fn.getTestsNames(data));

  const [stats, setStats] = useState({})
 
  return (
    <TableContext.Provider value={
      {
        data,
        tabs,
        //setTabs,
        selectedTab,
        setSelectedTab,
        tests,
        stats,
        setStats,       
      }} >
      <div className='page__wrapper'>
        <Router>
          <NavMenu />
          <Switch>  
            <Route exac path="/tests" component={HomePage} />          
            <Route path="/Page2" component={Page2 } />
            <Route path="/Page3" component={Page3 } />
            <Route path="/Page4" component={Page4 } />
            <Route path='/:id' render={() => <StatPage stats={stats}/>}></Route>                     
            
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>      
      </div>
    </TableContext.Provider>
  );
}

export default App;


