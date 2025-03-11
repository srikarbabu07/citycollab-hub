
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
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'delayed';
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
    const initialProjects: Project[] = [
      {
        id: '1',
        title: 'Metro Line Extension Phase II',
        description: 'Extending the existing metro network to connect the southern suburbs with improved transit options.',
        status: 'in-progress',
        location: 'Southern District',
        deadline: new Date(2023, 11, 31).toISOString(),
        departments: ['transportation', 'urban-planning', 'finance'],
        createdBy: 'admin@city.gov.in',
        createdAt: new Date(2023, 6, 15).toISOString(),
      },
      {
        id: '2',
        title: 'Smart Water Management System',
        description: 'Implementing IoT-based water monitoring and management systems across the city.',
        status: 'planning',
        location: 'Citywide',
        deadline: new Date(2024, 2, 31).toISOString(),
        departments: ['water-supply', 'it', 'environment'],
        createdBy: 'admin@city.gov.in',
        createdAt: new Date(2023, 8, 10).toISOString(),
      },
    ];
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(initialProjects));
  }

  if (!localStorage.getItem(RESOURCES_KEY)) {
    const initialResources: Resource[] = [
      {
        id: '1',
        title: 'Urban Planning Guidelines 2023',
        description: 'Comprehensive guidelines for sustainable urban development and planning.',
        department: 'urban-planning',
        type: 'document',
        author: 'Planning Commission',
        createdAt: new Date(2023, 5, 20).toISOString(),
      },
      {
        id: '2',
        title: 'Traffic Flow Dataset',
        description: 'City-wide traffic flow data collected from sensors installed at major intersections.',
        department: 'transportation',
        type: 'dataset',
        author: 'Traffic Department',
        createdAt: new Date(2023, 7, 5).toISOString(),
      },
    ];
    localStorage.setItem(RESOURCES_KEY, JSON.stringify(initialResources));
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

export const getProjectById = (id: string): Project | null => {
  const projects = getProjects();
  return projects.find(project => project.id === id) || null;
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

export const getResourceById = (id: string): Resource | null => {
  const resources = getResources();
  return resources.find(resource => resource.id === id) || null;
};

// File storage helpers (simulated)
export const storeFile = (file: File): string => {
  // In a real implementation, this would upload the file to a server or cloud storage
  // For now, we'll just return a fake URL
  return URL.createObjectURL(file);
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

MongoDB connection example:
```javascript
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/city_development';
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('city_development');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function getProjects() {
  const db = await connectToDatabase();
  return db.collection('projects').find({}).toArray();
}
```
*/
