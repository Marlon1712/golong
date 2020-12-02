import { NextPage } from 'next'
import React, { useState } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import { Container } from '../styles/pages/doc-style'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
const MyApp: NextPage = () => {
  const [numPages, setNumPages] = useState(null)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  const pdf = '/procediment/calibracao.pdf'

  return (
    <Container>
      <Document
        file={pdf}
        renderMode={'canvas'}
        options={{ workerSrc: '/pdf.worker.js' }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} width={1400} />
        ))}
      </Document>
    </Container>
  )
}

export default MyApp
