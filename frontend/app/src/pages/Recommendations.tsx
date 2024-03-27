import React, { useState } from 'react'
import { useEffect } from 'react'
import { useTheme } from '@mui/material'
import '../css/Recommendations.css'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Recommendation from '../components/Recommendation'
import { RecommendationProps } from '../models'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Recommendations() {
  const theme = useTheme()
  const { state } = useLocation()
  const [recommendations, setRecommendations] = useState<RecommendationProps[]>()

  const recs: RecommendationProps[] = [
    {
      question: 'asd',
      answer: 'asd',
      service: {
        address: 'asd',
        email: 'asd',
        id: 1,
        phone_number: 'asd',
        service_name: 'asd',
        uesr_id: 'asd',
        website_url: 'asd'
      }
    }
  ]

  function get_recommendations() {
    if (state === null || !('recommendations' in state) || state.recommendations === undefined) {
      return recs
    }
    return state.recommendations
  }

  function display_recommendations() {
    const recommendations_ = get_recommendations()
    if (recommendations_ !== undefined) setRecommendations(recommendations_)
    else console.log('Recommendations returned undefined.')
  }

  useEffect(() => {
    display_recommendations()
  }, [])
  setRecommendations
  return (
    <React.Fragment>
      <Navbar />
      <Box m={8} color={theme.palette.primary.main}>
        <Typography variant='h2' sx={{ textAlign: 'center', fontWeight: 500 }}>
          Recommendations
        </Typography>
        <Typography variant='body2' sx={{ textAlign: 'center' }}>
          Here are a list of services we recommend for you based on your answers.
        </Typography>
      </Box>

      <Container disableGutters sx={{ bgcolor: 'white', height: '100%', borderRadius: '50px 50px 0 0' }}>
        <Box p={2}>
          {recommendations?.length == 0 && (
            <Typography variant='h4' pt={5} sx={{ textAlign: 'center' }}>
              No Recommendations
            </Typography>
          )}
          <Box display={'grid'} gridTemplateColumns={'1fr 1fr'}>
            {recommendations?.map((recommendation, index) => <Recommendation key={`rec-${index}`} {...recommendation} />)}
          </Box>
          <Typography variant='body2' pt={8} sx={{ textAlign: 'center' }}>
            Feel free to contact any of these services whenever you need assistance.
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Recommendations
