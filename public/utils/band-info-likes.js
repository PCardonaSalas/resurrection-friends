class BandInfoLikes extends HTMLElement {
  async connectedCallback() {
    const index = this.getAttribute('data-index');
    const day = this.getAttribute('data-day');
    if (!index || !day) return;
    const firebaseModule = await import('/utils/firebase.js');
    const { initFireBase, getData, getOnce, updateData } = firebaseModule;
    const db = initFireBase();
    const currentUser = localStorage.getItem("user");
    if (!currentUser) {
      window.location.href = "/";
      return;
    }
    const likesContainer = this.querySelector('[data-container]');
    const button = this.querySelector('[data-button="like"]');
    if (!button) return;
    function updateLikeUI(likes) {
      if (likes && likes.includes(currentUser)) {
        button.textContent = "💔 Ya no quiero verlo";
      } else {
        button.textContent = "❤️ ¡Quiero verlo!";
      }
      if (likesContainer) {
        if (likes && likes.length > 0) {
          likesContainer.innerHTML = `
            <p>Las siguientes personas quieren verlo:</p>
            ${likes
              .map(
                (user) => `<img src="/fotos/${user}.jpg" alt="${user}" title="${user}" class="like-avatar" />`
              )
              .join("")}
          `;
        } else {
          likesContainer.innerHTML = "";
        }
      }
    }
    const path = `data/${day}`;
    getData(db, path, (bandas) => {
      const banda = bandas.find((b) => String(b.index) === String(index));
      const likes = banda && banda.likes ? banda.likes : [];
      updateLikeUI(likes);
    });
    button.addEventListener("click", async (e) => {
      if (button.disabled) return;
      button.disabled = true;
      await getOnce(db, path, async (bandas) => {
        const banda = bandas.find((b) => String(b.index) === String(index));
        if (!banda) return;
        let likes = new Set(banda.likes || []);
        const hadLike = likes.has(currentUser);
        const updatePath = `${path}/${bandas.indexOf(banda)}`;
        if (hadLike) {
          likes.delete(currentUser);
          if (likes.size === 0) {
            await updateData(db, updatePath, { likes: null });
          } else {
            await updateData(db, updatePath, { likes: Array.from(likes) });
          }
        } else {
          likes.add(currentUser);
          await updateData(db, updatePath, { likes: Array.from(likes) });
        }
        button.disabled = false;
      });
    });
  }
}
if (!customElements.get('band-info-likes')) {
  customElements.define('band-info-likes', BandInfoLikes);
}
