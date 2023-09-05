import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route index element={<News key="general" pageSize={9} country='in' apiKey={apiKey} category='general'/>} />
          <Route path="business" element={<News key="business" pageSize={9} country='in' apiKey={apiKey} category='business'/>} />
          <Route path="entertainment" element={<News key="entertainment" pageSize={9} country='in' apiKey={apiKey} category='entertainment'/>} />
          <Route path="health" element={<News key="health" pageSize={9} country='in' apiKey={apiKey} category='health'/>} />
          <Route path="science" element={<News key="science" pageSize={9} country='in' apiKey={apiKey} category='science'/>} />
          <Route path="sports" element={<News key="sports" pageSize={9} country='in' apiKey={apiKey} category='sports'/>} />
          <Route path="technology" element={<News key="technology" pageSize={9} country='in' apiKey={apiKey} category='technology'/>} />
        </Routes> 
      </div>
    </BrowserRouter>
  );
}

export default App;
