
const GetData = (url: string) => {
  return new Promise(resolve => {

    fetch(url, { method: "GET" })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        resolve(json)
      })

  })

}
const PostData = (url: string, profileUrl: string) => {
  return new Promise(resolve => {

    fetch(url, { method: "POST", body: profileUrl })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        resolve(json)
      })

  })

}
const ForwardPostData = (url: string, data: string) => {
  return new Promise(resolve => {
    const param = JSON.stringify({
      url,
      body: data
    })

    fetch('/api/forward-post', { method: "POST", body: param })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        resolve(json)
      })

  })

}
export { GetData, PostData, ForwardPostData };
