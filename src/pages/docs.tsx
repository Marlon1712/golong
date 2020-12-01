import React, { useState } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'

import { Container } from '../styles/pages/doc-style'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const index = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1) // setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset)
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }
  return (
    <div>
      <>
        <Document
          file={{
            url: './my.pdf'
          }}
          onLoadError={e =>
            console.log('Error while loading document! ' + e.message)
          }
          onSourceError={e =>
            console.log('Error while loading document! ' + e.message)
          }
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page size="A4" pageNumber={1} />
        </Document>
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </>
    </div>
  )
}

export default index
