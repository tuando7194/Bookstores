import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers/index'
import rootSaga from './sagas/index'

export default function configureStore(preloadedState) {
	// create the saga middleware
	const sagaMiddleware = createSagaMiddleware()

	const middlewares = [sagaMiddleware]
	const middlewareEnhancer = applyMiddleware(...middlewares)


	const composedEnhancers = composeWithDevTools(middlewareEnhancer)

	const store = createStore(rootReducer, preloadedState, composedEnhancers)

	if (process.env.NODE_ENV !== 'production' && module.hot) {
		module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
	}
	// then run the saga
	sagaMiddleware.run(rootSaga)
	return store
}
