import { MoveRequest, Review, UserProfile } from '@/types';

// Mock data for demo purposes
// In a real app, these would come from backend API calls

// Sample users
const mockUsers: UserProfile[] = [
  {
    id: 'user1',
    name: 'Alex Chen',
    email: 'alex.chen@nyu.edu',
    avatar: 'https://i.pravatar.cc/150?img=3',
    school: 'New York University',
    rating: 4.8,
    reviews: 15,
    isHelper: false,
    phone: '(646) 555-0123',
    bio: 'Senior studying Business Administration. Moving to a new apartment this semester and looking for reliable help with furniture and boxes. I prefer helpers who are punctual and careful with belongings.',
    location: 'Greenwich Village, Manhattan',
    joinedDate: '2024-08-15T00:00:00Z'
  },
  {
    id: 'helper1',
    name: 'Jordan Martinez',
    email: 'jordan.martinez@columbia.edu',
    avatar: 'https://i.pravatar.cc/150?img=5',
    school: 'Columbia University',
    rating: 4.9,
    reviews: 32,
    isHelper: true,
    phone: '(917) 555-0456',
    bio: 'Graduate student in Engineering with 2+ years helping students move. I have a pickup truck and moving equipment. Experienced with dorm moves, apartment relocations, and furniture assembly. Available weekends and evenings.',
    location: 'Morningside Heights, Manhattan',
    joinedDate: '2023-09-01T00:00:00Z'
  },
  {
    id: 'helper2',
    name: 'Taylor Johnson',
    email: 'taylor.j@pace.edu',
    avatar: 'https://i.pravatar.cc/150?img=7',
    school: 'Pace University',
    rating: 4.7,
    reviews: 28,
    isHelper: true,
    phone: '(212) 555-0789',
    bio: 'Senior studying Sports Management. Former athlete with experience in heavy lifting and moving. I specialize in quick, efficient moves and have helped over 50 students relocate. Friendly, reliable, and always on time.',
    location: 'Financial District, Manhattan',
    joinedDate: '2023-01-20T00:00:00Z'
  },
  {
    id: 'user2',
    name: 'Sam Rivera',
    email: 'sam.rivera@fordham.edu',
    avatar: 'https://i.pravatar.cc/150?img=9',
    school: 'Fordham University',
    rating: 4.6,
    reviews: 8,
    isHelper: false,
    phone: '(718) 555-0321',
    bio: 'Sophomore studying Psychology. Just transferred from another college and need help moving into my new dorm. Looking for someone who can help with multiple trips and is familiar with dorm move-ins.',
    location: 'Bronx, NY',
    joinedDate: '2024-01-10T00:00:00Z'
  },
  {
    id: 'helper3',
    name: 'Casey Kim',
    email: 'casey.kim@nyu.edu',
    avatar: 'https://i.pravatar.cc/150?img=11',
    school: 'New York University',
    rating: 4.8,
    reviews: 19,
    isHelper: true,
    phone: '(347) 555-0654',
    bio: 'Junior in Computer Science with flexible schedule. I help students with moves, deliveries, and furniture assembly. Have my own car and basic tools. Great communication and very detail-oriented.',
    location: 'East Village, Manhattan',
    joinedDate: '2023-03-15T00:00:00Z'
  }
];

