import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { Container } from '../styles/pages/upload'
import { NextPage } from 'next'
const MyUploader: NextPage = () => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: '/' }
  }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file)
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = files => {
    console.log(files.map(f => f.meta))
  }

  return (
    <Container>
      <h1>Formulario vai aqui em cima</h1>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*,video/*,application/pdf"
        styles={{ width: '20%', heigth: '10%', border: '5px solid black' }}
      />
    </Container>
  )
}

export default MyUploader
