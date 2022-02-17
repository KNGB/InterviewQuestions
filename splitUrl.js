function splitUrl(url, key, isNeedDecodeURI) {
  let paramsObj = {};
  let params = url.split("?")[1];
  if (params) {
    params.split("&").forEach((element) => {
      paramsObj[element.split("=")[0]] = element.split("=")[1];
    });
  }
  let value = paramsObj[key] || "";
  if (isNeedDecodeURI) {
    return decodeURI(value);
  } else {
    return value;
  }
}
console.log(
  splitUrl(
    "http://localhost:8080/bjsjjOa/#/result/maintainResults/transfer?projectId=c57d8b4ca8ab45aa9c3a298514997a52&pName=%E4%BA%AC%E6%B4%A5%E5%86%80%E5%AE%A1%E8%AE%A1%E6%9C%BA%E5%85%B3%E5%8D%8F%E5%90%8C%E5%AE%A1%E8%AE%A1&projectListId=2c0ba64b62024ea59471279319c3841f",
    "projectId"
  )
);
console.log(
  splitUrl(
    "http://localhost:8080/bjsjjOa/#/result/maintainResults/transfer?projectId=c57d8b4ca8ab45aa9c3a298514997a52&pName=%E4%BA%AC%E6%B4%A5%E5%86%80%E5%AE%A1%E8%AE%A1%E6%9C%BA%E5%85%B3%E5%8D%8F%E5%90%8C%E5%AE%A1%E8%AE%A1&projectListId=2c0ba64b62024ea59471279319c3841f",
    "pName",
    true
  )
);
