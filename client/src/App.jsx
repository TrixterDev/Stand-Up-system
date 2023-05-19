import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Page/Home'
import '../src/App.css'
import Auth from '../src/components/Auth/Auth.jsx'
import Register from '../src/components/Auth/Register.jsx'
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
