import { useContext } from 'react';
import TableContext from '../../contexts/TableContext';

export default function TableTab({tab}) {
  const { selectedTab, setSelectedTab } = useContext(TableContext);

  const onTabClick = () => {
    setSelectedTab(tab);
  }

  return (
    <div 
      className={`table__tabs_tab${tab === selectedTab ? ' tab_selected' : ''}`}
      onClick = {onTabClick}
      >
      {tab}
    </div>
  );
}
