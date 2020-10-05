const _=require('lodash')

const mostBlogs = (blogs) => {
  const byAuthors=_.groupBy(blogs,'author')
  const mostBlogsAuthored=_.reduce(byAuthors,(best,blogs,author)=>{
    // console.log(author)
    if(blogs.length>best.blogs){
      best.author=author
      best.blogs=blogs.length
    }
    return best
  },{author:'',blogs:0})
  return mostBlogsAuthored
}

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (accumulater,currentValue) => {
    return accumulater+currentValue.likes
  }
  return blogs.reduce(reducer,0)
}

const favoriteBlog = blogs =>{
  const reducer = (best,current) =>{
    if(current.likes>best.likes){
      best=current
    }
    return best
  }
  return blogs.reduce(reducer)
}

module.exports={
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
