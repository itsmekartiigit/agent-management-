<!-- #  Task Management System

A full-stack task management application that distributes customer tasks among agents using a round-robin algorithm. Built with the MERN stack (MongoDB, Express.js, React, Node.js).

##  Features

###Backend Features
- JWT Authentication** - Secure login with JSON Web Tokens (7-day expiry)
- Agent Management** - Add and view agents with validation
- Excel/CSV Upload** - Bulk upload tasks via Excel files (.xlsx, .xls, .csv)
- Round-Robin Distribution** - Automatic fair task distribution among agents
- Input Validation** - Email, mobile (+91 format), and password validation
- Error Handling** - Comprehensive error handling with proper HTTP status codes

### Frontend Features
- Responsive Dashboard** - Mobile-friendly interface with Tailwind CSS
- Collapsible Sidebar** - Smooth animations and desktop optimization
- File Upload** - Excel/CSV file upload with validation
- Real-time Updates** - Instant task grouping by agent
- Toast Notifications** - User-friendly success/error messages
- Protected Routes** - Authentication-based route protection

##  Tech Stack

Node.js | JavaScript runtime |
Express.js | Web framework |
MongoDB | Database |
Mongoose | ODM library |
JWT | Authentication |
bcryptjs| Password hashing |
Multer | File upload handling |
XLSX| Excel file processing |
React | UI library |
React Router DOM Navigation |
Tailwind CSS| Styling |
Lucide React Icons |
React Toastify Notifications |


## Installation & Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
# Navigate to project directory
cd client --- Frontend 
cd serevr ----Backend 


# Step 2: Backend Setup

# Navigate to backend directory
cd backend
npm install// This command install the all necessary packages .

# Create environment file
# Create a new file named .env in the backend folder

get connection string from the Mongo db and paste in .env environment variable 
run seedadmin.js to create a admin user 
then run npm server this will start the server in a port 5000 
check the api working in localhost 5000 and confirm the Api server working 

##Step3: Frontend Setup 
in new terminal go to cd client and run npm run dev this start the front end 
Then login with the admin credentials this will start working .



 -->
