import { useState } from 'react';
// Import PDFDocument from pdf-lib
import { PDFDocument } from 'pdf-lib'; 
// Import zoomPlugin for zoom features
import { zoomPlugin } from '@react-pdf-viewer/zoom';
// Import ReactPDFViewer to view pdf and to drag and drop
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
    //this prevents browser from opening the file 
    event.preventDefault(); 
    // Get the dropped file
    const file = event.dataTransfer.files[0]; 

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
  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (file && file.type == 'application/pdf') {
      setPdfFile(file);
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setPdfUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
    else {
      alert('File selected is not a valid PDF file');
    }
  }

  //Zoom functions
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton } = zoomPluginInstance


  return (
    <>
      {/* Utility Bar */}
      {
        <div className = "utilities" style={{ border: '2px solid #ccc', padding: '20px', textAlign: 'center',margin: '20px 0',}}>
        <button onClick={() => setPdfFile(null)}>Save</button>
        <button onClick={() => setPdfUrl(null)}>Add Text</button>
        <button onClick={() => setPdfFile(null)}>Remove Text</button>
        <button onClick={() => setPdfFile(null)}>TEXT STYLES</button>
        <ZoomInButton />
        <ZoomOutButton />
        </div>
      }


      {/* PDF Preview */}
      {pdfUrl && (
        <div className = "PDFViewer"
        style={{ marginBottom: '20px', border: '10px solid #ccc', width: '100%', height: '90vh',overflow: 'auto'}}>
        {/* Worker URL to be compatible to the npm version  */} 
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfUrl} plugins = {[zoomPluginInstance]}/>
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

      {/* File input for manual upload */}
      <div style={{ margin: '20px 0' }}>
        <input type="file" accept="application/pdf" onChange={uploadFile} />
      </div>
    </>
  );
}

export default App;
