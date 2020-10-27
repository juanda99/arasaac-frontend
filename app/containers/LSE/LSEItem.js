import React, { Component } from 'react'
import PropTypes from 'prop-types'
import P from 'components/P'
import ShowSoundPlayer from 'components/SoundPlayer/ShowSoundPlayer'
import { STATIC_SERVER } from 'services/config'
import H2 from 'components/H2'
import H3 from 'components/H3'

class LSEItem extends Component {

  render() {
    const {data, searchText} = this.props
    console.log(data.items)
    const videosAcepciones = data.items
      .filter(item => item.tipo===11)
      .map(item => (
          <video key={`${item.idImagen}-video`} width="320" height="240" controls poster={true}>
            <source 
            src={`${STATIC_SERVER}/lse-acepciones/${item.idImagen}.mp4`} 
            poster={`${STATIC_SERVER}/lse-images/${data.idPalabra}.jpg`} 
            type="video/mp4" />
            Your browser does not support the video tag.
          </video>
      ))
    
    const imagesAcepciones = data.items
      .filter(item => item.tipo===12) 
      .map(item => (
          <img key={`${item.idImagen}-image`} src={`${STATIC_SERVER}/lse-images/${item.idImagen}.jpg`} />
      ))
    

    return (
      <div style={{padding: 30}}>
        <ShowSoundPlayer hasLocution={true} locale='es' keyword={searchText} download={false} />
        <ShowSoundPlayer hasLocution={true} locale='es' keyword={searchText} download={true}  />
        <H2 primary><strong>{searchText}: </strong>{data.desc} </H2>
        <div style={{display:'flex'}}>
          <div  style={{margin: 20, textAlign: 'center'}} >
            {imagesAcepciones}
          </div>
          <div  style={{margin: 20, textAlign: 'center'}} >
            <H3 primary ucase>Acepción LSE</H3>
            {videosAcepciones}
          </div>
          <div  style={{margin: 20, textAlign: 'center'}} >
            <H3 primary ucase>Definición LSE</H3>
            <video width="320" height="240" controls  poster={true}>
              <source src={`${STATIC_SERVER}/lse-definiciones/${data.idPalabra}.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
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
