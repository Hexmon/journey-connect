import { Pin } from "@/pages/Map";

export const mockPins: Pin[] = [
  {
    id: "1",
    type: "event",
    title: "Coffee & Co-work",
    description: "Casual meetup for remote workers. Bring your laptop! We'll be at the corner table near the window.",
    distance: "800m away",
    time: "Today 2PM",
    attendees: 5,
    host: "Sarah K.",
    location: { lat: 0.003, lng: 0.002 },
    avatar: "SK",
    userName: "Sarah K.",
  },
  {
    id: "2",
    type: "meet",
    title: "Looking for Cricket Players",
    description: "Need 2 more for Sunday match. All skill levels welcome!",
    distance: "1.2km away",
    time: "Sun 5PM",
    attendees: 8,
    host: "Rohan M.",
    location: { lat: 0.01, lng: 0.01 },
    avatar: "RM",
    userName: "Rohan M.",
  },
  {
    id: "3",
    type: "ride",
    title: "Ride to Airport",
    description: "Leaving tomorrow 6AM, 2 seats available. Split fuel costs.",
    distance: "2km away",
    time: "Tomorrow 6AM",
    attendees: 2,
    host: "Mike P.",
    location: { lat: -0.01, lng: 0.01 },
    avatar: "MP",
    userName: "Mike P.",
  },
  {
    id: "4",
    type: "help",
    title: "Need Help Moving Furniture",
    description: "Moving to new apartment this weekend. Need 2-3 people to help with heavy items.",
    distance: "1.5km away",
    time: "Sat 10AM",
    attendees: 3,
    host: "Emma L.",
    location: { lat: 0.008, lng: -0.008 },
    avatar: "EL",
    userName: "Emma L.",
  },
  {
    id: "5",
    type: "news",
    title: "New Café Opening",
    description: "Grand opening this Friday! Free coffee for first 50 customers.",
    distance: "500m away",
    time: "Fri 8AM",
    attendees: 0,
    host: "Local Business",
    location: { lat: -0.005, lng: 0.003 },
    avatar: "LB",
    userName: "Local Business",
  },
  {
    id: "6",
    type: "event",
    title: "Evening Run Group",
    description: "5km easy pace run around the park. All fitness levels welcome!",
    distance: "1km away",
    time: "Today 6PM",
    attendees: 12,
    host: "Alex R.",
    location: { lat: 0.007, lng: 0.009 },
    avatar: "AR",
    userName: "Alex R.",
  },
  {
    id: "7",
    type: "meet",
    title: "Study Buddy Needed",
    description: "Preparing for exams. Looking for someone to study with at library.",
    distance: "900m away",
    time: "Today 3PM",
    attendees: 1,
    host: "Priya S.",
    location: { lat: -0.006, lng: -0.004 },
    avatar: "PS",
    userName: "Priya S.",
  },
  {
    id: "8",
    type: "ride",
    title: "Daily Commute Share",
    description: "Going to tech park daily. Can pick up 2 people on the way.",
    distance: "1.8km away",
    time: "Every weekday 8AM",
    attendees: 2,
    host: "David C.",
    location: { lat: 0.012, lng: -0.007 },
    avatar: "DC",
    userName: "David C.",
  },
  {
    id: "9",
    type: "friends",
    title: "Sarah K.",
    description: "Active 5 min ago",
    distance: "600m away",
    time: "Active 5 min ago",
    attendees: 0,
    host: "Sarah K.",
    location: { lat: 0.004, lng: 0.006 },
    avatar: "SK",
    userName: "Sarah K.",
  },
  {
    id: "10",
    type: "friends",
    title: "Priya S.",
    description: "Active now",
    distance: "1.1km away",
    time: "Active now",
    attendees: 0,
    host: "Priya S.",
    location: { lat: -0.007, lng: -0.003 },
    avatar: "PS",
    userName: "Priya S.",
  },
  {
    id: "11",
    type: "friends",
    title: "Rohan M.",
    description: "Active 2 hours ago",
    distance: "950m away",
    time: "Active 2 hours ago",
    attendees: 0,
    host: "Rohan M.",
    location: { lat: 0.009, lng: 0.008 },
    avatar: "RM",
    userName: "Rohan M.",
  },
];

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

