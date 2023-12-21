// eslint-disable-next-line no-unused-vars
const dummy = blogs => 1

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0
  }
  return blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
}

const favoriteBlog = blogs => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes));
  return blogs.find(blog => blog.likes === maxLikes);
}

const mostBlogs = blogs => [...new Set(blogs.map(blog => blog.author))]
  .map(a => {
    const authorAndBlogCount = {
      author: a,
      blogCount: blogs.filter(blog => blog.author === a).length,
    }
    return authorAndBlogCount
  }).reduce((prev, current) => ((prev && prev.blogCount > current.blogCount)
    ? prev : current));

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
