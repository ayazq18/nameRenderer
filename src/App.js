import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import html2pdf from "html2pdf.js";
import NameCard from "./NameCard";
import "./styles.css";

const App = () => {
  const [data, setData] = useState([]);
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

      const normalizedData = rawData.map((row) => ({
        name: row["List 1"], // replace if needed
        location: "NAGPUR",
      }));

      setData(normalizedData);
    };

    reader.readAsBinaryString(file);
  };

  const handleDownload = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0,
      filename: "name-cards.pdf",
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="app">
      <div className="upload-controls">
        <input type="file" accept=".xlsx, .xls" onChange={handleUpload} />
        <button className="download-btn" onClick={handleDownload}>
          Download PDF
        </button>
      </div>

      <div ref={pdfRef}>
        {[...Array(Math.ceil(data.length / 32))].map((_, pageIndex) => {
          const pageData = data.slice(pageIndex * 32, (pageIndex + 1) * 32);

          return (
            <div
              key={pageIndex}
              className="card-container page"
              style={{
                pageBreakAfter:
                  pageIndex < Math.ceil(data.length / 36) - 1
                    ? "always"
                    : "auto",
              }}
            >
              {pageData.map((item, index) => (
                <NameCard
                  key={index}
                  name={item.name}
                  location={item.location}
                  index={index}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
