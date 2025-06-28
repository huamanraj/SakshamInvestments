import { Client, Account, Databases, Storage } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || 'saksham-investments');

// Export services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and collection constants from environment variables
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'blogs_db';
export const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID || 'blogs_collection';
export const CONTACTS_COLLECTION_ID = 'contacts';
export const QUIZ_COLLECTION_ID = 'quiz_responses';
export const STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID || 'blog_thumbnails';

export default client; 