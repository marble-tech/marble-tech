
export function convertToDataUrl(file: Express.Multer.File){
  // Convert buffer to string base 64
  const base64 = file.buffer.toString('base64');
  // Convert base64 to DataUrl
  const dataUrl = `data:${file.mimetype};base64,${base64}`;
  return dataUrl;
}