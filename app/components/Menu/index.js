/**
 *
 * Menu
 *
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { IMAGES_URL } from "services/config";
import Drawer from "material-ui/Drawer";
import { List, ListItem, makeSelectable } from "material-ui/List";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import { FormattedMessage } from "react-intl";
import muiThemeable from "material-ui/styles/muiThemeable";
import SettingsIcon from "material-ui/svg-icons/action/settings";
import SearchIcon from "material-ui/svg-icons/action/search";
import ToolsIcon from "material-ui/svg-icons/action/build";
import AppsIcon from "material-ui/svg-icons/navigation/apps";
import FavoriteIcon from "material-ui/svg-icons/action/favorite";
import MenuIcon from "material-ui/svg-icons/navigation/chevron-right";
import AccountIcon from "material-ui/svg-icons/social/person-add";
import LoginIcon from "material-ui/svg-icons/social/person";
import InfoIcon from "material-ui/svg-icons/action/info";
import PictogramsIcon from "material-ui/svg-icons/image/collections";
import PeopleIcon from "material-ui/svg-icons/social/people";
import SoftwareIcon from "material-ui/svg-icons/action/important-devices";
import ThumbUpIcon from "material-ui/svg-icons/action/thumb-up";
import MaterialsIcon from "material-ui/svg-icons/av/library-books";
import SignoutIcon from "material-ui/svg-icons/content/block";
import ApiIcon from "material-ui/svg-icons/communication/import-export";
import ContactMailIcon from "material-ui/svg-icons/communication/contact-mail";
import FileUploadIcon from "material-ui/svg-icons/file/file-upload";
import TermsOfUseIcon from "material-ui/svg-icons/action/assignment-turned-in";
import Div from "components/Div";
import messages from "./messages";
import styles from "./styles";
import PrizeIcon from "./PrizeIcon";
import WorldIcon from "./WorldIcon";

const SelectableList = makeSelectable(List);

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
    isMobile: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  state = {
    muiVersions: [],
  };

  handleLink = (value) => window.open(value, "_blank");

  handleRouterChangeLink = (value) => {
    this.context.router.push(value);
    this.props.onRequestChangeNavDrawer(false);
  };

  handleTouchTapHeader = () => {
    this.context.router.push("/");
    this.props.onRequestChangeNavDrawer(false);
  };

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
      isMobile,
    } = this.props;

    const isRtl = muiTheme.direction === "rtl";

    return (
      <Drawer
        style={styles.menu}
        docked={docked}
        open={open}
        openSecondary={isRtl}
        id="menu"
        onRequestChange={onRequestChangeNavDrawer}
        // containerStyle={{zIndex: zIndex.drawer - 100}}
        // containerStyle={{ Index: 1200 }}
      >
        {
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        }{" "}
        <Div
          bg={muiTheme.palette.primary1Color}
          color={muiTheme.palette.logoColor}
          role="button"
          style={styles.logo}
          onClick={this.handleTouchTapHeader}
        >
          <img
            src={`${IMAGES_URL}/logo-arasaac-texto.svg`}
            style={{ width: "140px", marginLeft: "-20px" }}
          />
        </Div>
        <SelectableList value={location.pathname} onChange={onChangeList}>
          <ListItem
            id="lstpictograms"
            primaryText={
              <span>
                <FormattedMessage {...messages.pictograms} />
              </span>
            }
            primaryTogglesNestedList={true}
            leftIcon={<PictogramsIcon />}
            nestedItems={[
              <ListItem
                value="/pictograms/search"
                primaryText={<FormattedMessage {...messages.search} />}
                leftIcon={<SearchIcon />}
              />,
              <ListItem
                value="/pictograms/favorites"
                primaryText={<FormattedMessage {...messages.favorites} />}
                leftIcon={<FavoriteIcon />}
              />,
            ]}
          />
          <ListItem
            id="lstmaterials"
            isRtl={true}
            primaryText={<FormattedMessage {...messages.materials} />}
            primaryTogglesNestedList={true}
            leftIcon={<MaterialsIcon />}
            nestedItems={[
              <ListItem
                value="/materials/search"
                primaryText={<FormattedMessage {...messages.search} />}
                leftIcon={<SearchIcon />}
              />,
              <ListItem
                value="/materials/upload"
                primaryText={<FormattedMessage {...messages.uploadMaterials} />}
                leftIcon={<FileUploadIcon />}
              />,
            ]}
          />
          <ListItem
            id="lstonlinetools"
            primaryText={<FormattedMessage {...messages.onlineTools} />}
            // primaryTogglesNestedList={true}
            onClick={() =>
              this.handleLink("http://www.arasaac.org/herramientas.php")
            }
            leftIcon={<AppsIcon />}
            // nestedItems={[
            //   <ListItem
            //     value='/onlinetools/araword'
            //     primaryText={<FormattedMessage {...messages.araword} />}
            //     leftIcon={<MenuIcon />}
            //   />
            // ]}
          />
          <ListItem
            id="lstaulaabierta"
            value="http://aulaabierta.arasaac.org"
            onClick={() => this.handleLink("http://aulaabierta.arasaac.org")}
            primaryText="Aula abierta"
            leftIcon={<SoftwareIcon />}
          />
          <ListItem
            id="lstdevelopers"
            primaryText={<FormattedMessage {...messages.dev} />}
            primaryTogglesNestedList={true}
            leftIcon={<ToolsIcon />}
            nestedItems={[
              <ListItem
                value="/developers"
                primaryText={<FormattedMessage {...messages.devInfo} />}
                leftIcon={<InfoIcon />}
              />,
              <ListItem
                value="/developers/api"
                primaryText={<FormattedMessage {...messages.api} />}
                leftIcon={<ApiIcon />}
              />,
              // <ListItem
              //   value='/developers/accounts'
              //   primaryText={<FormattedMessage {...messages.devAccount} />}
              //   leftIcon={<AccountIcon />}
              // />
            ]}
          />
          <ListItem
            id="lstsettings"
            value="/settings"
            primaryText={<FormattedMessage {...messages.settings} />}
            leftIcon={<SettingsIcon />}
          />
          <ListItem
            id="lstusage"
            value="/terms-of-use"
            primaryText={<FormattedMessage {...messages.termsOfUse} />}
            leftIcon={<TermsOfUseIcon />}
          />
        </SelectableList>
        <Divider />
        {isMobile && (
          <SelectableList value={location.pathname}>
            <Subheader>{<FormattedMessage {...messages.user} />}</Subheader>
            {isAuthenticated ? (
              <div>
                <ListItem
                  id="lstsignout"
                  primaryText={<FormattedMessage {...messages.signout} />}
                  leftIcon={<SignoutIcon />}
                  onClick={signout}
                />
              </div>
            ) : (
              <div>
                <ListItem
                  id="lstlogin"
                  value="/signin"
                  primaryText={<FormattedMessage {...messages.signin} />}
                  leftIcon={<LoginIcon />}
                  onClick={() => this.handleRouterChangeLink("/signin")}
                />
                <ListItem
                  id="lstregister"
                  value="/register"
                  primaryText={<FormattedMessage {...messages.register} />}
                  leftIcon={<AccountIcon />}
                  onClick={() => this.handleRouterChangeLink("/register")}
                />
              </div>
            )}
          </SelectableList>
        )}
        <Divider />
        <SelectableList value="" onChange={onChangeList}>
          <Subheader>{<FormattedMessage {...messages.info} />}</Subheader>
          <ListItem
            id="lstarasaacteam"
            value="/about-us"
            primaryText={<FormattedMessage {...messages.whoWeAre} />}
            leftIcon={<PeopleIcon />}
          />
          <ListItem
            id="lstworld"
            value="/world"
            primaryText={<FormattedMessage {...messages.arasaacWorld} />}
            leftIcon={<WorldIcon />}
          />
          <ListItem
            id="lstprizes"
            value="/prizes"
            primaryText={<FormattedMessage {...messages.prizes} />}
            leftIcon={<PrizeIcon />}
          />
          <ListItem
            id="lstcollaborators"
            value="/translators"
            primaryText={<FormattedMessage {...messages.translators} />}
            leftIcon={<ThumbUpIcon />}
          />
          <ListItem
            value="/contact-us"
            primaryText={<FormattedMessage {...messages.contact} />}
            leftIcon={<ContactMailIcon />}
          />
        </SelectableList>
      </Drawer>
    );
  }
}

export default muiThemeable()(Menu);
