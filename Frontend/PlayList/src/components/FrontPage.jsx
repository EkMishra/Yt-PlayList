import React,{createContext, useState} from "react";
import Form from "./Form";
import TimeBlock from "./TimeBlock";

export const DataContext = createContext()


export default function FrontPage(){
  const [fetchedData,setFetchedData] = useState({data :null});
  const [loading, setLoading] = useState(false);

  
  return(
    <DataContext.Provider value={{fetchedData,setFetchedData,loading,setLoading}}>
      <Form/> 
      <TimeBlock/>
    </DataContext.Provider>
  )

}
