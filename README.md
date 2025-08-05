# Apex - Achiever's Dashboard

A modern React application for managing SMART goals and connecting with world-class advisors. Built with React, Vite, and Tailwind CSS.

## 🚀 Features

### Goals Management
- **SMART Goals Creation**: Create specific, measurable, achievable, relevant, and time-bound goals
- **Key Results Tracking**: Break down goals into actionable key results with progress tracking
- **Goal Status Management**: Track goals as in-progress, completed, or submitted
- **Persistent Storage**: Goals are saved in localStorage and persist across sessions

### Advisors Board
- **World-Class Advisors**: Browse a curated list of industry experts
- **Personal Board**: Add advisors to your personal board for easy access
- **Search & Filter**: Find advisors by name
- **Rating System**: View advisor ratings 

### User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Real-time Updates**: Instant feedback for all user interactions

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.0.6
- **Styling**: Tailwind CSS 4.1.11
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: localStorage for data persistence

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Apex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5174` (or the port shown in your terminal)

## 🎯 Usage

### Creating Goals
1. Navigate to the "My Goals" tab
2. Click "Add New Goal" button
3. Enter your objective (e.g., "Become a recognized technical lead")
4. Add key results (e.g., "Increase team productivity by 25%")
5. Click "Create Goal" to save

### Managing Goals
- **Mark Key Results Complete**: Click the circle next to each key result
- **Submit Goals**: Once all key results are complete, click "Submit"
- **Track Progress**: View progress bars and completion status
- **Delete Goals**: Remove goals you no longer need

### Building Your Advisor Board
1. Navigate to the "Advisors" tab
2. Browse the list of world-class advisors
3. Click "Add to Board" on advisors you want to connect with
4. View your board in the "Boards" tab
5. Remove advisors from your board if needed

## 📁 Project Structure

```
Apex/
├── src/
│   ├── components/
│   │   ├── AdvisorCard.jsx          # Individual advisor display
│   │   ├── AdvisorsSection.jsx      # Advisors list and search
│   │   ├── GoalCard.jsx             # Individual goal display
│   │   ├── GoalModal.jsx            # Goal creation modal
│   │   ├── GoalsSection.jsx         # Goals list and management
│   │   └── Navigation.jsx           # Tab navigation
│   ├── pages/
│   │   └── App.jsx                  # Main application component
│   ├── services/
│   │   ├── goalService.js           # Goals data management
│   │   └── advisorservice.js        # Advisors API and board management
│   ├── index.css                    # Global styles
│   └── main.jsx                     # Application entry point
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── tailwind.config.js              # Tailwind configuration
└── vite.config.js                  # Vite configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Key Features Explained

### SMART Goals Implementation
- **Specific**: Clear, well-defined objectives
- **Measurable**: Key results with quantifiable metrics
- **Achievable**: Realistic and attainable goals
- **Relevant**: Aligned with personal/professional growth
- **Time-bound**: Progress tracking with completion dates

### Advisor Board System
- **API Integration**: Fetches advisor data from external API
- **Local Storage**: Persists board selections across sessions
- **Unique Identification**: Generates stable IDs for reliable board management
- **Add/Remove Functionality**: Seamless board management

### Data Persistence
- **Goals Storage**: All goals and key results saved in localStorage
- **Board Storage**: Personal advisor selections persisted
- **State Management**: React state synchronized with localStorage



## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Akshita Mali**

---

**Built with ❤️ using React and Vite**
