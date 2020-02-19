import React from 'react'
import Welcome from 'components/Welcome'
import Showcase from 'components/Showcase'
import Participate from 'components/Participate'
// import Presentation from 'components/Presentation'

const Home = () => (
  <div>
    <Welcome />
    {/* <Presentation /> */}
    <Showcase />
    <Participate />
  </div>
)

export default Home
