const GetData = (url: string) => {
    return new Promise((resolve) => {
        fetch(url, { method: 'GET' })
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
const PostData = (url: string, profileUrl: string, headers?: any) => {
    return new Promise((resolve) => {
        fetch(url, { method: 'POST', body: profileUrl, headers})
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
const PutData = (url: string, profileUrl: string) => {
    return new Promise((resolve) => {
        fetch(url, { method: 'PUT', body: profileUrl })
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
export { GetData, PostData, PutData };
