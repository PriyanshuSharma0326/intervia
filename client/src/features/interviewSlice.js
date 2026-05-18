import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    interview: null,
    questions: [],
};

const interviewSlice = createSlice({
    name: 'interview',
    initialState: initialStateValue,
    reducers: {
        setInterviewInfo: (state, action) => {
            state.interview = action.payload;
        },
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        updateQuestionObject: (state, action) => {
            const index = state.questions.findIndex(
                item => item.id === action.payload.id
            );

            if(index !== -1) {
                state.questions[index] = action.payload;
            }
        }
    },
});

export const {
    setInterviewInfo,
    setQuestions,
    updateQuestionObject,
} = interviewSlice.actions;

export default interviewSlice.reducer;
