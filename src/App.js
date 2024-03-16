import logo from './logo.svg';
import './App.css';
import Main from "./main"
import { Container } from '@mui/material';
function App() {
  return (
    <div className="App">
      <Container maxWidth='xl'>
        <Main/>
      </Container>
      
    </div>
  );
}

export default App;
