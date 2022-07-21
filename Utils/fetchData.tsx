import { rejects } from "assert/strict";

const GetData = (url: string) => {
  return new Promise(resolve => {

    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        resolve(json)
      })

  })

}
export { GetData }