import { useRef } from 'react';
import { Paper, Box, Typography, Button, Link } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Section {
  id: string;
  title: string;
  content: any;
}

interface ResumePreviewProps {
  sections: Section[];
}

const ResumePreview = ({ sections }: ResumePreviewProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!resumeRef.current) return;

    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;

    // Add the image
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

    pdf.save('resume.pdf');
  };

  const renderSection = (section: Section) => {
    switch (section.id) {
      case 'personal':
        return (
          <Box sx={{ mb: 4 }}>
            {/* Name */}
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                color: '#1976d2',
                mb: 3
              }}
            >
              {section.content.name || 'Your Name'}
            </Typography>

            {/* Contact Information */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              {/* Left Column - Basic Contact */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {section.content.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon sx={{ color: '#1976d2' }} />
                    <Typography variant="body1" sx={{ color: '#455a64' }}>
                      {section.content.location}
                    </Typography>
                  </Box>
                )}
                {section.content.phone && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon sx={{ color: '#1976d2' }} />
                    <Typography variant="body1" sx={{ color: '#455a64' }}>
                      {section.content.phone}
                    </Typography>
                  </Box>
                )}
                {section.content.email && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon sx={{ color: '#1976d2' }} />
                    <Link 
                      href={`mailto:${section.content.email}`}
                      sx={{ 
                        color: '#455a64',
                        textDecoration: 'none',
                        '&:hover': {
                          color: '#1976d2',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {section.content.email}
                    </Link>
                  </Box>
                )}
              </Box>

              {/* Right Column - Social Links */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {section.content.linkedin && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinkedInIcon sx={{ color: '#1976d2' }} />
                    <Link 
                      href={section.content.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        color: '#455a64',
                        textDecoration: 'none',
                        '&:hover': {
                          color: '#1976d2',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      LinkedIn Profile
                    </Link>
                  </Box>
                )}
                {section.content.github && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GitHubIcon sx={{ color: '#1976d2' }} />
                    <Link 
                      href={section.content.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        color: '#455a64',
                        textDecoration: 'none',
                        '&:hover': {
                          color: '#1976d2',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      GitHub Profile
                    </Link>
                  </Box>
                )}
                {section.content.portfolio && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LanguageIcon sx={{ color: '#1976d2' }} />
                    <Link 
                      href={section.content.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        color: '#455a64',
                        textDecoration: 'none',
                        '&:hover': {
                          color: '#1976d2',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Portfolio Website
                    </Link>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Professional Title */}
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 500,
                color: '#455a64',
                mb: 2
              }}
            >
              {section.content.title || 'Professional Title'}
            </Typography>

            {/* Summary */}
            {section.content.summary && (
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#455a64',
                  lineHeight: 1.6
                }}
              >
                {section.content.summary}
              </Typography>
            )}
          </Box>
        );

      case 'education':
        return (
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: '#1a237e',
                fontWeight: 600,
                borderBottom: '2px solid #1a237e',
                pb: 1,
                mb: 2
              }}
            >
              Education
            </Typography>
            {section.content.map((edu: any) => (
              <Box key={edu.id} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#263238'
                    }}
                  >
                    {edu.school || 'School/University'}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#546e7a',
                      minWidth: '120px',
                      textAlign: 'right'
                    }}
                  >
                    {edu.startDate && `${edu.startDate} - ${edu.endDate || 'Present'}`}
                  </Typography>
                </Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#455a64',
                    fontWeight: 500,
                    mb: 1
                  }}
                >
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </Typography>
                {edu.description && (
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#546e7a',
                      mt: 1,
                      lineHeight: 1.6
                    }}
                  >
                    {edu.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        );

      case 'experience':
        return (
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: '#1a237e',
                fontWeight: 600,
                borderBottom: '2px solid #1a237e',
                pb: 1,
                mb: 2
              }}
            >
              Work Experience
            </Typography>
            {section.content.map((exp: any) => (
              <Box key={exp.id} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#263238'
                    }}
                  >
                    {exp.position || 'Position'}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#546e7a',
                      minWidth: '120px',
                      textAlign: 'right'
                    }}
                  >
                    {exp.startDate && `${exp.startDate} - ${exp.endDate || 'Present'}`}
                  </Typography>
                </Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#455a64',
                    fontWeight: 500,
                    mb: 1
                  }}
                >
                  {exp.company} {exp.location && `• ${exp.location}`}
                </Typography>
                {exp.description && (
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#546e7a',
                      mt: 1,
                      lineHeight: 1.6
                    }}
                  >
                    {exp.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        );

      case 'skills':
        return (
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: '#1a237e',
                fontWeight: 600,
                borderBottom: '2px solid #1a237e',
                pb: 1,
                mb: 2
              }}
            >
              Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {section.content.map((skill: string) => (
                <Typography
                  key={skill}
                  variant="body1"
                  sx={{
                    bgcolor: '#e8eaf6',
                    color: '#1a237e',
                    px: 2,
                    py: 0.75,
                    borderRadius: '20px',
                    fontWeight: 500,
                    fontSize: '0.9rem'
                  }}
                >
                  {skill}
                </Typography>
              ))}
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        variant="contained"
        startIcon={<DownloadIcon />}
        onClick={handleDownload}
        sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16,
          bgcolor: '#1a237e',
          '&:hover': {
            bgcolor: '#0d1757'
          }
        }}
      >
        Download PDF
      </Button>
      <Paper
        ref={resumeRef}
        elevation={3}
        sx={{
          p: 6,
          height: '100%',
          minHeight: '800px',
          bgcolor: 'white',
          maxWidth: '800px',
          margin: '0 auto',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        {sections.map((section) => (
          <Box key={section.id}>{renderSection(section)}</Box>
        ))}
      </Paper>
    </Box>
  );
};

export default ResumePreview; 