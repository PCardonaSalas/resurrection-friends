function renderUserAvatar() {
  const avatar = document.getElementById("user-avatar");
  if (!avatar) return;
  const user = localStorage.getItem("user");
  const basePath = document.documentElement.dataset.base || '';
  if (user) {
    avatar.src = `${basePath}/fotos/${user}.jpg`;
    avatar.alt = user;
    avatar.style.display = "";
  } else {
    avatar.removeAttribute("src");
    avatar.alt = "";
    avatar.style.display = "none";
  }
}
window.addEventListener("astro:after-swap", renderUserAvatar);
window.addEventListener("DOMContentLoaded", renderUserAvatar);