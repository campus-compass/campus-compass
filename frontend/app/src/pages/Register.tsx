import React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import { IconButton, OutlinedInput, TextField, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { post_request } from '../utils'
import Navbar from '../components/Navbar'
import SchoolIcon from '@mui/icons-material/School'
import StoreIcon from '@mui/icons-material/Store'

const Register = () => {
  const theme = useTheme()

  // Input values
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userRole, setUserRole] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [userRoleError, setUserRoleError] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword: any = () => setShowPassword((show) => !show)

  const validateRegister = () => {
    setUsernameError(false)
    setPasswordError(false)
    setUserRoleError(false)

    let hasError = false

    if ('' === username) {
      setUsernameError(true)
      hasError = true
    }

    if ('' === password) {
      setPasswordError(true)
      hasError = true
    }

    if ('' === userRole) {
      setUserRoleError(true)
      hasError = true
    }

    if (hasError) return

    Register()
  }

  const Register = async () => {
    const res: any = await post_request('/' + userRole + '/register', { user_id: username, password })
    if (res !== undefined) {
      alert('Registration is good.')
    } else {
      alert('Registration failed.')
    }
  }

  return (
    <Box>
      <Navbar />
      <Box px={20} mt={5} py={6} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={'80px'}>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'100%'}>
          <Typography pb={2} variant='h5'>
            Who to register?
          </Typography>
          <Box display={'flex'} justifyContent={'center'} gap={'50px'} width={'100%'}>
            <Button
              startIcon={<StoreIcon sx={{ transform: 'scale(2) translate(-10px, 0px)' }} />}
              onClick={() => setUserRole('service')}
              sx={{
                border: userRoleError ? 'solid 1px red' : 'solid 0px red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: userRole === 'service' ? theme.palette.secondary.main : theme.palette.primary.main,
                flexGrow: 1,
                borderRadius: 3,
                padding: 5,
                paddingLeft: 10,
                backgroundColor: userRole === 'service' ? theme.palette.primary.main : 'white',
                ':hover': { backgroundColor: userRole === 'service' ? theme.palette.primary.main : theme.palette.secondary.dark }
              }}
            >
              <Typography variant='h4'>Service</Typography>
            </Button>
            <Button
              startIcon={<SchoolIcon sx={{ transform: 'scale(2) translate(-10px, 0px)' }} />}
              onClick={() => setUserRole('student')}
              sx={{
                border: userRoleError ? 'solid 1px red' : 'solid 0px red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: userRole === 'student' ? theme.palette.secondary.main : theme.palette.primary.main,
                flexGrow: 1,
                borderRadius: 3,
                padding: 5,
                paddingLeft: 10,
                backgroundColor: userRole === 'student' ? theme.palette.primary.main : 'white',
                ':hover': { backgroundColor: userRole === 'student' ? theme.palette.primary.main : theme.palette.secondary.dark }
              }}
            >
              <Typography variant='h4'>Student</Typography>
            </Button>
          </Box>
        </Box>

        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'50%'}>
          <Typography pb={2} variant='h5'>
            {userRole === 'admin' ? 'Admin' : userRole === 'service' ? 'Service' : userRole === 'student' ? 'Student' : 'User'} ID
          </Typography>
          <TextField
            error={usernameError}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
            sx={{ borderRadius: '3', p: '2', backgroundColor: 'white' }}
            value={username}
            id='user-id'
          ></TextField>
          <br />
          <br />
          <Typography pb={2} variant='h5'>
            Password
          </Typography>
          <FormControl error={passwordError} sx={{ borderRadius: '3', p: '2', backgroundColor: 'white' }} variant='outlined'>
            <OutlinedInput
              id='password'
              type={showPassword ? 'text' : 'password'}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment sx={{ paddingRight: '5px' }} position='end'>
                  <IconButton onClick={handleClickShowPassword} edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br />
          <br />
          <Button
            sx={{
              ':hover': { backgroundColor: '#1D6CA5' },
              alignSelf: 'center',
              padding: '10px',
              width: '150px',
              backgroundColor: '#2B94E0',
              color: 'white',
              fontSize: '18px'
            }}
            onClick={validateRegister}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Register
