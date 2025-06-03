let currentUser = null;

export const userStore = {
  set: (userData) => {
    currentUser = userData;
    console.log('User data saved to store:', userData);
  },
  get: () => {
    console.log('Getting user from store:', currentUser);
    return currentUser;
  },
  updateProjects: (newProject) => {
    if (currentUser) {
      currentUser.projects = currentUser.projects || [];
      currentUser.projects.push(newProject);
      console.log('Projects updated in store:', currentUser.projects);
    }
  }
};