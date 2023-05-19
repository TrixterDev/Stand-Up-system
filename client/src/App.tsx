import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Page/Home'
import '../src/App.css'
import Auth from './components/Auth/Auth'
import Register from './components/Auth/Register'
import { UserPage } from './components/UserPage'
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user-page" element={<UserPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
