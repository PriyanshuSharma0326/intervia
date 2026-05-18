import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import SharedLayout from './routes/shared-layout';
import Home from './pages/home';
import LoadingModal from './components/loading-modal';
import ProtectedRoute from './routes/protected-route';
import PublicRoute from './routes/public-route';
import History from './pages/history';
import QuestionBanks from './pages/question-banks';
import Interview from './pages/interview';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchInterviews, fetchQuestions } from './features/appSlice';
import Profile from './pages/profile';
import ScrollToTop from './components/scroll-to-top';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInterviews());
        dispatch(fetchQuestions());
    }, []);

    return (
        <Router>
            <ScrollToTop />

            <Routes>
                <Route path='/auth'>
                    <Route index element={<Navigate to="login" />} />

                    <Route path='login' element={<PublicRoute><Login /></PublicRoute>} />

                    <Route path='register' element={<PublicRoute><Register /></PublicRoute>} />
                </Route>

                <Route path='/' element={<ProtectedRoute><SharedLayout /></ProtectedRoute>}>
                    <Route index element={<Home />} />

                    <Route path='history' element={<History />} />

                    <Route path='question-banks' element={<QuestionBanks />} />

                    <Route path='profile' element={<Profile />} />
                </Route>

                <Route path='/interview' element={<ProtectedRoute><Interview /></ProtectedRoute>} />
            </Routes>
        </Router>
    )
}

export default App;
