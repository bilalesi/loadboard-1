import axios from "axios";
//import http from "../http-common";
const getAll = async ({report,filters,controller}) => {
    var appendUrl = "?";
    //appendUrl += "sort=id,desc";
    switch (report){
        case report:
            appendUrl += "report=" + report;
        break;
    }
    for(let filterKey in filters){
        let filter = filters[filterKey];
        console.log('blah');
        appendUrl += '&' + filterKey + "=" + filter;
    }
    // process.env.DEV_AXIOS_URL
    //             PROD_AXIOS_URL
    const API_URL = process.env.REACT_APP_TARGET_ENV === 'development' ?
              `${process.env.REACT_APP_API_URL_ENV}` :
              `${process.env.REACT_APP_API_URL}`;
    return await axios.get(API_URL + appendUrl, {
        signal: controller.signal
    }).then(res => res.data);
        /*try {
            const rtrn = await http.get("/getloads" + appendUrl);
            return rtrn.then(res => res.data);
        } catch (err) {
            console.error('axiosError:');
            console.error(err);
        } */
    
};
const get = async id => {
    return axios.get(`/getload?id=${id}`);
};
/* const create = data => {
    return http.post("/tutorials", data);
};
const update = (id, data) => {
    return http.put(`/tutorials/${id}`, data);
};
const remove = id => {
    return http.delete(`/tutorials/${id}`);
};
const removeAll = () => {
    return http.delete(`/tutorials`);
};
const findByTitle = title => {
    return http.get(`/tutorials?title=${title}`);
}; */
export default {
    getAll,
    get,
    // create,
    // update,
    // remove,
    // removeAll,
    // findByTitle
};