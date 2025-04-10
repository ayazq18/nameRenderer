import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import NameCard from "./NameCard";
import "./styles.css";

const App = () => {
  const [data, setData] = useState([]);
  console.log('data===', data);
  const pdfRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const rawData = XLSX.utils.sheet_to_json(ws);
  
      // Normalizing key: 'List 1' -> 'name'
      const normalizedData = rawData.map((row) => ({
        name: row["List 1"], // replace "List 1" with the exact header in your Excel
        location: "NAGPUR", // hardcoded as per your UI
      }));
  
      setData(normalizedData);
    };
  
    reader.readAsBinaryString(file);
  };
  

  const handleDownload = () => {
    html2canvas(pdfRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("name-cards.pdf");
    });
  };

  return (
    <div className="app">
    <div className="upload-controls">
      <input type="file" accept=".xlsx, .xls" onChange={handleUpload} />
      <button className="download-btn" onClick={handleDownload}>Download PDF</button>
    </div>
  
    <div className="card-container" ref={pdfRef}>
      {data.map((item, index) => (
        <NameCard key={index} name={item.name} location={item.Location} index={index} />
      ))}
    </div>
  </div>
  
  );
};

export default App;

// import React, { useState, useRef } from "react";
// import Tesseract from "tesseract.js";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import NameCard from "./NameCard"; // your styled card component

// const ImageToNames = () => {
//   const [names, setNames] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const previewRef = useRef();

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setLoading(true);
//     const imageUrl = URL.createObjectURL(file);

//     const result = await Tesseract.recognize(imageUrl, "eng", {
//       logger: (m) => console.log(m),
//     });

//     const extractedText = result.data.text;
//     const lines = extractedText
//       .split("\n")
//       .map((line) => line.trim())
//       .filter((line) => line.length > 0);

//     const formatted = lines.map((line) => ({
//       name: line,
//       location: "NAGPUR",
//     }));

//     setNames(formatted);
//     setLoading(false);
//   };

//   const handleDownloadPDF = async () => {
//     const element = previewRef.current;
//     const canvas = await html2canvas(element);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");
//     const width = pdf.internal.pageSize.getWidth();
//     const height = (canvas.height * width) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, width, height);
//     pdf.save("names-list.pdf");
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       {loading && <p>Extracting names...</p>}

//       <div ref={previewRef} style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: 20 }}>
//         {names.map((item, index) => (
//           <NameCard key={index} name={item.name} location={item.location} />
//         ))}
//       </div>

//       {names.length > 0 && (
//         <button onClick={handleDownloadPDF} style={{ marginTop: 20 }}>
//           Download PDF
//         </button>
//       )}
//     </div>
//   );
// };

// export default ImageToNames;
