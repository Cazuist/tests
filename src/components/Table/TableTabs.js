import { useContext } from 'react';
import TableTab from './TableTab';
import TableContext from '../../contexts/TableContext';

export default function TableTabs() {
  const { tabs } = useContext(TableContext);


  return (
    <div className='table__tabs'>
      {tabs.map((tab, i) => <TableTab key={i} tab={tab} />)}
    </div>
  );
}
