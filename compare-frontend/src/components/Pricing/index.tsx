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
          value={parseFloat((user.basePrice || 0).toFixed(2))}
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
          value={parseFloat((user.calculatedDiscounts || 0).toFixed(2))}
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
          label="Coverages"
          value={parseFloat((user.calculatedCoverage || 0).toFixed(2))}
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
          value={parseFloat((user.finalPrice || 0)?.toFixed(2))}
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
