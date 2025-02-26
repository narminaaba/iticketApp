import axios from "axios";
import { API_BASE_URL } from "./api.js";

async function getAll(endpoint) {
    const result = {
        data: null,
        loading: true,
        error: null,
    };
    await axios
        .get(API_BASE_URL + endpoint)
        .then((responce) => {
            result.data = responce.data;
        }).catch((err) => {
            result.error = err;
        }).finally(() => {
            result.loading = false;
        });
    return result;
}

async function getById(endpoint, id) {
    const result = {
        data: null,
        loading: true,
        error: null,
    };
    await axios
        .get(API_BASE_URL + endpoint + `${id}`)
        .then((responce) => {
            result.data = responce.data;
        }).catch((err) => {
            result.error = err;
        }).finally(() => {
            result.loading = false;
        });
    return result;
}

async function post(endpoint, payLoad) {
    const result = {
        data: null,
        loading: true,
        error: null,
    };
    await axios
        .post(API_BASE_URL + endpoint, payLoad)
        .then((responce) => {
            result.data = responce.data;
        }).catch((err) => {
            result.error = err;
        }).finally(() => {
            result.loading = false;
        })
    return result;
}

async function updateOne(endpoint, payLoad, id) {
    const result = {
        data: null,
        loading: true,
        error: null,
    };
    await axios
        .put(API_BASE_URL + endpoint + `${id}`, payLoad)
        .then((responce) => {
            result.data = responce.data;
        }).catch((err) => {
            result.error = err;
        }).finally(() => {
            result.loading = false;
        })
    return result;
}

async function deleteOne(endpoint, id) {
    const result = {
        data: null,
        loading: true,
        error: null,
    };
    await axios
        .delete(API_BASE_URL + endpoint + `${id}`)
        .then((responce) => {
            result.data = responce.data;
        }).catch((err) => {
            result.error = err;
        }).finally(() => {
            result.loading = false;
        })
    return result;
}

const controller = {
    getAll: getAll,
    getById: getById,
    post: post,
    updateOne: updateOne,
    deleteOne: deleteOne,
}
export default controller;