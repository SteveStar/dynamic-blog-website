document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // get the form data
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').value;

    // validation to check if empty
    if (!title || !content) {
      alert("Title and content cannot be empty!");
      return; // Stop further execution if validation fails
    }

    // create a new post object with a unique ID to get a unique id (i thought date would work well)
    const newPost = {
      id: Date.now().toString(),  // get a unique id based on time stamp
      title,
      content,
      image: image || null,  // if no image is provided, set it as null
      date: new Date().toLocaleString()  // drop in a date when the post is made
    };

    // get existing posts from the local storage OR make a new array
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // add the new post to posts array
    posts.push(newPost);

    // save the updated array to posts array
    localStorage.setItem('blogPosts', JSON.stringify(posts));

    // back to homepage
    window.location.href = 'index.html';
  });
});
