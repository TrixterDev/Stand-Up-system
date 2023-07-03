import { TextField, styled } from "@mui/material";

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fc0",
    zIndex: "9",
  },
  'input[type="text"]': {
    border: "none",
  },
  "& input": {
    zIndex: "1",
    color: "#fff",
    padding: "15px",
  },
  "& label": {
    color: "#fff",
    zIndex: "999999",
  },
  "& .MuiInput-underline:after": {
    color: "#fff",
    borderBottomColor: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
      color: "#fff",
    },
    "&:hover fieldset": {
      color: "#fff",
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      color: "#fff",
      borderColor: "#fff",
    },
  },
});
