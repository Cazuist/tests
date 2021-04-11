import { useContext } from 'react';
import { Link } from 'react-router-dom';
import TableContext from '../../contexts/TableContext';
import * as fn from '../../functions/functions';

export default function DataTable(props) {
  const { tests, selectedTab, /*setTests,*/ data } = useContext(TableContext);

  const renderedData = fn.getDataByColumn(data, selectedTab);
  const isEmptyCell = (launch, test, selectedTab) => !renderedData[launch][test] ||
           !renderedData[launch][test][selectedTab];

  const onAction = (l, t) => {
    props.onAction(l, t);
  };

  return (
    <table className='data-table'>
      <thead>
        <tr>
          <th rowSpan='2'>Запуски</th>
          {tests.map((test, i) => <th key={i}>{test}</th>)}
        </tr>
        <tr>
          {tests.map((test, i) => <th key={i}>{selectedTab}</th>)}
        </tr>
      </thead>

      <tbody>
        {Object.keys(renderedData).map((launch, i) => (
          <tr key={i}>
            <td>{launch}</td>
            {tests.map((test, i) =>
              <td key={i} onClick={() => onAction(launch, test)}>
                <Link to={`/${launch}/${test}`}>
                  {isEmptyCell(launch, test, selectedTab) 
                  ? 'n/a' 
                  : renderedData[launch][test][selectedTab]}
                </Link>

              </td>
            )}
          </tr>
        ))}

      </tbody>
    </table>
  );
}
