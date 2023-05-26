import Navigation from './component/header/Navebar'
import Landing from './pages/landing/Landing';
import Footer from './component/footer/Footer';
import Signin from './pages/signin/Signin';
import Registration from "./pages/registration/Registration";
import Restaurant from './pages/retaruant/Restaurant';
import About from './pages/about/About';
import ResrvationForm from './component/resrvationForm/ResrvationForm';
// import Owner from './pages/owner/Owner';
// import Ownereditor from './pages/ownereditor/Ownereditor';
// import Admin from './pages/admin/Admin';
// import Admineditor from './pages/admineditor/Admineditor';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from './pages/contact/Contact';
import Maan from './component/cities/MaanCity';
import Zarqa from './component/cities/Zarqa';
import Jerash from './component/cities/Jerash';
import Irbid from './component/cities/Irbid';
import History from './component/history/History';

function App() {



  return (
    <BrowserRouter>

      <Navigation />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='signin' element={<Signin />} />
        <Route path="/signup" element={<Registration />} />
        <Route path='contact' element={<Contact />}/>
        <Route path='about' element={<About />}/>
        <Route path='maan' element={<Maan />}/>
        <Route path='zarqa' element={<Zarqa />}/>
        <Route path='Jerash' element={<Jerash />}/>
        <Route path='irbid' element={<Irbid />}/>
        <Route path='history' element={<History />}/>
        <Route path='/:city/:name' element={<Restaurant />}/>
        <Route path='/:city/:name/resrvationForm' element={<ResrvationForm />}/>
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
