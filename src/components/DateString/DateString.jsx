import { useMemo } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Schedule from '@mui/icons-material/Schedule'

/* The code is defining a React functional component called `DateString`. This
component takes a prop called `date`and return it in a human reading format with an icon. */
export default function DateString ({ date }) {
  /* The `useMemo` hook is used to memoize the result of a computation. In this case, the computation
  is converting the `published_at` or `created_at` date from the `blok` object into a formatted
  string. */
  const dateToDisplay = useMemo(
    () => new Date(date).toUTCString().split(' ').slice(0, 4).join(' '),
    [date]
  )

  return (
    <Stack
      direction='row'
      justifyContent='flex-start'
      alignItems='center'
      spacing={1}
      component='span'
      sx={{ marginBlock: 1, height: 15, color: 'text.secondary' }}
    >
      <Schedule sx={{ width: 15, height: 15 }} />
      <Typography variant='caption' component='span' sx={{ lineHeight: 15 }}>
        {dateToDisplay}
      </Typography>
    </Stack>
  )
}
