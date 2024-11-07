document.addEventListener('DOMContentLoaded', function () {
  // extract the post ID from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  console.log('Post ID:', postId);  // Debugging line

  // check if the post ID exists
  if (postId) {
    // get existing posts from local storage
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    console.log('Posts from localStorage:', posts);  // Debugging line

    // find the post with the matching ID
    const post = posts.find(p => p.id === postId);
    console.log('Found post:', post);  // Debugging line

    // check if the post exists
    if (post) {
      document.getElementById('post-title').textContent = post.title;
      document.getElementById('post-date').textContent = `Posted on: ${post.date}`;
      
      // show the post image if provided
      const postImageElement = document.getElementById('post-image');
      if (post.image) {
        postImageElement.style.display = 'block';
        postImageElement.src = post.image;  // Set the image source to the saved URL
      }

      // populate the content
      document.getElementById('post-content').textContent = post.content;

      // enable the edit button
      const editBtn = document.getElementById('edit-btn');
      editBtn.style.display = 'inline-block'; // Show the edit button

      // show the del button
      const deleteBtn = document.getElementById('delete-btn');
      deleteBtn.style.display = 'inline-block'; // Show the delete button

      // handle Edit button click
      editBtn.addEventListener('click', function () {
        const newTitle = prompt('Edit the title:', post.title);
        const newContent = prompt('Edit the content:', post.content);

        const imageSection = document.getElementById('edit-image-section');
        imageSection.style.display = 'block'; // Show the image upload section

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

          posts = posts.map(p => p.id === postId ? post : p);
          localStorage.setItem('blogPosts', JSON.stringify(posts));

          window.location.reload();
        }
      });

      // handle Delete button
      deleteBtn.addEventListener('click', function () {
        const confirmation = confirm('Are you sure you want to delete this post?');
        if (confirmation) {
          posts = posts.filter(p => p.id !== postId);
          localStorage.setItem('blogPosts', JSON.stringify(posts));
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
