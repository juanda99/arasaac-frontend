import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReadMore from 'components/ReadMore'
import H2 from 'components/H2'
import Ribbon from 'components/Ribbon'
import Item from 'components/MaterialSnippet/Item'
import { IMAGES_URL } from 'services/config'

const styles = {

  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  snippetText: {
    flexGrow: 3,
    width: '600px',
    padding: '1rem'
  },
  snippet: {
    display: 'flex',
    flexWrap: 'wrap-reverse',
    width: '100%'
  },
  snippetImg: {
    flexGrow: 1,
    width: '300px'
  }
}

class PrizeSnippet extends PureComponent {


  render() {
    const { prize } = this.props


    return (
      <Item>
        <div style={styles.snippet}>
          <Ribbon text={prize.year} />
          <img src={`${IMAGES_URL}/prizes/${prize.image}`} alt='' />
          <div style={styles.snippetText}>
            <H2 primary ucase>{prize.title}</H2>
            <ReadMore style={{ textAlign: 'justify' }}>
              {prize.desc}
            </ReadMore>
          </div>
        </div>
      </Item>
    )
  }
}

PrizeSnippet.propTypes = {
  // onClick: PropTypes.func.isRequired,
  prize: PropTypes.object.isRequired
}

export default PrizeSnippet
