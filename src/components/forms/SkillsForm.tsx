import { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface SkillsFormProps {
  data: string[];
  onUpdate: (skills: string[]) => void;
}

const SkillsForm = ({ data, onUpdate }: SkillsFormProps) => {
  const [skills, setSkills] = useState<string[]>(data || []);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    setSkills(data || []);
  }, [data]);

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      onUpdate(updatedSkills);
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    onUpdate(updatedSkills);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          label="Add Skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddSkill();
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddSkill}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {skills.map((skill, index) => (
          <Paper
            key={index}
            sx={{
              p: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'primary.light',
              color: 'primary.contrastText'
            }}
          >
            <Typography>{skill}</Typography>
            <Button
              size="small"
              color="inherit"
              onClick={() => handleDeleteSkill(index)}
            >
              ×
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default SkillsForm; 