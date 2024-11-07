document.addEventListener('DOMContentLoaded', function () {
    const postList = document.getElementById('post-list');
    const postTitleInput = document.getElementById('post-title');
    const postContentInput = document.getElementById('post-content');
    const postForm = document.getElementById('new-post-form');

    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // Display posts
    function displayPosts() {
        postList.innerHTML = '';
        if (posts.length > 0) {
            posts.forEach((post, index) => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
                postDiv.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <button onclick="deletePost(${index})">Delete</button>
                    <button onclick="editPost(${index})">Edit</button>
                `;
                postList.appendChild(postDiv);
            });
        } else {
            postList.innerHTML = "<p>No blog posts available.</p>";
        }
    }

    // Save blog posts to localStorage
    function savePosts() {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }

    // Create a new blog post
    window.createPost = function(title, content) {
        const newPost = { title, content };
        posts.push(newPost);
        savePosts();
        displayPosts();
    }

    // Edit a post
    window.editPost = function(index) {
        const updatedTitle = prompt('Enter new title:', posts[index].title);
        const updatedContent = prompt('Enter new content:', posts[index].content);
        if (updatedTitle && updatedContent) {
            posts[index].title = updatedTitle;
            posts[index].content = updatedContent;
            savePosts();
            displayPosts();
        }
    }

    // Delete a post
    window.deletePost = function(index) {
        if (confirm('Are you sure you want to delete this post?')) {
            posts.splice(index, 1);
            savePosts();
            displayPosts();
        }
    }

    // Handle form submission to create a new post
    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = postTitleInput.value;
        const content = postContentInput.value;

        if (title && content) {
            createPost(title, content);
            postTitleInput.value = '';
            postContentInput.value = '';
        }
    });

    // Initially display all posts
    displayPosts();
});


// Get the form element
const form = document.getElementById('new-post-form');

// Event listener for form submission
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Get form data
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const image = document.getElementById('image').value;

  // Create a new post object
  const newPost = {
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
  
    // Create a new post object
    const newPost = {
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
    }

    // Populate the content
    document.getElementById('post-content').textContent = post.content;
  } else {
    document.getElementById('post-details').innerHTML = '<p>Post not found!</p>';
  }
} else {
  document.getElementById('post-details').innerHTML = '<p>No post ID provided!</p>';
}
