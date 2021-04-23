import moment from 'moment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function getDataEntities(data) {
  if (!data) {
    return null;
  } 

  const tests = data.reduce((prev, launch) => {
    return Array.from(new Set(prev.concat(launch.tests.map((test) => test.name))));
  }, []);

  const tabs = Array.from(new Set(data.reduce((p, launch) => {
    return p.concat(launch.tests.map((test) => Object.keys(test.results)));  
  }, []).flat()));

  return { tabs, tests };
}

function exportCSV(testNames, selectedTab, rows) {
  const csv = []
  const emptyCells = testNames.map(test => '').join(',');
  const firstRow = `Launches,${selectedTab},${emptyCells}`; 
  const secondRow = `ID, ${testNames.reduce((p, test) => p + test + ',', '').slice(0, -1)}`;
  
  csv.push(firstRow, secondRow);
  
  rows.map(({tests}) => {
    return testNames.map((test) => {
      const sel1 = tests.filter(({name}) => name === test)[0];
      
      return !sel1 ? 'n/a' : !sel1.results[selectedTab] ? 
        'n/a' : 
        '' + sel1.results[selectedTab];
    });
  })
  .map((l) => l.join(','))
  .forEach((string, i) => csv.push(`${rows[i].run_id},${string}`));

  let csvFile = new Blob([csv.join("\n")], {type: "text/csv"});;
  let downloadLink = document.createElement("a");

  downloadLink.download = `tests_${moment().format('YYMMDDhhmm')}.csv`;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
}

function exportPDF(testNames, selectedTab, data, amount) {  
  const secondRow = [{content: 'ID', styles: {halign: 'center'}}]
      .concat(testNames.map((test) => {
        return {content: test, styles: {halign: 'center'}}
      }))
      .flat();

  const arr = [];

  for (let i = 0; i< 100; i++) {
    arr.push([i, 2, 3, 4, 5, 6, 7]);
  }

  const body = data.map(({ tests }, i) => {
    const row = [{content: data[i].run_id, styles: {halign: 'center'}}];

    testNames.forEach((test) => {
      let res;
      const tmp = tests.filter((t) => t.name === test)[0];
      
      if (!tmp) {
        res = 'n/a';
      } else if (!tmp.results[selectedTab]){
        res ='n/a';
      } else if (selectedTab === "% errors") {
        res = `${tmp.results[selectedTab]}%`;
      } else {
        res = Math.round(tmp.results[selectedTab]);
      }
      row.push({content: res, styles: {halign: 'center'}},);
    });    

    return row;
  });

  const autotableOptions = {
    startY: 15,
    theme: 'striped',
    columnStyles: { 'Launches': { cellWidth: 30 } },
    headStyles: {fillColor: 'cadetblue'},
    footStyles: {fillColor: 'cadetblue'},
    
    head: [
      [
        {content: 'Launches', styles: {halign: 'center',}},
        {content: `Tests (shown on ${selectedTab})`,
         colSpan: testNames.length - 1,styles: {halign: 'center'}},
      ],
      secondRow,
    ],

    body,

    foot: [
      [{content: `Records shown: ${data.length} of ${amount}`, 
        colSpan: testNames.length + 1, 
        styles: {halign: 'left'}},
      ]],
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  doc.text(`Export from table`, 12, 10)
    .setFontSize(10)
    .setTextColor(0, 0, 255);

  autoTable(doc, autotableOptions);

  const totalPages = doc.getNumberOfPages();
  const didDrawPage = (data) => {
    data.doc.text(`Page ${data.pageNumber}/${totalPages}`, 271, 202);
  };

  const docFinal = new jsPDF('l', 'mm', 'a4');
  docFinal.text(`Export from table`, 12, 10)
    .setFontSize(10)
    .setTextColor(0, 0, 255);

  autoTable(docFinal, {...autotableOptions, didDrawPage});
  docFinal.save(`tests_${moment().format('YYMMDDhhmm')}.pdf`);
}

function exportExcel(object) {
 

    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.table_to_sheet(document.querySelector("table"));
      const workbook = { Sheets: { 'data': worksheet, }, SheetNames: ['data',] };

      xlsx.writeFile(workbook, 'sample.xlsx');
      return false;

      //const worksheet = xlsx.utils.json_to_sheet(object);
      
      //const workbook = { Sheets: { 'data': worksheet, }, SheetNames: ['data',] };

      //console.log(workbook);

      //xlsx.writeFile(object, 'out.xlsx');
      //const worksheet = xlsx.utils.json_to_sheet(object);
      //const workbook = { Sheets: { 'data': worksheet, 'example': worksheet }, SheetNames: ['data', 'example'] };
      //const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      //saveAsExcelFile(excelBuffer, 'test');
    });
  }

/*const saveAsExcelFile = (buffer, fileName) => {
  import('file-saver').then(FileSaver => {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data = new Blob([buffer], {
        type: EXCEL_TYPE
    });

    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}*/

export {
  getDataEntities,
  exportCSV,
  exportPDF,
  exportExcel,
};
