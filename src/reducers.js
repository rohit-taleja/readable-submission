
import {
    ADD_POST,
    REMOVE_POST,
    EDIT_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    EDIT_COMMENT,
    UPVOTE,
    DOWNVOTE,
    addPost
} from './actions'




    //api req to fetech all posts
    const url = "http://localhost:3001"
    let state=[];
    fetch(`${url}/posts`, { headers: { 'Authorization': 'whatever-you-want',
    'content-type' :'application/json',
    'Accept': 'application/json'
  },
                  } )
      .then( (res) => {  return(res.json()) })
      .then((data) => {
        state=data;
        // allPosts(state,'dddd');  
        // console.log("store reducers state",state);
      });
  
      
function allPosts(state=addPost,action){
    console.log("stores state",{state})
    switch(action.type){
        case ADD_POST :
            return{
             
            }
        case REMOVE_POST :
            return{
                
            }
        case EDIT_POST :
            return{
                
            }
        case ADD_COMMENT :
            return{
                
            }
        case REMOVE_COMMENT :
            return{
                
            }
        case EDIT_COMMENT :
            return{
                
            }   
        case UPVOTE :
            return{
                
            }
        case DOWNVOTE :
            return{
                
            }
        default :
            return state    
    }
}

export default allPosts