import { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Paper,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
}

const ExperienceForm = ({ data, onUpdate }: ExperienceFormProps) => {
  const [experiences, setExperiences] = useState<Experience[]>(data);
  const descriptionRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  useEffect(() => {
    setExperiences(data);
  }, [data]);

  const handleChange = (id: string, field: keyof Experience, value: string) => {
    const updatedExperiences = experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  const handleAdd = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    const updatedExperiences = [...experiences, newExperience];
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  const handleDelete = (id: string) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  const handleAddBulletPoint = (id: string) => {
    const textarea = descriptionRefs.current[id];
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = experiences.find(exp => exp.id === id)?.description || '';
      const newText = text.substring(0, start) + '• ' + text.substring(end);
      
      handleChange(id, 'description', newText);
      
      // Set cursor position after the bullet point
      setTimeout(() => {
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(start + 2, start + 2);
        }
      }, 0);
    }
  };

  const handleKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = descriptionRefs.current[id];
      if (textarea) {
        const start = textarea.selectionStart;
        const text = experiences.find(exp => exp.id === id)?.description || '';
        
        // Check if we're at the end of a line
        const currentLine = text.substring(0, start).split('\n').pop() || '';
        const isEndOfLine = start === text.length || text[start] === '\n';
        
        // If we're at the end of a line or the line is empty, add a new bullet point
        if (isEndOfLine || currentLine.trim() === '•') {
          const newText = text.substring(0, start) + '\n• ' + text.substring(start);
          handleChange(id, 'description', newText);
          
          // Set cursor position after the new bullet point
          setTimeout(() => {
            if (textarea) {
              textarea.focus();
              textarea.setSelectionRange(start + 3, start + 3);
            }
          }, 0);
        } else {
          // If we're in the middle of a line, just add a new line
          const newText = text.substring(0, start) + '\n' + text.substring(start);
          handleChange(id, 'description', newText);
          
          // Set cursor position at the start of the new line
          setTimeout(() => {
            if (textarea) {
              textarea.focus();
              textarea.setSelectionRange(start + 1, start + 1);
            }
          }, 0);
        }
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Work Experience</Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAdd}
          variant="contained"
          size="small"
        >
          Add Experience
        </Button>
      </Box>
      {experiences.map((experience) => (
        <Paper key={experience.id} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              size="small"
              onClick={() => handleDelete(experience.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <TextField
              label="Company"
              value={experience.company}
              onChange={(e) => handleChange(experience.id, 'company', e.target.value)}
              fullWidth
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="Position"
                value={experience.position}
                onChange={(e) => handleChange(experience.id, 'position', e.target.value)}
                fullWidth
              />
              <TextField
                label="Location"
                value={experience.location}
                onChange={(e) => handleChange(experience.id, 'location', e.target.value)}
                fullWidth
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="Start Date"
                value={experience.startDate}
                onChange={(e) => handleChange(experience.id, 'startDate', e.target.value)}
                placeholder="MM/YYYY"
                fullWidth
              />
              <TextField
                label="End Date"
                value={experience.endDate}
                onChange={(e) => handleChange(experience.id, 'endDate', e.target.value)}
                placeholder="MM/YYYY or Present"
                fullWidth
              />
            </Box>
            <Box sx={{ position: 'relative' }}>
              <TextField
                label="Description"
                value={experience.description}
                onChange={(e) => handleChange(experience.id, 'description', e.target.value)}
                onKeyDown={(e) => handleKeyDown(experience.id, e)}
                multiline
                rows={4}
                fullWidth
                inputRef={(el) => descriptionRefs.current[experience.id] = el}
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Add bullet point">
                      <IconButton
                        size="small"
                        onClick={() => handleAddBulletPoint(experience.id)}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                      >
                        <FormatListBulletedIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
              />
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default ExperienceForm; 