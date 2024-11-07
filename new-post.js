document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent the default form submission
  
      // Get form data
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      const image = document.getElementById('image').value;
  
      // Validation: Check if title and content are not empty
      if (!title || !content) {
        alert("Title and content cannot be empty!");
        return; // Stop further execution if validation fails
      }
  
      // Create a new post object with a unique ID (using Date.now() to generate a unique ID)
      const newPost = {
        id: Date.now().toString(),  // Generate a unique ID based on the timestamp
        title,
        content,
        image: image || null,  // If no image is provided, set it as null
        date: new Date().toLocaleString()  // Adding a date for when the post is created
      };
  
      // Get existing posts from local storage or initialize an empty array
      let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  
      // Add the new post to the posts array
      posts.push(newPost);
  
      // Save the updated posts array back to local storage
      localStorage.setItem('blogPosts', JSON.stringify(posts));
  
      // Redirect to homepage after saving the post
      window.location.href = 'index.html';
    });
  });
  