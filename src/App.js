import './App.css';
import "@fontsource/inter";
import "@fontsource/dm-sans";
import Navbar from "./component/Navbar";
import MainLayout from "./layout/MainLayout";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <header>
                    <Navbar/>
                    <MainLayout/>
                </header>
            </BrowserRouter>
        </div>
    );
}

export default App;
