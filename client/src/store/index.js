import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./error/error-slice";
import userReducer from "./user/user-slice";
import notepadsReducer from "./lists/lists-slice";

const store = configureStore({
	reducer: {
		error: errorReducer,
		user: userReducer,
		notepads: notepadsReducer,
	},
});

export default store;
