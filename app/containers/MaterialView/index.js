/*
 *
 * MaterialView
 *
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import View from "components/View";
import Material from "components/Material";
import { makeSelectHasUser, makeSelectRole } from "containers/App/selectors";
import {
  publishMaterial,
  removeMaterial,
  material,
  showSettings,
} from "containers/MaterialsView/actions";
import P from "components/P";
import { Map } from "immutable";
import messages from "./messages";

class MaterialView extends PureComponent {
  componentDidMount() {
    if (this.props.materialData.isEmpty()) {
      this.props.requestMaterial(
        this.props.params.idMaterial,
        this.props.token
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.idMaterial !== nextProps.params.idMaterial) {
      this.props.requestMaterial(nextProps.params.idMaterial, this.props.token);
    }
  }

  handlePublishMaterial = (id, publish) => {
    const { publishMaterial, token } = this.props;
    publishMaterial(id, publish, token);
  };

  handleRemoveMaterial = (id) => {
    const { removeMaterial, token } = this.props;
    removeMaterial(id, token);
  };

  renderContent() {
    const { materialData, loading, params, role, showSettings } = this.props;
    const { locale } = params;
    if (loading)
      return (
        <p>
          <FormattedMessage {...messages.materialLoading} />
        </p>
      );
    return materialData.isEmpty() ? (
      <P>
        <FormattedMessage {...messages.materialNotFound} />{" "}
      </P>
    ) : (
      <Material
        material={materialData}
        locale={locale}
        showActionButtons={role === "admin"}
        publishMaterial={this.handlePublishMaterial}
        removeMaterial={this.handleRemoveMaterial}
        showSettings={showSettings}
      />
    );
  }

  render() {
    return (
      <View left={true} right={true} top={1}>
        {/* use react-helmet inside material component */}
        {this.renderContent()}
      </View>
    );
  }
}

MaterialView.propTypes = {
  requestMaterial: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  materialData: PropTypes.object,
  loading: PropTypes.bool,
  role: PropTypes.string.isRequired,
  removeMaterial: PropTypes.func.isRequired,
  publishMaterial: PropTypes.func.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const materialData =
    state.getIn([
      "materialsView",
      "materials",
      parseInt(ownProps.params.idMaterial, 10),
    ]) || Map();
  const loading = state.getIn(["materialsView", "loading"]);
  const token = makeSelectHasUser()(state);
  const role = makeSelectRole()(state);
  return {
    materialData,
    loading,
    token,
    role,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestMaterial: (idMaterial, token) => {
    dispatch(material.request(idMaterial, token));
  },
  removeMaterial: (id, token) => {
    dispatch(removeMaterial.request(id, token));
  },
  publishMaterial: (id, publish, token) => {
    dispatch(publishMaterial.request(id, publish, token));
  },
  /* use to show advaced search when watching an author materials */
  showSettings: () => {
    dispatch(showSettings());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MaterialView);
