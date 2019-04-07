import * as fs from 'fs';

export async function testFileRemover(paths: string[]){
  // For each path, remove the file
  paths.forEach(path => {
    fs.unlink(path, (err) => {
      if(err) console.log(err);
      else console.log(`Deleted: ${path}`);
    });
  });
}