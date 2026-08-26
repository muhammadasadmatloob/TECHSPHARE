import newsletterService from '../services/NewsletterService.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export class NewsletterController {
  static async subscribe(req, res) {
    try {
      const { email } = req.body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        return ApiResponse.error(res, 'Please provide a valid email address', 400);
      }

      const result = await newsletterService.subscribe(email);

      if (result.alreadySubscribed) {
        return ApiResponse.success(res, null, 'You are already on the TechSphere early access waitlist!');
      }

      return ApiResponse.success(res, result, 'Welcome to the TechSphere ecosystem. Early access confirmed.', 201);
    } catch (error) {
      return ApiResponse.error(res, 'Newsletter subscription failed', 500, error.message);
    }
  }
}
