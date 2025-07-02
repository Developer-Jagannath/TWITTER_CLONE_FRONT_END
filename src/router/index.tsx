 
import {RouterProvider } from 'react-router-dom'

import router from './router'

export default function MainNavigation() {
  return (
    <RouterProvider router={router} />
  )
}
