import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { DragDropContext } from 'react-beautiful-dnd'
import ResumePreview from './components/ResumePreview'
import Sidebar from './components/Sidebar'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  const [sections, setSections] = useState([
    { 
      id: 'personal', 
      title: 'Personal Information', 
      content: {
        name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        linkedin: '',
        github: '',
        portfolio: ''
      } 
    },
    { 
      id: 'education', 
      title: 'Education', 
      content: [{
        id: '1',
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    },
    { 
      id: 'experience', 
      title: 'Work Experience', 
      content: [{
        id: '1',
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    },
    { 
      id: 'skills', 
      title: 'Skills', 
      content: []
    },
  ])

  const updateSectionContent = (sectionId: string, newContent: any) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? { ...section, content: newContent }
          : section
      )
    )
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSections(items)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', gap: 2, py: 4 }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Box sx={{ flex: 1 }}>
              <Sidebar 
                sections={sections} 
                updateSectionContent={updateSectionContent}
              />
            </Box>
            <Box sx={{ flex: 2 }}>
              <ResumePreview sections={sections} />
            </Box>
          </DragDropContext>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
