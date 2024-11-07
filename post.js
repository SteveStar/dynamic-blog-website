document.addEventListener('DOMContentLoaded', function () {
  // extract the post ID from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  // check if the post ID exists
  if (postId) {
    // get existing posts from local storage
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // find the post with the matching ID
    const post = posts.find(p => p.id === postId);

    // check if the post exists
    if (post) {
      document.getElementById('post-title').textContent = post.title;
      document.getElementById('post-date').textContent = `Posted on: ${post.date}`;
      
      // show the post image if provided
      const postImageElement = document.getElementById('post-image');
      if (post.image) {  //// New image handling logic
        postImageElement.style.display = 'block';
        postImageElement.src = post.image;  //// Set the image source to the saved URL
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
        // prompt user to edit the title and content
        const newTitle = prompt('Edit the title:', post.title);
        const newContent = prompt('Edit the content:', post.content);

        // show the image upload section
        const imageSection = document.getElementById('edit-image-section');
        imageSection.style.display = 'block'; // Show the image upload section

        // preview the uploaded image before saving
        const imageUpload = document.getElementById('image-upload');  // handling the new img upload
        const imagePreview = document.getElementById('image-preview');
        imageUpload.addEventListener('change', function (event) {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
              imagePreview.src = e.target.result;  //img preview
              imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
          }
        });

        // handle the form submission to save the edited post
        if (newTitle && newContent) {
          // update the post object with the new data
          post.title = newTitle;
          post.content = newContent;

          // if there's an image, save the image URL
          const imageUrl = imagePreview.src || post.image;
          post.image = imageUrl;  //// Save image URL (either uploaded or existing)

          // update the date to reflect the change time
          post.date = new Date().toLocaleString();

          // save the updated post back to local storage
          posts = posts.map(p => p.id === postId ? post : p);
          localStorage.setItem('blogPosts', JSON.stringify(posts));

          // reload the page to show updated content
          window.location.reload();
        }
      });

      // this handles the del button activity
      deleteBtn.addEventListener('click', function () {
        const confirmation = confirm('Are you sure you want to delete this post?');
        if (confirmation) {
          // gets rid of the post from the array
          posts = posts.filter(p => p.id !== postId);

          // updates the local storage
          localStorage.setItem('blogPosts', JSON.stringify(posts));

          // redirect to the home page or another page after deletion
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
