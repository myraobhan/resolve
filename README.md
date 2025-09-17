# Resolve My Case - Consumer Rights Assistant

A comprehensive web application that helps users understand their consumer rights, file complaints, and get AI-powered assistance for consumer disputes in India.

## Features

- 🤖 **AI Chatbot**: Get instant answers about consumer rights and legal procedures using Google's Gemini AI
- 📄 **Complaint Form Generator**: Create professional complaint forms for consumer forums
- 🎯 **Forum Recommendation**: Automatic forum selection based on claim value
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Frontend Only**: No backend required - everything runs in the browser

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Shadcn/ui + Tailwind CSS
- **AI Integration**: Google Gemini AI
- **PDF Generation**: jsPDF + html2canvas
- **Routing**: React Router DOM

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd resolve-my-case
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Get your Gemini API key from: https://makersuite.google.com/app/apikey

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Header, Footer, etc.
│   ├── homepage/       # Homepage-specific components
│   └── ui/            # Shadcn/ui components
├── pages/             # Main application pages
│   ├── ChatBot.tsx    # AI chatbot interface
│   ├── ComplaintForm.tsx # Complaint form generator
│   └── Homepage.tsx   # Landing page
├── services/          # Business logic services
│   ├── geminiService.ts # Gemini AI integration
│   └── pdfService.ts  # PDF generation
└── hooks/             # Custom React hooks
```

## Key Features Explained

### AI Chatbot

- Powered by Google Gemini AI
- Provides expert guidance on consumer rights
- Answers questions about legal procedures
- Fallback responses when API is unavailable

### Complaint Form Generator

- Generates professional PDF complaint forms
- Automatically determines appropriate forum
- Includes all required sections as per Consumer Protection Act, 2019
- Downloadable PDF format

### Forum Selection Logic

- **District Forum**: Claims up to ₹1 crore
- **State Commission**: Claims between ₹1-10 crore
- **National Commission**: Claims above ₹10 crore

## Environment Variables

| Variable              | Description              | Required |
| --------------------- | ------------------------ | -------- |
| `VITE_GEMINI_API_KEY` | Google Gemini AI API key | Yes      |

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Deployment

Since this is a frontend-only application, you can deploy it to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Configure in repository settings
- **Firebase Hosting**: `firebase deploy`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Disclaimer

This application provides general guidance about consumer rights and procedures in India. It is not a substitute for professional legal advice. For complex cases, please consult with a qualified lawyer or consumer rights expert.

## Support

For support or questions, please open an issue in the repository.
