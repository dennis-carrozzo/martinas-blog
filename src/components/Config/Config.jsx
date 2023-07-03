import { useState } from 'react'
import { storyblokEditable, StoryblokComponent } from '@storyblok/react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import NextMuiLink from '@/components/NextMuiLink'

/* The code is defining a React functional component called "Config". This component is responsible for
rendering a navigation bar with a drawer menu. */
export default function Config ({ blok }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  // Drawer navigation
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        height: '100vh',
        backgroundColor: 'secondary.main',
        textAlign: 'center'
      }}
    >
      <Stack
        justifyContent='center'
        alignItems='center'
        sx={{ position: 'relative', paddingBlock: 2 }}
      >
        <CloseIcon sx={{ position: 'absolute', right: 20 }} />
        <Stack component={NextMuiLink} href='/' sx={{ textDecoration: 'none' }}>
          <Typography variant='h4' component='h1' sx={{ color: 'dark.main' }}>
            Martina&apos;s
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      {/* Navigation links */}
      <List sx={{ marginBlock: 5 }}>
        {blok?.HeaderMenu?.map(nestedBlok => (
          <ListItem key={nestedBlok._uid} sx={{ textAlign: 'center' }}>
            <ListItemText
              primary={
                <Button variant='text'>
                  <StoryblokComponent
                    blok={nestedBlok}
                    sx={{ color: 'dark.main', textDecoration: 'none' }}
                  />
                </Button>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box
      sx={{
        position: 'sticky',
        zIndex: 20,
        width: 1,
        display: 'flex'
      }}
      {...storyblokEditable(blok)}
    >
      <AppBar
        component='nav'
        sx={{ backgroundColor: 'white.main', boxShadow: 'none' }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingInline: { sm: 10 }
          }}
        >
          <NextMuiLink
            href='/'
            sx={{
              display: {
                display: 'flex',
                direction: 'row',
                textDecoration: 'none'
              },
              color: 'dark.main'
            }}
          >
            <Typography
              variant='h6'
              component='h1'
              sx={{ width: 'min-content', display: 'inline', color: 'black' }}
            >
              Martina&apos;s
            </Typography>
          </NextMuiLink>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              ml: 'auto',
              display: { sm: 'none' },
              color: 'dark.main'
            }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            spacing={3}
            direction='row'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {blok?.HeaderMenu?.map(nestedBlok => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          anchor='right'
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '100%'
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}
