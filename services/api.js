
import axios from 'axios';

// Replace with your local machine's IP if testing on physical device
const API_URL = 'http://192.168.16.108:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const signupUser = async (userData) => {
    try {
        const response = await api.post('/signup', userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const fetchProducts = async (category, search) => {
    try {
        const response = await api.get('/products', { params: { category, search } });
        return response.data;
    } catch (error) {
        console.error("Fetch Products Error", error);
        return [];
    }
};

export const addToCart = async (userId, productId) => {
    try {
        const response = await api.post('/cart', { userId, productId });
        return response.data;
    } catch (error) {
        return { success: false };
    }
};

export const removeFromCart = async (userId, productId) => {
    try {
        await api.delete(`/cart/${productId}`, { params: { userId } });
        return { success: true };
    } catch (error) {
        return { success: false };
    }
};

export const fetchCart = async (userId) => {
    try {
        const response = await api.get(`/cart/${userId}`);
        return response.data;
    } catch (error) {
        return [];
    }
};

export const placeOrder = async (userId, totalAmount) => {
    try {
        const response = await api.post('/place-order', { userId, totalAmount });
        return response.data;
    } catch (error) {
        return { success: false };
    }
};

// Add Money to Wallet
export const addWalletMoney = async (userId, amount) => {
    try {
        const response = await api.post('/wallet/add', { userId, amount });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch Seller Orders
export const fetchSellerOrders = async (sellerId, status = 'All') => {
    try {
        const response = await api.get('/orders', { params: { sellerId, status } });
        return response.data;
    } catch (error) {
        return [];
    }
};

export const fetchOrders = async (userId, status) => {
    try {
        // In a real app, you'd filter by status in the backend
        const response = await api.get('/orders', { params: { userId, status } });
        return response.data;
    } catch (error) {
        return [];
    }
};

export const cancelOrder = async (orderId) => {
    try {
        await api.post(`/orders/${orderId}/cancel`);
        return { success: true };
    } catch (error) {
        return { success: false };
    }
};

export const fetchUserItems = async (userId) => {
    try {
        const response = await api.get('/products', { params: { createdBy: userId } });
        return response.data;
    } catch (error) {
        return [];
    }
};

export const addItem = async (itemData) => {
    try {
        const response = await api.post('/items', itemData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await api.get(`/items/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (id, data) => {
    try {
        const response = await api.put(`/items/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await api.delete(`/items/${id}`);
        return { success: true };
    } catch (error) {
        throw error;
    }
};

export const fetchUserProfile = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (userId, data) => {
    try {
        const response = await api.put(`/users/${userId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchAddresses = async (userId) => {
    try {
        const response = await api.get('/addresses', { params: { user: userId } });
        return response.data;
    } catch (error) {
        return [];
    }
};

export const addAddress = async (addressData) => {
    try {
        const response = await api.post('/addresses', addressData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateAddress = async (id, addressData) => {
    try {
        await api.put(`/addresses/${id}`, addressData);
        return { success: true };
    } catch (error) {
        throw error;
    }
};

export const deleteAddress = async (id) => {
    try {
        await api.delete(`/addresses/${id}`);
        return { success: true };
    } catch (error) {
        throw error;
    }
};

export const selectAddress = async (id, userId) => {
    try {
        await api.put(`/addresses/${id}/select`, { userId });
        return { success: true };
    } catch (error) {
        throw error;
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        await api.put(`/orders/${orderId}/status`, { status });
        return { success: true };
    } catch (error) {
        return { success: false };
    }
};

export const fetchSellerStats = async (sellerId) => {
    try {
        const response = await api.get(`/stats/${sellerId}`);
        return response.data;
    } catch (error) {
        console.error("Stats Error", error);
        return null;
    }
};

export const trackOrder = async (orderId) => {
    try {
        const response = await api.get(`/track/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Track Order Error", error);
        return { error: error.response?.data?.error || error.message || "Network Error" };
    }
};

export default api;
