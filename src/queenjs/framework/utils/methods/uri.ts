export function getQuery() {
    const search = location.href.split('?')[1];
    const ret: { [name: string]: string } = {};
    if (search) {
      const aParams = search.split('&');
      const len = aParams.length;
      for (let i = 0; i < len; i++) {
        const aParam = aParams[i].split('=');
        const sParamName = decodeURIComponent(aParam[0]);
        const sParamValue = decodeURIComponent(aParam[1]);
        ret[sParamName] = sParamValue;
      }
    }
    return ret;
}

export function bytesToHuman(bytes: number) {
    if (isNaN(bytes) || bytes === 0) return '0 B';
    const k = 1000;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

export function  dataUriToBlob(base64Data: string) {
    let byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(base64Data.split(',')[1]);
    else byteString = unescape(base64Data.split(',')[1]);
    const mimeString = base64Data
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
      
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
}

export async function urlToBlob(url: string) {
    const response = await fetch(url + '?t=' + Date.now(), { mode: 'cors' });
    return response.blob();
}