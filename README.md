# Blog App Frontend

The **Blog App Frontend** is a modern, responsive, and feature-rich user interface built with React. It allows users to explore, search, and interact with blog posts. This project is part of a full-stack blogging platform, with the backend providing the API services.

## 🚀 Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Search Functionality**: Search for blog posts by keywords and categories.
- **Pagination**: Efficiently navigate through large datasets with pagination.
- **Dynamic Content**: Fetch and display blog posts dynamically from the backend.
- **Category Filtering**: Filter blog posts by categories using a multi-select dropdown.
- **Error Handling**: User-friendly error messages for failed API requests.
- **Skeleton Loading**: Smooth user experience with skeleton loaders during data fetching.

## 🛠️ Tech Stack

- **React**: Frontend library for building user interfaces.
- **React Router**: For routing and navigation.
- **Axios**: For making HTTP requests to the backend API.
- **React Query**: For efficient data fetching and caching.
- **Tailwind CSS**: For styling and responsive design.
- **React Hook Form**: For managing form state and validation.
- **React Hot Toast**: For displaying notifications.

## 📂 Folder Structure

```
src/
├── components/   # Reusable UI components
├── pages/        # Page-level components
├── services/     # API service functions
├── styles/       # Global styles
├── App.js        # Main application component
└── index.js      # Entry point
```

## ⚙️ Environment Variables

The project uses environment variables for configuration. Create a `.env` file in the `src` directory with the following:

```properties
REACT_APP_API_BASE_URL=<Your Backend API URL>
```

## 🖥️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/akshatbiniwale/blog-app-frontend
    cd blog-app-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open the app in your browser at `http://localhost:3000`.

## 🚀 Deployment

The frontend is deployed on Vercel. Visit the live application here: [https://blogstrings.vercel.app](https://blogstrings.vercel.app).

## 📸 Screenshots

### Home Page
![Home Page](https://drive.google.com/uc?id=1_p7nM6V0NFnA-mv5n5CLailAMlEcq-vd)

### Blog Page
![Blog Page](https://drive.google.com/uc?id=1IgUL62UPxZV0d-Y1ScRD0-e9Sb9eEQ77)
