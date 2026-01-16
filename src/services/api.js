const API_BASE_URL = 'http://localhost:8000/api';

export const overlayAPI = {
  async getAllOverlays() {
    try {
      const response = await fetch(`${API_BASE_URL}/overlays`);
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch overlays');
      }
      return data.data;
    } catch (error) {
      console.error('Error fetching overlays:', error);
      throw error;
    }
  },

  async getOverlay(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/overlays/${id}`);
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch overlay');
      }
      return data.data;
    } catch (error) {
      console.error('Error fetching overlay:', error);
      throw error;
    }
  },

  async createOverlay(overlayData) {
    try {
      const response = await fetch(`${API_BASE_URL}/overlays`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(overlayData),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to create overlay');
      }
      return data.data;
    } catch (error) {
      console.error('Error creating overlay:', error);
      throw error;
    }
  },

  async updateOverlay(id, overlayData) {
    try {
      const response = await fetch(`${API_BASE_URL}/overlays/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(overlayData),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to update overlay');
      }
      return data.data;
    } catch (error) {
      console.error('Error updating overlay:', error);
      throw error;
    }
  },

  async deleteOverlay(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/overlays/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to delete overlay');
      }
      return data;
    } catch (error) {
      console.error('Error deleting overlay:', error);
      throw error;
    }
  },
};
