
// This file simulates a database service that will be replaced with MongoDB
// when deployed to a local environment

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  password: string; // In a real app, this would be hashed
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  location: string;
  deadline: string;
  departments: string[];
  createdBy: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  department: string;
  type: string;
  author: string;
  fileUrl?: string;
  createdAt: string;
}

// Local storage keys
const USERS_KEY = 'jd_users';
const PROJECTS_KEY = 'jd_projects';
const RESOURCES_KEY = 'jd_resources';
const CURRENT_USER_KEY = 'jd_user';

// Initialize storage with some mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    const initialUsers: User[] = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@city.gov.in',
        department: 'Municipal Administration',
        password: 'password123', // In real app, this would be hashed
      },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  }

  if (!localStorage.getItem(PROJECTS_KEY)) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify([]));
  }

  if (!localStorage.getItem(RESOURCES_KEY)) {
    localStorage.setItem(RESOURCES_KEY, JSON.stringify([]));
  }
};

// Initialize on import
initializeStorage();

// User management
export const registerUser = (user: Omit<User, 'id'>): User => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  
  // Check if email already exists
  const existingUser = users.find((u: User) => u.email === user.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  const newUser: User = {
    ...user,
    id: crypto.randomUUID(),
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // Store current user without password
  const { password, ...userWithoutPassword } = newUser;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  
  return newUser;
};

export const loginUser = (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find((u: User) => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Store current user without password
  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  
  return userWithoutPassword;
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem(CURRENT_USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Project management
export const getProjects = (): Project[] => {
  return JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]');
};

export const createProject = (project: Omit<Project, 'id' | 'createdAt' | 'createdBy'>): Project => {
  const projects = getProjects();
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    throw new Error('You must be logged in to create a project');
  }
  
  const newProject: Project = {
    ...project,
    id: crypto.randomUUID(),
    createdBy: currentUser.email,
    createdAt: new Date().toISOString(),
  };
  
  projects.push(newProject);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  
  return newProject;
};

// Resource management
export const getResources = (): Resource[] => {
  return JSON.parse(localStorage.getItem(RESOURCES_KEY) || '[]');
};

export const createResource = (resource: Omit<Resource, 'id' | 'createdAt'>): Resource => {
  const resources = getResources();
  
  const newResource: Resource = {
    ...resource,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  
  resources.push(newResource);
  localStorage.setItem(RESOURCES_KEY, JSON.stringify(resources));
  
  return newResource;
};

// MongoDB migration instructions
export const exportDatabaseForMigration = () => {
  const data = {
    users: JSON.parse(localStorage.getItem(USERS_KEY) || '[]'),
    projects: JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]'),
    resources: JSON.parse(localStorage.getItem(RESOURCES_KEY) || '[]'),
  };
  
  return data;
};

/*
MONGODB MIGRATION GUIDE:

To migrate this data to MongoDB:

1. Export the data using exportDatabaseForMigration()
2. Save it as a JSON file
3. Use the MongoDB import tool or a script to import the data
4. Replace this service with MongoDB client implementation

Example MongoDB implementation would use:
- MongoDB Node.js driver or Mongoose
- Connection string to your MongoDB instance
- Similar CRUD methods, but using MongoDB APIs

*/
