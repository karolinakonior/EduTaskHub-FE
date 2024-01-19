import CircularProgress from "@mui/material/CircularProgress";

export default function Loader() {
    return (
      <>
        <CircularProgress
          color="primary"
          variant="indeterminate"
        />
      </>
    );
}