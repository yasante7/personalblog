# Admin Dashboard Setup Guide

## Overview
The admin dashboard has been updated to display real-time statistics for your blog including total posts, resources, views, and subscribers. Here's how to get everything working:

## 1. Database Setup

### Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql` and run it
4. This will create all necessary tables with sample data

### Environment Variables
Create a `.env.local` file in your project root with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Configuration (for contact form)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=your_email@gmail.com
```

## 2. Admin Dashboard Features

### Real-time Statistics
- **Total Posts**: Shows count of all posts in the database
- **Total Resources**: Shows count of all economics resources
- **Monthly Views**: Calculates total views across all posts and resources
- **Subscribers**: Shows newsletter subscriber count
- **Recent Activity**: Shows posts/resources added in the last 30 days

### Interactive Features
- **Refresh Button**: Manually refresh all statistics
- **Loading States**: Shows skeleton loading while fetching data
- **Error Handling**: Graceful fallbacks if data fetch fails
- **Responsive Design**: Works on all screen sizes

### Navigation
- Quick access to all admin sections
- View site button to see public view
- Logout functionality

## 3. Admin Access

### Login
- Go to `/admin/login`
- Use your admin credentials
- Access is stored in localStorage

### Security
- Admin routes are protected with authentication checks
- Automatic redirect to login if not authenticated
- Session management with logout functionality

## 4. Database Tables Created

- **posts**: Blog posts with metadata
- **resources**: Economics resources with categories
- **subscribers**: Newsletter subscribers
- **contact_messages**: Contact form submissions (future use)
- **comments**: Blog comments (future use)

## 5. Sample Data
The schema includes sample data to test the dashboard:
- 3 sample blog posts
- 4 sample economics resources
- Proper categorization and metadata

## 6. Testing the Dashboard

1. Run the SQL schema in Supabase
2. Set up environment variables
3. Start your development server: `npm run dev`
4. Navigate to `/admin` (will redirect to login if needed)
5. View real-time statistics and sample data

## 7. Customization

### Adding More Statistics
The `getDashboardStats()` function in `lib/supabase.ts` can be extended to calculate more metrics like:
- Top performing posts
- Resource download counts
- Category breakdowns
- User engagement metrics

### Styling
The dashboard uses Tailwind CSS with shadcn/ui components and supports both light and dark themes.

## Need Help?
If you encounter any issues:
1. Check the Supabase dashboard for database connectivity
2. Verify environment variables are correctly set
3. Check browser console for any JavaScript errors
4. Ensure all npm packages are installed: `npm install`