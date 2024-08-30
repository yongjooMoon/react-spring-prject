import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import FooterComponent from './component/FooterComponent';
import HeaderComponent from './component/HeaderComponent';
import CreateBoardComponent from './login_board/CreateBoardComponent';
import ListBoardComponent from './login_board/ListBoardComponent';
import LoginComponent from './login_board/LoginComponent';
import ReadBoardComponent from './login_board/ReadBoardComponent';
import SignUpPageComponent from './login_board/SignUpPageComponent';
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
