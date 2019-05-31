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
import muiThemeable from 'material-ui/styles/muiThemeable'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import SearchIcon from 'material-ui/svg-icons/action/search'
import PrizesIcon from 'material-ui/svg-icons/action/card-membership'
import ToolsIcon from 'material-ui/svg-icons/action/build'
import AppsIcon from 'material-ui/svg-icons/navigation/apps'
import AccountIcon from 'material-ui/svg-icons/social/person-add'
import LoginIcon from 'material-ui/svg-icons/social/person'
import InfoIcon from 'material-ui/svg-icons/action/info'
import PictogramsIcon from 'material-ui/svg-icons/image/collections'
import PeopleIcon from 'material-ui/svg-icons/social/people'
import SoftwareIcon from 'material-ui/svg-icons/action/important-devices'
import MaterialsIcon from 'material-ui/svg-icons/av/library-books'
import NewsIcon from 'material-ui/svg-icons/communication/message'
import SignoutIcon from 'material-ui/svg-icons/content/block'
import ApiIcon from 'material-ui/svg-icons/communication/import-export'
import ContactMailIcon from 'material-ui/svg-icons/communication/contact-mail'
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload'
import CloudDownloadIcon from 'material-ui/svg-icons/file/cloud-download'
import Div from 'components/Div'
import messages from './messages'
import styles from './styles'

const SelectableList = makeSelectable(List)

class Menu extends Component {
  static propTypes = {
    docked: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    onChangeList: PropTypes.func.isRequired,
    onRequestChangeNavDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    muiTheme: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    signout: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    muiVersions: []
  }

  handleRequestChangeLink = (event, value) => {
    window.location = value
  }

  handleRouterChangeLink = (value) => {
    this.context.router.push(value)
    this.props.onRequestChangeNavDrawer(false)
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
      open,
      muiTheme,
      isAuthenticated,
      signout,
      isMobile
    } = this.props

    return (
      <Drawer
        style={styles.menu}
        docked={docked}
        open={open}
        id='menu'
        onRequestChange={onRequestChangeNavDrawer}
        // containerStyle={{zIndex: zIndex.drawer - 100}}
        // containerStyle={{ Index: 1200 }}
      >
        {
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        }{' '}
        <Div
          bg={muiTheme.palette.primary1Color}
          color={muiTheme.palette.logoColor}
          role='button'
          style={styles.logo}
          onClick={this.handleTouchTapHeader}
        >
          ARASAAC
        </Div>
        <SelectableList value={location.pathname} onChange={onChangeList}>
          <ListItem
            id='lstpictograms'
            primaryText={<FormattedMessage {...messages.pictograms} />}
            primaryTogglesNestedList={true}
            leftIcon={<PictogramsIcon />}
            nestedItems={[
              <ListItem
                value='/pictograms/search'
                primaryText={
                  <FormattedMessage {...messages.searchPictograms} />
                }
                leftIcon={<SearchIcon />}
              />
            ]}
          />
          <ListItem
            id='lstmaterials'
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
            id='lstonlinetools'
            primaryText={<FormattedMessage {...messages.onlineTools} />}
            primaryTogglesNestedList={true}
            leftIcon={<AppsIcon />}
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
                primaryText={
                  <FormattedMessage {...messages.scheduleGenerator} />
                }
              />,
              <ListItem
                value='/onlinetools/calendar-generator'
                primaryText={
                  <FormattedMessage {...messages.calendarGenerator} />
                }
              />,
              <ListItem
                value='/onlinetools/bingos-creator'
                primaryText={<FormattedMessage {...messages.bingo} />}
              />,
              <ListItem
                value='/onlinetools/snakes-and-ladders'
                primaryText={
                  <FormattedMessage {...messages.snakesAndLadders} />
                }
              />,
              <ListItem
                value='/onlinetools/dominos'
                primaryText={<FormattedMessage {...messages.dominos} />}
              />,
              <ListItem
                value='/onlinetools/dominos-encadenados'
                primaryText={
                  <FormattedMessage {...messages.dominosencadenados} />
                }
              />
            ]}
          />
          <ListItem
            id='lstsoftware'
            value='/software'
            primaryText={<FormattedMessage {...messages.software} />}
            leftIcon={<SoftwareIcon />}
          />
          <ListItem
            id='lstdevelopers'
            primaryText={<FormattedMessage {...messages.dev} />}
            primaryTogglesNestedList={true}
            leftIcon={<ToolsIcon />}
            nestedItems={[
              <ListItem
                value='/developers'
                primaryText={<FormattedMessage {...messages.devInfo} />}
                leftIcon={<InfoIcon />}
              />,
              <ListItem
                value='/developers/api'
                primaryText={<FormattedMessage {...messages.api} />}
                leftIcon={<ApiIcon />}
              />,
              <ListItem
                value='/developers/accounts'
                primaryText={<FormattedMessage {...messages.devAccount} />}
                leftIcon={<AccountIcon />}
              />
            ]}
          />
          <ListItem
            id='lstsettings'
            value='/settings'
            primaryText={<FormattedMessage {...messages.settings} />}
            leftIcon={<SettingsIcon />}
          />
        </SelectableList>
        <Divider />
        {isMobile && (
          <SelectableList value={location.pathname}>
            <Subheader>{<FormattedMessage {...messages.user} />}</Subheader>
            {isAuthenticated ? (
              <div>
                <ListItem
                  id='lstsignout'
                  primaryText={<FormattedMessage {...messages.signout} />}
                  leftIcon={<SignoutIcon />}
                  onClick={signout}
                />
              </div>
            ) : (
              <div>
                <ListItem
                  id='lstlogin'
                  value='/signin'
                  primaryText={<FormattedMessage {...messages.signin} />}
                  leftIcon={<LoginIcon />}
                  onClick={() => this.handleRouterChangeLink('/signin')}
                />
                <ListItem
                  id='lstregister'
                  value='/register'
                  primaryText={<FormattedMessage {...messages.register} />}
                  leftIcon={<AccountIcon />}
                  onClick={() => this.handleRouterChangeLink('/register')}
                />
              </div>
            )}
          </SelectableList>
        )}
        <Divider />
        <SelectableList value='' onChange={this.handleRequestChangeLink}>
          <Subheader>{<FormattedMessage {...messages.info} />}</Subheader>
          <ListItem
            id='lstnews'
            value='https://github.com/callemall/material-ui'
            primaryText={<FormattedMessage {...messages.news} />}
            leftIcon={<NewsIcon />}
          />
          <ListItem
            id='lstarasaacteam'
            value='/arasaac-team'
            primaryText={<FormattedMessage {...messages.whoWeAre} />}
            leftIcon={<PeopleIcon />}
          />
          <ListItem
            id='lstprizes'
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

export default muiThemeable()(Menu)
