import axios from 'axios'

export default class PostsLogic {
  fetchPosts = async () => {
    try {
      return await axios.get('https://jsonplaceholder.typicode.com/posts').then(res => res)
    } catch(e) {
      return e
    }
  }
}