const API_BASE = '/api/categories';

export async function fetchCategories() {
  const res = await fetch(API_BASE);
  return res.json();
}
