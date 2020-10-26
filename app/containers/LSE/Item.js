import React, { Component } from 'react'
import PropTypes from 'prop-types'
import P from 'components/P'
import H3 from 'components/H3'
import ConditionalPaper from 'components/ConditionalPaper'

class Item extends Component {

  render() {
    const {data} = this.props
    console.log(data.items)
    const videosAcepciones = data.items
      .filter(item => item.tipo===11)
      .map(item => (
          <video width="320" height="240" controls>
            <source src={`https://static.arasaac.org/lse-acepciones/${item.idImagen}.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
      ))
    
    

    return (
      <ConditionalPaper  style={{width: '100%'}}>
        <P>{data.desc} </P>
        <div style={{display:'flex'}}>
          <div>
            <H3>Acepción LSE</H3>
            {videosAcepciones}
          </div>
          <div>
            <H3>Definición LSE</H3>
            <video width="320" height="240" controls>
              <source src={`https://static.arasaac.org/lse-definiciones/${data.idPalabra}.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>


      </ConditionalPaper>

    )
  }
}

Item.propTypes = {
  data: PropTypes.object.isRequired,
}



export default Item
