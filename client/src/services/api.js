import axios from 'axios';

const API_BASE_URL = '/api';

export const fetchProducts = async (category = 'all', search = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { category, search }
    });
    return response.data;
  } catch (error) {
    console.warn('API error fetching products, returning fallback dataset:', error.message);
    return { success: false, data: [] };
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    return { success: false, data: null };
  }
};

export const submitOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Order processing failed.' };
  }
};

export const subscribeNewsletter = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/newsletter`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Subscription request failed.' };
  }
};
