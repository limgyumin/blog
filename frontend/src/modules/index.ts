import { applyMiddleware, createStore, combineReducers, compose } from "redux";
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

const configureStore = () => {
  const middlewares = [thunk];
  const isProduction = process.env.NODE_ENV === "production";

  // Production일 경우 DevTools를 사용하지 않음.
  const enhancer = isProduction
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));

  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;

export type RootState = ReturnType<typeof rootReducer>;
