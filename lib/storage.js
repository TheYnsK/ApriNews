const KEYS = {
  POSTS: 'aprinews_posts',
  DELETED: 'aprinews_deleted'
};

const isBrowser = typeof window !== 'undefined';

// --- OKUMA İŞLEMLERİ ---
export function getLocalPosts() {
  if (!isBrowser) return [];
  try {
    const data = localStorage.getItem(KEYS.POSTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getDeletedIds() {
  if (!isBrowser) return [];
  try {
    const data = localStorage.getItem(KEYS.DELETED);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// --- YAZMA İŞLEMLERİ ---
export function saveLocalPost(post) {
  if (!isBrowser) return;
  const posts = getLocalPosts();
  posts.push(post);
  localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
}

export function deletePostById(id, isLocal) {
  if (!isBrowser) return;
  
  if (isLocal) {
    // Localden tamamen sil
    const posts = getLocalPosts().filter(p => p.id !== id);
    localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
  } else {
    // Mock verisi ise "silinmişler" listesine ID ekle (Soft Delete)
    const deleted = getDeletedIds();
    if (!deleted.includes(id)) {
      deleted.push(id);
      localStorage.setItem(KEYS.DELETED, JSON.stringify(deleted));
    }
  }
}