import React, { useState } from "react";
import { db, storage } from "../config/FirebaseConfig"; // Import Firestore and Storage instances
import { collection, addDoc } from "firebase/firestore"; // Firestore imports
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage imports
import "./patientlabrecords.css";

function Patientlabrecords() {
  const [patentId, setPatentId] = useState("");
  const [pictureName, setPictureName] = useState(""); // This will now hold the selected report name
  const [pictureDetails, setPictureDetails] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Predefined list of report names
  const reportNames = [
    "IOPA",
    "OPG",
    "X-Ray Report",
    "Lateral Cephalogram",
    "CBCT",
    "Others",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `patentLabReports/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef); // Get image URL

      // Get current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString(); // Format date (e.g., "10/19/2024")
      const formattedTime = currentDate.toLocaleTimeString(); // Format time (e.g., "3:30:00 PM")
  
      // Save data to Firestore
      const docRef = await addDoc(collection(db, "patentLabReports"), {
        patentId: patentId,
        pictureDetails: pictureDetails,
        pictureName: pictureName,
        imageUrl: imageUrl,
        uploadDate: formattedDate, // Save current date
        uploadTime: formattedTime, // Save current time
      });
  
      console.log("Data successfully saved to Firestore! Document ID: ", docRef.id);
      alert("Patent data saved successfully!");
      
      // Reset form
      setPatentId("");
      setPictureName(""); // Reset selected report name
      setPictureDetails("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Failed to save data. Error: " + error.message);
    }
  };

  return (
    <div className="App-con">
      <form className="body-container" onSubmit={handleSubmit}>
        <h1>Patient's Report Submission</h1>
        <div>
          <label>Patient ID:</label><br />
          <input
            type="text"
            value={patentId}
            onChange={(e) => setPatentId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Select Report Name:</label><br />
          <select
            className="styled-select"
            value={pictureName}
            onChange={(e) => setPictureName(e.target.value)}
            required
          >
            <option value="" disabled>Select a report</option>
            {reportNames.map((report) => (
              <option key={report} value={report}>
                {report}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Report Details:</label><br />
          <input
            type="text"
            value={pictureDetails}
            onChange={(e) => setPictureDetails(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </div>
        {preview && (
          <div>
            <h3>Image Preview:</h3>
            <img src={preview} alt="Preview" className="image" />
          </div>
        )}
        <button className="patientlabrecordsbutton" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Patientlabrecords;
