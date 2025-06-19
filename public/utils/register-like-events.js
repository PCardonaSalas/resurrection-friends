import { initFireBase, getOnce, updateData } from "/utils/firebase.js";

const db = initFireBase();
const currentUser = localStorage.getItem("user");

if (!currentUser && window.location.pathname !== "/") {
  window.location.href = "/";
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest('[data-button="like"]');
  if (!btn) return;
  debugger;
  const index = btn.dataset.index;
  const day = btn.dataset.day;
  const path = `data/${day}`;

  const likesContainer = document.querySelector(`[data-container="${index}"]`);

  getOnce(db, path, async (bandas) => {
    const banda = bandas.find((b) => String(b.index) === String(index));
    if (!banda) return;

    const likes = new Set([...(banda.likes || []), currentUser]);
    const updatePath = `${path}/${bandas.indexOf(banda)}`;

    await updateData(db, updatePath, { likes: Array.from(likes) });

    // Actualizar UI
    btn.textContent = "✅ Liked";
    btn.disabled = true;

    if (likesContainer) {
      likesContainer.innerHTML = "";
      Array.from(likes).forEach((user) => {
        const img = document.createElement("img");
        img.src = `/fotos/${user}.jpg`;
        img.alt = user;
        img.title = user;
        img.className = "like-avatar";
        likesContainer.appendChild(img);
      });
    }
  });
});
