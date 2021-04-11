import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import TableContext from '../../contexts/TableContext';
import TableWidget from '../Table/TableWidget';
import TableTabs from '../Table/TableTabs';
import DataTable from '../Table/DataTable';
import Launcher from '../Launcher/Launcher';

export default function HomePage() {
  const { setStats } = useContext(TableContext);

  const f = (launch, test) => {    
    setStats((prev) => ({...prev, launch, test}));
  }

  return (
    <>      
      <Switch>       
        <Route path='/' >
          <>
            <TableWidget>
              <TableTabs />
              <DataTable onAction={f}/>
            </TableWidget>      
            <Launcher />
          </>
        </Route>
      </Switch>
    </>
  );
}
