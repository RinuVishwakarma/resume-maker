import { useState } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import PersonalInfoForm from './forms/PersonalInfoForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import SkillsForm from './forms/SkillsForm';

interface Section {
  id: string;
  title: string;
  content: any;
}

interface SidebarProps {
  sections: Section[];
  updateSectionContent: (sectionId: string, newContent: any) => void;
}

const Sidebar = ({ sections, updateSectionContent }: SidebarProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const renderForm = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return null;

    switch (sectionId) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={section.content}
            onUpdate={(data) => updateSectionContent(sectionId, data)}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={section.content}
            onUpdate={(data) => updateSectionContent(sectionId, data)}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={section.content}
            onUpdate={(data) => updateSectionContent(sectionId, data)}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={section.content}
            onUpdate={(data) => updateSectionContent(sectionId, data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Resume Sections
      </Typography>
      <Droppable droppableId="sections">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{ mb: 2 }}
          >
            {sections.map((section, index) => (
              <Draggable key={section.id} draggableId={section.id} index={index}>
                {(provided) => (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                      p: 2,
                      mb: 1,
                      cursor: 'pointer',
                      bgcolor: activeSection === section.id ? 'primary.light' : 'background.paper',
                    }}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <Typography>{section.title}</Typography>
                  </Paper>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>

      {activeSection && (
        <Box sx={{ mt: 2 }}>
          {renderForm(activeSection)}
        </Box>
      )}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Section
      </Button>
    </Paper>
  );
};

export default Sidebar; 