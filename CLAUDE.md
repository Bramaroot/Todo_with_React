# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional productivity suite combining two applications:

### 1. Todo App
A feature-rich task management application with:
- Priority-based task management (Urgente, Moyenne, Basse)
- Due dates and reminders with push notifications
- Tags and categories for organization
- Notes and descriptions for detailed task information
- Advanced filtering and sorting
- Local storage persistence
- PWA capabilities for mobile use

### 2. B-Roll Generator
A professional image creator for social media content:
- Vertical format images (9:16 - 1080×1920) for TikTok, Instagram, Facebook
- Customizable headline and subheadline
- Background image upload
- Persistent branding (profile photo, name, position, accent color)
- Configurable overlays and opacity
- PNG export via html-to-image
- Real-time preview

**Design System**: Unified Hype brand colors (#18636B blue-green, #F9C74C golden yellow)

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production (runs TypeScript compiler + Vite build)
npm run build

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Project Structure

```
src/
  ├── components/
  │   ├── todo/                   # Todo app components
  │   │   ├── DatePicker.tsx
  │   │   ├── NotificationButton.tsx
  │   │   ├── TagInput.tsx
  │   │   └── TodoItemEnhanced.tsx
  │   └── broll/                  # B-Roll generator components
  │       ├── BRollCanvas.tsx     # Preview canvas (1080×1920)
  │       ├── ImageUploader.tsx   # Image upload component
  │       ├── SettingsPanel.tsx   # Branding settings panel
  │       └── ExportButton.tsx    # PNG export button
  ├── hooks/
  │   └── useLocalStorage.ts      # Custom hook for localStorage
  ├── types/
  │   ├── todo.types.ts           # Todo types and interfaces
  │   └── broll.types.ts          # B-Roll types and interfaces
  ├── utils/
  │   ├── dateUtils.ts            # Date utilities
  │   └── notifications.ts        # Push notifications
  ├── App.tsx                     # Legacy Todo app
  ├── AppEnhanced.tsx             # Enhanced Todo app
  ├── BRollEditor.tsx             # B-Roll generator main component
  ├── AppRouter.tsx               # Navigation between Todo & B-Roll
  ├── TodoItem.tsx                # Legacy todo item
  ├── index.css                   # Global styles with Hype tokens
  └── main.tsx                    # Entry point (renders AppRouter)
```

### Component Structure

- **AppEnhanced.tsx**: Main application component with enhanced features
  - State management for todos, filters, sorting, and search
  - useLocalStorage hook for automatic persistence
  - Notification scheduling for reminders
  - Advanced filtering (priority, search query, date ranges)
  - Multiple sort options (date, priority, alphabetical, due date)
  - Statistics cards showing overdue, today's, and tomorrow's tasks
  - Multi-select for batch operations

- **TodoItemEnhanced.tsx**: Individual todo item component with rich features
  - Expandable/collapsible design for detailed information
  - Inline editing with full todo properties
  - Date picker integration for due dates and reminders
  - Tag management with suggestions
  - Notes section with textarea
  - Visual indicators for overdue tasks
  - Priority badges with color coding
  - Hover effects for edit/delete actions

- **DatePicker.tsx**: Reusable date/time picker
  - Supports both date and datetime selection
  - Relative date display (Today, Tomorrow, etc.)
  - Color-coded badges for overdue dates
  - Clear button to remove dates

- **TagInput.tsx**: Tag management component
  - Auto-suggest from existing tags
  - Add/remove tags with keyboard shortcuts
  - Visual tag chips with Hype yellow styling

- **NotificationButton.tsx**: Notification permission toggle
  - Requests browser notification permission
  - Shows current notification status
  - Sends test notification on activation

### State Management

State is managed using React hooks with the useLocalStorage custom hook for automatic persistence:
- `todos`: Array of enhanced Todo objects (see Todo type in types/todo.types.ts)
- `selectedTodos`: Set of selected todo IDs for batch operations
- `filter`: Current priority filter or "Tous" for all
- `sortBy`: Current sort method (date-created, priority, alphabetical, due-date, etc.)
- `searchQuery`: Text search across task titles, tags, and notes
- `input` and `priority`: Form state for new todos

### Todo Object Structure

```typescript
interface Todo {
  id: number;
  text: string;
  priority: Priority; // "Urgente" | "Moyenne" | "Basse"
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;

  // Enhanced features
  dueDate?: Date;           // When the task is due
  reminderTime?: Date;      // When to send notification
  tags: string[];           // Categorization tags
  category?: string;        // Main category
  notes?: string;           // Detailed description
  subtasks: SubTask[];      // Checklist items (prepared for future)
  attachments: Attachment[]; // Files/links (prepared for future)
  recurrence: RecurrenceType; // For recurring tasks (prepared for future)
  timeSpent?: number;       // Time tracking (prepared for future)
  estimatedTime?: number;   // Estimation (prepared for future)
}
```

### Data Persistence

localStorage is used for persistence:
- Todos are loaded from localStorage on mount
- Todos are saved to localStorage whenever the todos array changes
- Key: "todos"

### Styling Approach

- **Tailwind CSS v4** with DaisyUI plugin
- **Theme**: Dracula (configured in index.css)
- **Custom animations**: fadeIn, slideIn, pulse-slow
- **Responsive design**: Mobile-first with sm/lg breakpoints
- **Design patterns**: Gradient backgrounds, glassmorphism effects, hover transitions

### Type Definitions

All types are centralized in `src/types/todo.types.ts`:
- `Priority`: Task priority levels
- `Todo`: Main todo interface with all properties
- `SubTask`: For future subtask feature
- `Attachment`: For future file attachment feature
- `RecurrenceType`: For future recurring tasks
- `FilterType`: Filter options
- `SortType`: Sort methods
- `TodoFilters`: Complex filtering interface
- `TodoStats`: Statistics interface

Import types from this file when needed:
```typescript
import { Todo, Priority, FilterType } from './types/todo.types';
```

## PWA Configuration

The app is configured as a PWA using vite-plugin-pwa:
- Auto-update registration type
- Manifest configured with app name "Todo Brama"
- Uses vite.svg as icon (placeholder - should be replaced with proper PWA icons)

## Key Features & Behaviors

### Core Functionality
- **Enter key** submits new todos and saves edits
- **Add button** is disabled when input is empty
- **Multi-select** for batch completion of tasks
- **Inline editing** with full todo properties
- **Expandable todos** show additional details (tags, notes)
- **Visual feedback** for all interactions (hover, active, selected states)

### Date & Time Management
- **Due dates** with relative labels (Today, Tomorrow, In X days)
- **Reminders** with datetime selection
- **Overdue indicators** with red border and badge
- **Statistics cards** for overdue, today's, and tomorrow's tasks

### Notifications
- **Browser push notifications** for task reminders
- **Auto-scheduled notifications** based on reminderTime
- **Permission request** on first load
- **Test notification** when enabling
- **Celebration notification** when completing tasks

### Search & Filtering
- **Text search** across task titles, tags, and notes
- **Priority filters** (Tous, Urgente, Moyenne, Basse)
- **Sort options**:
  - Plus récent (date-created)
  - Modifié récemment (date-updated)
  - Priorité
  - Alphabétique
  - Date d'échéance
- **Real-time filtering** updates instantly

### Tags & Organization
- **Tag suggestions** from existing tags
- **Keyboard shortcuts** (Enter to add, Backspace to remove last)
- **Visual tag chips** with Hype yellow styling
- **Tag filtering** in search

### Visual Design
- **Hype color scheme**: Blue-green (#18636B) and golden yellow (#F9C74C)
- **Gradient backgrounds** with blur effects
- **Smooth animations** on all interactions
- **Glassmorphism** card design
- **Custom scrollbars** matching theme
- **Responsive layout** for mobile, tablet, and desktop

### Data Persistence
- **Automatic save** to localStorage on every change
- **Separate storage key** ("todos-enhanced") to not conflict with legacy app
- **Date serialization** handled by useLocalStorage hook

### Future-Ready Structure
The app is prepared for future features:
- Subtasks interface defined (not yet implemented in UI)
- Attachments interface defined (not yet implemented in UI)
- Recurrence system prepared (not yet implemented in UI)
- Time tracking fields prepared (not yet implemented in UI)

## B-Roll Generator

### Overview
The B-Roll Generator creates professional vertical images (9:16) for social media. Built with:
- **html-to-image**: Converts HTML/CSS to PNG
- **Real-time preview**: Scaled canvas preview
- **localStorage**: Automatic settings persistence

### Key Components

**BRollCanvas**: The canvas component that renders the 1080×1920 image
- Uses inline styles for accurate rendering
- forwardRef for html-to-image export
- Three main zones: background, central text, footer branding

**ImageUploader**: Reusable image upload component
- File input with drag-and-drop visual
- Base64 encoding for localStorage compatibility
- Supports round (profile) and rectangle (background) modes

**SettingsPanel**: Branding configuration panel
- Profile image, name, position
- Color presets + custom color picker
- Opacity sliders for overlay and footer

**ExportButton**: PNG export functionality
- Uses html-to-image toPng()
- 1:1 pixel ratio (native 1080×1920)
- Auto-downloads with timestamp filename

### Storage Keys
- `broll-settings`: BRollSettings object (profile, name, colors, opacities)
- `broll-content`: BRollContent object (headline, subheadline, background image)

### Export Process
1. User clicks "Exporter en PNG"
2. html-to-image captures canvas ref
3. Converts to PNG dataURL
4. Creates download link
5. Auto-downloads file
6. Shows success notification

### Design Considerations
- All styling inline in BRollCanvas for accurate export
- Preview scaled to fit screen (0.4-0.5 scale)
- Export always at full 1080×1920 resolution
- Font: Inter (system fallback to sans-serif)
- Text shadows for readability on any background

### Adding New Features
To add templates:
1. Define template in broll.types.ts
2. Create TemplateSelector component
3. Apply template settings on selection
4. Update BRollEditor to show template selector

To add history:
1. Save each export to localStorage array
2. Create HistoryPanel component
3. Display thumbnails of past exports
4. Allow reload of past configurations
