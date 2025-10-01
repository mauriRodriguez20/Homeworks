import './index.css'
import CounterPanel from './components/counterPanel.jsx' 
import StackPanel from './components/StackPanel.jsx'     

export default function App() {
  return (
    <div className="container">
      <h1>Challenge 10 — Redux</h1>
      <p style={{ opacity: .85, marginTop: -6 }}>
        Métodos: Decrement, Increment ,IncrementBy.
      </p>

      <div className="grid2">
        <CounterPanel />
        <StackPanel />
      </div>
    </div>
  )
}
