import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
}

const PersonalInfoForm = ({ data, onUpdate }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState<PersonalInfo>({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    linkedin: '',
    github: '',
    portfolio: '',
  });

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate(updatedData);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'grid', gap: 2 }}>
          <TextField
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Professional Title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            fullWidth
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              fullWidth
            />
            <TextField
              label="Phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              fullWidth
            />
          </Box>
          <TextField
            label="Location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            fullWidth
          />
          <TextField
            label="Summary"
            value={formData.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Social Links
          </Typography>
          <TextField
            label="LinkedIn Profile"
            value={formData.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            fullWidth
            placeholder="https://linkedin.com/in/your-profile"
          />
          <TextField
            label="GitHub Profile"
            value={formData.github}
            onChange={(e) => handleChange('github', e.target.value)}
            fullWidth
            placeholder="https://github.com/your-username"
          />
          <TextField
            label="Portfolio Website"
            value={formData.portfolio}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            fullWidth
            placeholder="https://your-portfolio.com"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default PersonalInfoForm; 