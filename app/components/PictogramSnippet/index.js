import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReadMore from 'components/ReadMore'
import H2 from 'components/H2'
import { Link } from 'react-router'
import Item from './Item'

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
  }
}

class PictogramSnippet extends PureComponent {


  render() {
    const { pictogram, locale, showLabels } = this.props
    console.log(pictogram)
    console.log('-----------')

    return (
      <Item>
        <div style={styles.snippet}>
          <div style={styles.snippetText}>
            <Link to={`/materials/${pictogram.idMaterial}`}>
              <H2 primary ucase>{pictogram.title}</H2>
            </Link>
            <ReadMore style={{ textAlign: 'justify' }}>
              {pictogram.desc}
            </ReadMore>
            {showLabels ?
              <div style={styles.wrapper}> Tags would be here </div>
              : ''
            }
          </div>
        </div>
      </Item>
    )
  }
}

PictogramSnippet.propTypes = {
  // onClick: PropTypes.func.isRequired,
  pictogram: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  showLabels: PropTypes.bool.isRequired
}

export default PictogramSnippet
