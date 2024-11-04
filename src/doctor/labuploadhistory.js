import React, { useEffect, useState } from "react";
import { db, storage } from "../config/FirebaseConfig"; // Import Firestore and Storage instances
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore"; // Firestore imports
import { getDownloadURL, ref, deleteObject } from "firebase/storage"; // Firebase Storage imports
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./labuploadhistory.css"; // Add your styles for the history page

function LaboratoryUploadHistory() {
    const [invoices, setInvoices] = useState([]); // State to hold fetched invoices
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const invoicesCollection = collection(db, "invoices");
                const invoicesQuery = query(invoicesCollection, orderBy("uploadTime", "desc"));
                const invoiceSnapshot = await getDocs(invoicesQuery);
                console.log("Documents fetched:", invoiceSnapshot.docs);

                const invoicesList = [];
                for (const doc of invoiceSnapshot.docs) {
                    const data = doc.data();
                    invoicesList.push({ id: doc.id, ...data });
                }

                setInvoices(invoicesList);
            } catch (error) {
                console.error("Error fetching invoices: ", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    // Handle delete action
    const handleDelete = async (id, fileName) => { // Add fileName as a parameter
        try {
            // Construct the file reference using the file name stored in Firestore
            const fileRef = ref(storage, `Invoices/${fileName}`);

            // Delete the file from Firebase Storage
            await deleteObject(fileRef);
            console.log("File deleted from storage:", fileName);

            // Delete the invoice document from Firestore
            await deleteDoc(doc(db, "invoices", id)); // Delete the invoice from Firestore
            setInvoices(invoices.filter((invoice) => invoice.id !== id)); // Update state to remove deleted invoice
            console.log("Invoice deleted from Firestore:", id);
        } catch (error) {
            console.error("Error deleting invoice or file: ", error.message);
        }
    };

    // Handle download action
    const handleDownload = async (invoice) => {
      try {
          const fileRef = ref(storage, `Invoices/${invoice.fileName}`); // Use the stored file name
          const downloadUrl = await getDownloadURL(fileRef); // Get the download URL
  
          // Create a temporary link element
          const link = document.createElement("a");
          link.href = downloadUrl; // Set the download URL
          link.download = invoice.fileName; // Set the file name to download
  
          // Append the link to the body (required for Firefox and some other browsers)
          document.body.appendChild(link);
  
          // Trigger the download
          link.click();
  
          // Clean up: Remove the link after triggering the download
          document.body.removeChild(link);
      } catch (error) {
          console.error("Error downloading file: ", error.message);
          alert("Failed to download file. Error: " + error.message);
      }
  };
  
  

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div className="labuploadhistoryApp-con">
            <h1>Invoice History</h1>
            <div className="history-container">
                {invoices.length === 0 ? (
                    <p>No invoices found.</p>
                ) : (
                    <table className="labuploadhistorytable">
                        <thead>
                            <tr>
                                <th>Laboratory Name</th>
                                <th>Total Amount</th>
                                <th>Amount Paid</th>
                                <th>Due Amount</th>
                                <th>Upload Date</th>
                                <th>Upload Time</th>
                                <th style={{ textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="labuploadhistorytbody">
                            {invoices.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td>{invoice.LaboratoryName}</td>
                                    <td>{invoice.TotalAmount}</td>
                                    <td>{invoice.AmountPaid}</td>
                                    <td>{invoice.DueAmount}</td>
                                    <td>{invoice.uploadDate}</td>
                                    <td>{invoice.uploadTime}</td>
                                    <td className="labuploadhistory-actionbutton">
                                        <button style={{ textAlign: "center" }} onClick={() => navigate(`/labupload/${invoice.id}`)}>Edit</button>
                                        <button style={{ textAlign: "center" }} onClick={() => handleDelete(invoice.id, invoice.fileName)}>Delete</button>
                                        <button style={{ textAlign: "center" }} onClick={() => handleDownload(invoice)}>Download</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default LaboratoryUploadHistory;
