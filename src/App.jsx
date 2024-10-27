
import './App.css'
import FryerCard from './components/FryerCard/FryerCard'

function App() {
 

  return (
    <div className='app'>
      <h1>Fryer Counter</h1>
      <FryerCard
      number={1}/>
      <FryerCard
      number={2}/>
      <FryerCard
      number={3}/>
      
    </div>
  )
}

export default App
