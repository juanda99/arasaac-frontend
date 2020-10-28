import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import ShowSoundPlayer from 'components/SoundPlayer/ShowSoundPlayer'
import { STATIC_SERVER } from 'services/config'
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
  snippetImgs: {
    width: '100%',
    maxWidth: '500px',
    height: 'auto'
  },
  actionBtn: {
    margin: '5px'
  },  
  video: {
    width: '100%',
    maxWidth: '500px',
    height: '500px'
  }
}

class LSEItem extends Component {

  render() {
    const {data, searchText} = this.props
    console.log(data.items)
    const videosAcepciones = data.items
      .filter(item => item.tipo===11)
      .map(item => (
          <ReactPlayer key={`${item.idImagen}-video`}
            url={`${STATIC_SERVER}/lse-acepciones/${item.idImagen}.mp4`}  
            style={styles.video}
            width='500px' height='500px'
            controls
          />
      ))
    
    const imagesAcepciones = data.items
      .filter(item => item.tipo===12) 
      .map(item => (
          <img  
            key={`${item.idImagen}-image`} 
            style={styles.video}
            src={`${STATIC_SERVER}/lse-images/${item.idImagen}.jpg`} 
          />
      ))
    

    return (
      <div style={{padding: 30}}>
        <div style={{display: 'flex'}}>
          <ShowSoundPlayer hasLocution={true} locale='es' keyword={searchText} download={false} />
          <ShowSoundPlayer hasLocution={true} locale='es' keyword={searchText} download={true}  />
          <H2 primary ucase noMargin primary><strong>{searchText}</strong></H2>

        </div>
        <H3 noMargin={true} primary>{data.desc} </H3>
        <div style={{display: 'flex', flexWrap: 'wrap',  justifyContent: 'space-between'}}>
            {imagesAcepciones}
        </div>
          <div  style={{margin: 20}} >
            <H3 primary ucase>Acepción LSE</H3>
            <div style={{display: 'flex', flexWrap: 'wrap',  justifyContent: 'space-between'}}>
            {videosAcepciones}
            </div>

          </div>
          <div  style={{margin: 20}} >
            <H3 primary ucase>Definición LSE</H3>
            <ReactPlayer key={`${searchText}-video-def`}
              url={`${STATIC_SERVER}/lse-definiciones/${data.idPalabra}.mp4`} 
              style={styles.video}
              width='500px' height='500px'
              controls
            />
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
