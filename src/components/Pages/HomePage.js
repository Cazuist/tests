import { Route } from 'react-router-dom';
import TableWidget from '../Table/TableWidget';

export default function HomePage() {  
  return (
    <Route path="/" render={(props) => <TableWidget {...props}/>} />
  );    
}
