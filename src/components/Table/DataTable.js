import { useContext } from 'react';
import TableContext from '../../contexts/TableContext';

export default function DataTable() {
  const { tests, selectedTab, setTests, data } = useContext(TableContext);

  const renderedData = getDataByColumn(data, selectedTab);


  return (
    <table className='data-table'>
      <thead>
        <tr>
          <th></th>
          {tests.map((test, i) => <th key={i}>{test}</th>)}
        </tr>
        <tr>
          <th>Запуски</th>
          {tests.map((test, i) => <th key={i}>{selectedTab}</th>)}
        </tr>
      </thead>

      <tbody>
        {Object.keys(renderedData).map((launch, i) => (
          <tr key={i}>
            <td>{launch}</td>
            {tests.map((test, i) =>
              <td key={i}>
                {!renderedData[launch][test] || !renderedData[launch][test][selectedTab] 
                  ? 'n/a' 
                  : renderedData[launch][test][selectedTab]}
              </td>
            )}
          </tr>
        ))}

      </tbody>
    </table>
  );
}

function getDataByColumn(data, column) {
  const selectedData = JSON.parse(JSON.stringify(data));

  for (let launch in selectedData) {
    for (let test in selectedData[launch]) {
      for (let col in selectedData[launch][test]) {
        if (col === column) {
          continue;
        } else {
          delete selectedData[launch][test][col]
        }
      }
    }
  }

  return selectedData;
}