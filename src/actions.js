export const ADD_POST = 'ADD_POST'  
export const REMOVE_POST = 'REMOVE_POST'
export const EDIT_POST = 'EDIT_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const UPVOTE = 'UPVOTE'
export const DOWNVOTE = 'DOWNVOTE'


export function addPost(){
    const url = "http://localhost:3001"
    let state=[];
    fetch(`${url}   /posts`, { headers: { 'Authorization': 'whatever-you-want',
    'content-type' :'application/json',
    'Accept': 'application/json'
  },
                  } )
      .then( (res) => {  return(res.json()) })
      .then((data) => {
        state=data;   
    return {
        
        state
    }
        // allPosts(state,'dddd');  
        // console.log("store reducers state",state);
      });
      return {
        
        state
    }
      
}

export function removePost({id}){
    return {
        type : REMOVE_POST   
    }
}

export function editPost({}){
    return {
        type : EDIT_POST    
    }
    //api req to edit the post 
}

export function addComment({}){
    return {
        type : ADD_COMMENT   
    }
}

export function  removeComment({id}){
    return {
        type : REMOVE_COMMENT   
    }
}

export function editComment({}){
    return {
        type : EDIT_COMMENT   
    }
    // api req to edit the conmment
}

