import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Redux
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
