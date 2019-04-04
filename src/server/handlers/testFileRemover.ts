import * as fs from 'fs';

export async function testFileRemover(paths: string[]){
  // For each path, remove the file
  paths.forEach(path => {
    fs.unlink(path, () => {
      console.log(`Deleted: ${path}`);
    });
  });
}