import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import H3 from 'components/H3'
import Ribbon from 'components/Ribbon'
import Item from 'components/MaterialSnippet/Item'
import { IMAGES_URL } from 'services/config'

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  snippetText: {
    flexGrow: 3,
    width: '600px',
    padding: '1rem',
  },
  snippet: {
    display: 'flex',
    flexWrap: 'wrap-reverse',
    width: '100%',
  },
  snippetImg: {
    flexGrow: 1,
    width: '300px',
  },
}

class PrizeSnippet extends PureComponent {
  render() {
    const { prize } = this.props

    return (
      <Item>
        <div style={styles.snippet}>
          <Ribbon text={prize.year} />
          <img
            src={`${IMAGES_URL}/prizes/${prize.image}`}
            alt=""
            style={{ width: 300, height: 300 }}
          />
          <div style={styles.snippetText} dir="ltr">
            <H3
              primary
              ucase
              dangerouslySetInnerHTML={{ __html: prize.title.toUpperCase() }}
            ></H3>
            <span dangerouslySetInnerHTML={{ __html: prize.desc }}></span>
          </div>
        </div>
      </Item>
    )
  }
}

PrizeSnippet.propTypes = {
  // onClick: PropTypes.func.isRequired,
  prize: PropTypes.object.isRequired,
}

export default PrizeSnippet
