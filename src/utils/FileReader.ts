import { ChangeEvent } from "react";

const readFileAsync = (file: File) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  })
}

const readFilesAsync = async ({ target }: ChangeEvent<HTMLInputElement>) => {
  const files = target.files;
  const readedFiles = []
  if (files?.length) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const image = await readFileAsync(file)
      readedFiles.push({
        base64: image,
        name: file.name,
        size: file.size,
        type: file.type
      })
    }
  }

  return readedFiles
}


export {
  readFilesAsync,
  readFileAsync
}