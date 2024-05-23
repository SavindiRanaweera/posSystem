
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import './App.css';
import Categories from './Categories';
import EditOrders from './EditOrders';
import Home from './Home';
import Items from './Items';
import LoginPage from './Login';
import Orders from './Orders';
import Stocks from './Stocks';
import Users from './Users';
import { AuthProvider } from './utils/Authcontext';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
return(
    <AuthProvider>
    <BrowserRouter>
        <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route path="/users" element={<Users />} />
                <Route path="/items" element={<Items />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/stocks" element={<Stocks />} />

                <Route path="/Orders" element={<Orders />} />         
                <Route path="/orders/:id/editOrders" element={<EditOrders />} />
                <Route path="/" element={<Home />} />
            </Route>
            
            <Route path="/login" element={<LoginPage />} />

        </Routes>
    </BrowserRouter>
    </AuthProvider>
) 
}


export default App;
