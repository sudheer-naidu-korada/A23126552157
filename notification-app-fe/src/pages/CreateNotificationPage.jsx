import { useState } from "react";
import { Container, Typography, TextField, Button, Alert, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { createNotification } from "../apis/notifications";

export default function CreateNotificationPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await createNotification(title, message);
      setSuccess("Notification created successfully!");
      setTitle("");
      setMessage("");
    } catch (err) {
      setError("Failed to create notification",err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Create Notification</Typography>
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 2 }}>Back</Button>
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Stack spacing={2}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
        <TextField label="Message" value={message} onChange={(e) => setMessage(e.target.value)} fullWidth multiline rows={3} />
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </Stack>
    </Container>
  );
}