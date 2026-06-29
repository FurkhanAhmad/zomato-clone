//datauri->when we upload image on cloudinary so we have to send a buffer (image file is made in buffer first then we send on cloudinary)
//cloudinary except the buffer...

import DataURIParser from "datauri/parser.js";
import path from 'path'
const getBuffer=(file:any)=>{
    const parser=new DataURIParser()

      const exName=path.extname(file.originalname).toString()//for the file original name (like jpg,png)

      return parser.format(exName, file.buffer);
};
export default getBuffer;