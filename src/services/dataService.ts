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
    rating: 0,
    reviews: 0,
    isHelper: false,
    phone: '(555) 123-4567',
    bio: 'College student looking for reliable moving help around campus.',
    location: 'State University, Campus Area',
    joinedDate: '2025-01-15T00:00:00Z'
  },
  {
    id: 'helper1',
    name: 'Jane Helper',
    email: 'jane@college.edu',
    avatar: 'https://i.pravatar.cc/150?img=5',
    school: 'State University',
    rating: 0,
    reviews: 0,
    isHelper: true,
    phone: '(555) 987-6543',
    bio: 'Experienced helper with truck access. Available for furniture moves and dorm relocations.',
    location: 'State University, Campus Area',
    joinedDate: '2024-09-01T00:00:00Z'
  },
  {
    id: 'helper2',
    name: 'Mike Strong',
    email: 'mike@college.edu',
    avatar: 'https://i.pravatar.cc/150?img=7',
    school: 'Tech Institute',
    rating: 0,
    reviews: 0,
    isHelper: true,
    phone: '(555) 456-7890',
    bio: 'Strong and reliable. Specializing in heavy lifting and furniture assembly.',
    location: 'Tech Institute, Downtown',
    joinedDate: '2024-08-20T00:00:00Z'
  }
];

// Sample move requests - reduced to only one legitimate request
const mockRequests: MoveRequest[] = [];

// Sample reviews
const mockReviews: Review[] = [];

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