import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productsreducer } from './reducers/productsreducer';
import {alertsreducer} from './reducers/alertsreducer';
import {bookingsreducer} from './reducers/bookingsreducer';
const composeEnhancers = composeWithDevTools({
});

const rootreducer = combineReducers({
   productsreducer,
   alertsreducer,
   bookingsreducer   
});

const store = createStore(
  rootreducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;