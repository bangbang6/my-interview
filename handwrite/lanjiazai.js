function lazyLoad(){
  const imgs = document.querySelectorAll('img')
  for(let i  = 0;i<imgs.length;i++){
    if(isVisible(imgs[i])){
      imgs[i].src=imgs[i].realSrc
    }
  }
}

function isVisible(el){
  const position = el.getBoundingClientRect()
  const windowHeight = document.documentElement.clientHeight
  const topVisiable = position.top>0&& position.top<windowHeight
  const bottomVisiable = positiom.bottom<windowHeight && position.bottom>0;
  return topVisiable || bottomVisiable
}// <img src="default.png" data-src="https://xxxx/real.png">

// 测试
window.addEventListener('load', imageLazyLoad)
window.addEventListener('scroll', imageLazyLoad)
// or
window.addEventListener('scroll', throttle(imageLazyLoad, 1000))