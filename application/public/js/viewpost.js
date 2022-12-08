function addNewComment(data){
    let commentList = document.getElementById('comment-section');
    let newComment = document.createElement('template');
    newComment.innerHTML = `
    <div id="message-${data.commentId}">
        <p class="comment-author">@${data.username}</p>
        <p class="comment-time">${new Date().toLocaleString("en-US")}</p>
        <p class="comment-text">${data.comment}</p>
    </div>`;
    commentList.append(newComment.content);
    document.getElementById(`message-${data.commentId}`).scrollIntoView();
    console.log(`message-${data.commentId}`);
    var main = document.getElementById( 'main' );

    [].map.call( main.children, Object ).sort( function ( a, b ) {
        return +a.id.match( /\d+/ ) - +b.id.match( /\d+/ );
    }).forEach( function ( elem ) {
        main.appendChild( elem );
});
}

document.getElementById('comment-button').addEventListener('click', function(ev){
    let commentTextElement = document.getElementById("comment-text");
    let commentText = commentTextElement.value;
    let postId = ev.currentTarget.dataset.postid;

    if(!commentText) return;

    fetch("/comments/create", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({
            comment: commentText,
            postId: postId
        })
    })
    .then(response => response.json())
    .then(res_json =>{
        addNewComment(res_json.data);
    })
    .catch(err => console.log(err));
})