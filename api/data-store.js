// Global in-memory data store for Vercel serverless
// Note: Data persists during warm invocations but resets on cold starts
let usersStore = [];

export function getUsers() {
  return usersStore;
}

export function setUsers(users) {
  usersStore = users;
}

export function addUser(user) {
  usersStore.push(user);
  return user;
}

export function updateUser(id, updates) {
  const index = usersStore.findIndex((u) => u._id === id);
  if (index > -1) {
    usersStore[index] = { ...usersStore[index], ...updates };
    return usersStore[index];
  }
  return null;
}

export function deleteUser(id) {
  const index = usersStore.findIndex((u) => u._id === id);
  if (index > -1) {
    usersStore.splice(index, 1);
    return true;
  }
  return false;
}
