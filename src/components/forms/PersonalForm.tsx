import { ChangeEvent } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Button,
  IconButton,
  Avatar
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

interface PersonalFormProps {
  content: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedin: string;
    github: string;
    portfolio: string;
    profileImage?: string;
  };
  onChange: (content: any) => void;
}

const PersonalForm = ({ content, onChange }: PersonalFormProps) => {
  const handleChange = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...content,
      [field]: e.target.value
    });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          ...content,
          profileImage: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onChange({
      ...content,
      profileImage: undefined
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>

      {/* Profile Image Upload */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        mb: 3,
        p: 2,
        border: '1px dashed #ccc',
        borderRadius: 1
      }}>
        <Avatar
          src={content.profileImage}
          sx={{ 
            width: 100, 
            height: 100,
            border: '2px solid #1a237e'
          }}
        />
        <Box>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-image-upload"
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="profile-image-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<AddPhotoAlternateIcon />}
              sx={{ mr: 1 }}
            >
              Upload Photo
            </Button>
          </label>
          {content.profileImage && (
            <IconButton 
              onClick={handleRemoveImage}
              color="error"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      <TextField
        fullWidth
        label="Full Name"
        value={content.name}
        onChange={handleChange('name')}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Professional Title"
        value={content.title}
        onChange={handleChange('title')}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={content.email}
        onChange={handleChange('email')}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Phone"
        value={content.phone}
        onChange={handleChange('phone')}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Location"
        value={content.location}
        onChange={handleChange('location')}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Professional Summary"
        value={content.summary}
        onChange={handleChange('summary')}
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        fullWidth
        label="LinkedIn URL"
        value={content.linkedin}
        onChange={handleChange('linkedin')}
        margin="normal"
      />
      <TextField
        fullWidth
        label="GitHub URL"
        value={content.github}
        onChange={handleChange('github')}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Portfolio URL"
        value={content.portfolio}
        onChange={handleChange('portfolio')}
        margin="normal"
      />
    </Box>
  );
};

export default PersonalForm; 