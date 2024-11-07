document.addEventListener('DOMContentLoaded', function () {
  const postList = document.getElementById('post-list');
  let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

  // Log posts to check the output
  console.log('Posts from localStorage:', posts);

  if (posts.length === 0) {
    postList.innerHTML = '<p>No posts available!</p>';
    return;
  }

  // Create list items for each post
  posts.forEach(post => {
    const postElement = document.createElement('li');
    const postLink = document.createElement('a');
    postLink.href = `post.html?id=${post.id}`;  // link to individual post page
    postLink.textContent = post.title;
    postElement.appendChild(postLink);
    postList.appendChild(postElement);
  });
});
