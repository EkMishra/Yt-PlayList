import React, { useContext, useState } from "react";
import { DataContext } from "./FrontPage";

export default function Form() {
  const [formData, setFormData] = useState({
    playlist: "",
  });
  const [error, setError] = useState("");

  const { setFetchedData,setLoading } = useContext(DataContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch("http://localhost:3000/submit-playlist-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data)
      setFetchedData(data);
    } catch (error) {
      setError(error.message)
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
        <label htmlFor="playListLink"></label>
        <input
          type="text"
          name="playlist"
          value={formData.playlist}
          id="playListLink"
          onChange={handleInputChange}
        ></input>
        <button type="Submit">Submit </button>
      </form>
    </>
  );
}
