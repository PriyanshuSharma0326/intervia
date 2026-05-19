import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import SharedLayout from './routes/shared-layout';
import Home from './pages/home';
import LoadingModal from './components/loading-modal';
import ProtectedRoute from './routes/protected-route';
import PublicRoute from './routes/public-route';
import History from './pages/history';
import Interview from './pages/interview';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchInterviews } from './features/appSlice';
import Profile from './pages/profile';
import ScrollToTop from './components/scroll-to-top';
import InterviewReview from './pages/interview-review';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInterviews());
    }, []);

    return (
        <Router>
            <ScrollToTop />

            <Routes>
                <Route path='/auth'>
                    <Route index element={<Navigate to="/auth/login" />} />

                    <Route path='login' element={<PublicRoute><Login /></PublicRoute>} />

                    <Route path='register' element={<PublicRoute><Register /></PublicRoute>} />
                </Route>

                <Route path='/' element={<ProtectedRoute><SharedLayout /></ProtectedRoute>}>
                    <Route index element={<Home />} />

                    <Route path='history' element={<History />} />

                    <Route path='review'>
                        <Route index element={<Navigate to="/" />} />

                        <Route path=':interviewId' element={<InterviewReview />} />
                    </Route> 

                    <Route path='profile' element={<Profile />} />
                </Route>

                <Route path='/interview' element={<ProtectedRoute><Interview /></ProtectedRoute>} />
            </Routes>
        </Router>
    )
}

export default App;
