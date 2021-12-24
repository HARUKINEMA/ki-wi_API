import Jimp from "Jimp";

export function Png2Jpg(filepath:string){
    Jimp.read(filepath, function (err, lenna) {
        if (err) throw err;
        lenna.resize(256, 256)            // resize
             .write("lena-small-bw.jpg"); // save
    });    
}

Png2Jpg("a.png");