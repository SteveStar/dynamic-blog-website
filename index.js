document.addEventListener('DOMContentLoaded', function () {
    const postList = document.getElementById('post-list');
    
    // Get existing posts from local storage
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  
    // Check if there are posts
    if (posts.length === 0) {
      postList.innerHTML = '<p>No posts available!</p>';
      return;
    }
  
    // Create a list of posts
    posts.forEach(post => {
      const postElement = document.createElement('li');
      const postLink = document.createElement('a');
      postLink.href = `post.html?id=${post.id}`;
      postLink.textContent = post.title;
      
      postElement.appendChild(postLink);
      postList.appendChild(postElement);
    });
  });
  