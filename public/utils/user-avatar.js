function renderUserAvatar() {
  const avatar = document.getElementById("user-avatar");
  if (!avatar) return;
  const user = localStorage.getItem("user");
  if (user) {
    avatar.src = `/fotos/${user}.jpg`;
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