import { SnackbarProvider, useSnackbar } from "notistack";
import React from "react";

export const UserLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};
