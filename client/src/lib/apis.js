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

export {
    loginUser,
    registerUser,
}
