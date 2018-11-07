const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2,
    vote: null,
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0,
    vote: null,
  },
  "8ki6ok3ym7mf1p33lnez": {
    id: '8ki6ok3ym7mf1p33lnez',
    timestamp: 1539956799883,
    title: 'Please send help.',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis molestiae et mollitia atque praesentium omnis, facilis minima voluptas dicta nesciunt aliquam vitae numquam facere commodi debitis repellat sunt vel perspiciatis.',
    author: 'gabdasgalaxia',
    category: 'udacity',
    voteScore: 12,
    deleted: false,
    commentCount: 0,
    vote: null,
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    if (option === 'upVote' || option === 'downVote') {
      let posts = getData(token);
      post = posts[id];
      const computedVote = post.vote;

      if (computedVote === 'upVote') {
        if (option === 'upVote') {
          // Remove o voto
          post.voteScore--;
          post.vote = null;
        } else {
          // downVote
          // Então tira 1 pelo upVote anterior e mais 1 pelo downVote atual
          post.voteScore -= 2;
          post.vote = 'downVote';
        }
      } else if (computedVote === 'downVote') {
        if (option === 'upVote') {
          // upVote
          // Então adiciona 1 pelo upVote atual e mais 1 pela retirada do downVote atual
          post.voteScore += 2;
          post.vote = 'upVote';
        } else {
          // Remove o voto
          post.voteScore++;
          post.vote = null;
        }
      } else {
        option === 'upVote' ? post.voteScore++ : post.voteScore--;
        post.vote = option;
      }

      res(post);
    } else {
      console.log(`posts.vote received incorrect parameter: ${option}`)
    }
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
