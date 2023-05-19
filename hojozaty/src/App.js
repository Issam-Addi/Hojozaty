import Navigation from './component/header/Navebar'
import Landing from './pages/landing/Landing';
import Footer from './component/footer/Footer';
import Signin from './pages/signin/Signin';
import Registration from "./pages/registration/Registration";
import Restaurant from './pages/retaruant/Restaurant';
import Owner from './pages/owner/Owner';
import Ownereditor from './pages/ownereditor/Ownereditor';
import Admin from './pages/admin/Admin';
import Admineditor from './pages/admineditor/Admineditor';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from './pages/contact/Contact';


function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='restaurant' element={<Restaurant/> } />
        <Route path='signin' element={<Signin />}/> 
        <Route path="/signup" element={<Registration />} />
        <Route path='contact' element={<Contact />}/>
        {/* <Owner/> */}
        {/* <Ownereditor/> */}
        {/* <Admin/> */}
        {/* <Admineditor /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
