import { useState, useContext } from 'react';
import TableContext from '../../contexts/TableContext';

export default function Launcher() {
  const [ isValid, setValidationStatus ] = useState(true);
  const [ validationMsg, setValidationMsg ] = useState(' валиден!');

  const { testConfig, setTestConfig } = useContext(TableContext);

  const onFieldFocus = (e) => {
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const onFieldBlur = (e) => {
    e.target.style.height = '250px';
  }

  const onConfigChange = (e) => {    
    setTestConfig(e.target.value);
    
    if(!e.target.value.trim()) {
      e.target.style.height = '250px';
      setValidationStatus(false);
      setValidationMsg(' отсутствует!');
      return;
    }

    try {
      JSON.parse(e.target.value);
      setValidationStatus(true);
      setValidationMsg(' валиден!');
    } catch(e) {
      setValidationStatus(false);
      setValidationMsg(e.message);
    }    
  }

  return (
    <div className="test-launcher__box">
      <div className="launcher__btn__box">
        <button className='launcher__btn launch_btn'>Запустить тесты</button>
        

        <div className={`validation__status${isValid ? ' valid' : ' invalid'}`}>
          <span>Файл конфигурации: {`${validationMsg}`}</span>
        </div>
      </div>

      <textarea value={testConfig}
          className={`config__box${isValid ? ' valid' : ' invalid'}`}
          onFocus={onFieldFocus}
          onInput={onConfigChange}
          onBlur={onFieldBlur} />
    </div>
  );
}

/*<button className='launcher__btn validate_btn'
          onClick={validateJSON}
        >Проверить Config</button>*/