// Sample move requests
const mockRequests: MoveRequest[] = [
  {
    id: 'req1',
    userId: 'user2',
    userName: 'Sam Rivera',
    userAvatar: 'https://i.pravatar.cc/150?img=9',
    title: 'Help Moving to New Dorm - Multiple Boxes & Furniture',
    description: 'Need help moving from my current dorm to a new residence hall. I have about 15 boxes, a mini-fridge, desk chair, and some personal items. The move is within campus, about a 10-minute walk between buildings. Looking for someone reliable who can help with multiple trips.',
    location: {
      address: 'Fordham University, Rose Hill Campus, Bronx, NY',
      lat: 40.8618,
      lng: -73.8847
    },
    date: '2025-08-02',
    time: '10:00',
    price: 25,
    isHourly: true,
    estimatedHours: 3,
    status: 'open',
    createdAt: '2025-07-22T14:30:00Z'
  },
  {
    id: 'req2',
    userId: 'user1',
    userName: 'Alex Chen',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    title: 'Apartment Move - Greenwich Village to East Village',
    description: 'Moving from my current apartment to a new place about 1 mile away. I have bedroom furniture (bed frame, dresser, nightstand), living room items (couch, coffee table), and about 20 boxes. Looking for someone with a truck or large vehicle. Heavy lifting involved but nothing too crazy.',
    location: {
      address: '120 MacDougal Street, Greenwich Village, NYC',
      lat: 40.7295,
      lng: -74.0009
    },
    date: '2025-07-30',
    time: '09:00',
    price: 35,
    isHourly: true,
    estimatedHours: 4,
    status: 'open',
    createdAt: '2025-07-23T09:15:00Z'
  },
  {
    id: 'req3',
    userId: 'user2',
    userName: 'Sam Rivera',
    userAvatar: 'https://i.pravatar.cc/150?img=9',
    title: 'Quick Help with IKEA Furniture Pickup',
    description: 'Need someone to help me pick up furniture from IKEA in Brooklyn and bring it back to my dorm in the Bronx. Just a desk, chair, and some storage units. Should fit in a car or small truck. Mainly need help with loading/unloading and transport.',
    location: {
      address: 'IKEA Brooklyn, 1 Beard Street, Brooklyn, NY',
      lat: 40.6827,
      lng: -74.0112
    },
    date: '2025-07-28',
    time: '14:00',
    price: 50,
    isHourly: false,
    status: 'open',
    createdAt: '2025-07-23T11:45:00Z'
  }
];

// Sample reviews
const mockReviews: Review[] = [
  {
    id: 'rev1',
    fromUserId: 'user1',
    fromUserName: 'Alex Chen',
    fromUserAvatar: 'https://i.pravatar.cc/150?img=3',
    toUserId: 'helper1',
    requestId: 'req1',
    rating: 5,
    comment: 'Jordan was absolutely amazing! Showed up exactly on time with a truck and all the equipment needed. Very careful with my furniture and helped me move everything efficiently. Highly recommend!',
    date: '2024-12-15T16:30:00Z'
  },
  {
    id: 'rev2',
    fromUserId: 'user2',
    fromUserName: 'Sam Rivera',
    fromUserAvatar: 'https://i.pravatar.cc/150?img=9',
    toUserId: 'helper1',
    requestId: 'req2',
    rating: 5,
    comment: 'Jordan made my dorm move-in so much easier! Very professional and knew exactly how to navigate the narrow hallways. Would definitely hire again.',
    date: '2024-11-22T14:20:00Z'
  },
  {
    id: 'rev3',
    fromUserId: 'user1',
    fromUserName: 'Alex Chen',
    fromUserAvatar: 'https://i.pravatar.cc/150?img=3',
    toUserId: 'helper2',
    requestId: 'req3',
    rating: 4,
    comment: 'Taylor was great to work with! Strong, efficient, and friendly. Only minor issue was running about 10 minutes late, but made up for it with speed.',
    date: '2024-10-05T11:45:00Z'
  },
  {
    id: 'rev4',
    fromUserId: 'helper1',
    fromUserName: 'Jordan Martinez',
    fromUserAvatar: 'https://i.pravatar.cc/150?img=5',
    toUserId: 'user1',
    requestId: 'req1',
    rating: 5,
    comment: 'Alex was super organized and had everything ready when I arrived. Made the job really smooth and easy. Great communication throughout!',
    date: '2024-12-15T17:00:00Z'
  },
  {
    id: 'rev5',
    fromUserId: 'user2',
    fromUserName: 'Sam Rivera',
    fromUserAvatar: 'https://i.pravatar.cc/150?img=9',
    toUserId: 'helper3',
    requestId: 'req4',
    rating: 5,
    comment: 'Casey was fantastic! Very tech-savvy and helped me set up my electronics after the move. Went above and beyond what was expected.',
    date: '2024-09-18T13:30:00Z'
  },
  {
    id: 'rev6',
    fromUserId: 'helper2',
    fromUserName: 'Taylor Johnson',
    fromUserAvatar: 'https://i.pravatar.cc/150?img=7',
    toUserId: 'user1',
    requestId: 'req3',
    rating: 5,
    comment: 'Alex was well-prepared and very clear about what needed to be done. Paid promptly and was a pleasure to work with!',
    date: '2024-10-05T12:15:00Z'
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