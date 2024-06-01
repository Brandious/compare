import { CircularProgress, Stack } from "@mui/material";
import Drawer from "../components/Drawer";
import { Pricing } from "../components/Pricing";
import { UserForm } from "../components/UserForm";
import { useCurrentUserContext } from "../context/CurrentClientContext";
import { UserFormData, UserSuccess } from "../types/User";

export const Home = () => {
  const { user, addCoverage, addDiscount, setUser, mutation, updateMutation } =
    useCurrentUserContext();

  const handleAddCoverage = (coverage: string) => {
    addCoverage.mutate(coverage, {
      onSuccess: (data) => {
        setUser(data);
      },
      onError: () => {
        alert("Something went wrong");
      },
    });
  };

  const handleAddDiscount = (discount: string) => {
    addDiscount.mutate(discount, {
      onSuccess: (data) => {
        setUser(data);
      },
      onError: () => {
        alert("Something went wrong");
      },
    });
  };

  const onSubmit = (data: UserFormData) => {
    mutation.mutate(
      {
        fullName: data.name,
        birthDate: data.birthDate,
        city: data.city,
        vehiclePower: Number(data.vehiclePower),
        voucher: Number(data.voucher),
      },
      {
        onSuccess: (data: UserSuccess) => {
          setUser(data);
        },
      }
    );
  };

  const onUpdate = (data: UserFormData) => {
    updateMutation.mutate(
      {
        fullName: data.name,
        birthDate: data.birthDate,
        city: data.city,
        vehiclePower: Number(data.vehiclePower),
        voucher: Number(data.voucher),
      },
      {
        onSuccess: (data: UserSuccess) => {
          setUser(data);
        },
      }
    );
  };

  if (mutation.isLoading || updateMutation.isLoading)
    return <CircularProgress />;

  return (
    <>
      <Drawer
        activeCoverages={user?.coverages}
        activeDiscounts={user?.discounts}
        handleAddCoverage={handleAddCoverage}
        handleAddDiscount={handleAddDiscount}
      >
        <Stack>
          <UserForm onUpdate={onUpdate} onSubmit={onSubmit} user={user} />
          <Pricing />
        </Stack>
      </Drawer>
    </>
  );
};
