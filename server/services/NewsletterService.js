import { Subscriber } from '../models/Subscriber.js';
import databaseService from '../config/DatabaseService.js';

class NewsletterService {
  constructor() {
    this.inMemorySubscribers = new Set();
  }

  async subscribe(email) {
    const cleanEmail = email.toLowerCase().trim();

    if (databaseService.getStatus().isConnected) {
      try {
        const existing = await Subscriber.findOne({ email: cleanEmail });
        if (existing) {
          return { alreadySubscribed: true };
        }
        const newSub = new Subscriber({ email: cleanEmail });
        await newSub.save();
        return { alreadySubscribed: false, subscriber: newSub.toObject() };
      } catch (err) {
        console.warn('MongoDB subscriber write error, using fallback set', err.message);
      }
    }

    if (this.inMemorySubscribers.has(cleanEmail)) {
      return { alreadySubscribed: true };
    }

    this.inMemorySubscribers.add(cleanEmail);
    return { alreadySubscribed: false, email: cleanEmail };
  }
}

export default new NewsletterService();
