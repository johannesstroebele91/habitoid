# Habit Tracking Application

Habitoid is your go-to tool for tracking your habits effectively. This intuitive application empowers you to seamlessly record your progress for existing habits or add new ones. It offers a responsive, cross-platform user experience tailored to your habit-building journey.

# Features

- **Habit Management:** Effortlessly record progress for your existing habits or add new ones for enhanced productivity and personal growth.
- **Add, Edit, and Delete Habits:** Easily add, modify, or remove habits to adapt to your evolving goals and lifestyle.
- **Progress Tracking:** Monitor your progress with a simple scoring system—"+" for positive progress and "-" for negative progress—on each habit card.
- **Point System**: Stay motivated and engaged by earning points for completing habits.

# Technology

- Mobile-First Design: for seamless use across various platforms.
- Frontend: built with Angular and Angular Material for a robust and up-to-date development foundation.
- Routing with Authentication Guards: Restricts access based on user login status.
- Authentication: Secure user access through Firebase's built-in authentication features.
- Data Storing: Retrieves and stores data efficiently using Firebase's services.
- Vercel Deployment: Leverages Vercel's serverless platform for scalability and reliability.

**How to Use:**

- **Record Progress:** Click the "+" or "-" buttons on each habit card to record positive or negative progress.
- **Add New Habits:** Easily add new habits by clicking the "Add Habit" button and filling out the necessary details.
- **Edit or Delete Habits:** Modify or remove existing habits by clicking the edit or delete buttons on each habit card.

# Development and Deployment

- Development Server: Run ng serve for a local development server accessible at http://localhost:4040/. Changes to source files trigger automatic reloading.
- Build: Run ng build to create production-ready build artifacts stored in the dist/ directory. Use the --prod flag for optimized production builds.
- Production Deployment: After building, run node server.js to start the production server. Deployment can be automated using Vercel's continuous integration features.
