import React, { useEffect, useState } from 'react'
import { Box, Typography, Container, TextField, RadioGroup, FormControlLabel, Radio, Button, FormControl } from '@mui/material'
import { CreateQuestionProps, ICreateQuestion, ICreateAnswer } from '../models'
import { useTheme } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

function Question({
  updateQuestion,
  questionIndex
}: {
  updateQuestion: (question: ICreateQuestion, index: number) => void
  questionIndex: number
}) {
  const theme = useTheme()

  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<ICreateAnswer[]>([])

  function updateOptionText(answerText: string, optionIndex: number) {
    const newOptions = [...options]
    newOptions[optionIndex].answer_text = answerText
    setOptions(newOptions)
  }

  function updateOptionRecommended(optionIndex: number) {
    const newOptions = [...options]
    newOptions.map((option) => (option.recommend_service = false))
    newOptions[optionIndex].recommend_service = true
    setOptions(newOptions)
  }

  function addOption() {
    const newOption: ICreateAnswer = {
      answer_text: '',
      recommend_service: false
    }
    setOptions([...options, newOption])
  }

  function removeOption(optionIndex: number) {
    const newOptions = [...options]
    newOptions.splice(optionIndex, 1)
    setOptions(newOptions)
  }

  useEffect(() => {
    const createdQuestion: ICreateQuestion = {
      question_text: question,
      answers: options
    }
    updateQuestion(createdQuestion, questionIndex)
  }, [question, options])

  return (
    <Box
      sx={{
        padding: '25px',
        borderRadius: '15px',
        border: 'solid 1px',
        borderColor: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '30px'
        }}
      >
        <Box flexGrow={1}>
          <TextField
            fullWidth
            label='Question Text'
            value={question}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuestion(event.target.value)}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', py: '20px' }}>
            {options.map((option, index) => (
              <Box key={'create-question-option-' + index} sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <IconButton onClick={() => removeOption(index)} sx={{ width: '20px', height: '20px' }}>
                  <DeleteIcon />
                </IconButton>
                <TextField
                  fullWidth
                  size='small'
                  label='Option Text'
                  value={option.answer_text}
                  variant='filled'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateOptionText(event.target.value, index)}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Box justifySelf={'center'}>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            Recommend your <br /> service if answered?
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: '50px', gap: '52px' }}>
            {options.map((option, index) => (
              <Radio
                onChange={() => updateOptionRecommended(index)}
                checked={option.recommend_service}
                key={'create-question-option-radio-' + index}
                sx={{ alignSelf: 'center', m: 0, p: 0 }}
              />
            ))}
          </Box>
        </Box>
      </FormControl>
      {options.length >= 4 ? null : (
        <Box>
          <Button size='large' sx={{ width: '130px' }} onClick={addOption}>
            Add option
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Question
