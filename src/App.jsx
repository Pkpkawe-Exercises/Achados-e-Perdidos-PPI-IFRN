import './App.css'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/Home'
import DetailItem from './pages/DetailItem'
import NewItem from './pages/NewItem'
import EditItem from './pages/EditItem'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Achados-e-Perdidos-PPI-IFRN/" element={<Home />} />
        <Route path="/Achados-e-Perdidos-PPI-IFRN/itens/:id" element={<DetailItem />} />
        <Route path="/Achados-e-Perdidos-PPI-IFRN/itens/new" element={<NewItem />} />
        <Route path="/Achados-e-Perdidos-PPI-IFRN/itens/:id/edit" element={<EditItem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
