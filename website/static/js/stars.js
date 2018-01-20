

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.getElementsByClassName('slidingNav')[0].children[0].lastElementChild.children[0];
  stars.className = "github-button";
  stars.setAttribute('data-icon', 'octicon-star');
  stars.setAttribute('data-show-count', 'true');
});
