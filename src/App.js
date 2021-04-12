import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import * as fn from './functions/functions';
import data from './data/data';
import config from './data/config';

import TableContext from './contexts/TableContext';
import NavMenu from './components/NavMenu/NavMenu';
import HomePage from './components/Pages/HomePage';
import Page2 from './components/Pages/Page2';
import Page3 from './components/Pages/Page3';
import Page4 from './components/Pages/Page4';
import NotFoundPage from './components/Pages/NotFoundPage';
import StatPage from './components/Pages/StatPage';

function App() {
   //const {url} = props;
  //const [posts] = useJsonFetch(`${url}posts`, 'GET');
  //const {data} = data;
  
  const [tabs, /*setTabs*/] = useState(fn.getTestTabs(data));
  const [selectedTab, setSelectedTab] = useState(fn.getTestTabs(data)[0]);
  const [tests, /*setTests*/] = useState(fn.getTestsNames(data));

  const [stats, setStats] = useState({});
  const [testConfig, setTestConfig] = useState(JSON.stringify(config, null, 2));
 
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
        testConfig,
        setTestConfig,       
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


