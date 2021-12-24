import Jimp from "Jimp";
import { v4 as uuidv4 } from 'uuid';


export function Png2Jpg(filepath:string){
    Jimp.read(filepath, function (err, lenna) {
        if (err) throw err;
        lenna.resize(3000, 4000)      // resize
             .quality(85)             // quality
             .write(uuidv4()+".jpg"); // save
    });    
}

export function Jpg2Jpg(filepath:string){
    Jimp.read(filepath, function (err, lenna) {
        if (err) throw err;
        lenna.resize(3000, 4000)      // resize
             .quality(85)             // quality
             .write(uuidv4()+".jpg"); // save
    });    
}



Png2Jpg("a.png");
