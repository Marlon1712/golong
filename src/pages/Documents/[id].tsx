import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'

import axios from 'axios'
import React, { useState } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import { Container } from '../../styles/pages/doc-style'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
export default function MyApp({ url }: anexo): JSX.Element {
  const [numPages, setNumPages] = useState(null)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }
  const file = url as string
  const uri = file.split('/')
  return (
    <Container>
      <Document
        file={`/${uri[1]}`}
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const _id = context.query.id as string

  const response = await axios.get(`http://localhost:3000/api/Documents/${_id}`)
  const anexo = response.data

  return {
    props: anexo
  }
}
