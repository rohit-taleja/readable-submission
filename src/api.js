import uuid from 'node-uuid'
const api = "http://localhost:3001"

const headers = {
  'Authorization': 'what-ever',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export function getAllPosts(){
  return fetch(`${api}/posts`, { headers })
           .then(res => res.json())
}

export function getCategories(){
  return fetch(`${api}/categories`, { headers })
           .then(res => res.json())
           .then(data => data.categories)
}

/**
 * API call to update VoteScore for a post/comment
 * params:
 *   data        : string - posts/comments
 *   id          : string - post/comment id
 *   optionValue : string - upVote/downVote
 * return: object - updated post/comment
*/
export function updateVoteScore(data, id, optionValue){
  const url = api + "/" + data + "/" + id;
  const body = JSON.stringify({option : optionValue});

  return fetch(`${url}`, {
           headers,
           method : 'POST',
           body   : `${body}`
         })
         .then(res => res.json())
}

/**
 * API call to add a post / comment
 * params:
 *   endpoint        : string - "posts" / "comments"
 *   contents        : string - post / comment contents
 * return: object - added post / comment
*/
export function addNew(endpoint, contents){
  const url = api + "/" + endpoint;
  const postBody = JSON.stringify({...contents, 'id': uuid.v4(), 'timestamp' : Date.now()})

  return fetch(`${url}`, {
           headers,
           method : 'POST',
           body   : `${postBody}`
         })
         .then(res => res.json())
}

export function editPost(id, postContents){
  let postBody = JSON.stringify(postContents)

  return fetch(`${api}/posts/${id}`, {
           headers,
           method : 'PUT',
           body   : `${postBody}`
         })
         .then(res => res.json())
}

export function deletePost(id){
  return fetch(`${api}/posts/${id}`, {
           headers,
           method : 'DELETE'
         })
         .then(res => res.json())
}

export function getComments(postId){
  return fetch(`${api}/posts/${postId}/comments`, {
           headers,
         })
         .then(res => res.json())
}

export function deleteComment(id){
  return fetch(`${api}/comments/${id}`, {
           headers,
           method : 'DELETE'
         })
         .then(res => res.json())
}

export function editComment(id, contents){
  let postBody = JSON.stringify({'body' : contents, 'timestamp' : Date.now()})

  return fetch(`${api}/comments/${id}`, {
           headers,
           method : 'PUT',
           body   : `${postBody}`
         })
         .then(res => res.json())
}
