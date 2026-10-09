/*
 *
 * UploadWorldView
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Link } from 'react-router'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import { Map as ReactMap, TileLayer, Marker } from 'react-leaflet'

import Paper from 'material-ui/Paper'
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import LinearProgress from 'material-ui/LinearProgress'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import FileUpload from 'material-ui/svg-icons/file/file-upload'

import View from 'components/View'
import ReadMargin from 'components/ReadMargin'
import H2 from 'components/H2'
import H3 from 'components/H3'
import FilePreview from 'components/MaterialForm/FilePreview'
import P from 'components/P'
import userIsAuthenticated from 'utils/auth'
import { PRIVATE_API_ROOT } from 'services/config'
import {
  makeSelectHasUser,
  makeSelectEmail,
  makeSelectName,
  makeSelectRole,
} from 'containers/App/selectors'

import {
  CATEGORY_DEFINITIONS,
  getCategoryIcon,
} from 'containers/WorldView'
import worldMessages from 'containers/WorldView/messages'
import messages from './messages'

export const CATEGORIES = [
  { key: 'educacion', tipo: 'Educación', messageKey: 'categoryEducacion' },
  { key: 'salud', tipo: 'Salud', messageKey: 'categorySalud' },
  { key: 'localidades', tipo: 'Localidades', messageKey: 'categoryLocalidades' },
  { key: 'cultura', tipo: 'Cultura', messageKey: 'categoryCultura' },
  { key: 'asociaciones', tipo: 'Asociaciones', messageKey: 'categoryAsociaciones' },
  { key: 'organismos', tipo: 'Organismos', messageKey: 'categoryOrganismos' },
  { key: 'software', tipo: 'Software', messageKey: 'categorySoftware' },
  { key: 'residencias', tipo: 'Residencias', messageKey: 'categoryResidencias' },
  { key: 'deporte', tipo: 'Deporte', messageKey: 'categoryDeporte' },
  { key: 'empresas', tipo: 'Empresas', messageKey: 'categoryEmpresas' },
  { key: 'otro', tipo: 'Otro', messageKey: 'categoryOtro' },
]

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
  },
  sectionTitle: {
    marginTop: '28px',
    marginBottom: '12px',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '8px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '0 -8px',
  },
  colHalf: {
    flex: '1 1 300px',
    padding: '0 8px',
    boxSizing: 'border-box',
  },
  colFull: {
    flex: '1 1 100%',
    padding: '0 8px',
    boxSizing: 'border-box',
  },
  mapContainer: {
    width: '100%',
    height: '350px',
    borderRadius: '6px',
    overflow: 'hidden',
    border: '1px solid #ccc',
    marginTop: '12px',
    marginBottom: '16px',
  },
  dropzone: {
    border: '2px dashed #00796B',
    borderRadius: '6px',
    padding: '24px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#fafafa',
    marginTop: '12px',
    marginBottom: '16px',
    transition: 'border-color 0.2s',
  },
  thumbnailsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '12px',
    marginBottom: '16px',
  },
  thumbnailItem: {
    marginBottom: '8px',
    boxSizing: 'border-box',
  },
  actionsRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '32px',
    paddingTop: '16px',
    borderTop: '1px solid #eee',
  },
  successCard: {
    padding: '36px',
    textAlign: 'center',
    maxWidth: '650px',
    margin: '40px auto',
  },
  errorMessage: {
    color: '#d32f2f',
    marginTop: '12px',
    fontWeight: 'bold',
  },
}

export class UploadWorldView extends PureComponent {
  state = {
    name: '',
    tipo: '',
    categoryKey: '',
    description: '',
    latitude: '',
    longitude: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
    country: 'España',
    mainWeb: '',
    proyectWeb: '',
    urlNews: '',
    video: '',
    email: this.props.email || '',
    files: [],
    // UI state
    stepIndex: 0,
    sending: false,
    progressStatus: 0,
    success: false,
    error: '',
    // Validation errors
    errors: {},
    mapCenter: [40.4168, -3.7038],
    mapZoom: 5,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.email && !this.state.email) {
      this.setState({ email: nextProps.email })
    }
  }

  handleCategoryChange = (event, index, value) => {
    const selected = CATEGORIES.find((cat) => cat.key === value)
    this.setState({
      categoryKey: value,
      tipo: selected ? selected.tipo : value,
      errors: { ...this.state.errors, tipo: '' },
    })
  }

  handleInputChange = (field) => (event) => {
    const value = event.target.value
    this.setState({
      [field]: value,
      errors: { ...this.state.errors, [field]: '' },
    })
  }

  handleCoordsChange = (field) => (event) => {
    const value = event.target.value
    this.setState({
      [field]: value,
      errors: { ...this.state.errors, coords: '' },
    })
    const lat = field === 'latitude' ? parseFloat(value) : parseFloat(this.state.latitude)
    const lng = field === 'longitude' ? parseFloat(value) : parseFloat(this.state.longitude)
    if (!isNaN(lat) && !isNaN(lng)) {
      this.setState({ mapCenter: [lat, lng], mapZoom: 14 })
    }
  }

  handleMapClick = (e) => {
    if (e && e.latlng) {
      const lat = parseFloat(e.latlng.lat.toFixed(6))
      const lng = parseFloat(e.latlng.lng.toFixed(6))
      this.setState({
        latitude: String(lat),
        longitude: String(lng),
        mapCenter: [lat, lng],
        errors: { ...this.state.errors, coords: '' },
      })
    }
  }

  changeStep = (stepIndex) => {
    this.setState({ stepIndex })
  }

  handleDropFiles = (acceptedFiles) => {
    this.setState((prevState) => ({
      files: [...prevState.files, ...acceptedFiles],
    }))
  }

  handleRemoveFile = (index) => {
    this.setState((prevState) => ({
      files: prevState.files.filter((_, idx) => idx !== index),
    }))
  }

  validateForm = () => {
    const { formatMessage } = this.props.intl
    const { name, tipo, latitude, longitude } = this.state
    const errors = {}

    if (!name.trim()) {
      errors.name = formatMessage(messages.nameRequired)
    }

    if (!tipo) {
      errors.tipo = formatMessage(messages.categoryRequired)
    }

    const lat = parseFloat(latitude)
    const lng = parseFloat(longitude)
    if (isNaN(lat) || isNaN(lng)) {
      errors.coords = formatMessage(messages.coordinatesRequired)
    }

    // Jump to the first step that contains an error
    let stepWithError = null
    if (errors.name || errors.tipo) {
      stepWithError = 0
    } else if (errors.coords) {
      stepWithError = 1
    }
    this.setState(
      stepWithError !== null ? { errors, stepIndex: stepWithError } : { errors },
    )
    return Object.keys(errors).length === 0
  }

  handleSubmit = () => {
    if (!this.validateForm()) {
      return
    }

    const { token, intl } = this.props
    const { formatMessage } = intl
    const {
      name,
      tipo,
      description,
      latitude,
      longitude,
      address,
      city,
      postalCode,
      province,
      country,
      mainWeb,
      proyectWeb,
      urlNews,
      video,
      email,
      files,
    } = this.state

    this.setState({ sending: true, progressStatus: 0, error: '' })

    const formData = new FormData()
    const payload = {
      name: name.trim(),
      tipo,
      description: description.trim(),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      address: {
        address: address.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        province: province.trim(),
        country: country.trim(),
      },
      links: {
        mainWeb: mainWeb.trim(),
        proyectWeb: proyectWeb.trim(),
        urlNews: urlNews.trim(),
      },
      video: video.trim(),
      email: email.trim(),
    }

    formData.append('formData', JSON.stringify(payload))
    files.forEach((file) => {
      formData.append('images', file)
    })

    return axios
      .request({
        method: 'POST',
        url: `${PRIVATE_API_ROOT}/world`,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            )
            this.setState({ progressStatus: percent })
          }
        },
      })
      .then(() => {
        this.setState({
          sending: false,
          progressStatus: 100,
          success: true,
          error: '',
        })
      })
      .catch((err) => {
        const errMsg =
          (err.response &&
            err.response.data &&
            err.response.data.message) ||
          err.message ||
          formatMessage(messages.tryAgain)
        this.setState({
          sending: false,
          error: errMsg,
        })
      })
  }

  resetForm = () => {
    this.setState({
      name: '',
      tipo: '',
      categoryKey: '',
      description: '',
      latitude: '',
      longitude: '',
      address: '',
      city: '',
      postalCode: '',
      province: '',
      country: 'España',
      mainWeb: '',
      proyectWeb: '',
      urlNews: '',
      video: '',
      files: [],
      sending: false,
      progressStatus: 0,
      success: false,
      error: '',
      errors: {},
      stepIndex: 0,
    })
  }

  render() {
    const { intl } = this.props
    const { formatMessage } = intl
    const {
      name,
      categoryKey,
      description,
      latitude,
      longitude,
      address,
      city,
      postalCode,
      province,
      country,
      mainWeb,
      proyectWeb,
      urlNews,
      video,
      email,
      files,
      sending,
      progressStatus,
      success,
      error,
      errors,
      mapCenter,
      mapZoom,
      stepIndex,
    } = this.state

    const latNum = parseFloat(latitude)
    const lngNum = parseFloat(longitude)
    const hasMarker = !isNaN(latNum) && !isNaN(lngNum)
    const currentMarkerIcon = getCategoryIcon(categoryKey)

    if (success) {
      return (
        <View left={true} right={true}>
          <Paper zDepth={1} style={styles.successCard}>
            <ActionCheckCircle
              style={{ width: 64, height: 64, color: '#4CAF50' }}
            />
            <H2 style={{ marginTop: '16px', color: '#2E7D32' }}>
              <FormattedMessage {...messages.successTitle} />
            </H2>
            <P style={{ margin: '16px 0 28px', color: '#555' }}>
              <FormattedMessage {...messages.successDesc} />
            </P>
            <div>
              <Link to="/world" style={{ textDecoration: 'none' }}>
                <RaisedButton
                  label={formatMessage(messages.backToMap)}
                  primary={true}
                  style={{ marginRight: '16px' }}
                />
              </Link>
              <FlatButton
                label={formatMessage(messages.uploadAnother)}
                onClick={this.resetForm}
              />
            </div>
          </Paper>
        </View>
      )
    }

    return (
      <View left={true} right={true}>
        <ReadMargin>
          <H2 primary={true}>
            <FormattedMessage {...messages.uploadWorldTitle} />
          </H2>
          <P>
            <FormattedMessage {...messages.uploadWorldDesc} />
          </P>
        </ReadMargin>

        <Paper zDepth={0} style={styles.container}>
          <Stepper
            activeStep={stepIndex}
            linear={false}
            orientation="vertical"
          >
            <Step>
              <StepButton onClick={() => this.changeStep(0)}>
                <H3>
                  <FormattedMessage {...messages.generalData} />
                </H3>
              </StepButton>
              <StepContent>

          <div style={styles.row}>
            <div style={styles.colHalf}>
              <TextField
                id="world-name-input"
                floatingLabelText={formatMessage(messages.nameLabel)}
                fullWidth={true}
                value={name}
                onChange={this.handleInputChange('name')}
                errorText={errors.name}
              />
            </div>

            <div style={styles.colHalf}>
              <SelectField
                id="world-tipo-select"
                floatingLabelText={formatMessage(messages.categoryLabel)}
                fullWidth={true}
                value={categoryKey}
                onChange={this.handleCategoryChange}
                errorText={errors.tipo}
              >
                {CATEGORIES.map((cat) => {
                  const catDef = CATEGORY_DEFINITIONS[cat.key]
                  return (
                    <MenuItem
                      key={cat.key}
                      value={cat.key}
                      primaryText={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              backgroundColor: catDef ? catDef.color : '#00796B',
                              marginRight: '10px',
                              display: 'inline-block',
                            }}
                          />
                          <span>{formatMessage(worldMessages[cat.messageKey])}</span>
                        </div>
                      }
                    />
                  )
                })}
              </SelectField>
            </div>

            <div style={styles.colFull}>
              <TextField
                id="world-desc-input"
                floatingLabelText={formatMessage(messages.descriptionLabel)}
                hintText={formatMessage(messages.descriptionHint)}
                fullWidth={true}
                multiLine={true}
                rows={2}
                rowsMax={5}
                value={description}
                onChange={this.handleInputChange('description')}
              />
            </div>
          </div>

              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.changeStep(1)}>
                <H3>
                  <FormattedMessage {...messages.locationData} />
                </H3>
              </StepButton>
              <StepContent>
          <P style={{ color: '#666', fontSize: '0.9rem', margin: '4px 0' }}>
            <FormattedMessage {...messages.locationHelper} />
          </P>

          <div style={styles.mapContainer}>
            <ReactMap
              center={hasMarker ? [latNum, lngNum] : mapCenter}
              zoom={hasMarker ? 13 : mapZoom}
              style={{ width: '100%', height: '100%' }}
              onClick={this.handleMapClick}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {hasMarker && (
                <Marker
                  position={[latNum, lngNum]}
                  icon={currentMarkerIcon}
                />
              )}
            </ReactMap>
          </div>

          <div style={styles.row}>
            <div style={styles.colHalf}>
              <TextField
                id="world-lat-input"
                floatingLabelText={formatMessage(messages.latitudeLabel)}
                fullWidth={true}
                value={latitude}
                onChange={this.handleCoordsChange('latitude')}
                errorText={errors.coords}
              />
            </div>
            <div style={styles.colHalf}>
              <TextField
                id="world-lng-input"
                floatingLabelText={formatMessage(messages.longitudeLabel)}
                fullWidth={true}
                value={longitude}
                onChange={this.handleCoordsChange('longitude')}
                errorText={errors.coords}
              />
            </div>

            <div style={styles.colHalf}>
              <TextField
                id="world-address-input"
                floatingLabelText={formatMessage(messages.addressLabel)}
                fullWidth={true}
                value={address}
                onChange={this.handleInputChange('address')}
              />
            </div>
            <div style={styles.colHalf}>
              <TextField
                id="world-city-input"
                floatingLabelText={formatMessage(messages.cityLabel)}
                fullWidth={true}
                value={city}
                onChange={this.handleInputChange('city')}
              />
            </div>
            <div style={styles.colHalf}>
              <TextField
                id="world-postalcode-input"
                floatingLabelText={formatMessage(messages.postalCodeLabel)}
                fullWidth={true}
                value={postalCode}
                onChange={this.handleInputChange('postalCode')}
              />
            </div>
            <div style={styles.colHalf}>
              <TextField
                id="world-province-input"
                floatingLabelText={formatMessage(messages.provinceLabel)}
                fullWidth={true}
                value={province}
                onChange={this.handleInputChange('province')}
              />
            </div>
            <div style={styles.colHalf}>
              <TextField
                id="world-country-input"
                floatingLabelText={formatMessage(messages.countryLabel)}
                fullWidth={true}
                value={country}
                onChange={this.handleInputChange('country')}
              />
            </div>
          </div>

              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.changeStep(2)}>
                <H3>
                  <FormattedMessage {...messages.linksAndMedia} />
                </H3>
              </StepButton>
              <StepContent>

          <div style={styles.row}>
            <div style={styles.colHalf}>
              <TextField
                id="world-mainweb-input"
                floatingLabelText={formatMessage(messages.mainWebLabel)}
                hintText={formatMessage(messages.mainWebHint)}
                fullWidth={true}
                value={mainWeb}
                onChange={this.handleInputChange('mainWeb')}
              />
            </div>
            <div style={styles.colHalf}>
              <TextField
                id="world-proyectweb-input"
                floatingLabelText={formatMessage(messages.proyectWebLabel)}
                hintText={formatMessage(messages.proyectWebHint)}
                fullWidth={true}
                value={proyectWeb}
                onChange={this.handleInputChange('proyectWeb')}
              />
            </div>
            <div style={styles.colHalf}>
              <TextField
                id="world-urlnews-input"
                floatingLabelText={formatMessage(messages.urlNewsLabel)}
                hintText={formatMessage(messages.urlNewsHint)}
                fullWidth={true}
                value={urlNews}
                onChange={this.handleInputChange('urlNews')}
              />
            </div>
            <div style={styles.colHalf}>
              <TextField
                id="world-video-input"
                floatingLabelText={formatMessage(messages.videoLabel)}
                hintText={formatMessage(messages.videoHint)}
                fullWidth={true}
                value={video}
                onChange={this.handleInputChange('video')}
              />
            </div>
          </div>

          {/* Photos Dropzone */}
          <div style={{ marginTop: '16px' }}>
            <P style={{ fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>
              <FormattedMessage {...messages.imagesLabel} />
            </P>
            <Dropzone
              accept="image/*"
              multiple={true}
              onDrop={this.handleDropFiles}
              style={styles.dropzone}
            >
              {files.length > 0 && (
                <div style={styles.thumbnailsContainer}>
                  {files.map((file, idx) => (
                    <div key={file.name + idx} style={styles.thumbnailItem}>
                      <FilePreview
                        file={file}
                        onDelete={() => this.handleRemoveFile(idx)}
                      />
                    </div>
                  ))}
                </div>
              )}
              <FileUpload
                style={{ width: 44, height: 44, color: '#00796B', marginBottom: 8 }}
              />
              <P style={{ margin: 0, color: '#666' }}>
                <FormattedMessage {...messages.dropzoneImagesText} />
              </P>
            </Dropzone>
          </div>
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.changeStep(3)}>
                <H3>
                  <FormattedMessage {...messages.contactData} />
                </H3>
              </StepButton>
              <StepContent>
          <div style={styles.row}>
            <div style={styles.colHalf}>
              <TextField
                id="world-email-input"
                floatingLabelText={formatMessage(messages.emailLabel)}
                fullWidth={true}
                value={email}
                onChange={this.handleInputChange('email')}
              />
            </div>
          </div>

          {/* Progress Indicator */}
          {sending && (
            <div style={{ marginTop: '24px' }}>
              <P>
                <FormattedMessage
                  {...messages.progressStatus}
                  values={{ progressStatus }}
                />
              </P>
              <LinearProgress
                mode="determinate"
                value={progressStatus}
                style={{ height: '8px', margin: '8px 0' }}
              />
            </div>
          )}

          {error && <P style={styles.errorMessage}>{error}</P>}

          {/* Action Buttons */}
          <div style={styles.actionsRow}>
            <RaisedButton
              label={formatMessage(messages.submitButton)}
              primary={true}
              onClick={this.handleSubmit}
              disabled={sending}
            />
            <Link to="/world" style={{ textDecoration: 'none' }}>
              <FlatButton
                label={formatMessage(messages.cancelButton)}
                style={{ marginLeft: '12px' }}
                disabled={sending}
              />
            </Link>
          </div>
              </StepContent>
            </Step>
          </Stepper>
        </Paper>
      </View>
    )
  }
}

UploadWorldView.propTypes = {
  token: PropTypes.string.isRequired,
  email: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
  intl: intlShape.isRequired,
}

const mapStateToProps = (state) => ({
  token: makeSelectHasUser()(state),
  email: makeSelectEmail()(state),
  name: makeSelectName()(state),
  role: makeSelectRole()(state),
})

export default connect(mapStateToProps)(
  userIsAuthenticated(injectIntl(UploadWorldView)),
)
