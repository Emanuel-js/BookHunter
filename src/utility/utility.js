
  export const bytesToSize=(bytes) =>{
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
 
export const   dataURItoBlob=(dataURI) =>{
  var byteString;
  if (dataURI?.split(',')[0].indexOf('base64') >= 0){
      byteString = atob(dataURI?.split(',')[1]);
  }
  else{
      byteString = unescape(dataURI?.split(',')[1]);
  }
  var mimeString = dataURI?.split(',')[0].split(':')[1].split(';')[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {type:mimeString});
}