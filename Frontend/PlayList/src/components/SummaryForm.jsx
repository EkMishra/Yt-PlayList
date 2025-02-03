import React, { useContext,useState  } from "react";
import { DataContext } from "../pages/SummaryPage";

export default function SummaryForm() {
  const [formData, setFormData] = useState({
    video: "",
  });
  const {setFetchedData,setLoading} = useContext(DataContext)
  async function handleSubmit(e){
    console.log(formData)
    e.preventDefault();
    setLoading(true)
    try{
      const response = await fetch(
        "http://localhost:3000/submit-video-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      
      console.log(data);
      setFetchedData(data);
    }catch(error){
      
    }
    setLoading(false)
  }
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label></label>
        <input
          type="text"
          name="video"
          value={formData.video}
          id="videoLink"
          onChange={handleInputChange}
        />
        <button type="Submit">Submit</button>
      </form>
    </>
  );
}
