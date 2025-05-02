# Resume Builder

A modern, interactive web application for creating professional resumes with real-time preview and PDF export functionality.

## Features

- 📝 **Interactive Forms**: Easy-to-use forms for personal information, education, work experience, and skills
- 👁️ **Real-time Preview**: See your changes instantly in the resume preview
- 📄 **PDF Export**: Download your resume as a professional PDF
- 🎨 **Modern UI**: Clean and professional design using Material-UI
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Drag and Drop**: Reorder sections with drag and drop functionality
- 🔗 **Clickable Links**: Social media and contact links are clickable in both web view and PDF

## Tech Stack

- React
- TypeScript
- Material-UI
- react-beautiful-dnd (for drag and drop)
- jsPDF (for PDF generation)
- html2canvas (for PDF conversion)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resume-maker.git
cd resume-maker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

1. **Personal Information**
   - Fill in your name, title, contact details
   - Add social media links (LinkedIn, GitHub, Portfolio)

2. **Education**
   - Add your educational background
   - Include degree, field of study, and dates

3. **Work Experience**
   - List your work history
   - Add company details, position, and responsibilities

4. **Skills**
   - Add your technical and professional skills
   - Skills are displayed as interactive tags

5. **Preview and Export**
   - Review your resume in real-time
   - Download as PDF when ready

## Project Structure

```
resume-maker/
├── src/
│   ├── components/
│   │   ├── forms/
│   │   │   ├── PersonalInfoForm.tsx
│   │   │   ├── EducationForm.tsx
│   │   │   ├── ExperienceForm.tsx
│   │   │   └── SkillsForm.tsx
│   │   ├── ResumePreview.tsx
│   │   └── Sidebar.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the component library
- react-beautiful-dnd for drag and drop functionality
- jsPDF and html2canvas for PDF generation
