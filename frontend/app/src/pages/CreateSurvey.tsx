import React, { useState, useEffect } from 'react'
import { Box, Typography, Container, TextField, RadioGroup, FormControlLabel, Radio, Button, FormControl } from '@mui/material'
import { useTheme } from '@mui/material'
import CreateQuestion from '../components/CreateQuestion'
import { CreateQuestionProps, ICreateQuestion } from '../models'
import Navbar from '../components/Navbar'
import { post_request } from '../utils'

function CreateSurveys() {
  const theme = useTheme()
  const [questions, setQuestions] = useState<ICreateQuestion[]>([])

  async function submitSurvey() {
    const error = validateSurvey()
    if (error !== '') {
      alert(error)
      return
    }
    const res = await post_request('/survey/create', questions)
    if (res !== undefined) {
      console.log(res)
      window.alert('Successfully submitted survey.')
    } else {
      window.alert('Survey submission failed.')
    }
  }

  const addQuestion = () => {
    const newQuestion: ICreateQuestion = {
      question_text: '',
      answers: [
        {
          answer_text: '',
          recommend_service: false
        }
      ]
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = () => {
    const newQuestions = [...questions]
    newQuestions.splice(newQuestions.length - 1, 1)
    setQuestions(newQuestions)
  }

  const updateQuestion = (question: ICreateQuestion, questionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex] = question
    setQuestions(newQuestions)
  }

  function validateSurvey() {
    for (const question of questions) {
      if (question.question_text === '') return 'You have an empty question.'
      if (question.answers.length == 0) return 'You have a question with no options.'

      let hasRecommended = false
      for (const answer of question.answers) {
        if (answer.answer_text === '') return 'You have an empty option.'
        if (answer.recommend_service) hasRecommended = true
      }
      if (!hasRecommended) return 'You forgot to select an option to recommend your service.'
    }
    return ''
  }

  return (
    <React.Fragment>
      <Navbar />
      <Box m={10}>
        <Typography variant='h2' sx={{ textAlign: 'center', fontWeight: 500 }}>
          Create Survey
        </Typography>
        <Typography variant='body2' sx={{ textAlign: 'center' }}>
          Create a survey that can recommend your service to students.
        </Typography>
      </Box>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          paddingY: '30px',
          bgcolor: 'white',
          height: '100%',
          borderRadius: '50px 50px 0 0'
        }}
      >
        {questions.map((question, index) => (
          <CreateQuestion key={'create-question-' + index} updateQuestion={updateQuestion} questionIndex={index} />
        ))}
        {questions.length >= 3 ? null : (
          <Button size='large' variant='contained' fullWidth onClick={addQuestion}>
            <Typography fontSize={'large'}>Add Question</Typography>
          </Button>
        )}
        {questions.length === 0 ? null : (
          <Button color='error' size='large' variant='contained' fullWidth onClick={removeQuestion}>
            <Typography fontSize={'large'}>Remove Question</Typography>
          </Button>
        )}
        <Button
          onClick={submitSurvey}
          sx={{
            ':hover': { backgroundColor: '#1D6CA5' },
            alignSelf: 'center',
            padding: '8px',
            width: '150px',
            backgroundColor: '#2B94E0',
            color: 'white',
            fontSize: '18px'
          }}
        >
          Submit
        </Button>
      </Container>
    </React.Fragment>
  )
}

export default CreateSurveys
