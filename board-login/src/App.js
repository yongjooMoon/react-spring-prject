import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CreateBoardComponent from './board/CreateBoardComponent';
import ListBoardComponent from './board/ListBoardComponent';
import ReadBoardComponent from './board/ReadBoardComponent';
import FooterComponent from './component/FooterComponent';
import HeaderComponent from './component/HeaderComponent';
import LoginComponent from './login/LoginComponent';
import SignUpPageComponent from './login/SignUpPageComponent';
import ProductListComponent from './product/ProductListComponent';

function App() {
  return (
    <div className="app-container">
      <Router>
        <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route path = "/" element={<LoginComponent />} />
              <Route path = "/board" element={<ListBoardComponent />} />
              <Route path = "/create-board/:no" element={<CreateBoardComponent />} />
              <Route path = "/read-board/:no" element={<ReadBoardComponent />} />
              <Route path = "/signUp" element={<SignUpPageComponent />} />
              <Route path = "/product" element={<ProductListComponent />} />
            </Routes>
          </div>
        <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