export interface ChatThread {
  id: string;
  title: string;
  type: "event" | "direct" | "group";
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  participants: string[];
  avatar?: string;
}

export const mockChats: ChatThread[] = [
  {
    id: "1",
    title: "Coffee & Co-work",
    type: "event",
    lastMessage: "See you all at 2PM!",
    lastMessageTime: "10:30 AM",
    unreadCount: 2,
    participants: ["Sarah K.", "John", "Mike", "Emma", "You"],
  },
  {
    id: "2",
    title: "Cricket Match Sunday",
    type: "event",
    lastMessage: "Don't forget to bring water bottles",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    participants: ["Rohan M.", "Alex", "David", "You"],
  },
  {
    id: "3",
    title: "Priya S.",
    type: "direct",
    lastMessage: "What time works for you?",
    lastMessageTime: "2 hours ago",
    unreadCount: 1,
    participants: ["Priya S.", "You"],
  },
];

export const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      senderId: "sarah",
      senderName: "Sarah K.",
      text: "Hey everyone! Looking forward to tomorrow's co-working session 😊",
      timestamp: "10:15 AM",
    },
    {
      id: "2",
      senderId: "mike",
      senderName: "Mike",
      text: "Same here! What's the wifi password at the café?",
      timestamp: "10:20 AM",
    },
    {
      id: "3",
      senderId: "sarah",
      senderName: "Sarah K.",
      text: "I'll ask when I get there and share it in the group",
      timestamp: "10:25 AM",
    },
    {
      id: "4",
      senderId: "you",
      senderName: "You",
      text: "Perfect! I'll bring my charger",
      timestamp: "10:28 AM",
      isCurrentUser: true,
    },
    {
      id: "5",
      senderId: "sarah",
      senderName: "Sarah K.",
      text: "See you all at 2PM!",
      timestamp: "10:30 AM",
    },
  ],
  "2": [
    {
      id: "1",
      senderId: "rohan",
      senderName: "Rohan M.",
      text: "Game is confirmed for Sunday 5PM at the park",
      timestamp: "Yesterday",
    },
    {
      id: "2",
      senderId: "alex",
      senderName: "Alex",
      text: "Great! Should we bring our own bats?",
      timestamp: "Yesterday",
    },
    {
      id: "3",
      senderId: "rohan",
      senderName: "Rohan M.",
      text: "Yes, and don't forget to bring water bottles",
      timestamp: "Yesterday",
    },
  ],
  "3": [
    {
      id: "1",
      senderId: "priya",
      senderName: "Priya S.",
      text: "Hi! I saw you're also looking for a study buddy",
      timestamp: "3 hours ago",
    },
    {
      id: "2",
      senderId: "you",
      senderName: "You",
      text: "Yes! I'm preparing for finals. Are you at the library?",
      timestamp: "2:30 hours ago",
      isCurrentUser: true,
    },
    {
      id: "3",
      senderId: "priya",
      senderName: "Priya S.",
      text: "What time works for you?",
      timestamp: "2 hours ago",
    },
  ],
};

export interface ForumPost {
  id: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: string;
  category: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

export const mockForumPosts: ForumPost[] = [
  {
    id: "1",
    authorName: "Sarah K.",
    title: "Best coffee shops for remote work?",
    content: "New to the area and looking for recommendations. Need good wifi and power outlets!",
    category: "Local Tips",
    timestamp: "2 hours ago",
    likes: 12,
    comments: 8,
  },
  {
    id: "2",
    authorName: "Rohan M.",
    title: "Weekend cricket matches",
    content: "Starting a regular weekend cricket group. All skill levels welcome. Let's keep it fun and casual!",
    category: "Sports",
    timestamp: "5 hours ago",
    likes: 24,
    comments: 15,
    isLiked: true,
  },
  {
    id: "3",
    authorName: "Emma L.",
    title: "Safety tips for new residents",
    content: "I've been here for a year now. Here are some safety tips I wish I knew when I first moved here...",
    category: "Safety",
    timestamp: "1 day ago",
    likes: 45,
    comments: 22,
  },
  {
    id: "4",
    authorName: "Alex R.",
    title: "Looking for running partners",
    content: "Starting a morning run group at 6AM. Easy pace, 5km route. Who's interested?",
    category: "Fitness",
    timestamp: "1 day ago",
    likes: 18,
    comments: 12,
  },
];
