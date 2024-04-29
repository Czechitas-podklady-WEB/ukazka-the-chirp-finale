export const fetchPosts = async () => {
  const response = await fetch(`http://localhost:4000/api/posts`);
  const json = await response.json();
  return json.data;
};

export const fetchUser = async (id) => {
  const response = await fetch(`http://localhost:4000/api/users/${id}`);
  const json = await response.json();
  return json.data;
};
