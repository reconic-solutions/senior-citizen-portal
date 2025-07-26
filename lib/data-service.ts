// Data service for fetching data from the backend
import { formatQueryParams } from './api-helpers';

// Base URL for API requests
const API_BASE_URL = '/api';

// Generic fetch function with error handling
async function fetchData<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
}

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    return fetchData('/auth', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (email: string, password: string, name: string, role: string) => {
    return fetchData('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role }),
    });
  },

  getCurrentUser: async () => {
    return fetchData('/users/me');
  },
};

// Job services
export const jobService = {
  getJobs: async (params: Record<string, any> = {}) => {
    const queryString = formatQueryParams(params);
    return fetchData(`/jobs${queryString ? `?${queryString}` : ''}`);
  },

  getJobById: async (id: string) => {
    return fetchData(`/jobs/${id}`);
  },

  createJob: async (jobData: any) => {
    return fetchData('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },

  updateJob: async (id: string, jobData: any) => {
    return fetchData(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });
  },

  deleteJob: async (id: string) => {
    return fetchData(`/jobs/${id}`, {
      method: 'DELETE',
    });
  },

  saveJob: async (id: string) => {
    return fetchData(`/jobs/${id}/save`, {
      method: 'POST',
    });
  },

  getSavedJobs: async () => {
    return fetchData('/jobs/saved');
  },
};

// Application services
export const applicationService = {
  getApplications: async (params: Record<string, any> = {}) => {
    const queryString = formatQueryParams(params);
    return fetchData(`/applications${queryString ? `?${queryString}` : ''}`);
  },

  applyToJob: async (jobId: string, coverLetter?: string) => {
    return fetchData('/applications', {
      method: 'POST',
      body: JSON.stringify({
        jobId,
        coverLetter,
      }),
    });
  },

  updateApplicationStatus: async (id: string, status: string) => {
    return fetchData(`/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

// Message services
export const messageService = {
  getConversations: async () => {
    return fetchData('/messages/conversations');
  },

  getMessages: async (conversationId: string) => {
    return fetchData(`/messages?conversation_id=${conversationId}`);
  },

  sendMessage: async (receiverId: string, content: string, jobId?: string) => {
    return fetchData('/messages', {
      method: 'POST',
      body: JSON.stringify({
        receiverId,
        content,
        jobId,
      }),
    });
  },
};

// Notification services
export const notificationService = {
  getNotifications: async (params: Record<string, any> = {}) => {
    const queryString = formatQueryParams(params);
    return fetchData(`/notifications${queryString ? `?${queryString}` : ''}`);
  },

  markAsRead: async (id: string) => {
    return fetchData(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  },

  markAllAsRead: async () => {
    return fetchData('/notifications/read-all', {
      method: 'PATCH',
    });
  },

  deleteNotification: async (id: string) => {
    return fetchData(`/notifications/${id}`, {
      method: 'DELETE',
    });
  },

  clearAll: async () => {
    return fetchData('/notifications', {
      method: 'DELETE',
    });
  },
};

// User services
export const userService = {
  updateProfile: async (profileData: any) => {
    return fetchData('/users/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  getUsers: async (params: Record<string, any> = {}) => {
    const queryString = formatQueryParams(params);
    return fetchData(`/admin/users${queryString ? `?${queryString}` : ''}`);
  },
};

// Admin services
export const adminService = {
  getUsers: async (params: Record<string, any> = {}) => {
    const queryString = formatQueryParams(params);
    return fetchData(`/admin/users${queryString ? `?${queryString}` : ''}`);
  },

  approveUser: async (userId: string) => {
    return fetchData(`/admin/users/${userId}/approve`, {
      method: 'PATCH',
    });
  },

  rejectUser: async (userId: string, reason: string) => {
    return fetchData(`/admin/users/${userId}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    });
  },
};