import { useState, useContext, useRef } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { Checkbox } from 'primereact/checkbox';
import classNames from 'classnames';
import moment from 'moment';

import TableContext from '../../contexts/TableContext';
import { exportCSV, exportPDF, exportExcel, } from '../../functions/functions';

export default function TableWidget({ history }) { 
  const {
    launches,
    testNames,
    tabNames,
    selectedTab,
    setSelectedTab,
  } = useContext(TableContext); 

  const [currentPage, setCurrentPage] = useState(1);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [expandedRows, setExpandedRows] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isExportSel, setExportStatus] = useState(false);
  const [
      pageInputTooltip, 
      setPageInputTooltip
  ] = useState('Press \'Enter\' key to go to this page.');

  const dt = useRef(null);

  //Header
  const headerGroup = () => {
    const selectorFormatter = () => {
      return (
        <div className='p-table-head__tests'>
          <span>Tests</span>
          <Dropdown value={selectedTab} options={tabNames} onChange={(e) => setSelectedTab(e.value)}/>
        </div>      
      );
    }

    const field = selectorFormatter();

    return (
      <ColumnGroup>
        <Row>
          <Column selectionMode="multiple" headerStyle={{width: '1em'}} rowSpan={2}/>
          <Column expander style={{ width: '1em' }} rowSpan={2}/>          
          <Column header="Launches" />
          <Column colSpan={testNames.length} header={field} body={selectorFormatter}/>
        </Row>
        <Row>          
          <Column header="ID" sortable field="run_id"></Column>
          {testNames.map((test) => <Column header={test} key={test}/>)}          
        </Row>
      </ColumnGroup>
    );    
  }

  /*Selection
  */
  const template = {
    layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
    'PrevPageLink': (options) => {
      return (
        <button type="button" 
              className={options.className} 
              onClick={options.onClick} 
              disabled={options.disabled}>
          <span className="p-p-3">Previous</span>
          <Ripple />
        </button>
      )
    },
    'NextPageLink': (options) => {
      return (
        <button type="button" 
              className={options.className} 
              onClick={options.onClick} 
              disabled={options.disabled}>
          <span className="p-p-3">Next</span>
          <Ripple />
        </button>
      )
    },
    'PageLinks': (options) => {
        if ((options.view.startPage === options.page && options.view.startPage !== 0) ||
          (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
          const className = classNames(options.className, { 'p-disabled': true });

          return <span className={className} style={{ userSelect: 'none' }}>...</span>;
        }

        return (
          <button type="button" className={options.className} onClick={options.onClick}>
            {options.page + 1}
            <Ripple />
          </button>
        )
    },
    'RowsPerPageDropdown': (options) => {
      const dropdownOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: 'All', value: options.totalRecords }
      ];

      return <Dropdown value={options.value} 
                options={dropdownOptions} 
                onChange={options.onChange} 
                appendTo={document.body} />;
    },
    'CurrentPageReport': (options) => {
      return (
        <span className="p-mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
          Go to <InputText size="2" className="p-ml-1" 
              value={currentPage} tooltip={pageInputTooltip}
              onKeyDown={(e) => onPageInputKeyDown(e, options)} 
              onChange={onPageInputChange}/>
        </span>
      )
    }
  };

  const onPageInputKeyDown = (event, options) => {
    if (event.key === 'Enter') {
      const page = parseInt(currentPage);
      
      if (page < 0 || page > options.totalPages) {
        setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
      }
      else {
        const first = currentPage ? options.rows * (page - 1) : 0;

        setFirst(first);
        setPageInputTooltip('Press \'Enter\' key to go to this page.');
      }
    }
  }

  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  }

  const onCustomPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);
  }

  const onRowSelect = (e) => {
    setSelectedItems(e.value);

    if (!e.value.length) {
      setExportStatus(false);
    }
  }  

  const cellBody = (e, name) => {
    let formattedCell;
    try {
      const cell = e.tests.filter((test) => test.name === name)[0].results[selectedTab];
      if (!cell) {
        formattedCell = 'n/a'; 
      } else if (selectedTab === '% errors') {
        formattedCell = `${cell}%`
      } else {
        formattedCell = Math.round(cell);
      }
    } catch {
      formattedCell = 'n/a';
    } finally {
      return (
        <span style={{cursor: 'pointer'}}             
            onClick={() => {
              history.push(`/${e.run_id}/${name}`);
            }}>
          {formattedCell}
        </span>     
      ); 
    }  
  }  

  const exportSelectorTooltip = () => {
    if (!selectedItems.length) {
      return 'No selection';
    }
    //eslint-disable-next-line no-useless-escape
    return `Press to \'${!isExportSel ? "Selected" : "All"}\' mode export`;
  }

  const toolbarRightGroup = () => {
    return (      
      <div className="p-d-flex export-buttons">
        <Button type="button" icon="pi pi-file-o" 
            onClick={(e) => exportCSV(testNames, selectedTab, isExportSel ? selectedItems : launches)} 
            className="p-mr-2" data-pr-tooltip="CSV" />
        <Button type="button" icon="pi pi-file-pdf" 
            onClick={() => exportPDF(testNames, selectedTab, isExportSel ? selectedItems : launches, launches.length)} 
            className="p-button-warning p-mr-2" data-pr-tooltip="PDF" />
        <Button type="button" icon="pi pi-file-excel" 
            onClick={() => exportExcel(isExportSel ? selectedItems : launches)} 
            className="p-button-success p-mr-2" data-pr-tooltip="XLS" />

        <div className="export_mode_box">
          <span className='export_mode_text'>{isExportSel ? 'Selected' : 'All'}</span>
          <Checkbox checked={isExportSel}            
            tooltipOptions={{content: exportSelectorTooltip(), position: 'bottom'}}
            disabled={!selectedItems.length}
            onChange={(e) => setExportStatus((p) => !p)} />           
        </div>                 
      </div>   
    );
  }

  const dateFormatter =(data) => {
    return moment(+data.meta.start_time * 1000).format('DD.MM.YY hh:mm');
  }

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <h5>Orders for launch {data.run_id}</h5>
        <DataTable value={[data]}>
          <Column field="meta.start_time" header="Date" body={(data) => dateFormatter(data)}></Column>
          <Column field="meta.tool_version" header="Tool" ></Column>
          <Column field="meta.duration" header="Duration"></Column>
          <Column field="meta.status" header="Status"></Column>          
        </DataTable>        
      </div>
    );
  }

  const footer = `Выбрано записей: ${selectedItems.length} из ${launches.length}`; 

  return (    
    <div className="table__container" >
      <Tooltip target=".export-buttons>button" position="bottom" />      
      <Toolbar className="p-mb-4" right={toolbarRightGroup}/>

      <DataTable value={launches} ref={dt}
            headerColumnGroup={headerGroup()}
            footer={footer} 
            paginator 
            paginatorTemplate={template}
            selection={selectedItems}
            expandedRows={expandedRows} 
            first={first} rows={rows} 
            onPage={onCustomPage}
            onSelectionChange={e => onRowSelect(e)}
            onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={rowExpansionTemplate}
            className="p-datatable-striped p-datatable-hoverable-rows">
          
        <Column selectionMode="multiple"></Column>
        <Column expander></Column>
        <Column field="run_id" header="ID" ></Column>

        {testNames.map((test, i) => <Column field={test} body={(e) => cellBody(e, test)} key={i} className="main-data"/>)}        
      </DataTable> 
    </div>    
  );
}

/*const toolbarLeftGroup = () => {
    return (
      <Dropdown value={selectedTab} 
          options={tabNames} 
          onChange={(e) => setSelectedTab(e.target.value)}
          tooltip='Выберите колонку'/>
    );
  }*/