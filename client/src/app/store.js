import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";
import interviewReducer from "../features/interviewSlice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        interview: interviewReducer,
    },
});
