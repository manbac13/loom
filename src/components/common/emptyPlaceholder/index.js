import { Stack, Typography } from "@mui/material";
import EmptyPlaceholder from "assets/empty_placeholder.svg";

const EmptyPlaceHolder = ({ msg }) => {
  return (
    <>
      <Stack
        margin={"0 auto"}
        sx={{
          width: { xs: "100%", sm: "60%", md: "50%", lg: "40%" },
          height: { xs: "100%", sm: "60%", md: "50%", lg: "40%" },
        }}
      >
        <img src={EmptyPlaceholder} alt="placeholder" />
      </Stack>
    </>
  );
};

export default EmptyPlaceHolder;
