import corsRequest from './corsRequest';
const post = (url, params, config) => {
  let reqPrams = {
    type: "POST",
    url: url,
    data: params,
    config: config || {}
  };
  return corsRequest(reqPrams);
};

const get = (url, params, config) => {
  let reqPrams = {
    type: "GET",
    url: url,
    data: params,
    config: config || {}
  };
  return corsRequest(reqPrams);
};


export {
  post,
  get
}