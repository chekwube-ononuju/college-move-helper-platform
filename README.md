# College Move Helper Platform

A modern web application connecting college students who need moving help with student helpers. Built with React, TypeScript, and Supabase.

## 🚀 Features

### For Job Posters
- **Create Moving Requests**: Post detailed moving jobs with location, date, and time
- **Flexible Pricing**: Choose between hourly rates or fixed pricing
- **Time Estimation**: Specify estimated hours needed for the job
- **Real-time Pricing Calculator**: See estimated total costs for hourly jobs
- **Interactive Map**: View and set job locations with real-world mapping
- **Geolocation Support**: Find your current location automatically

### For Movers/Helpers
- **Browse Available Jobs**: View all open moving requests on an interactive map
- **Detailed Job Information**: See job descriptions, pricing, and time estimates
- **Contact System**: Connect with job posters directly
- **Profile Management**: Build your helper profile and reputation

### Technical Features
- **Real-time Updates**: Live job postings and status updates
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Authentication**: Secure user authentication with Supabase

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: shadcn/ui, Tailwind CSS, Radix UI
- **Backend**: Supabase (Database, Authentication, Real-time)
- **Maps**: Leaflet with OpenStreetMap
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/college-move-helper.git
   cd college-move-helper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel
- Netlify
- AWS Amplify
- GitHub Pages

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
pnpm run dev
```

**To build**

```shell
pnpm run build
```
