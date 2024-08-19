import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Chat from 'components/Chat'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
