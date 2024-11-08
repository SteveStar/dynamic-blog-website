document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');  // Get post ID from query string

  // Debugging
  console.log('Post ID:', postId);

  if (postId) {
    // Get posts from localStorage
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    console.log('Posts from localStorage:', posts);

    // Find the post by ID
    const post = posts.find(p => p.id === postId);
    console.log('Found post:', post);

    // Display post details if found
    if (post) {
      document.getElementById('post-title').textContent = post.title;
      document.getElementById('post-date').textContent = `Posted on: ${post.date}`;

      const postImageElement = document.getElementById('post-image');
      if (post.image) {
        postImageElement.style.display = 'block';
        postImageElement.src = post.image;
      }

      document.getElementById('post-content').textContent = post.content;

      // Show edit and delete buttons
      const editBtn = document.getElementById('edit-btn');
      const deleteBtn = document.getElementById('delete-btn');
      editBtn.style.display = 'inline-block';
      deleteBtn.style.display = 'inline-block';

      // Edit button functionality
      editBtn.addEventListener('click', function () {
        const newTitle = prompt('Edit the title:', post.title);
        const newContent = prompt('Edit the content:', post.content);

        const imageSection = document.getElementById('edit-image-section');
        imageSection.style.display = 'block'; // Show image upload section

        const imageUpload = document.getElementById('image-upload');
        const imagePreview = document.getElementById('image-preview');
        imageUpload.addEventListener('change', function (event) {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
              imagePreview.src = e.target.result;
              imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
          }
        });

        if (newTitle && newContent) {
          post.title = newTitle;
          post.content = newContent;

          const imageUrl = imagePreview.src || post.image;
          post.image = imageUrl;

          post.date = new Date().toLocaleString();

          // Update the post in the posts array
          posts = posts.map(p => p.id === postId ? post : p);
          localStorage.setItem('blogPosts', JSON.stringify(posts));

          window.location.reload(); // Reload the page to reflect changes
        }
      });

      // Delete button functionality
      deleteBtn.addEventListener('click', function () {
        const confirmation = confirm('Are you sure you want to delete this post?');
        if (confirmation) {
          posts = posts.filter(p => p.id !== postId); // Remove the post from array
          localStorage.setItem('blogPosts', JSON.stringify(posts)); // Save to localStorage
          window.location.href = 'index.html'; // Redirect to homepage
        }
      });
    } else {
      document.getElementById('post-details').innerHTML = '<p>Post not found!</p>';
    }
  } else {
    document.getElementById('post-details').innerHTML = '<p>No post ID provided!</p>';
  }
});
