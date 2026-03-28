import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Import the SearchProvider
import { SearchProvider } from './Component/SearchContext';

import Header from './Component/Header'
import RoomDetails from "./Component/Home";
import AddDetails from './Component/AddDetails'
import UpdateRoom from './Component/UpdateRoom'
import About from './Component/About'
import ViewDetails from "./Component/ViewDetails";
import Contact from "./Component/Contact";
import FavoritesPage from "./Component/Favourite";

function App() {
  return (
    <Router>
      {/* ✅ Wrap everything that needs search context */}
      <SearchProvider>
        <Header />
        <Routes>
          <Route path="/" element={<RoomDetails />} />
          <Route path="/home" element={<RoomDetails />} />
          <Route path="/add-room" element={<AddDetails />} />
          <Route path="/update-room/:id" element={<UpdateRoom />} />
          <Route path="/about" element={<About />} />
          <Route path="/viewDetails/:id" element={<ViewDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </SearchProvider>
    </Router>
  );
}

export default App;