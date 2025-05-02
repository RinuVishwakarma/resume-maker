import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

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
            <TextField
              label="Description"
              value={experience.description}
              onChange={(e) => handleChange(experience.id, 'description', e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default ExperienceForm; 