import { render } from '@czechitas/render';
import { Post } from '../components/Post';
import { fetchUser, fetchPosts } from '../lib/api';
import '../global.css';
import './index.css';

const loggedUserId = 0;
let edittedPost = null;

const loggedUser = await fetchUser(loggedUserId); 
const posts = await fetchPosts();

document.querySelector('#root').innerHTML = render(
  <div className="container">
    <h1>The Chirp</h1>
    <form className="post-form">
      <p>{loggedUser.name}, co máte na srdci?</p>
      <textarea placeholder="Napište něco..." className="post-input"></textarea>
      <button type="submit">Publikovat</button>
    </form>
    
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  </div>
);

const formElement = document.querySelector('.post-form');
formElement.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = document.querySelector('.post-input').value;
  
  if (edittedPost !== null) {
    await fetch(`http://localhost:4000/api/posts/${edittedPost.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: edittedPost.userName,
        userId: edittedPost.userId,
        userHandle: edittedPost.userHandle,
        userAvatar: edittedPost.userAvatar,
        text,
        likes: edittedPost.likes,
      }),
    });

    window.location.reload();
    return;
  }
  
  await fetch('http://localhost:4000/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: loggedUser.name,
      userId: loggedUser.id,
      userHandle: loggedUser.handle,
      userAvatar: loggedUser.avatar,
      text,
      likes: 100
    }),
  });

  window.location.reload();
});

const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    const postId = e.target.dataset.id;
    await fetch(`http://localhost:4000/api/posts/${postId}`, {
      method: 'DELETE'
    });
    window.location.reload();
  })
});

const editButtons = document.querySelectorAll('.edit-btn');
editButtons.forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    const postId = Number(e.target.dataset.id);
    edittedPost = posts.find((p) => p.id === postId);
    
    document.querySelector('.post-form button').textContent = 'Upravit';
    const postInput = document.querySelector('.post-input');
    postInput.value = edittedPost.text;
    postInput.focus();
  })
});
