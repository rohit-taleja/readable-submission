import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import serializeForm from 'form-serialize'
import uuid from 'node-uuid'

class EditPosts extends Component{
    state={
        newPost:[]
    }
   
    render (){
        //console.log("porposp detali",this.props.details)
        return (
            // <div>
            //     <Link to="/">Back </Link>
            //     Addpost page
            //     <form onSubmit={(event)=>this.props.handleSubmission(event)}>
            //       <div>
            //         title
            //     <input type='text'  name='title' placeholder='Add title'/>
            //     </div>
            //     <div>
            //         body
            //         <textarea type='text' name='body' placeholder='content'/>
            //     </div>
            //     <div>
            //         author
            //         <input type='text'name='author'  placeholder='Author name'/>
                
            //     </div>
            //     <select name='category'>
            //     <option>select category</option>
            //         <option>react</option>
            //         <option>redux</option>
            //         <option>udacity</option>
            //         </select>
            //     <button>submit</button>
            //     </form>
            //     </div>
            <div>ujjawal</div>
        )
    }
}
export default EditPosts;