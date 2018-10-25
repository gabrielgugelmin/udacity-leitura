const api = 'http://localhost:3001';

let token = localStorage.token;
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export function getInitialData () {
  return Promise.all([
    getPosts(),
    getCategories(),
  ]).then(([posts, categories]) => ({
    posts,
    categories,
  }))
}

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())

export const saveVote = ({id, vote}) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vote)
  }).then(res => res.json())

export const savePost = (post) =>
  fetch(`${api}/posts/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post)
  }).then(res => res.json())