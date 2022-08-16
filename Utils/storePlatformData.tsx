const StorePlatformData = (url: string, body: any) => {
  return new Promise((resolve) => {
    fetch(url, {
      method: 'POST', body, headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        resolve(json);
      }).catch(e => {
        throw e
      })
  });
};
export { StorePlatformData };