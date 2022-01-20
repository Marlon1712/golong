import multer, { Options } from 'multer'
import crypto from 'crypto'
import fs from 'fs'

export const multerConfig: Options = {
  dest: './public/uploads',
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        const dirre = `./public/uploads/lups/${req.headers.nomeprocedimento}`
        // Verifica se não existe
        if (!fs.existsSync(dirre)) {
          // Efetua a criação do diretório
          fs.mkdirSync(dirre)
        }
        cb(null, dirre)
      } catch (error) {
        console.log(error)
      }
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(10, err => {
        if (err) cb(err, file.filename)

        const fileName = file.originalname // const fileName = `${hash.toString('hex')}-${file.originalname}`
        cb(null, fileName)
      })
    }
  }),
  limits: {
    fileSize: 50 * 1024 * 1024
  },
  fileFilter: (req, file, cb): void => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'video/mp4'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'))
    }
  }
}
