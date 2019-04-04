export function _checkStatus(response:any){
    if(response.status >= 200 && response.status < 300){
        return response;
    } else {
        let error = new Error(response.statusText);
        error.message = response.statusText;
        throw error;
    }
}