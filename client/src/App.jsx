import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import SharedLayout from './routes/shared-layout';
import Home from './pages/home';
import LoadingModal from './components/loading-modal';
import ProtectedRoute from './routes/protected-route';
import PublicRoute from './routes/public-route';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/auth'>
                    <Route index element={<Navigate to="login" />} />

                    <Route path='login' element={<PublicRoute><Login /></PublicRoute>} />

                    <Route path='register' element={<PublicRoute><Register /></PublicRoute>} />
                </Route>

                <Route path='/' element={<ProtectedRoute><SharedLayout /></ProtectedRoute>}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;
