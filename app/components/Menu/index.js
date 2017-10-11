/**
*
* Menu
*
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import AccessibilityIcon from 'material-ui/svg-icons/action/accessibility'
import SearchIcon from 'material-ui/svg-icons/action/search'
import PrizesIcon from 'material-ui/svg-icons/action/card-membership'
import ToolsIcon from 'material-ui/svg-icons/action/build'
import PictogramsIcon from 'material-ui/svg-icons/image/collections'
import PeopleIcon from 'material-ui/svg-icons/social/people'
import SoftwareIcon from 'material-ui/svg-icons/action/important-devices'
import MaterialsIcon from 'material-ui/svg-icons/av/library-books'
import NewsIcon from 'material-ui/svg-icons/communication/message'
import ApiIcon from 'material-ui/svg-icons/communication/import-export'
import ContactMailIcon from 'material-ui/svg-icons/communication/contact-mail'
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload'
import CloudDownloadIcon from 'material-ui/svg-icons/file/cloud-download'
import messages from './messages'
import styles from './styles'

const SelectableList = makeSelectable(List)

class Menu extends Component {
  static propTypes = {
    docked: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    onChangeList: PropTypes.func.isRequired,
    onRequestChangeNavDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  state = {
    muiVersions: []
  }

  handleRequestChangeLink = (event, value) => {
    window.location = value
  }

  handleTouchTapHeader = () => {
    this.context.router.push('/')
    this.props.onRequestChangeNavDrawer(false)
  }

  render() {
    const {
      location,
      docked,
      onRequestChangeNavDrawer,
      onChangeList,
      open
    } = this.props

    return (
      <Drawer
        style={styles.menu}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeNavDrawer}
       // containerStyle={{zIndex: zIndex.drawer - 100}}
        containerStyle={{ Index: 1200 }}
      >
        <div role='button' style={styles.logo} onClick={this.handleTouchTapHeader}>
          ARASAAC
        </div>
        <SelectableList
          value={location.pathname} onChange={onChangeList}
        >
          <ListItem
            primaryText={<FormattedMessage {...messages.pictograms} />}
            primaryTogglesNestedList={true}
            leftIcon={<PictogramsIcon />}
            nestedItems={[
              <ListItem
                value='/pictograms/search'
                primaryText={<FormattedMessage {...messages.searchPictograms} />}
                leftIcon={<SearchIcon />}
              />,
              <ListItem
                value='/pictograms/api'
                primaryText={<FormattedMessage {...messages.api} />}
                leftIcon={<ApiIcon />}
              />,
              <ListItem
                value='/pictograms/catalogs'
                primaryText={<FormattedMessage {...messages.downloads} />}
                leftIcon={<CloudDownloadIcon />}
              />
            ]}
          />
          <ListItem
            primaryText={<FormattedMessage {...messages.materials} />}
            primaryTogglesNestedList={true}
            leftIcon={<MaterialsIcon />}
            nestedItems={[
              <ListItem
                value='/materials/search'
                primaryText={<FormattedMessage {...messages.searchMaterials} />}
                leftIcon={<SearchIcon />}
              />,
              <ListItem
                value='/materials/upload'
                primaryText={<FormattedMessage {...messages.uploadMaterials} />}
                leftIcon={<FileUploadIcon />}
              />
            ]}
          />
          <ListItem
            primaryText={<FormattedMessage {...messages.onlineTools} />}
            primaryTogglesNestedList={true}
            leftIcon={<ToolsIcon />}
            nestedItems={[
              <ListItem
                value='/onlinetools/animations-maker'
                primaryText={<FormattedMessage {...messages.animationsMaker} />}
              />,
              <ListItem
                value='/onlinetools/symbols-creator'
                primaryText={<FormattedMessage {...messages.symbolsCreator} />}
              />,
              <ListItem
                value='/onlinetools/schedule-generator'
                primaryText={<FormattedMessage {...messages.scheduleGenerator} />}
              />,
              <ListItem
                value='/onlinetools/calendar-generator'
                primaryText={<FormattedMessage {...messages.calendarGenerator} />}
              />,
              <ListItem
                value='/onlinetools/bingos-creator'
                primaryText={<FormattedMessage {...messages.bingo} />}
              />,
              <ListItem
                value='/onlinetools/snakes-and-ladders'
                primaryText={<FormattedMessage {...messages.snakesAndLadders} />}
              />,
              <ListItem
                value='/onlinetools/dominos'
                primaryText={<FormattedMessage {...messages.dominos} />}
              />,
              <ListItem
                value='/onlinetools/dominos-encadenados'
                primaryText={<FormattedMessage {...messages.dominosencadenados} />}
              />
            ]}
          />
          <ListItem
            value='/software'
            primaryText={<FormattedMessage {...messages.software} />}
            leftIcon={<SoftwareIcon />}
          />
          <ListItem
            value='/accessibility'
            primaryText={<FormattedMessage {...messages.accessibility} />}
            leftIcon={<AccessibilityIcon />}
          />
        </SelectableList>

        <Divider />

        <SelectableList value='' onChange={this.handleRequestChangeLink} >
          <Subheader>{<FormattedMessage {...messages.info} />}</Subheader>
          <ListItem
            value='https://github.com/callemall/material-ui'
            primaryText={<FormattedMessage {...messages.news} />}
            leftIcon={<NewsIcon />}
          />
          <ListItem
            value='/arasaac-team'
            primaryText={<FormattedMessage {...messages.whoWeAre} />}
            leftIcon={<PeopleIcon />}
          />
          <ListItem
            value='/prizes'
            primaryText={<FormattedMessage {...messages.prizes} />}
            leftIcon={<PrizesIcon />}
          />
          <ListItem
            value='/contact-us'
            primaryText={<FormattedMessage {...messages.contact} />}
            leftIcon={<ContactMailIcon />}
          />
        </SelectableList>
      </Drawer>
    )
  }
}

export default Menu

