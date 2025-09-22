import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Welcome from './components/Welcome';
import PrivateRoute from './PrivateRoute'; // Import the private route component
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {/* Use PrivateRoute to protect the welcome route */}
                    <Route 
                        path="/welcome" 
                        element={
                            <PrivateRoute>
                                <Welcome />
                            </PrivateRoute>
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;