import { render } from '@czechitas/render';
import { fetchUser } from '../lib/api';
import '../global.css';
import './profil.css';

const params = new URLSearchParams(window.location.search);
const userId = params.get('user');

const user = await fetchUser(userId);

document.querySelector('#root').innerHTML = render(
  <div className="container">
    <h1>Profil uživatele</h1>
    <p>{user.name}</p>
  </div>
);
