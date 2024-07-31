import multer from 'multer'
import {Request} from 'express'

const storage = multer.diskStorage({
    destination : function(req:Request,file:Express.Multer.File,cb:any){
        const allowedFileTypes = ['image/jpg','image/png','image/jpeg']
        if(!allowedFileTypes.includes(file.mimetype)){
            cb(new Error("This filetype is not accepted"))
            return
        }
        cb(null,'./src/uploads')   //If the file type is allowed, this calls the callback with null (no error) and sets the destination directory to '/src/uploads'. This is where the files will be saved on the server.
    },

    filename : function(req:Request,file:Express.Multer.File,cb:any){
        cb(null, Date.now() + "-" + file.originalname)
    }
})

export {multer, storage }