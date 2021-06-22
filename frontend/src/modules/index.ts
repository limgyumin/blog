import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import users from "./user";
import commons from "./common";
import posts from "./post";
import searches from "./search";
import temps from "./temp";
import comments from "./comment";
import replies from "./reply";
import categories from "./category";
import likes from "./like";
import themes from "./theme";

const rootReducer = combineReducers({
  users,
  commons,
  posts,
  searches,
  temps,
  comments,
  replies,
  categories,
  likes,
  themes,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

export type RootState = ReturnType<typeof rootReducer>;
