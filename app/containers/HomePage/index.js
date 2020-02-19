import React from 'react'
import Welcome from 'components/Welcome'
import Showcase from 'components/Showcase'
import Participate from 'components/Participate'
import LanguageSelection from 'components/LanguageSelection'

const Home = () => (
  <div>
    <Welcome />
    <LanguageSelection />
    <Showcase />
    <Participate />
  </div>
)

export default Home
