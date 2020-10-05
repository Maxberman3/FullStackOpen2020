const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (accumulater,currentValue) => {
    return accumulater+currentValue.likes
  }
  return blogs.reduce(reducer,0)
}

module.exports={
  dummy,
  totalLikes,
}
