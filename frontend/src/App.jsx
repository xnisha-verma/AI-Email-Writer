import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import './App.css'
import axios from "axios";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone]=useState('');
  const[generateReply,setGenerateReply] = useState('');
  const[loading,setloading]=useState(false);
  const[error,setError]=useState('');
  const handleSubmit = async()=>{
    setloading(true);
    setError('');
    try{
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        {
          emailContent: emailContent,
          tone: tone,
        },
      );
      setGenerateReply(typeof response.data==='string'? response.data:JSON.stringify(response.data));
    }catch(error){
      setError('Failed to generate email reply. Please try again')
      console.error(error)
    }finally{
      setloading(false)
    }

  }
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Email Reply Generator
      </Typography>
      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="original Email Content"
          value={emailContent || ""}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        ></TextField>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone || ""}
            label={"Tone (Optional)"}
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {generateReply && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generateReply || ""}
            inputProps={{ readOnly: true }}
          ></TextField>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigator.clipboard.writeText(generateReply)}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App
