import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import ShowSoundPlayer from 'components/SoundPlayer/ShowSoundPlayer'
import { STATIC_SERVER } from 'services/config'
import Div from './Div'
import Wrapper from './Wrapper'
import H2 from 'components/H2'
import H3 from 'components/H3'


const styles = {

  snippetText: {
    flexGrow: 3,
    width: '600px',
    padding: '1rem'
  },
  snippet: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  actionBtn: {
    margin: '5px'
  },  
  video: {
    maxWidth: '500px',
    margin: '20px'
  },
  image: {
    maxWidth: '100%',
  }
}

class LSEItem extends Component {

  render() {
    const {data, searchText, key} = this.props
    const videosAcepciones = data.items
      .filter(item => item.tipo===11)
      .map(item => (
        <Div>
          <ReactPlayer 
            key={`${item.idImagen}-video`}
            url={`${STATIC_SERVER}/lse-acepciones/${item.idImagen}.mp4`}  
            width='100%' height='100%'
            controls  
          />
        </Div>
      ))
    
    const imagesAcepciones = data.items
      .filter(item => item.tipo===12) 
      .map(item => (
        <Div> 
          <img  
            key={`${item.idImagen}-image`} 
            style={styles.image}
            src={`${STATIC_SERVER}/lse-images/${item.idImagen}.jpg`} 
          />
        </Div>
      ))
    

    return (
      <div style={{padding: 30}} key={key}>
        <div style={{display: 'flex'}}>
          <ShowSoundPlayer hasLocution={true} locale='es' keyword={searchText} download={false} />
          <ShowSoundPlayer hasLocution={true} locale='es' keyword={searchText} download={true}  />
          <H2 primary ucase noMargin primary><strong>{searchText}</strong></H2>

        </div>
        <H3 noMargin={true} primary>{data.desc} </H3>
        <Wrapper>
            {imagesAcepciones}
        </Wrapper>
          <div>
            <H3 primary ucase>Acepción LSE</H3>
            <Wrapper>
              {videosAcepciones}
            </Wrapper>

          </div>
          <div>
            <H3 primary ucase>Definición LSE</H3>
            <Wrapper>
              <Div>
                <ReactPlayer key={`${searchText}-video-def`}
                  url={`${STATIC_SERVER}/lse-definiciones/${data.idPalabra}.mp4`} 
                  width='100%' height='100%'
                  controls
                />
              </Div>
            </Wrapper>
          </div>

        </div>
    )
  }
}

LSEItem.propTypes = {
  data: PropTypes.object.isRequired,
  searchText: PropTypes.string.isRequired,
}



export default LSEItem
