
import './App.css'
import {useEffect, useState} from 'react'
import FryerCard from './components/FryerCard/FryerCard'
import { MultipleFryerTracker } from './components/MultipleFryerTracker/MultipleFryerTracker'
// import { db } from './config/firebase';
// import {getDocs, collection} from "firebase/firestore";
function App() {
  
  // const fryerInformationRef = collection(db, 'fryerCounter')
  // useEffect(() => {
  //   const getFryerInfo = async () => {

  //     try {
  //       const data = await getDocs(fryerInforqmationRef)
  //       const filteredData = data.docs.map((doc)=>{
  //         return {...doc.data(), id: doc.id}
  //       })
  //       console.log(filteredData);
  //       filteredData.map((items)=> console.log(items))
        
  //     } catch (error) {
  //       console.error(error)
        
  //     }
  //   };
  //   getFryerInfo()

    
  // }, []);

  return (
    <div className='app'>
      <MultipleFryerTracker/>
      
    </div>
  )
}

export default App
