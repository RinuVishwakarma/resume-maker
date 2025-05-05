import { useRef, useState, useEffect } from 'react';
import { Paper, Box, Typography, Button, Link, Avatar } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Utility function to extract username from URL
const extractUsername = (url: string, platform: 'github' | 'linkedin' | 'portfolio'): string => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    
    switch (platform) {
      case 'github':
        return `@${pathParts[0]}`;
      case 'linkedin':
        return `in/${pathParts[1]}`;
      case 'portfolio':
        return urlObj.hostname.replace('www.', '');
      default:
        return url;
    }
  } catch {
    return url;
  }
};

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
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const personalSection = sections.find(section => section.id === 'personal');
    if (personalSection?.content.profileImage) {
      setProfileImage(personalSection.content.profileImage);
    } else {
      setProfileImage(null);
    }
  }, [sections]);

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
    const imgY = 0; // Start from the top of the page

    // Add the image
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

    // Add clickable links for social media profiles
    const personalSection = sections.find(section => section.id === 'personal');
    if (personalSection) {
      const { linkedin, github, portfolio, email } = personalSection.content;
      
      // Calculate link positions based on the image scaling
      const linkY = imgY + 60; // Approximate Y position for social links
      const linkX = imgX + (imgWidth * ratio) - 100; // Approximate X position for social links
      
      if (linkedin) {
        pdf.link(linkX, linkY, 30, 5, { url: linkedin });
      }
      if (github) {
        pdf.link(linkX, linkY + 10, 30, 5, { url: github });
      }
      if (portfolio) {
        pdf.link(linkX, linkY + 20, 30, 5, { url: portfolio });
      }
      if (email) {
        pdf.link(linkX, linkY + 30, 30, 5, { url: `mailto:${email}` });
      }
    }

    pdf.save('resume.pdf');
  };

  const renderSection = (section: Section) => {
    switch (section.id) {
      case 'personal':
        return (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 4, 
              alignItems: 'flex-start',
              mb: 3,
              bgcolor: '#1a237e',
              p: 3,
              borderRadius: 1,
              color: 'white'
            }}>
              <Avatar
                src={profileImage || undefined}
                sx={{ 
                  width: 120, 
                  height: 120,
                  border: '4px solid white',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'white',
                    mb: 1
                  }}
                >
                  {section.content.name || 'Your Name'}
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.9)',
                    mb: 2
                  }}
                >
                  {section.content.title || 'Professional Title'}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {section.content.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon />
                      <Typography variant="body1">
                        {section.content.location}
                      </Typography>
                    </Box>
                  )}
                  {section.content.phone && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon />
                      <Typography variant="body1">
                        {section.content.phone}
                      </Typography>
                    </Box>
                  )}
                  {section.content.email && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon />
                      <Link 
                        href={`mailto:${section.content.email}`}
                        sx={{ 
                          color: 'white',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {section.content.email}
                      </Link>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Social Links */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              mb: 3,
              flexWrap: 'wrap'
            }}>
              {section.content.linkedin && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinkedInIcon sx={{ color: '#1a237e' }} />
                  <Link 
                    href={section.content.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      color: '#455a64',
                      textDecoration: 'none',
                      '&:hover': {
                        color: '#1a237e',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {extractUsername(section.content.linkedin, 'linkedin')}
                  </Link>
                </Box>
              )}
              {section.content.github && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GitHubIcon sx={{ color: '#1a237e' }} />
                  <Link 
                    href={section.content.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      color: '#455a64',
                      textDecoration: 'none',
                      '&:hover': {
                        color: '#1a237e',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {extractUsername(section.content.github, 'github')}
                  </Link>
                </Box>
              )}
              {section.content.portfolio && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LanguageIcon sx={{ color: '#1a237e' }} />
                  <Link 
                    href={section.content.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      color: '#455a64',
                      textDecoration: 'none',
                      '&:hover': {
                        color: '#1a237e',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {extractUsername(section.content.portfolio, 'portfolio')}
                  </Link>
                </Box>
              )}
            </Box>

            {/* Summary */}
            {section.content.summary && (
              <Box sx={{ 
                bgcolor: '#f5f5f5',
                p: 2,
                borderRadius: 1,
                mb: 3
              }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#455a64',
                    lineHeight: 1.6
                  }}
                >
                  {section.content.summary}
                </Typography>
              </Box>
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
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  mb: 1,
                  bgcolor: '#f5f5f5',
                  p: 2,
                  borderRadius: 1
                }}>
                  <Box>
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
                      variant="subtitle1" 
                      sx={{ 
                        color: '#455a64',
                        fontWeight: 500,
                        mb: 1
                      }}
                    >
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </Typography>
                  </Box>
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
                {edu.description && (
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#546e7a',
                      mt: 1,
                      lineHeight: 1.6,
                      pl: 2
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
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  mb: 1,
                  bgcolor: '#f5f5f5',
                  p: 2,
                  borderRadius: 1
                }}>
                  <Box>
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
                      variant="subtitle1" 
                      sx={{ 
                        color: '#455a64',
                        fontWeight: 500,
                        mb: 1
                      }}
                    >
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </Typography>
                  </Box>
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
                {exp.description && (
                  <Box sx={{ mt: 1, pl: 2 }}>
                    {exp.description.split('\n').map((line: string, index: number) => (
                      <Box key={index} sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
                        {line.trim().startsWith('•') ? (
                          <>
                            <Typography component="span" sx={{ color: '#1a237e', minWidth: '20px' }}>•</Typography>
                            <Typography component="span" sx={{ color: '#546e7a' }}>
                              {line.trim().substring(1).trim()}
                            </Typography>
                          </>
                        ) : (
                          <Typography component="span" sx={{ color: '#546e7a', pl: 3 }}>
                            {line}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
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
          },
          zIndex: 1
        }}
      >
        Download PDF
      </Button>
      <Paper
        ref={resumeRef}
        elevation={3}
        sx={{
          p: 4,
          height: '100%',
          minHeight: '297mm', // A4 height
          width: '210mm', // A4 width
          bgcolor: 'white',
          margin: '0 auto',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {sections.map((section) => (
          <Box key={section.id}>
            {section.id === 'personal' ? (
              <Box sx={{ 
                mb: 4,
                mt: -2 // Move header up
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 4, 
                  alignItems: 'flex-start',
                  mb: 3,
                  bgcolor: '#1a237e',
                  p: 3,
                  borderRadius: 1,
                  color: 'white',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(26,35,126,0.95) 0%, rgba(26,35,126,0.85) 100%)',
                    borderRadius: 1,
                    zIndex: 0
                  }
                }}>
                  <Avatar
                    src={profileImage || undefined}
                    sx={{ 
                      width: 120, 
                      height: 120,
                      border: '4px solid white',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      position: 'relative',
                      zIndex: 1
                    }}
                  />
                  <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        fontWeight: 600,
                        color: 'white',
                        mb: 1,
                        fontSize: { xs: '2rem', sm: '2.5rem' }
                      }}
                    >
                      {section.content.name || 'Your Name'}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.9)',
                        mb: 2,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' }
                      }}
                    >
                      {section.content.title || 'Professional Title'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {section.content.location && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOnIcon />
                          <Typography variant="body1">
                            {section.content.location}
                          </Typography>
                        </Box>
                      )}
                      {section.content.phone && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PhoneIcon />
                          <Typography variant="body1">
                            {section.content.phone}
                          </Typography>
                        </Box>
                      )}
                      {section.content.email && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EmailIcon />
                          <Link 
                            href={`mailto:${section.content.email}`}
                            sx={{ 
                              color: 'white',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline'
                              }
                            }}
                          >
                            {section.content.email}
                          </Link>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>

                {/* Social Links */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  mb: 3,
                  flexWrap: 'wrap'
                }}>
                  {section.content.linkedin && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinkedInIcon sx={{ color: '#1a237e' }} />
                      <Link 
                        href={section.content.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: '#455a64',
                          textDecoration: 'none',
                          '&:hover': {
                            color: '#1a237e',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {extractUsername(section.content.linkedin, 'linkedin')}
                      </Link>
                    </Box>
                  )}
                  {section.content.github && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <GitHubIcon sx={{ color: '#1a237e' }} />
                      <Link 
                        href={section.content.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: '#455a64',
                          textDecoration: 'none',
                          '&:hover': {
                            color: '#1a237e',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {extractUsername(section.content.github, 'github')}
                      </Link>
                    </Box>
                  )}
                  {section.content.portfolio && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LanguageIcon sx={{ color: '#1a237e' }} />
                      <Link 
                        href={section.content.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: '#455a64',
                          textDecoration: 'none',
                          '&:hover': {
                            color: '#1a237e',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {extractUsername(section.content.portfolio, 'portfolio')}
                      </Link>
                    </Box>
                  )}
                </Box>

                {/* Summary */}
                {section.content.summary && (
                  <Box sx={{ 
                    bgcolor: '#f5f5f5',
                    p: 2,
                    borderRadius: 1,
                    mb: 3
                  }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#455a64',
                        lineHeight: 1.6
                      }}
                    >
                      {section.content.summary}
                    </Typography>
                  </Box>
                )}
              </Box>
            ) : (
              renderSection(section)
            )}
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default ResumePreview; 