import { MoveRequest, Review, UserProfile } from '@/types';

// Mock data for demo purposes
// In a real app, these would come from backend API calls

// Sample users
const mockUsers: UserProfile[] = [
  {
    id: 'user1',
    name: 'Demo User',
    email: 'demo@college.edu',
    avatar: 'https://i.pravatar.cc/150?img=3',
    school: 'State University',
    rating: 4.8,
    reviews: 12,
    isHelper: false
  },
  {
    id: 'helper1',
    name: 'Jane Helper',
    email: 'jane@college.edu',
    avatar: 'https://i.pravatar.cc/150?img=5',
    school: 'State University',
    rating: 4.9,
    reviews: 24,
    isHelper: true
  },
  {
    id: 'helper2',
    name: 'Mike Strong',
    email: 'mike@college.edu',
    avatar: 'https://i.pravatar.cc/150?img=7',
    school: 'Tech Institute',
    rating: 4.7,
    reviews: 18,
    isHelper: true
  }
];

// Sample move requests
const mockRequests: MoveRequest[] = [
  {
    id: 'req1',
    userId: 'user1',
    userName: 'Demo User',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    title: 'Help Moving Furniture to Dorm',
    description: 'Need help moving a desk, chair, and small bookcase to my dorm on the 3rd floor.',
    location: {
      address: '123 University Drive',
      lat: 34.0522,
      lng: -118.2437
    },
    date: '2025-08-15',
    time: '14:00',
    price: 30,
    isHourly: true,
    estimatedHours: 2,
    status: 'open',
    createdAt: '2025-07-20T10:30:00Z'
  },
  {
    id: 'req2',
    userId: 'helper1',
    userName: 'Jane Helper',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    title: 'Moving from apartment to dorm',
    description: 'Need to transport 2 suitcases and several boxes from off-campus apartment to dorm.',
    location: {
      address: '456 College Ave',
      lat: 34.0547,
      lng: -118.2523
    },
    date: '2025-08-18',
    time: '10:00',
    price: 20,
    isHourly: true,
    estimatedHours: 3,
    status: 'open',
    createdAt: '2025-07-21T14:15:00Z'
  },
  {
    id: 'req3',
    userId: 'user1',
    userName: 'Demo User',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    title: 'Help with mini-fridge',
    description: 'Need help moving a mini-fridge to 4th floor dorm. Elevator available.',
    location: {
      address: '789 Campus Road',
      lat: 34.0495,
      lng: -118.2620
    },
    date: '2025-08-20',
    time: '15:30',
    price: 25,
    isHourly: false,
    status: 'assigned',
    helperId: 'helper2',
    createdAt: '2025-07-22T09:45:00Z'
  }
];

// Sample reviews
const mockReviews: Review[] = [
  {
    id: 'rev1',
    fromUserId: 'user1',
    toUserId: 'helper1',
    rating: 5,
    comment: 'Jane was incredibly helpful and on time. Made my move so much easier!',
    date: '2025-06-12T15:30:00Z'
  },
  {
    id: 'rev2',
    fromUserId: 'helper1',
    toUserId: 'user1',
    rating: 5,
    comment: 'Great to work with, had everything ready when I arrived.',
    date: '2025-06-12T16:00:00Z'
  }
];

// Get all move requests
export const getMoveRequests = (): Promise<MoveRequest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockRequests]);
    }, 500);
  });
};

// Get move requests by user ID
export const getUserRequests = (userId: string): Promise<MoveRequest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRequests.filter(req => req.userId === userId));
    }, 300);
  });
};

// Get move requests for helpers (only open ones)
export const getOpenRequests = (): Promise<MoveRequest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRequests.filter(req => req.status === 'open'));
    }, 300);
  });
};

// Get assigned requests for a helper
export const getHelperAssignments = (helperId: string): Promise<MoveRequest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRequests.filter(req => req.helperId === helperId));
    }, 300);
  });
};

// Create new move request
export const createMoveRequest = (request: Omit<MoveRequest, 'id' | 'createdAt'>): Promise<MoveRequest> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRequest = {
        ...request,
        id: `req${mockRequests.length + 1}`,
        createdAt: new Date().toISOString()
      };
      mockRequests.push(newRequest);
      resolve(newRequest);
    }, 500);
  });
};

// Update move request
export const updateMoveRequest = (id: string, updates: Partial<MoveRequest>): Promise<MoveRequest> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockRequests.findIndex(req => req.id === id);
      if (index === -1) {
        reject(new Error('Request not found'));
        return;
      }
      mockRequests[index] = { ...mockRequests[index], ...updates };
      resolve(mockRequests[index]);
    }, 500);
  });
};

// Get user by ID
export const getUserById = (id: string): Promise<UserProfile | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers.find(user => user.id === id));
    }, 300);
  });
};

// Get all helpers
export const getHelpers = (): Promise<UserProfile[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers.filter(user => user.isHelper));
    }, 500);
  });
};

// Get reviews for a user
export const getUserReviews = (userId: string): Promise<Review[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReviews.filter(review => review.toUserId === userId));
    }, 500);
  });
};

// Create a review
export const createReview = (review: Omit<Review, 'id' | 'date'>): Promise<Review> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReview = {
        ...review,
        id: `rev${mockReviews.length + 1}`,
        date: new Date().toISOString()
      };
      mockReviews.push(newReview);
      
      // Update the user's rating
      const targetUser = mockUsers.find(user => user.id === review.toUserId);
      if (targetUser) {
        const userReviews = [...mockReviews.filter(r => r.toUserId === review.toUserId), newReview];
        const totalRating = userReviews.reduce((sum, r) => sum + r.rating, 0);
        targetUser.rating = parseFloat((totalRating / userReviews.length).toFixed(1));
        targetUser.reviews = userReviews.length;
      }
      
      resolve(newReview);
    }, 500);
  });
};

// Update user profile
export const updateUserProfile = (userId: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockUsers.findIndex(user => user.id === userId);
      if (index === -1) {
        reject(new Error('User not found'));
        return;
      }
      mockUsers[index] = { ...mockUsers[index], ...updates };
      resolve(mockUsers[index]);
    }, 500);
  });
};

// Login user
export const loginUser = (email: string, password: string): Promise<UserProfile | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would validate credentials against a database
      // For demo purposes, just return the user with matching email
      const user = mockUsers.find(u => u.email === email);
      resolve(user || null);
    }, 700);
  });
};

// Register new user
export const registerUser = (name: string, email: string, password: string): Promise<UserProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        resolve(existingUser);
        return;
      }
      
      // Create new user
      const newUser: UserProfile = {
        id: `user${mockUsers.length + 1}`,
        name,
        email,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        school: '',
        rating: 0,
        reviews: 0,
        isHelper: false
      };
      
      mockUsers.push(newUser);
      resolve(newUser);
    }, 1000);
  });
};