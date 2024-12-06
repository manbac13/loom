import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CloseCircle } from "iconsax-react";

const VideoDialog = ({ open, handleClose, videoKey }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle
          sx={{ backgroundColor: "#141414", color: "#fff", p: 1, px: 2 }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
              Watch Trailer
            </Typography>
            <IconButton onClick={() => handleClose()}>
              <CloseCircle color="#fff" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <iframe
            width="100%" // Makes the iframe width responsive to container
            height="500" // Set your desired height
            src={`https://www.youtube.com/embed/${videoKey}`} // Embed YouTube URL with video ID
            title="YouTube Video"
            frameBorder="0" // Removes the border around the iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" // Allow autoplay and other features
            allowFullScreen
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoDialog;
