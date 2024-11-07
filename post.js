document.addEventListener('DOMContentLoaded', function () {
  // Extract the post ID from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  // Check if the post ID exists
  if (postId) {
    // Get existing posts from local storage
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // Find the post with the matching ID
    const post = posts.find(p => p.id === postId);

    // Check if the post exists
    if (post) {
      // Populate the post details on the page
      document.getElementById('post-title').textContent = post.title;
      document.getElementById('post-date').textContent = `Posted on: ${post.date}`;
      
      // Show the post image if provided
      const postImageElement = document.getElementById('post-image');
      if (post.image) {
        postImageElement.style.display = 'block';
        postImageElement.src = post.image;
      } else {
        postImageElement.style.display = 'none'; // Hide image if not provided
      }

      // Populate the content
      document.getElementById('post-content').textContent = post.content;

      // Enable the edit button
      const editBtn = document.getElementById('edit-btn');
      editBtn.style.display = 'inline-block'; // Show the edit button

      editBtn.addEventListener('click', function () {
        // Prompt user to edit the title and content
        const newTitle = prompt('Edit the title:', post.title);
        const newContent = prompt('Edit the content:', post.content);

        if (newTitle && newContent) {
          // Update the post object with the new data
          post.title = newTitle;
          post.content = newContent;

          // Update the date to reflect the change time
          post.date = new Date().toLocaleString();

          // Save the updated post back to local storage
          posts = posts.map(p => p.id === postId ? post : p);
          localStorage.setItem('blogPosts', JSON.stringify(posts));

          // Reload the page to show updated content
          window.location.reload();
        }
      });

      // Enable the delete button
      const deleteBtn = document.getElementById('delete-btn');
      deleteBtn.style.display = 'inline-block'; // Show the delete button

      deleteBtn.addEventListener('click', function () {
        const confirmation = confirm('Are you sure you want to delete this post?');
        if (confirmation) {
          // Remove the post from the posts array
          posts = posts.filter(p => p.id !== postId);

          // Save the updated posts back to local storage
          localStorage.setItem('blogPosts', JSON.stringify(posts));

          // Redirect to the home page or post listing after deletion
          window.location.href = 'index.html';
        }
      });

    } else {
      document.getElementById('post-details').innerHTML = '<p>Post not found!</p>';
    }
  } else {
    document.getElementById('post-details').innerHTML = '<p>No post ID provided!</p>';
  }
});
