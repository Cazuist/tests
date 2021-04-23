import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import './App.css';

import { getDataEntities } from './functions/functions';
import data from './data/launches';
import config from './data/config';

import TableContext from './contexts/TableContext';
import NavMenu from './components/NavMenu/NavMenu';
import HomePage from './components/Pages/HomePage';
import Page2 from './components/Pages/Page2';
import Page3 from './components/Pages/Page3';
import ConfigPage from './components/Pages/ConfigPage';
import NotFoundPage from './components/Pages/NotFoundPage';
import StatPage from './components/Pages/StatPage';

function App() {
  const [launches, setLaunches] = useState(data.launches);
  const [testNames, setTestNames] = useState(getDataEntities(launches).tests);
  const [tabNames, setTabNames] = useState(getDataEntities(launches).tabs);  
  const [selectedTab, setSelectedTab] = useState(getDataEntities(launches).tabs[0]);
  const [testConfig, setTestConfig] = useState(JSON.stringify(config, null, 2));
  
  
  /*useEffect(()=>{
    fetch(`${document.location.origin}/static/data/constants.json`).then((response) => {
      response.json().then(({ url }) => {          
        setUrl(url);

        fetch(`${url}/api/launches`)
          .then((response) => response.json())
          .then((launches) => {
            setLaunches(launches);
            setTestNames(getDataEntities(launches).tests);
            setTabNames(getDataEntities(launches).tabs);
            setSelectedTab(getDataEntities(launches).tabs[0]);
          })
          .catch((rej) => console.log(rej.message));
        
        fetch(`${url}/api/config`)
          .then((response) => response.json())
          .then((config) => {
            setTestConfig(JSON.stringify(config, null, 2));
          })
          .catch((rej) => console.log(rej.message));
      })
    }).catch((rej) => console.log(rej.message))
  }, []);*/

  return (
    <TableContext.Provider value={
      {        
        launches,
        setLaunches,
        testNames,
        setTestNames,
        tabNames,
        setTabNames,
        selectedTab,
        setSelectedTab,
        testConfig,
        setTestConfig,             
      }} >
      <div className='page__wrapper'>
        <Router>
          <NavMenu />
          <Switch>                     
            <Route path="/Page2" component={Page2 } />
            <Route path="/Page3" component={Page3 } />
            <Route path="/config" component={ConfigPage } />
            <Route path='/:id' render={(props) => <StatPage {...props} />} /> 
            <Route path="/" render={(props) => <HomePage {...props}/>} />                     
            
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>      
      </div>
    </TableContext.Provider>
  );
}

export default App;
