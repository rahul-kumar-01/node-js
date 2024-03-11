{

    //method to submit the form data for new post using AJAX

    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),      //key and value pair
                success: function(data) {
                    //Intially
                    // console.log("Received JSON data:");
                    console.log(data);

                    //After adding newPostDom
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost)); //don't forget to add space this class is inside newPost

                },
                error: function(error) {
                    console.log("Error occurred:");
                    console.log(error.responseText);
                }
            });
        });
    };



    //user post._id
    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>

                <small>
                    <a href="/post/destroy/${post._id}" class="delete-post-button"  style="color: red;">X</a>      
                </small>

           

            ${post.content}
            

            <br>
            <small>
                ${post.userId.userName}
            </small>
        </p>
    
    
        <div class="post-comment">
    
                <form action="/comment/create" method="post">
                    <input type="text" name="content" placeholder="Add comment..." required >
                    <input type="hidden" name="postId" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
        
    
            <div class="post-comment-list">
                <ul id="post-comment-${post._id}">

                
                </ul>
            </div>
    
        </div>
    </li>`)
    }


    // method to delete a post from DOM
    // this is fuction that is sending the ajax request
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: "get",
                url: $(deleteLink).prop("href"),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function (error) {
                    console.log(error.responseText);
                },
            });
        });
    };

    createPost();
}

