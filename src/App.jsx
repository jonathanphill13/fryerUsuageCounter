
import './App.css'
import {useEffect, useState} from 'react'
import FryerCard from './components/FryerCard/FryerCard'
import { db } from './config/firebase';
import {getDocs, collection} from "firebase/firestore";
function App() {
  const [fryerIsOn, setFryerIsOn] = useState(false);
  const fryerInformationRef = collection(db, 'fryerCounter')
  useEffect(() => {
    const getFryerInfo = async () => {

      try {
        const data = await getDocs(fryerInformationRef)
        const filteredData = data.docs.map((doc)=>{
          return {...doc.data(), id: doc.id}
        })
        console.log(filteredData);
        filteredData.map((items)=> console.log(items))
        
      } catch (error) {
        console.error(error)
        
      }
    };
    getFryerInfo()

    
  }, []);

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
