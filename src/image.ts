import fs from "fs";
import crypto from "crypto";
import path from "path";

const BASE_DIR = "./lib/image/"

const ALLOW_EXTENSION = [".jpg", ".jpeg", ".png"]

function save(fileName: string, data:string):boolean{
  try {
    fs.writeFileSync(BASE_DIR + fileName, data);
  }catch (e){
    console.trace(e)
    return false
  }
  return true
}

/**
 * 画像を保存します．正常に保存できた場合は true を返します．
 * @param fileName
 * @param data
 * @constructor
 */
export function SaveImage(fileName: string, data:string):boolean{
  // フォルダが存在しない場合は作成
  if (!fs.existsSync(BASE_DIR)){
    fs.mkdirSync(BASE_DIR)
  }

  const extension = path.extname(fileName)
  const hash = crypto.createHash("sha256").update(data, 'utf8').digest("hex")
  const newFileName = hash+extension
  console.debug(`filename is ${fileName}, extension is ${extension}, newFileName is ${newFileName}`)

  return save(newFileName, data)
}

/**
 * 対応している拡張子かどうか調べます．対応しているなら true を返します．
 * @param fileName
 * @constructor
 */
export function IsAllowExtension(fileName:string):boolean{
  const extension = path.extname(fileName)
  for (let i=0; i++;i<ALLOW_EXTENSION.length){
    if (extension == ALLOW_EXTENSION[i]){
      return true
    }
  }
  return false
}