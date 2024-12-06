import { Box, Tooltip } from "@mui/material";

const Dot = ({ color }) => {
  return (
    <Tooltip title='Filter Applied'>
      <Box
        sx={{
          borderRadius: "50%",
          width: "6px",
          height: "6px",
          backgroundColor: color,
        }}
      ></Box>
    </Tooltip>
  );
};

export default Dot;
