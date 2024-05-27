import { Stack, TextField, Typography } from "@mui/material";
import { useCurrentUserContext } from "../../context/CurrentClientContext";

export const Pricing = () => {
  const { user } = useCurrentUserContext();

  if (!user) return null;
  return (
    <Stack
      sx={{
        padding: 4,
        maxWidth: "600px",
        gap: 3,
      }}
    >
      <Typography variant="h5">Pricing</Typography>
      <Stack gap={3}>
        <TextField
          label="Base price"
          value={user.basePrice}
          disabled
          sx={{
            "& .Mui-disabled": {
              bgcolor: "background.default",
              color: "text.primary",
              textFillColor: "black",
              "--webkit-text-fill-color": "black",
              

              "&:before": {
                borderBottom: 0,
              },

              "&:after": {
                borderBottom: 0,
              },

              "& > input": {
                color: "text.primary",
                fontWeight: "bold",
              },
            },
          }}
        />
        <TextField
          label="Discount"
          value={user.calculatedDiscounts}
          disabled
          sx={{
            "& .Mui-disabled": {
              bgcolor: "background.default",
              color: "text.primary",
              textFillColor: "black",
              "--webkit-text-fill-color": "black",

              "&:before": {
                borderBottom: 0,
              },

              "&:after": {
                borderBottom: 0,
              },

              "& > input": {
                color: "text.primary",
                fontWeight: "bold",
              },
            },
          }}
        />
        <TextField
          label="Final price"
          value={user.finalPrice}
          disabled
          sx={{
            "& .Mui-disabled": {
              bgcolor: "background.default",
              color: "text.primary",
              textFillColor: "black",
              "--webkit-text-fill-color": "black",

              "&:before": {
                borderBottom: 0,
              },

              "&:after": {
                borderBottom: 0,
              },

              "& > input": {
                color: "text.primary",
                fontWeight: "bold",
                opacity: 1,
              },
            },
          }}
        />
      </Stack>
    </Stack>
  );
};
