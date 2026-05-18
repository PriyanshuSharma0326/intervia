import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialStateValue = {
    interviews: {
        interviews: [],
        loading: 'idle',
        error: null,
    },
};

const fetchInterviews = createAsyncThunk('app/fetchInterviews', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}interview/all`, {
        withCredentials: true,
    });
    return response.data.interviews;
});

const appSlice = createSlice({
    name: 'app',
    initialState: initialStateValue,
    reducers: {
        addInterviewToList: (state, action) => {
            state.interviews.interviews = [ ...state.interviews.interviews, action.payload ];
        },
        updateInterviewInfo: (state, action) => {
            const index = state.interviews.interviews.findIndex(
                item => item.id === action.payload.id
            );

            if(index !== -1) {
                state.interviews.interviews[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchInterviews.pending, (state) => {
            state.interviews.loading = 'loading';
        })
        .addCase(fetchInterviews.fulfilled, (state, action) => {
            state.interviews.loading = 'succeeded';
            state.interviews.interviews = action.payload;
        })
        .addCase(fetchInterviews.rejected, (state, action) => {
            state.interviews.loading = 'failed';
            state.interviews.error = action.error.message;
        })
    }
});

export const {
    addInterviewToList,
    updateInterviewInfo,
} = appSlice.actions;

export {
    fetchInterviews,
}

export default appSlice.reducer;
