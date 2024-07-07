function getImgUrl(content) {
  let urls = [];
  content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
    urls.push(capture);
  });
  return urls;
}

export default getImgUrl;
