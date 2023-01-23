import { Typography, Button, Box } from "@mui/material";
import park from "../creativeAssets/image_processing20201103-8805-fkmj5v.png";
// import BenchCard from "./BenchCard";

const HomePage = ({ navigation }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Typography sx={{ fontSize: 30 }}>BenchIt </Typography>
      <Typography sx={{ fontSize: 14 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
        voluptate numquam. Reiciendis reprehenderit minus rerum quibusdam odit
        pariatur quasi fugiat mollitia quas!
      </Typography>
      <img src={park} width="300" height="auto"></img>
      <Button
        variant="contained"
        sx={{ textTransform: "none", mt: 6 }}
        onClick={() => navigation.navigate("SignUp", { name: "Jane" })}
      >
        Sign up
      </Button>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        or
      </Typography>
      <Button
        variant="contained"
        sx={{ textTransform: "none" }}
        onClick={() => navigation.navigate("LogIn", { name: "Jane" })}
      >
        Log in
      </Button>
    </Box>
  );
};

export default HomePage;
