import { useState } from 'react';
import TableContext from '../../contexts/TableContext';

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
    'test4': {'tср': 200, 'error': 0, 'tmin': 50},
  },
};

export default function TableWidget(props) {
  //const {url} = props;
  //const [posts] = useJsonFetch(`${url}posts`, 'GET');
  //const {data} = data;
  
  const [tabs, setTabs] = useState(getTestTabs(data));
  const [selectedTab, setSelectedTab] = useState(getTestTabs(data)[0]);
  const [tests, setTests] = useState(getTestsNames(data));
  return (
    <TableContext.Provider value={
      {
        data,
        tabs,
        setTabs,
        selectedTab,
        setSelectedTab,
        tests       
      }} >
      <div className="table__container">
        {props.children}
      </div>
    </TableContext.Provider>
  );
}

function getTestsNames(data) {
  let resultColumns = [];

  for (let launch in data) {
    resultColumns = resultColumns.concat(Object.keys(data[launch]));
  }

  return Array.from(new Set(resultColumns));
}

function getTestTabs(data) {
  let resultColumns = [];

  for (let launch in data) {
    for (let test in data[launch]) {
      resultColumns = resultColumns.concat(Object.keys(data[launch][test]));
    }
  }

  return Array.from(new Set(resultColumns));
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