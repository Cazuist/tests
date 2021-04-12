import { useContext } from 'react';
import TableContext from '../../contexts/TableContext';

export default function Launcher() {
  const { testConfig, setTestConfig } = useContext(TableContext);

  const onTextChange = (e) => {
    e.target.style.height = `${e.target.scrollHeight}px`;
    setTestConfig(e.target.value);  
  }

  const onTextBlur = (e) => {
    e.target.style.height = '250px';    
  }

  return (
    <div className="launcher__box">
      <div className="test-launcher__box">
        <button className='launcher__btn'>Запустить тесты</button>
      </div>

      <textarea value={testConfig}
          className="config__box" 
          onFocus={onTextChange}
          onInput={onTextChange}
          onBlur={onTextBlur} />
    </div>
  );
}