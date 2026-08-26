import mongoose from 'mongoose';

/**
 * Singleton Pattern: DatabaseService
 * Ensures only a single instance of the MongoDB connection is maintained across the app.
 */
class DatabaseService {
  constructor() {
    if (DatabaseService.instance) {
      return DatabaseService.instance;
    }

    this.isConnected = false;
    DatabaseService.instance = this;
  }

  async connect(uri) {
    if (this.isConnected) {
      console.log('⚡ [DatabaseService] Returning existing database connection instance.');
      return mongoose.connection;
    }

    try {
      const dbUri = uri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techsphere';
      
      // Attempt connection with timeout
      await mongoose.connect(dbUri, {
        serverSelectionTimeoutMS: 3000
      });

      this.isConnected = true;
      console.log(`🌐 [DatabaseService] Connected to MongoDB database successfully: ${dbUri}`);

      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ [DatabaseService] MongoDB connection lost.');
        this.isConnected = false;
      });

      return mongoose.connection;
    } catch (error) {
      console.warn('⚠️ [DatabaseService] MongoDB local instance unreachable. System will operate with high-speed in-memory store fallback.', error.message);
      this.isConnected = false;
      return null;
    }
  }

  getStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState
    };
  }
}

export default new DatabaseService();
