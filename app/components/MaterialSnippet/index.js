import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'
import Linkify from 'react-linkify'
import moment from 'moment'
import ReadMore from 'components/ReadMore'
import Ribbon from 'components/Ribbon'
import P from 'components/P'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import H2 from 'components/H2'
import { FormattedMessage, injectIntl } from 'react-intl'
import TagsRenderer from 'components/TagsRenderer'
import ImageSlider from 'components/ImageSlider'
import { Link } from 'react-router'
import Item from './Item'
import messages from 'components/Material/messages'
import { NOT_PUBLISHED, PENDING } from 'utils'

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
  actionBtn: {
    margin: '5px',
  },
}

class MaterialSnippet extends PureComponent {
  state = {
    showDialog: false,
  }

  // nextStatus 0 to desactivate the filter, 1 for activating
  handleTouchTap = (filterName, filterItem, nextStatus, e) => {
    e.preventDefault()
    e.stopPropagation()
    const filterValue = nextStatus ? filterItem : ''
    this.props.onFilterChange(filterName, filterValue)
    // we get all the values from the filter
    // const { setFilterItems, filtersMap } = this.props
    // const filterItems = filtersMap.get(filterName).toArray()
    // if (!nextStatus) {
    //   const i = filterItems.indexOf(filterItem)
    //   if (i !== -1) filterItems.splice(i, 1)
    //   setFilterItems(filterName, List(filterItems))
    // } else {
    //   filterItems.push(filterItem)
    //   setFilterItems(filterName, List(filterItems))
    // }
    // return false
  }

  handlePublish = (e, publish) => {
    // e.preventDefault()
    e.stopPropagation()
    const { publishMaterial, material } = this.props
    publishMaterial(material.idMaterial, publish)
  }

  handleBeforeRemove = (e) => {
    e.stopPropagation()
    this.setState({ showDialog: true })
  }

  handleClose = () => this.setState({ showDialog: false })

  handleRemove = () => {
    this.setState({ showDialog: false })
    const { removeMaterial, material } = this.props
    removeMaterial(material.idMaterial)
  }

  render() {
    const { material, locale, filtersMap, showLabels, intl } = this.props
    const { formatMessage } = intl
    const { showDialog } = this.state

    moment.locale(locale)

    const activityTags = (
      <TagsRenderer
        tags={material.activities}
        type={'activity'}
        selected={filtersMap.get('activity')}
        onClick={this.handleTouchTap}
      />
    )

    const areaTags = (
      <TagsRenderer
        tags={material.areas}
        type={'area'}
        selected={filtersMap.get('area')}
        onClick={this.handleTouchTap}
      />
    )
    const localeImages = [...(material.screenshots[locale] || [])].map(
      (image) => `${locale}/${image}`
    )
    const images = [...(material.commonScreenshots || []), ...localeImages]
    let title, desc
    let chooseTranslation = material.translations.filter(
      (translation) => translation.lang === locale
    )
    if (chooseTranslation.length) {
      title = chooseTranslation[0].title
      desc = chooseTranslation[0].desc
    } else {
      title = material.translations[0].title
      desc = material.translations[0].desc
    }

    const actions = [
      <FlatButton
        label={formatMessage(messages.cancel)}
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={formatMessage(messages.submit)}
        keyboardFocused={true}
        primary={true}
        onClick={this.handleRemove}
      />,
    ]

    return (
      <Item>
        <div style={styles.snippet}>
          {material.status === PENDING && (
            <Ribbon
              text={<FormattedMessage {...messages.pending} />}
              type="warning"
            />
          )}
          {material.status === NOT_PUBLISHED && (
            <Ribbon
              text={<FormattedMessage {...messages.notPublished} />}
              type="danger"
            />
          )}
          <ImageSlider
            images={images}
            id={material.idMaterial}
            style={styles.snippetImg}
          />
          <div style={styles.snippetText}>
            <Link to={`/materials/${locale}/${material.idMaterial}`}>
              <H2 primary ucase>
                {title}
              </H2>
            </Link>
            <em>
              <P>
                {moment(material.lastUpdated).format('LLL')} (
                {moment(material.lastUpdated).fromNow()})
              </P>
            </em>
            <ReadMore style={{ textAlign: 'justify' }}>
              {desc.split('\n').map((i, key) => {
                return (
                  <P key={key}>
                    <Linkify properties={{ target: '_blank' }}>{i}</Linkify>
                  </P>
                )
              })}
            </ReadMore>

            {showLabels ? (
              <div style={styles.wrapper}>
                {' '}
                {activityTags} {areaTags}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <Dialog
          title={formatMessage(messages.deleteMaterial)}
          actions={actions}
          modal={true}
          open={showDialog}
          onRequestClose={this.handleClose}
        >
          <FormattedMessage {...messages.confirmDeletion} />
        </Dialog>
      </Item>
    )
  }
}

MaterialSnippet.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  showLabels: PropTypes.bool.isRequired,
  publishMaterial: PropTypes.func.isRequired,
  removeMaterial: PropTypes.func.isRequired,
  showActionButtons: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
}

export default injectIntl(MaterialSnippet)
