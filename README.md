# 🚀 DevForum
**DevForum** is a full-featured **MERN Stack** online discussion forum. It allows people to create posts, comment, upvote/downvote, share, and interact through a secure, responsive, role-based platform. Admins can manage users, handle reports, make announcements, and track forum activity.
![Homepage](https://i.ibb.co/8D7RnwjS/14-07-2025-20-32-33-REC.png)

---

## ✅ Features
- 🔑 **Authentication** — Email/password login & Google social login using Firebase Auth with JWT.
- 🗂️ **Post Management** — Users can create posts with tags, upvote/downvote, share, and comment.
- 📈 **Popularity Sorting** — Posts sorted by total votes (UpVote - DownVote).
- 🔎 **Search** — Backend-powered search by post tags.
- 🔔 **Announcements** — Admins can make announcements; users see real-time notifications.
- 🏅 **Membership System** — Paid membership upgrades users to Gold badge with more post limits.
- 🎖️ **Badges** — Bronze badge on registration; Gold badge for members.
- ⚙️ **User Dashboard** — My Profile, Add Post, My Posts, view comments, report comments.
- 🔒 **Admin Dashboard** — Manage Users, Make Admin, Reported Comments, Make Announcement, Add Tags, Platform Analytics.
- 📊 **Pie Chart** — Admin profile includes a pie chart for posts, comments, and users.
- 📚 **Environment Variables** — Firebase config & MongoDB credentials are hidden.
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop.
- 🚫 **No Lorem Ipsum** — All text is meaningful.
- ✅ **Notifications** — SweetAlert2 & Toastify for all CRUD operations.
- ⚡ **TanStack Query** — For all GET data fetching.
- 🔄 **Session Persist** — Private routes persist after reload.
- 📑 **Pagination** — Implemented for posts and all user/admin tables.

---

## 🔑 Admin Credentials
| Field | Value |
|--------------|------------------------|
| **Admin Email** | `admin@example.com` |
| **Admin Password** | `Admin@123` |

*(Replace with your actual admin login info.)*

---

## 🔗 Live Links
| Resource | Link |
|-----------------------|--------------------------------------|
| **Frontend Live** | [Visit Site](https://devform-31142.web.app/) |
| **Client GitHub** | [Client Repo](https://github.com/ishaq60/DevForum-clientside) |
| **Server GitHub** | [Server Repo](https://github.com/ishaq60/DevForum-serverside) |

---

## 🗃️ Database Collections

### 📌 User Collection
| Field | Description |
|--------------|---------------------------|
| `_id` | Unique ID |
| `username` | User's display name |
| `email` | User's email |
| `image` | Profile image URL |
| `isAdmin` | `true` or `false` |
| `membership` | `Free` or `Gold` |
| `badges` | Array: `Bronze` or `Gold` |
| `aboutMe` | Optional About Me text |

### 📌 Post Collection
| Field | Description |
|--------------|---------------------------|
| `_id` | Unique ID |
| `title` | Post title |
| `content` | Post content |
| `author` | Reference to User ID |
| `tags` | Array of tag strings |
| `upvotes` | Array of user IDs who upvoted |
| `downvotes` | Array of user IDs who downvoted |
| `comments` | Array of comment references |
| `createdAt` | Post creation timestamp |

### 📌 Comment Collection
| Field | Description |
|--------------|---------------------------|
| `_id` | Unique ID |
| `content` | Comment text |
| `author` | Reference to User ID |
| `post` | Reference to Post ID |
| `reported` | `true` or `false` |
| `createdAt` | Comment creation timestamp |

### 📌 Announcement Collection
| Field | Description |
|--------------|---------------------------|
| `_id` | Unique ID |
| `title` | Announcement title |
| `content` | Announcement content |
| `author` | Reference to Admin User ID |
| `createdAt` | Announcement timestamp |

### 📌 Tag Collection
| Field | Description |
|--------------|---------------------------|
| `_id` | Unique ID |
| `name` | Tag name |
| `color` | Tag color (optional) |
| `createdBy` | Reference to Admin User ID |

### 📌 Admin Role
Admins are stored in the same User collection with `isAdmin: true`.  
They can:
- Promote other users to admin.
- Search for users by username (server-side).
- View, manage, or delete reported comments.
- Make announcements.
- Add tags.
- See platform stats in a pie chart.

---

## ⚡ Technologies Used
- **Frontend:** React.js, Tailwind CSS, DaisyUI, React Router, React Hook Form, React Toastify, SweetAlert2, React Share, Framer Motion, AOS.
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Stripe.
- **Authentication:** Firebase Auth (Google OAuth), JWT tokens.
- **Data Management:** TanStack React Query, Axios.
- **Deployment:** Vercel (Frontend), Railway/Render (Backend), MongoDB Atlas.

---

## 📌 How to Run

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Firebase project
- Stripe account

### Installation
```bash
# Clone the repos
git clone https://github.com/yourusername/devforum-client.git
git clone https://github.com/yourusername/devforum-server.git

# Install dependencies
cd devforum-client
npm install

cd ../devforum-server
npm install
```

### Environment Variables

#### Client (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id

VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

#### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/devforum
JWT_SECRET=your-jwt-secret-key
FIREBASE_CONFIG=your-firebase-config-json
STRIPE_SECRET_KEY=your-stripe-secret-key
```

### Run the Applications
```bash
# Terminal 1 - Backend
cd devforum-server
npm run dev

# Terminal 2 - Frontend
cd devforum-client
npm run dev
```

### Access
- Frontend: `http://localhost:5000`
- Backend: `http://localhost:5000`

---

## 🎯 Key Features Breakdown

### 🔐 Authentication System
- Firebase Auth for Google OAuth
- JWT tokens for session management
- Protected routes with role-based access
- Password hashing with bcrypt

### 📝 Post Management
- Create posts with rich text editor
- Tag system for categorization
- Upvote/downvote functionality
- Comment threading
- Social sharing capabilities

### 🏅 Membership & Badges
- **Bronze Badge**: Default for all users
- **Gold Badge**: Premium membership via Stripe
- Enhanced features for Gold members
- Post limit management

### 🔒 Admin Features
- User management with search
- Content moderation tools
- Reported comment handling
- Platform analytics with charts
- Tag management system
- Announcement creation

### 📊 Data Visualization
- Pie charts for platform statistics
- User engagement metrics
- Post popularity tracking
- Comment activity analysis

---

## 📱 Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- DaisyUI components
- Touch-friendly interfaces
- Optimized for all screen sizes

---

## 🚀 Deployment Guide

### Frontend (Vercel)
```bash
npm run build
# Deploy dist folder to Vercel
```

### Backend (Railway/Render)
```bash
# Set environment variables in hosting platform
# Deploy from GitHub repository
```

### Database (MongoDB Atlas)
- Create MongoDB Atlas cluster
- Set up database user and network access
- Configure connection string

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts (paginated)
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/vote` - Vote on post

### Comments
- `GET /api/posts/:id/comments` - Get post comments
- `POST /api/posts/:id/comments` - Add comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment
- `POST /api/comments/:id/report` - Report comment

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `GET /api/admin/reports` - Get reported comments
- `POST /api/admin/announcements` - Create announcement
- `GET /api/admin/analytics` - Get platform stats
- `POST /api/admin/tags` - Add new tag

---

## 🔒 Security Features
- JWT token authentication
- Input validation and sanitization
- XSS protection
- CORS configuration
- Rate limiting
- Password hashing
- Environment variable protection

---

## 📈 Performance Optimizations
- TanStack Query for data fetching
- Pagination for large datasets
- Image optimization
- Lazy loading components
- Efficient state management
- Database indexing

---

## 🤝 Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License
This project is licensed under the MIT License.

---

## 📞 Support
For support, email support@devforum.com or create an issue in the GitHub repository.

---

<div align="center">
  <p>Made with ❤️ using the MERN Stack</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
