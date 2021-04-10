import { BrowserRouter as Router, /*Route, Switch*/ } from 'react-router-dom';
import './App.css';

//menu
import NavMenu from './components/NavMenu/NavMenu';
import TableWidget from './components/Table/TableWidget';
import TableTabs from './components/Table/TableTabs';
import DataTable from './components/Table/DataTable';
import Launcher from './components/Launcher/Launcher';


function App() {
  return (
    <div className='page__wrapper'>
      <Router>
        <NavMenu />
        <TableWidget>
          <TableTabs />
          <DataTable />
        </TableWidget>
        <Launcher />
      </Router>      
    </div>
  );
}

export default App;
