import multer, { Options } from 'multer'
import crypto from 'crypto'

export const multerConfig: Options = {
  dest: './public/uploads',
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      switch (file.mimetype) {
        case 'video/mp4': {
          cb(null, './public/uploads/videos')
          break
        }
        case 'application/pdf': {
          cb(null, './public/uploads/documents')
          break
        }
        default: {
          cb(null, './public/uploads/images')
          break
        }
      }
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(10, (err, hash) => {
        if (err) cb(err, file.filename)

        const fileName = `${hash.toString('hex')}-${file.originalname}`
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
