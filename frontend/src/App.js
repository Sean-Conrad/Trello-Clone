import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages and components
import NavBar from './components/Navbar'
import Home from './pages/Home'

function App() {
    return(
        <div className="App">
        
            <BrowserRouter>
                <NavBar />
                <div className="pages">
                    <Routes>
                        <Route 
                            path="/"
                            element={<Home/>}
                            />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;