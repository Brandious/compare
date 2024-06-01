import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";
import { useState } from "react";
// import { coverages } from "../../utils/coverages";
import { useCurrentUserContext } from "../../context/CurrentClientContext";
import { Coverages, Discounts } from "../../utils/coverages";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(5),
  marginTop: "128px",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
  /**
   * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
   * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
   * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
   * proper interaction with the underlying content.
   */
  position: "relative",
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

export default function PersistentDrawerRight({
  children,
  activeCoverages,
  activeDiscounts,

  handleAddDiscount,
  handleAddCoverage,
}: {
  children: React.ReactNode;
  activeCoverages?: Coverages[];
  activeDiscounts?: Discounts[];
  handleAddDiscount: (discount: string) => void;
  handleAddCoverage: (coverage: string) => void;
}) {
  const { discounts, coverages, user } = useCurrentUserContext();
  const [open] = useState(Boolean(user));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="warning">
        <Toolbar>
          <FormGroup
            sx={{
              padding: 1,
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
              width: "100%",
            }}
          >
            {user && discounts?.length ? (
              discounts.map((discount) => (
                <FormControlLabel
                  key={discount._id}
                  sx={{
                    display:
                      (discount?.vehiclePower as number) > user.vehiclePower
                        ? "none"
                        : "flex",
                  }}
                  control={
                    <Checkbox
                      checked={activeDiscounts?.some(
                        (el) => el._id === discount._id
                      )}
                      onChange={() => handleAddDiscount(discount._id)}
                    />
                  }
                  label={discount.name}
                />
              ))
            ) : (
              <Typography>No discounts found</Typography>
            )}
          </FormGroup>
        </Toolbar>
      </AppBar>
      <Main
        open={open}
        sx={{
          padding: 4,
          width: "100%",
          transition: "margin-right 0.5s",
        }}
      >
        {children}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <List
          sx={{
            padding: 4,
          }}
        >
          <Typography variant="h5">Coverages</Typography>
          <Divider />
          {user && coverages?.length ? (
            coverages.map((coverage) => (
              <ListItem key={coverage._id} disablePadding>
                <ListItemButton>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={activeCoverages?.some(
                          (el) => el._id === coverage._id
                        )}
                        onChange={() => handleAddCoverage(coverage._id)}
                      />
                    }
                    label={coverage.name}
                    sx={{ width: "100%" }}
                  />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <Typography>No coverages found</Typography>
          )}
        </List>
      </Drawer>
    </Box>
  );
}
