import axios from "axios";

async function loginUser(callBody) {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/login`, 
        callBody,
        {
            withCredentials: true,
        }
    );
    return response;
}

async function registerUser(callBody) {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/register`,
        callBody,
        {
            withCredentials: true,
        }
    );

    return response;
}

async function startInterview(callBody) {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}interview/start`,
        callBody,
        {
            withCredentials: true,
        }
    );

    return response;
}

async function submitAnswer(callBody, id) {
    const response = await axios.put(
        `${import.meta.env.VITE_API_URL}interview/answer/${id}`,
        callBody,
        {
            withCredentials: true,
        }
    );

    return response;
}

async function submitInterview(callBody, id) {
    const response = await axios.put(
        `${import.meta.env.VITE_API_URL}interview/submit/${id}`,
        callBody,
        {
            withCredentials: true,
        }
    );

    return response;
}

async function abandonInterview(id) {
    const response = await axios.put(
        `${import.meta.env.VITE_API_URL}interview/abandon/${id}`,
        {},
        {
            withCredentials: true,
        }
    );

    return response;
}

async function resumeInterview(id) {
    const response = await axios.put(
        `${import.meta.env.VITE_API_URL}interview/resume/${id}`,
        {},
        {
            withCredentials: true,
        }
    );

    return response;
}

async function logoutUser() {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/logout`, 
        {},
        {
            withCredentials: true,
        }
    );
    return response;
}

async function checkEmailExists(callBody) {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/forgot-password`, 
        callBody,
        {
            withCredentials: true,
        }
    );
    return response;
}

async function resetPassword(callBody) {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/reset-password`, 
        callBody,
        {
            withCredentials: true,
        }
    );
    return response;
}

export {
    loginUser,
    logoutUser,
    registerUser,
    startInterview,
    submitAnswer,
    submitInterview,
    abandonInterview,
    resumeInterview,
    checkEmailExists,
    resetPassword,
}
