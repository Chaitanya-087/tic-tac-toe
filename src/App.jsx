import {Routes,Route} from 'react-router-dom'
import { Lobby,Game } from "./pages";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Lobby />}/>
      <Route path = '/:room' element={<Game />} />
    </Routes>
  )  
}

export default App;
