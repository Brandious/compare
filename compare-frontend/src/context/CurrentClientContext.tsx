import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { UseMutationResult, useMutation, useQuery } from "react-query";
import { service } from "../service/axios";
import { User, UserSuccess } from "../types/User";
import { Coverages, Discounts } from "../utils/coverages";
import { Skeleton, Snackbar } from "@mui/material";

type Mutations = UseMutationResult<UserSuccess, unknown, User, unknown>;

type PutMutation = UseMutationResult<UserSuccess, unknown, string, unknown>;

type Cities = {
  name: string;
  licensePlate: string;
  basePrice: number;
  _id: string;
}[];

const CurrentUserContext = createContext<{
  user: UserSuccess | null;
  setUser: (user: UserSuccess) => void;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  cities: Cities;
  discounts: Discounts[];
  coverages: Coverages[];
  mutation: Mutations;
  updateMutation: Mutations;
  addDiscount: PutMutation;
  addCoverage: PutMutation;
} | null>(null);

export const useCurrentUserContext = () => {
  const currentUser = useContext(CurrentUserContext);
  if (!currentUser) {
    throw new Error("CurrentUserContext: No value provided");
  }

  return currentUser;
};

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserSuccess | null>(null);
  const [error, setError] = useState(false);

  const mutations: Mutations = useMutation({
    mutationFn: async (user: User) => {
      return (await service.post("/users", user)).data as UserSuccess;
    },
  });

  const updateMutation: Mutations = useMutation({
    mutationFn: async (userDto: User) => {
      return (await service.put(`/users/${user?._id}`, userDto))
        .data as UserSuccess;
    },
  });

  const addDiscount = useMutation({
    mutationFn: async (discount: string) => {
      return (await service.put(`/users/${user?._id}/discounts`, { discount }))
        .data as UserSuccess;
    },
  });

  const addCoverage = useMutation({
    mutationFn: async (coverage: string) => {
      return (await service.put(`/users/${user?._id}/coverages`, { coverage }))
        .data as UserSuccess;
    },
  });

  const getCities = useQuery("city", {
    queryFn: async () => {
      return (await service.get("/init/cities")).data as Cities;
    },
  });

  const getDiscounts = useQuery("discounts", {
    queryFn: async () => {
      return (await service.get("/init/discounts")).data as Discounts[];
    },
  });

  const getCoverages = useQuery("coverages", {
    queryFn: async () => {
      return (await service.get("/init/coverages")).data as Coverages[];
    },
  });

  if (mutations.isLoading || getCities.isLoading) {
    return <Skeleton variant="rectangular" width={210} height={60} />;
  }

  if (mutations.isError || getCities.isError || !getCities) {
    return <Snackbar message="Error saving user" />;
  }
  return (
    <CurrentUserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        error: error,
        setError: setError,
        mutation: mutations,
        updateMutation: updateMutation,
        addDiscount: addDiscount,
        addCoverage: addCoverage,
        cities: getCities.data!,
        discounts: getDiscounts.data!,
        coverages: getCoverages.data!,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
