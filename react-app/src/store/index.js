import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import serverReducer from './server'
import channelReducer from './channel';
import membershipReducer from './membership';
import channelMessagesReducer from './channelMessages';

const rootReducer = combineReducers({
  session,
  server: serverReducer,
  channel: channelReducer,
  membership: membershipReducer,
  channelMessages: channelMessagesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
