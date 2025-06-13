import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet
} from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Home from './components/Home';
import MinSida from './components/MinSida.tsx';
import Login from './components/Login';
import Cart from './components/Cart.tsx';
import Location from './components/Location.tsx';
import Register from './components/Register.tsx';
import LoginCompany from './components/LoginCompany.tsx';
import CreateAccount from './components/CreateAccount.tsx';
import Profile from './components/Profile.tsx';
import ComputerAndOffice from './products/ComputerAndOffice.tsx';
import Phone from './products/Phone.tsx';
import Careers from './products/Careers.tsx';
import Company from './products/Company.tsx';
import ComputerAccessories from './products/ComputerAccessories.tsx';
import Gaming from './products/Gaming.tsx';
import HomeGarden from './products/HomeGarden.tsx';
import Kampanjer from './products/Kampanjer.tsx';
import KitchenWashing from './products/KitchenWashing.tsx';
import KundKlubb from './products/Kundklubb.tsx';
import LEGO from './products/LEGO.tsx';
import PersonalCare from './products/PersonalCare.tsx';
import ServicesAccessories from './products/ServicesAccessories.tsx';
import Sports from './products/Sports.tsx';
import TvSoundSmartHome from './products/TvSoundSmartHome.tsx';
import Vitavaror from './products/Vitavaror.tsx';
import OutletProduct from './products/OutletProduct.tsx';
import ProductDetail from './product_details/ProductDetail.tsx';
import Demo from './products/Demo.tsx';
import Datorer from './products/Datorer.tsx';
import Kassa from './components/Kassa.tsx';

// Layout with Navbar + page content
const Layout = () => (
    <>
        <Navbar />
        <main className="pt-20 px-4">
            <Outlet />
        </main>
    </>
);

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/minsida" element={<MinSida />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/location" element={<Location />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/foretag" element={<LoginCompany />} />
                    <Route path="/createAccount" element={<CreateAccount />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/career" element={<Careers />} />
                    <Route path="/company" element={<Company />} />
                    <Route path="/dator" element={<ComputerAndOffice />} />
                    <Route
                        path="/computeraccessories"
                        element={<ComputerAccessories />}
                    />
                    <Route path="/gaming" element={<Gaming />} />
                    <Route path="/homegarden" element={<HomeGarden />} />
                    <Route path="/kampanjer" element={<Kampanjer />} />
                    <Route
                        path="/kitchenwashing"
                        element={<KitchenWashing />}
                    />
                    <Route path="/kundklubb" element={<KundKlubb />} />
                    <Route path="/lego" element={<LEGO />} />
                    <Route path="/outlet" element={<OutletProduct />} />
                    <Route path="/personalcare" element={<PersonalCare />} />
                    <Route path="/phone" element={<Phone />} />
                    <Route path="/service" element={<ServicesAccessories />} />
                    <Route path="/sport" element={<Sports />} />
                    <Route path="/tvsound" element={<TvSoundSmartHome />} />
                    <Route path="/vitavaror" element={<Vitavaror />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/computer" element={<Datorer />} />
                    <Route path="/kassa" element={<Kassa />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
