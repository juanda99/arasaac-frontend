import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import ConditionalPaper from 'components/Pictogram/ConditionalPaper'
import { STORAGE_URL } from 'services/config'
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl'
import localeMessages from 'components/LanguageSelector/messages'
import CatalogTitle from 'components/BoxTitle'
import H2 from 'components/H2'
import P from 'components/P'
import messages from './messages'

const isValidDate = (d) => d instanceof Date && !isNaN(d)

const DateFormatter = (value) => {
  if (value === 'Now') return <BuildingIcon />
  const date = new Date(value)
  if (!isValidDate(date)) {
    return (
      <span>
        <FormattedMessage {...messages.never} />
      </span>
    )
  }
  return (
    <span>
      {' '}
      <FormattedDate value={date} /> <FormattedTime value={date} />{' '}
    </span>
  )
}

const style = {
  paper: {
    maxWidth: 800,
    paddingBottom: 40
  },
  leftItem: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: '250px'
  },
  items: {
    display: 'flex',
    marginLeft: 20
  }
}

const Catalog = ({ catalog }) => {
  const {
    colorPictograms,
    noColorPictograms,
    variations,
    size,
    totalPictograms,
    lastUpdated,
    language
  } = catalog
  const catalogURL = `${STORAGE_URL}/catalog_${language}.zip`
  return (
    <ConditionalPaper style={style.paper}>
      <CatalogTitle>
        <H2 center={true} primary ucase noMargin>
          <FormattedMessage {...messages.catalogData} />
        </H2>
      </CatalogTitle>
      <div style={style.items}>
        <div style={style.leftItem}>
          <P marginTop={'30px'} marginBottom={'10px'}>
            Catalog language:{' '}
          </P>
        </div>
        <P important={true} marginTop={'30px'} marginBottom={'10px'}>
          <FormattedMessage {...localeMessages[language]} />
        </P>
      </div>
      <div style={style.items}>
        <div style={style.leftItem}>
          <P marginTop={'10px'} marginBottom={'10px'}>
            <FormattedMessage {...messages.size} />
          </P>
        </div>
        <P important={true} marginTop={'10px'} marginBottom={'10px'}>
          {size}
        </P>
      </div>
      <div style={style.items}>
        <div style={style.leftItem}>
          <P marginTop={'10px'} marginBottom={'10px'}>
            <FormattedMessage {...messages.lastUpdated} />
          </P>
        </div>
        <P important={true} marginTop={'10px'} marginBottom={'10px'}>
          {DateFormatter(lastUpdated)}
        </P>
      </div>
      <div style={style.items}>
        <div style={style.leftItem}>
          <P marginTop={'10px'} marginBottom={'10px'}>
            <FormattedMessage {...messages.numberPictograms} />
          </P>
        </div>
        <P important={true} marginTop={'10px'} marginBottom={'10px'}>
          {totalPictograms}
        </P>
      </div>

      <div style={style.items}>
        <div style={style.leftItem}>
          <P marginTop={'10px'} marginBottom={'10px'}>
            <FormattedMessage {...messages.colorPictograms} />
          </P>
        </div>
        <P important={true} marginTop={'10px'} marginBottom={'10px'}>
          {colorPictograms}
        </P>
      </div>

      <div style={style.items}>
        <div style={style.leftItem}>
          <P marginTop={'10px'} marginBottom={'10px'}>
            <FormattedMessage {...messages.noColorPictograms} />
          </P>
        </div>
        <P important={true} marginTop={'10px'} marginBottom={'10px'}>
          {noColorPictograms}
        </P>
      </div>

      <div style={style.items}>
        <div style={style.leftItem}>
          <P marginTop={'10px'} marginBottom={'20px'}>
            <FormattedMessage {...messages.noColorPictograms} />
          </P>
        </div>
        <P important={true} marginTop={'10px'} marginBottom={'20px'}>
          {variations}
        </P>
      </div>
      <div style={style.items}>
        <div style={style.leftItem} />
        <a href={catalogURL}>
          <RaisedButton
            label={<FormattedMessage {...messages.download} />}
            primary={true}
            style={style}
          />
        </a>
      </div>
    </ConditionalPaper>
  )
}

Catalog.propTypes = {
  catalog: PropTypes.object
}

export default Catalog
