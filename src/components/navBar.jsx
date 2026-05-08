import { AppBar, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ height: "6vh", display: "flex", justifyContent: "center" }}>
      <Toolbar>
        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/singleplayer">
          Single player
        </Button>
        <Button component={Link} to="/dualplayer">
          Dual Player
        </Button>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar;
