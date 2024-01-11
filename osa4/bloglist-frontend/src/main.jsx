import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
});

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
