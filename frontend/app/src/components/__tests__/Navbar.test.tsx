import React from 'react'
import { render } from '@testing-library/react'
import Navbar from '../Navbar'
import { MemoryRouter } from 'react-router-dom'
import Routes from '../../routes'
import AuthProvider from '../../auth/authProvider'

test('renders Navbar correctly', () => {
  const { container } = render(
    <AuthProvider>
      <div className='App'>
        <Routes />
      </div>
    </AuthProvider>
  )
  expect(container).toMatchSnapshot()
})
