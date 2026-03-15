import { useLocation, useNavigate } from 'react-router-dom'

import { Inventory } from '@mui/icons-material'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

const navLinks = [
  { label: 'Dashboard', path: '/' },
  { label: 'Orders', path: '/orders' },
]

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Inventory />
          <Typography variant="h6" component="div">
            Order Management App
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              color="inherit"
              onClick={() => navigate(link.path)}
              sx={{
                fontWeight: location.pathname === link.path ? 700 : 400,
                borderBottom:
                  location.pathname === link.path ? '2px solid white' : '2px solid transparent',
                borderRadius: 0,
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
