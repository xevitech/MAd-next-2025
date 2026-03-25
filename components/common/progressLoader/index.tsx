import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import React from "react";

export default function LinearProgressWithLabel() {
  const [progress, setProgress] = React.useState<any>(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 10);
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {progress <= 100 && (
        <LinearProgress
          determinate
          variant="outlined"
          color="neutral"
          size="sm"
          thickness={32}
          value={progress}
          sx={{
            "--LinearProgress-radius": "0px",
            "--LinearProgress-progressThickness": "24px",
            boxShadow: "sm",
            borderColor: "neutral.500",
          }}
        >
          <Typography
            fontWeight="xl"
            textColor="common.white"
            sx={{ mixBlendMode: "difference" }}
          >
            LOADING… {`${Math.round(progress)}%`}
          </Typography>
        </LinearProgress>
      )}
    </>
  );
}
