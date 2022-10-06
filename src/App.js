import {Routes, Route} from 'react-router-dom'

import {Expenditure, Home, Navigation, Settings, Traffic} from './routes'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>} />
        <Route path='traffic' element={<Traffic/>} />
        <Route path='settings' element={<Settings/>}/>
        <Route path='expenditure' element={<Expenditure/>}/>
      </Route>
      
    </Routes>
  )
}

export default App;