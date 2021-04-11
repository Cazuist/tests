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

export {
  getTestsNames,
  getTestTabs,
  getDataByColumn,
};