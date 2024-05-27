import { Stack } from "@mui/material";
import Drawer from "../components/Drawer";
import { Pricing } from "../components/Pricing";
import { UserForm } from "../components/UserForm";
import { useCurrentUserContext } from "../context/CurrentClientContext";

export const Home = () => {
  const { user, addCoverage, addDiscount, setUser } = useCurrentUserContext();

  const handleAddCoverage = (coverage: string) => {
    addCoverage.mutate(coverage, {
      onSuccess: (data) => {
        setUser(data);
      },
      onError: () => {
        alert("Error adding coverage");
      },
    });
  };

  const handleAddDiscount = (discount: string) => {
    addDiscount.mutate(discount, {
      onSuccess: (data) => {
        setUser(data);
      },
      onError: () => {
        alert("Error adding discount");
      },
    });
  };

  return (
    <Drawer
      activeCoverages={user?.coverages}
      activeDiscounts={user?.discounts}
      handleAddCoverage={handleAddCoverage}
      handleAddDiscount={handleAddDiscount}
    >
      <Stack>
        <UserForm />
        <Pricing />
      </Stack>
    </Drawer>
  );
};
