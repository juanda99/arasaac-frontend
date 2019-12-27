import React, { Component } from 'react'

export default class SocialLinks extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <a href='https://www.facebook.com/arasaac/'>
          <img src='https://static.arasaac.org/images/facebook.png' alt='Facebook' />
        </a>
        <a href='https://twitter.com/arasaac/'>
          <img src='https://static.arasaac.org/images/twitter.png' alt='Twitter' />
        </a>
        <a href='https://www.youtube.com/channel/UCwzhptqPzLOxG7JpPJ8vO-Q'>
          <img src='https://static.arasaac.org/images/youtube.png' alt='YouTube' />
        </a>
        <a href='https://www.instagram.com/arasaac/'>
          <img src='https://static.arasaac.org/images/instagram.png' alt='Instagram' />
        </a>

      </div>
    )
  }
}
