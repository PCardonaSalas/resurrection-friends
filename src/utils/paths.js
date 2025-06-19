/**
 * Obtiene la ruta absoluta para un asset teniendo en cuenta el base path de GitHub Pages
 * @param {string} path - La ruta relativa del asset (ej: '/fotos/cati.jpg')
 * @returns {string} La ruta absoluta completa
 */
export const getAssetPath = (path) => {
  return `${import.meta.env.BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};
