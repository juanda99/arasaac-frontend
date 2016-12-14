/**
*
* Menu
*
*/
import React, { Component, PropTypes } from 'react'
import Drawer from 'material-ui/Drawer'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'

import { FormattedMessage } from 'react-intl'

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
        <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
          Arasaac
        </div>
        <SelectableList
          value={location.pathname} onChange={onChangeList}
        >
          <ListItem
            primaryText={<FormattedMessage {...messages.pictograms} />}
            primaryTogglesNestedList
            nestedItems={[
              <ListItem
                value='/pictograms/search'
                primaryText={<FormattedMessage {...messages.searchPictograms} />}
              />,
              <ListItem
                value='/pictograms/api'
                primaryText={<FormattedMessage {...messages.api} />}
              />,
              <ListItem
                value='/pictograms/catalogs'
                primaryText={<FormattedMessage {...messages.downloads} />}
              />
            ]}
          />
          <ListItem
            primaryText={<FormattedMessage {...messages.materials} />}
            primaryTogglesNestedList
            nestedItems={[
              <ListItem
                value='/materials/search'
                primaryText={<FormattedMessage {...messages.searchMaterials} />}
              />,
              <ListItem
                value='/materials/upload'
                primaryText={<FormattedMessage {...messages.uploadMaterials} />}
              />
            ]}
          />
          <ListItem
            primaryText={<FormattedMessage {...messages.onlineTools} />}
            primaryTogglesNestedList
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
        </SelectableList>
        <ListItem
          value='https://www.google.com/design/spec/material-design/introduction.html'
          primaryText={<FormattedMessage {...messages.software} />}
        />
        <Divider />

        <SelectableList value='' onChange={this.handleRequestChangeLink} >
          <Subheader>{<FormattedMessage {...messages.info} />}</Subheader>
          <ListItem
            value='https://github.com/callemall/material-ui'
            primaryText={<FormattedMessage {...messages.news} />}
          />
          <ListItem
            value='https://github.com/callemall/material-ui'
            primaryText={<FormattedMessage {...messages.prizes} />}
          />
          <ListItem
            value='https://www.google.com/design/spec/material-design/introduction.html'
            primaryText={<FormattedMessage {...messages.contact} />}
          />
        </SelectableList>
      </Drawer>
    )
  }
}

export default Menu

