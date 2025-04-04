import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, Tabs, Tab, 
  Radio, RadioGroup, FormControlLabel, FormControl, 
  FormLabel, Accordion, AccordionSummary, AccordionDetails, 
  CircularProgress, Alert, Snackbar
} from '@mui/material';
import { ExpandMore, Download, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TestCaseGenerator = () => {
  const navigate = useNavigate();
  const [contextInput, setContextInput] = useState('');
  const [requirements, setRequirements] = useState('');
  const [formatType, setFormatType] = useState('default');
  const [exampleCase, setExampleCase] = useState('');
  const [contextFile, setContextFile] = useState(null);
  const [testCases, setTestCases] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [isDownloadingDOCX, setIsDownloadingDOCX] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const fileInputRef = useRef(null);

  // Check session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/check_session', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          setLoggedIn(data.logged_in);
          if (!data.logged_in) {
            navigate('/login');
          }
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error('Session check error:', err);
        navigate('/login');
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setContextFile(file);
      
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        
        const data = await response.json();
        setContextInput(data.extracted_text);
        setError('');
        setSuccessMessage('File uploaded successfully!');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const generateTestCases = async () => {
    if (!contextInput) {
      setError('Functional context is required');
      return;
    }
    if (!requirements) {
      setError('Please enter a requirement');
      return;
    }
    if (formatType === 'custom' && !exampleCase.trim()) {
      setError('For custom format, you must provide a test case example');
      return;
    }
    
    setIsGenerating(true);
    setError('');
    setTestCases('');
    
    const controller = new AbortController();
    setAbortController(controller);
    
    try {
      const response = await fetch('http://localhost:5000/generate_test_cases_stream', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requirements,
          format_type: formatType,
          context: contextInput,
          example_case: exampleCase
        }),
        signal: controller.signal
      });
      
      if (!response.ok) {
        throw new Error('Generation failed');
      }
      
      if (!response.body) {
        throw new Error('ReadableStream not supported in this browser');
      }
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      
      const processStream = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              setSuccessMessage('Test cases generated successfully!');
              setIsGenerating(false);
              return;
            }
            
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n\n').filter(line => line.trim());
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.substring(6));
                  if (data.error) {
                    setError(data.error);
                    setIsGenerating(false);
                    return;
                  }
                  if (data.chunk) {
                    accumulatedText += data.chunk;
                    setTestCases(accumulatedText);
                  }
                } catch (parseError) {
                  console.error('Error parsing SSE data:', parseError);
                }
              }
            }
          }
        } catch (streamError) {
          if (streamError.name !== 'AbortError') {
            setError('Error reading stream: ' + streamError.message);
            setIsGenerating(false);
          }
        }
      };
      
      processStream();
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setIsGenerating(false);
      }
    }
  };

  const cancelGeneration = () => {
    if (abortController) {
      abortController.abort();
      setError('Generation cancelled');
      setIsGenerating(false);
    }
  };

  const downloadPDF = async () => {
    setIsDownloadingPDF(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/download_pdf', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test_cases: testCases }),
      });
      
      if (!response.ok) {
        throw new Error('PDF generation failed');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'test_cases.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setSuccessMessage('PDF downloaded successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  const downloadDOCX = async () => {
    setIsDownloadingDOCX(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/download_docx', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test_cases: testCases }),
      });
      
      if (!response.ok) {
        throw new Error('DOCX generation failed');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'test_cases.docx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setSuccessMessage('DOCX downloaded successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDownloadingDOCX(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
    setError('');
  };

  if (!loggedIn) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Left Column - Input Parameters */}
      <Box sx={{ width: '50%', p: 3, overflowY: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#1976d2' }}>
          Test Case Generator
        </Typography>
        
        {error && (
          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity="error" onClose={handleCloseSnackbar}>
              {error}
            </Alert>
          </Snackbar>
        )}
        
        {successMessage && (
          <Snackbar
            open={!!successMessage}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity="success" onClose={handleCloseSnackbar}>
              {successMessage}
            </Alert>
          </Snackbar>
        )}
        
        {/* Context Section */}
        <Paper elevation={2} sx={{ mb: 3 }}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Context Fonctionnel</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Saisie manuelle" />
                <Tab label="Upload de fichier" />
              </Tabs>
              
              {activeTab === 0 ? (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={contextInput}
                  onChange={(e) => setContextInput(e.target.value)}
                  label="Description genérale du contexte fonctionnel(Obligatoire)"
                  variant="outlined"
                  sx={{ mt: 2 }}
                />
              ) : (
                <Box sx={{ mt: 2 }}>
                  <input
                    type="Choisir un fichier décrivant le contexte de l'application (Obligatoire)"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".txt,.docx,.pdf"
                    style={{ display: 'none' }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => fileInputRef.current.click()}
                    sx={{ mb: 2 }}
                  >
                    Select File
                  </Button>
                  {contextFile && (
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Selected: {contextFile.name}
                    </Typography>
                  )}
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        </Paper>
        
        {/* Requirements Section */}
        <Paper elevation={2} sx={{ mb: 3 }}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Exigences/ User Stories</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                fullWidth
                multiline
                rows={5}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                label="Saisir l'exigence/ la US"
                variant="outlined"
              />
            </AccordionDetails>
          </Accordion>
        </Paper>
        
        {/* Format Section */}
        <Paper elevation={2} sx={{ mb: 3 }}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Format des Cas de Test</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <FormLabel component="legend">Choisir le format :</FormLabel>
                <RadioGroup
                  value={formatType}
                  onChange={(e) => setFormatType(e.target.value)}
                >
                  <FormControlLabel 
                    value="default" 
                    control={<Radio />} 
                    label="Par Defaut " 
                  />
                  <FormControlLabel 
                    value="gherkin" 
                    control={<Radio />} 
                    label="Gherkin (Given When Then)" 
                  />
                  <FormControlLabel 
                    value="custom" 
                    control={<Radio />} 
                    label="Personnalisé (Basé sur l'exemple)" 
                  />
                </RadioGroup>
              </FormControl>
              
              <TextField
                fullWidth
                multiline
                rows={5}
                value={exampleCase}
                onChange={(e) => setExampleCase(e.target.value)}
                label={formatType === 'custom' ? 
                  "Exemple d'un cas de test (obligatoire)" : 
                  "Exemple d'un cas de test (optionnel)"}
                variant="outlined"
                sx={{ mt: 2 }}
              />
            </AccordionDetails>
          </Accordion>
        </Paper>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={generateTestCases}
            disabled={isGenerating}
            sx={{ py: 1.5, fontWeight: 'bold' }}
          >
            {isGenerating ? <CircularProgress size={24} /> : 'Generate Test Cases'}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={cancelGeneration}
            disabled={!isGenerating}
            sx={{ py: 1.5, fontWeight: 'bold' }}
            startIcon={<Cancel />}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      
      {/* Right Column - Results */}
      <Box sx={{ width: '50%', p: 3, backgroundColor: 'white', borderLeft: '1px solid #e0e0e0' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#1976d2' }}>
          Résultat 
        </Typography>
        
        {/* Results Display Area */}
        <Paper elevation={1} sx={{ p: 2, mb: 2, height: '800px', overflowY: 'auto' }}>
          {isGenerating && testCases === '' ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Starting generation...</Typography>
            </Box>
          ) : (
            <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              {testCases || 'Generated test cases will appear here.'}
              {isGenerating && (
                <Box component="span" sx={{ 
                  display: 'inline-block',
                  width: '8px',
                  height: '16px',
                  bgcolor: 'text.primary',
                  animation: 'blink 1s step-end infinite',
                  '@keyframes blink': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 }
                  }
                }} />
              )}
            </Typography>
          )}
        </Paper>
        
        {/* Download Buttons */}
        {testCases && (
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              startIcon={isDownloadingPDF ? <CircularProgress size={20} /> : <Download />}
              onClick={downloadPDF}
              disabled={isDownloadingPDF || !testCases}
              fullWidth
              sx={{ backgroundColor: '#0066cc', '&:hover': { backgroundColor: '#004d99' } }}
            >
              {isDownloadingPDF ? 'Generating PDF...' : 'Download PDF'}
            </Button>
            <Button
              variant="contained"
              startIcon={isDownloadingDOCX ? <CircularProgress size={20} /> : <Download />}
              onClick={downloadDOCX}
              disabled={isDownloadingDOCX || !testCases}
              fullWidth
              sx={{ backgroundColor: '#0066cc', '&:hover': { backgroundColor: '#004d99' } }}
            >
              {isDownloadingDOCX ? 'Generating DOCX...' : 'Download DOCX'}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TestCaseGenerator;