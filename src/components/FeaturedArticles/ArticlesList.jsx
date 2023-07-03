import { useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import anime from 'animejs'
import DateString from '@/components/DateString'
import NextMuiLink from '@/components/NextMuiLink'

/* The code is defining a React functional component called `ArticlesList`. It takes in several props
including `articles`, `sx`, `inView`, and `...props`. articles is the list of articles to render,
sx is the style for the List component, inVIew is to trigger the animejs animation when element is
visible on the screen and remaining props are spread to the List components as well */
export default function ArticlesList ({ articles, sx, inView, ...props }) {
  /* using Intersection Observer functionality from useInView hook and trigger animejs animation */
  useEffect(() => {
    if (inView) {
      anime({
        targets: '.articles_list--stagger_reveal',
        delay: anime.stagger(1000),
        opacity: 1,
        easing: 'easeOutExpo'
      })
    }
  }, [inView])

  return (
    <List
      {...props}
      sx={{
        ...sx,
        width: { xs: 300, sm: 0.5 },
        height: 'min-content',
        paddingBlock: 0
      }}
    >
      {!!articles[0] &&
        articles.map((article, i) => {
          return (
            <NextMuiLink
              key={article.uuid}
              href={`/blog/${article.slug}`}
              className='articles_list--stagger_reveal'
              sx={{
                textDecoration: 'none',
                color: 'text.primary',
                opacity: 0
              }}
            >
              <ListItem
                alignItems='flex-start'
                sx={{
                  backgroundColor: 'white.main',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'secondary.main' }
                }}
              >
                <ListItemAvatar sx={{ marginBlock: 'auto' }}>
                  <Avatar
                    alt={article.content.image?.alt}
                    src={article.content.image?.filename}
                    variant='square'
                    sx={{ width: 75, height: 75 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      alignItems='center'
                      component='span'
                    >
                      <Typography
                        variant='h6'
                        component='span'
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {article.content.title}
                      </Typography>
                      {!!article.tag_list[0] && (
                        <Box
                          component='span'
                          sx={{
                            backgroundColor: 'accent.main',
                            paddingBlock: '3px',
                            paddingInline: 1,
                            color: 'white.main'
                          }}
                        >
                          <Typography variant='caption'>
                            {article.tag_list[0]}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  }
                  secondary={
                    <>
                      <Typography
                        component='span'
                        variant='body2'
                        color='text.secondary'
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {article.content.subtitle}
                      </Typography>
                      <br />
                      <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        component='span'
                      >
                        <Typography
                          component='span'
                          variant='caption'
                          color='text.secondary'
                          sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                          {article.content.readingTime} read
                        </Typography>
                        <DateString
                          date={article.published_at || article.created_at}
                        />
                      </Stack>
                    </>
                  }
                  sx={{ marginLeft: 2 }}
                />
              </ListItem>
              {i !== articles.length - 1 && <Divider />}
            </NextMuiLink>
          )
        })}
    </List>
  )
}
