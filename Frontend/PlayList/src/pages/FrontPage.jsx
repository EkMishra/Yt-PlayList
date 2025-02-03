import React,{createContext, useState} from "react";
import PlaylistForm from "../components/PlaylistForm";
import TimeBlock from "../components/TimeBlock";

export const DataContext = createContext()


export default function FrontPage(){
  const [fetchedData,setFetchedData] = useState({data :null});
  const [loading, setLoading] = useState(false);

  
  return(
    <DataContext.Provider value={{fetchedData,setFetchedData,loading,setLoading}}>
      <PlaylistForm/> 
      <TimeBlock/>
    </DataContext.Provider>
  )

}
