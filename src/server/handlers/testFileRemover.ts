import * as fs from 'fs';

/**
 * Removes a test file from file system
 * @param paths 
 */
export async function testFileRemover(paths: string[]){
  // For each path, remove the file
  paths.forEach(path => {
    fs.unlink(path, (err) => {
      if(err) console.log(err);
      else console.log(`Deleted: ${path}`);
    });
  });
}