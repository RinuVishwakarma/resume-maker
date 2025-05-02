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

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

const EducationForm = ({ data, onUpdate }: EducationFormProps) => {
  const [educations, setEducations] = useState<Education[]>(data);

  useEffect(() => {
    setEducations(data);
  }, [data]);

  const handleChange = (id: string, field: keyof Education, value: string) => {
    const updatedEducations = educations.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducations(updatedEducations);
    onUpdate(updatedEducations);
  };

  const handleAdd = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    const updatedEducations = [...educations, newEducation];
    setEducations(updatedEducations);
    onUpdate(updatedEducations);
  };

  const handleDelete = (id: string) => {
    const updatedEducations = educations.filter(edu => edu.id !== id);
    setEducations(updatedEducations);
    onUpdate(updatedEducations);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Education</Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAdd}
          variant="contained"
          size="small"
        >
          Add Education
        </Button>
      </Box>
      {educations.map((education) => (
        <Paper key={education.id} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              size="small"
              onClick={() => handleDelete(education.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <TextField
              label="School/University"
              value={education.school}
              onChange={(e) => handleChange(education.id, 'school', e.target.value)}
              fullWidth
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="Degree"
                value={education.degree}
                onChange={(e) => handleChange(education.id, 'degree', e.target.value)}
                fullWidth
              />
              <TextField
                label="Field of Study"
                value={education.field}
                onChange={(e) => handleChange(education.id, 'field', e.target.value)}
                fullWidth
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="Start Date"
                value={education.startDate}
                onChange={(e) => handleChange(education.id, 'startDate', e.target.value)}
                placeholder="MM/YYYY"
                fullWidth
              />
              <TextField
                label="End Date"
                value={education.endDate}
                onChange={(e) => handleChange(education.id, 'endDate', e.target.value)}
                placeholder="MM/YYYY or Present"
                fullWidth
              />
            </Box>
            <TextField
              label="Description"
              value={education.description}
              onChange={(e) => handleChange(education.id, 'description', e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default EducationForm; 