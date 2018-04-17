const url = "http://localhost:3001";
const headers = {
  Authorization: "whatever-you-want",
  "content-type": "application/json",
  Accept: "application/json"
};
export const getCategories = () =>
  fetch(`${url}/categories`, {
    headers: headers
  }).then(res => res.json());

export const getPosts = () =>
  fetch(`${url}/posts`, {
    headers: headers
  }).then(res => res.json());

export const getPostsbyCategory = category =>
  fetch(`${url}/${category}/posts`, {
    headers: headers
  }).then(res => res.json());

export const getPostbyId = id =>
  fetch(`${url}/posts/${id}`, {
    headers: headers
  }).then(res => res.json());

export const addPost = postBody =>
  fetch(`${url}/posts`, {
    headers,
    method: "POST",
    body: `${postBody}`
  }).then(res => res.json());

export const updatePost = (postBody, id) =>
  fetch(`${url}/posts/${id}`, {
    headers,
    method: "PUT",
    body: `${postBody}`
  }).then(res => res.json());

export const deletePost = id =>
  fetch(`${url}/posts/${id}`, {
    headers,
    method: "DELETE"
  }).then(res => res.json());

export const postVote = (like, id) =>
  fetch(`${url}/posts/${id}`, {
    headers,
    method: "POST",
    body: `${like}`
  }).then(res => res.json());

export const getComments = id =>
  fetch(`${url}/posts/${id}/comments`, {
    headers: headers
  }).then(res => res.json());

export const addComment = commentBody =>
  fetch(`${url}/comments`, {
    headers,
    method: "POST",
    body: `${commentBody}`
  }).then(res => res.json());

export const updateComment = (commentBody, id) =>
  fetch(`${url}/comments/${id}`, {
    headers,
    method: "PUT",
    body: `${commentBody}`
  }).then(res => res.json());

export const deleteComment = id =>
  fetch(`${url}/comments/${id}`, {
    headers,
    method: "DELETE"
  }).then(res => res.json());

export const commentVote = (like, id) =>
  fetch(`${url}/comments/${id}`, {
    headers,
    method: "POST",
    body: `${like}`
  }).then(res => res.json());
