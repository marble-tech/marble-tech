import { testFileRemover } from "./testFileRemover";
require('ts-mocha');
import Mocha from 'mocha';

/**
 * Helper function for running tests
 * @param appFilePath 
 * @param testFilePath 
 */
export async function testRunner(appFilePath: string, testFilePath: string){
  const test = new Mocha();
  test.useColors(false);
  test.addFile(testFilePath);
  // Return a promise of mocha results
  return new Promise<any>((resolve, reject) => {
    test.run((failures) => {
      // Get file paths
      const paths = [appFilePath, testFilePath];
      // Remove files after test
      testFileRemover(paths);
      // Store test results
      const results = test.suite.suites[0].tests.map(test => {
        return {title: test.title, state: test.state};
      });
      // Store score
      const score = (((results.length)-failures)/results.length)*100;
      // Return test results, failures and score
      resolve({ 
        results, failures, score
      });
    });
  });
  
}