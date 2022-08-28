import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const Navbar=()=>{
  const pages = ['DashBoard', 'Add Books', 'View Books'];
const settings = ['Add Student', 'Issue Book', 'Return Books', "View Student Info",'Logout'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handlePages=(i)=>(event)=>{
    event.preventDefault()
    if(i===1)window.location="/volunteer-add-books";
    else if(i===0) window.location="/volunteer"
    else if(i===2)window.location="/volunteer-view-books"
  }
  const handleSetting=(i)=>(event)=>{
    event.preventDefault()
    if(i===0)window.location="/volunteer-add-student"
   else if(i===1) window.location="/volunteer-issue-books"
   else if(i===2)window.location="/volunteer-return-books"
   else if(i==3)window.location="/volunteer-student"
   else if(i===4){
    console.log("here")
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    window.location.reload();
   }
  }
      //  return <div className=".Navbar">
      //       <button className="btn" onClick={goToAddBooks}>Add Books</button>
      //       <button className="btn" onClick={goToDashBoard}>DashBoard</button>
      //       <button className="btn" onClick={goToLogout}>Logout</button>
      //       <button className="btn" onClick={goToViewBooks}>View Books</button>
      //       <button className="btn" onClick={goToAddStudent}>Add New Student</button>
      //       <button className="btn" onClick={goToIssueBooks}>Issue Books</button>
      //       <button className="btn" onClick={goToReturnBooks}>Return Books</button>
      //        </div>
      return (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
    
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page,i) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Button textAlign="center" onClickCapture={handlePages(i)}>{page}</Button>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page,i) => (
                  <Button
                    key={page}
                    onClick={handlePages(i)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
    
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting,i) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Button textAlign="center" onClickCapture={handleSetting(i)}>{setting}</Button>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      );
    };
    
export default Navbar;

 
