import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import ConditionalPaper from 'components/Pictogram/ConditionalPaper'
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl'
import localeMessages from 'components/LanguageSelector/messages'
import CatalogTitle from 'components/BoxTitle'
import H2 from 'components/H2'
import P from 'components/P'
import License from 'components/License'
import messages from './messages'

const isValidDate = (d) => d instanceof Date && !isNaN(d)

const DateFormatter = (value) => {
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
    flexBasis: '350px'
  },
  items: {
    display: 'flex',
    marginLeft: 20
  }
}

class Catalog extends Component {
  state = {
    open: false
  }

  handleClick = () => this.setState({ open: !this.state.open })

  render() {
    const {
      colorPictograms,
      noColorPictograms,
      variations,
      size,
      totalPictograms,
      lastUpdated,
      language
    } = this.props.catalog

    const { open } = this.state

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
              <FormattedMessage {...messages.variations} />
            </P>
          </div>
          <P important={true} marginTop={'10px'} marginBottom={'20px'}>
            {variations}
          </P>
        </div>
        <div style={style.items}>
          <div style={style.leftItem} />
          <RaisedButton
            label={<FormattedMessage {...messages.download} />}
            primary={true}
            style={style}
            onClick={this.handleClick}
          />
        </div>
        <License
          open={open}
          language={language}
          locale={this.props.locale}
          closeDialog={this.handleClick}
        />
      </ConditionalPaper>
    )
  }
}

Catalog.propTypes = {
  catalog: PropTypes.object,
  locale: PropTypes.string.isRequired
}

export default Catalog
