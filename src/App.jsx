import { useState } from 'react';
import { PDFDocument } from 'pdf-lib'; // Import PDFDocument from pdf-lib
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import './App.css';

function App() {
  //states for storing pdf files that utilise drag and drop 
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  //Drag function
  const DragFile = (event) => {
    event.preventDefault(); // Prevent default to allow drop
  };
  
  //Drop function
  const DropFile = (event) => {
    event.preventDefault(); //this prevents browser from opening the file 
    const file = event.dataTransfer.files[0]; // Get the dropped file

    if (file && file.type == 'application/pdf') {
      // Set the PDF file to state
      setPdfFile(file);

      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setPdfUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    } else {
      alert('File drop is not a valid PDF file');
    }
  };

  //uploadFile function
  const uploadFile = async () => {
    if (pdfFile) {
      const pdfData = await pdfFile.arrayBuffer(); // Read the PDF file as an ArrayBuffer
      const pdfDoc = await PDFDocument.load(pdfData); // Load the PDF document
      console.log('PDF Document loaded:', pdfDoc);
    } else {
      alert('No PDF file selected.');
    }
  };

  return (
    <>
      {/* PDF Preview */}
      {pdfUrl && (
        <div style={{ marginBottom: '20px', border: '1px solid #ccc' }}>

      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfUrl} />
      </Worker>

        </div>
      )}

      {/* Drag and Drop Area */}
      <div
        onDrop={DropFile}
        onDragOver={DragFile}
        className="drop-area"
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          margin: '20px 0',
        }}
      >
        <p>Drag and drop a PDF file here</p>
      </div>

      <button onClick={uploadFile} disabled={!pdfFile}>
        Upload PDF
      </button>
    </>
  );
}

export default App;
