import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./styles/globals.css";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Cpu from "./pages/Cpu";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/ai' element={<Cpu />} />
                <Route path='/:roomID' element={<Game />} />
            </Routes>
        </Router>
    );
}

export default App;
