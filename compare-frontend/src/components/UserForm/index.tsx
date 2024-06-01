import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useCurrentUserContext } from "../../context/CurrentClientContext";

import React from "react";
import { UserFormData, UserSuccess } from "../../types/User";

type UserFormProps = {
  onUpdate: (data: UserFormData) => void;
  onSubmit: (data: UserFormData) => void;

  user: UserSuccess | null;
};

export const UserForm = ({ onUpdate, onSubmit, user }: UserFormProps) => {
  const { cities } = useCurrentUserContext();

  const { register, handleSubmit, setValue, watch } = useForm<UserFormData>();

  // Reset the form values whenever the user data changes
  React.useEffect(() => {
    if (user) {
      setValue("name", user?.fullName);
      setValue("birthDate", new Date(user.birthDate));
      setValue("city", user?.city);
      setValue("vehiclePower", user?.vehiclePower);
      setValue("voucher", user?.voucher);
    }
  }, [user, setValue]);

  const date = watch("birthDate");

  return (
    <>
      <Stack
        sx={{
          padding: 4,
          maxWidth: "600px",
          gap: 3,
        }}
      >
        <Typography variant="h5">User data</Typography>

        <Stack gap={3}>
          <TextField
            label="Name"
            {...register("name", {
              required: "Name is required",
            })}
          />

          <TextField
            label="Birth date"
            type="date"
            value={date ? new Date(date).toISOString().split("T")[0] : ""}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("birthDate", {
              required: "Birth date is required",
            })}
          />
          <FormControl fullWidth>
            <InputLabel id="city-label">City</InputLabel>
            <Select
              labelId="city-label"
              label="City"
              defaultValue={user?.city || ""}
              inputProps={{
                inputRef: (ref: HTMLInputElement) => {
                  if (!ref) return;
                  return {
                    ...register("city", {
                      required: "City is required",
                    }),
                  };
                },
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue("city", e.target.value);
                },
              }}
            >
              {cities.map((city, key) => (
                <MenuItem value={city._id} key={key}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Vehicle power"
            {...register("vehiclePower", {
              required: "Vehicle power is required",
            })}
          />
          <TextField
            label="Voucher"
            {...register("voucher")}
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
          />
        </Stack>

        {!user ? (
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            Submit
          </Button>
        ) : (
          <Button
            onClick={handleSubmit(onUpdate)}
            variant="contained"
            color="secondary"
          >
            Update
          </Button>
        )}
      </Stack>
    </>
  );
};
