export function compareUrl(url1: string, url2: string) {
  if (url1[0] == '/') url1 = url1.substring(1, url1.length - 1);

  if (url2[0] == '/') url2 = url2.substring(1, url2.length - 1);

  if (!url1.includes(':') && !url2.includes(':')) return url1 === url2;

  var url1Parts = url1.split('/');
  var url2Parts = url2.split('/');

  if (url1Parts.length != url2Parts.length) return false;

  for (let i = 0; i < url1Parts.length; i++) {
    if (url1Parts[i] == url2Parts[i]) continue;

    if (url1Parts[i].includes(':')) continue;

    if (url2Parts[i].includes(':')) continue;

    return false;
  }

  return true;
}
