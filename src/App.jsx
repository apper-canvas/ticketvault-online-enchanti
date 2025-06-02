import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Events from './pages/Events'
import Movies from './pages/Movies'
import Sports from './pages/Sports'
import Concerts from './pages/Concerts'
import NotFound from './pages/NotFound'
import Account from './pages/Account'
function App() {
  return (
<div className="App">
<Routes>
<Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="mt-16"
        toastClassName="rounded-xl shadow-lg"
      />
    </div>
  )
}

export default App