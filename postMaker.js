function createPost(title, content) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
        id: Date.now(), // unique ID based on timestamp
        title,
        content,
        timestamp: new Date().toLocaleString()
    };
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function getPosts() {
    return JSON.parse(localStorage.getItem('posts')) || [];
}

function displayPosts() {
    const posts = getPosts();
    posts.forEach(post => {
        // Code to display each post on the page
        console.log(`Title: ${post.title}, Content: ${post.content}`);
    });
}

function updatePost(id, updatedTitle, updatedContent) {
    const posts = getPosts();
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex !== -1) {
        posts[postIndex].title = updatedTitle;
        posts[postIndex].content = updatedContent;
        posts[postIndex].timestamp = new Date().toLocaleString();
        localStorage.setItem('posts', JSON.stringify(posts));
    }
}

function deletePost(id) {
    const posts = getPosts();
    const updatedPosts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
}