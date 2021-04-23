import { useState } from 'react';

import { TabView,TabPanel } from 'primereact/tabview';
import { heatMap, f1, f2 } from '../../functions/createCharts';

import data from '../../data/test';

export default function StatPage({ history }) {
  const [selectedTest, /*setSelectedTest*/] = useState(data.test.data);
  const [activeIndex, setActiveIndex] = useState(0);

  const pathArray = document.location.pathname.slice(1).split('/');
  const launch = pathArray[0];
  const test = pathArray[1];

  const chartFunctions = [heatMap, f1, f2];
  heatMap(data.test.data);

  /*useEffect(()=>{
    fetch(`${document.location.origin}/static/data/constants.json`).then((response) => {
      response.json().then(({ url }) => {          
        fetch(`${url}/api/test?launch=${launch}&test=${test}`)
          .then((response) => response.json())
          .then((test) => {
            setSelectedTest(test);
            chartFunctions[0](test);                      
          })
          .catch((reject) => console.log(reject.message));          
      })
    }).catch((rej) => console.log(rej.message))
  }, []);*/ //eslint-disable-line react-hooks/exhaustive-deps  

  return (
    <div className="stat_page_wrapper">
      <div className="stat_page_table-box">
        <h2>Table</h2>
        <p>Информация во выбранному тесту</p>
        <p>{`Test: ${test} - Launch: ${launch}`}</p>
      </div>

      <div className="stat_page_charts-box">
        <h2>Charts</h2>
        <TabView activeIndex={ activeIndex } 
            onTabChange={(e) => {
              if (e.index === activeIndex) return;
              setActiveIndex(e.index);
              chartFunctions[e.index](selectedTest);
            }}>
          <TabPanel header="Heatmap chart">
            
          </TabPanel>
          <TabPanel header="Header II">
            Здесь будет что-то еще
          </TabPanel>
          <TabPanel header="Header III">
            Здесь будет что-то еще после чего-то еще
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}
