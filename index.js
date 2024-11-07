document.addEventListener('DOMContentLoaded', function () {
  // Get posts from localStorage
  let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

  // Get the container where posts will be displayed
  const postsContainer = document.getElementById('posts-container');

  // Check if there are posts
  if (posts.length === 0) {
    postsContainer.innerHTML = '<p>No posts available</p>';
  } else {
    posts.forEach(function (post) {
      // Create an element for each post
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      // Add post title and date
      const postTitle = document.createElement('h2');
      postTitle.textContent = post.title;
      const postDate = document.createElement('p');
      postDate.textContent = `Posted on: ${post.date}`;

      // Add post image if available
      const postImage = document.createElement('img');
      if (post.image) {
        postImage.src = post.image;
        postImage.style.display = 'block';
        postElement.appendChild(postImage);
      }

      // Add content preview
      const postContent = document.createElement('p');
      postContent.textContent = post.content.substring(0, 100) + '...'; // Short preview of content

      // Add a link to view the full post
      const viewLink = document.createElement('a');
      viewLink.href = `post.html?id=${post.id}`; // Link to the detailed post
      viewLink.textContent = 'Read more';

      // Append all elements to the post element
      postElement.appendChild(postTitle);
      postElement.appendChild(postDate);
      postElement.appendChild(postContent);
      postElement.appendChild(viewLink);

      // Append the post to the container
      postsContainer.appendChild(postElement);
    });
  }
});
