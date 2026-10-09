/*
 *
 * WorldView
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import L from 'leaflet'
import { Map as ReactMap, TileLayer, Marker, Popup } from 'react-leaflet'
import CircularProgress from 'material-ui/CircularProgress'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ActionLanguage from 'material-ui/svg-icons/action/language'
import AvVideoLibrary from 'material-ui/svg-icons/av/video-library'
import ActionAssignment from 'material-ui/svg-icons/action/assignment'
import ActionDescription from 'material-ui/svg-icons/action/description'

import ReadMargin from 'components/ReadMargin'
import View from 'components/View'
import P from 'components/P'
import api from 'services'
import messages from './messages'

export const CATEGORY_DEFINITIONS = {
  educacion: {
    key: 'educacion',
    color: '#3949AB',
    message: messages.categoryEducacion,
    // Graduation cap / school icon
    svgPath:
      'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
  },
  salud: {
    key: 'salud',
    color: '#FF5252',
    message: messages.categorySalud,
    // Medical cross icon
    svgPath: 'M19 10.5h-4.5V6h-5v4.5H5v5h4.5V20h5v-4.5H19v-5z',
  },
  localidades: {
    key: 'localidades',
    color: '#7CB342',
    message: messages.categoryLocalidades,
    // City buildings / town icon
    svgPath:
      'M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 7H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V8h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z',
  },
  cultura: {
    key: 'cultura',
    color: '#9C27B0',
    message: messages.categoryCultura,
    // Museum / columns / art icon
    svgPath:
      'M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-5-8L1 6v2h21V6L11 2z',
  },
  asociaciones: {
    key: 'asociaciones',
    color: '#FBC02D',
    message: messages.categoryAsociaciones,
    // Community / people icon
    svgPath:
      'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  },
  organismos: {
    key: 'organismos',
    color: '#F57C00',
    message: messages.categoryOrganismos,
    // Government building / official entity icon
    svgPath:
      'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z',
  },
  software: {
    key: 'software',
    color: '#097138',
    message: messages.categorySoftware,
    // Laptop / technology icon
    svgPath:
      'M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z',
  },
  residencias: {
    key: 'residencias',
    color: '#880E4F',
    message: messages.categoryResidencias,
    // House / residence icon
    svgPath:
      'M19 7h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4zm-9 5h6c1.1 0 2 .9 2 2v1H8v-1c0-1.1.9-2 2-2zm-5-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z',
  },
  deporte: {
    key: 'deporte',
    color: '#673AB7',
    message: messages.categoryDeporte,
    // Sports ball / leisure icon
    svgPath:
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14.93v2.02c-2.38.42-4.27 2.31-4.69 4.69H4.29c.47-3.66 3.37-6.56 7.03-7.03z',
  },
  empresas: {
    key: 'empresas',
    color: '#C2185B',
    message: messages.categoryEmpresas,
    // Store / shopping bag icon
    svgPath:
      'M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z',
  },
  otro: {
    key: 'otro',
    color: '#00BCD4',
    message: messages.categoryOtro,
    // General location pin icon
    svgPath:
      'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  },
}

export const TIPO_TO_CATEGORY_KEY = {
  // Educación
  colegio: 'educacion',
  instituto: 'educacion',
  universidad: 'educacion',
  conservatorio: 'educacion',
  facultad: 'educacion',
  educación: 'educacion',
  educacion: 'educacion',

  // Salud
  hospital: 'salud',
  'centro de salud': 'salud',
  clínica: 'salud',
  clinica: 'salud',
  farmacia: 'salud',
  consultorio: 'salud',
  'centro de atención temprana': 'salud',
  'centro de atencion temprana': 'salud',
  salud: 'salud',

  // Localidades
  ayuntamiento: 'localidades',
  'accesibilidad vial': 'localidades',
  'mobiliario urbano': 'localidades',
  comarca: 'localidades',
  localidades: 'localidades',

  // Arte y Cultura
  museo: 'cultura',
  biblioteca: 'cultura',
  teatro: 'cultura',
  'casa de cultura': 'cultura',
  'casa joven': 'cultura',
  opera: 'cultura',
  ópera: 'cultura',
  festividad: 'cultura',
  fiestas: 'cultura',
  belén: 'cultura',
  belen: 'cultura',
  'oficina turismo': 'cultura',
  'arte y cultura': 'cultura',

  // Asociaciones
  asociación: 'asociaciones',
  asociacion: 'asociaciones',
  fundación: 'asociaciones',
  fundacion: 'asociaciones',
  'centro de psicopedagogía': 'asociaciones',
  'centro de psicopedagogia': 'asociaciones',
  centro: 'asociaciones',
  asociaciones: 'asociaciones',

  // Organismos
  organismos: 'organismos',
  'centro estatal': 'organismos',
  ministerio: 'organismos',
  consejería: 'organismos',
  consejeria: 'organismos',
  parlamento: 'organismos',
  policía: 'organismos',
  policia: 'organismos',
  bomberos: 'organismos',
  justicia: 'organismos',
  seguridad: 'organismos',
  'edificio administrativo': 'organismos',
  'sociedad pública': 'organismos',
  'sociedad publica': 'organismos',

  // Software - App - Web
  'software caa': 'software',
  software: 'software',
  web: 'software',
  'página web': 'software',
  'pagina web': 'software',

  // Centros residenciales
  residencia: 'residencias',
  'centros residenciales': 'residencias',
  'centro de actividades alternativas para discapacidad': 'residencias',
  residencias: 'residencias',

  // Deporte y Tiempo Libre
  deporte: 'deporte',
  'instalaciones deportivas': 'deporte',
  piscina: 'deporte',
  polideportivo: 'deporte',
  senderismo: 'deporte',
  parque: 'deporte',
  parques: 'deporte',
  escalada: 'deporte',
  zoo: 'deporte',
  camping: 'deporte',
  cine: 'deporte',
  'centro ocio': 'deporte',
  'centro comunitario': 'deporte',

  // Empresas
  empresa: 'empresas',
  comercios: 'empresas',
  comercio: 'empresas',
  transporte: 'empresas',
  balneario: 'empresas',
  bodega: 'empresas',
  cafeterías: 'empresas',
  cafeterias: 'empresas',
  hipermercado: 'empresas',
  'entidad financiera': 'empresas',
  turismo: 'empresas',
  empresas: 'empresas',
}

export function getLocationCategoryKey(loc) {
  if (!loc) return 'otro'
  if (loc.category && CATEGORY_DEFINITIONS[loc.category]) {
    return loc.category
  }
  const key = (loc.tipo || '').trim().toLowerCase()
  return TIPO_TO_CATEGORY_KEY[key] || 'otro'
}

function createCategoryIconSvg(cat) {
  return `
    <div class="custom-map-marker" style="position: relative; width: 32px; height: 42px; cursor: pointer; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35));">
      <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.16 0 0 7.16 0 16c0 10.9 13.5 23.3 14.2 24.1a2.4 2.4 0 003.6 0C18.5 39.3 32 26.9 32 16 32 7.16 24.84 0 16 0z" fill="${cat.color}" stroke="#ffffff" stroke-width="1.5" />
        <circle cx="16" cy="15" r="10.5" fill="rgba(255,255,255,0.18)" />
        <g fill="#ffffff" transform="translate(8, 7) scale(0.67)">
          <path d="${cat.svgPath}" />
        </g>
      </svg>
    </div>
  `
}

const iconCache = {}
export function getCategoryIcon(categoryKey) {
  if (!iconCache[categoryKey]) {
    const cat = CATEGORY_DEFINITIONS[categoryKey] || CATEGORY_DEFINITIONS.otro
    iconCache[categoryKey] = L.divIcon({
      className: 'custom-cat-marker',
      html: createCategoryIconSvg(cat),
      iconSize: [32, 42],
      iconAnchor: [16, 42],
      popupAnchor: [0, -40],
    })
  }
  return iconCache[categoryKey]
}

export function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== 'string') return null
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11
    ? `https://www.youtube-nocookie.com/embed/${match[2]}`
    : null
}

export function getAllPictures(loc) {
  const list = []
  if (!loc) return list
  if (loc.picture && typeof loc.picture === 'string' && loc.picture.trim()) {
    list.push(loc.picture.trim())
  }
  if (Array.isArray(loc.pictures)) {
    loc.pictures.forEach((p) => {
      if (typeof p === 'string' && p.trim() && list.indexOf(p.trim()) === -1) {
        list.push(p.trim())
      }
    })
  }
  return list
}

const isValidUrl = (url) =>
  typeof url === 'string' &&
  (url.indexOf('http://') === 0 || url.indexOf('https://') === 0)

// Pure SVG Icons for reliable context-free rendering inside Leaflet popups
const GlobeIcon = () => (
  <svg
    style={{
      width: '14px',
      height: '14px',
      marginRight: '5px',
      verticalAlign: 'middle',
      fill: 'currentColor',
      flexShrink: 0,
    }}
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
)

const ProjectIcon = () => (
  <svg
    style={{
      width: '14px',
      height: '14px',
      marginRight: '5px',
      verticalAlign: 'middle',
      fill: 'currentColor',
      flexShrink: 0,
    }}
    viewBox="0 0 24 24"
  >
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
)

const NewsIcon = () => (
  <svg
    style={{
      width: '14px',
      height: '14px',
      marginRight: '5px',
      verticalAlign: 'middle',
      fill: 'currentColor',
      flexShrink: 0,
    }}
    viewBox="0 0 24 24"
  >
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
)

const VideoIcon = () => (
  <svg
    style={{
      width: '14px',
      height: '14px',
      marginRight: '5px',
      verticalAlign: 'middle',
      fill: 'currentColor',
      flexShrink: 0,
    }}
    viewBox="0 0 24 24"
  >
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
  </svg>
)

const ZoomInIcon = () => (
  <svg
    style={{
      width: '16px',
      height: '16px',
      marginRight: '6px',
      verticalAlign: 'middle',
      fill: '#ffffff',
      flexShrink: 0,
    }}
    viewBox="0 0 24 24"
  >
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm.5-7h-1v2h-2v1h2v2h1v-2h2V9h-2z" />
  </svg>
)

const PinIcon = () => (
  <svg
    style={{
      width: '13px',
      height: '13px',
      marginRight: '4px',
      verticalAlign: 'middle',
      fill: '#888888',
      flexShrink: 0,
    }}
    viewBox="0 0 24 24"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)

const styles = {
  controlsContainer: {
    padding: '8px 20px',
    marginTop: '12px',
    marginBottom: '0px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
  },
  controlItem: {
    marginRight: '20px',
    flex: '1 1 250px',
    maxWidth: '380px',
  },
  counterText: {
    fontSize: '14px',
    color: '#666666',
    fontWeight: 500,
  },
  mapWrapper: {
    width: '100%',
    height: '800px',
    borderRadius: '0px',
    overflow: 'hidden',
    boxShadow: 'none',
    border: 'none',
    position: 'relative',
    margin: 0,
    padding: 0,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
  },
  popupCard: {
    width: '320px',
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    color: '#333333',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  popupMediaContainer: {
    position: 'relative',
    width: '100%',
    height: '180px',
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
  },
  popupMainImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    display: 'block',
    cursor: 'pointer',
  },
  popupMediaTabs: {
    display: 'flex',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
  },
  popupTabBtn: {
    flex: 1,
    padding: '7px 8px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '11px',
    fontWeight: 600,
    color: '#666666',
    cursor: 'pointer',
    outline: 'none',
    textAlign: 'center',
  },
  popupTabBtnActive: {
    color: '#00838f',
    backgroundColor: '#ffffff',
    boxShadow: 'inset 0 -2px 0 #00bcd4',
  },
  popupVideoContainer: {
    width: '100%',
    height: '180px',
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  photoCounterBadge: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff',
    fontSize: '11px',
    padding: '2px 8px',
    borderRadius: '12px',
    pointerEvents: 'none',
  },
  photoNavBtn: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    color: '#ffffff',
    border: 'none',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '18px',
    lineHeight: '28px',
    textAlign: 'center',
    padding: 0,
    outline: 'none',
    zIndex: 2,
  },
  thumbnailStrip: {
    display: 'flex',
    overflowX: 'auto',
    backgroundColor: '#fafafa',
    padding: '6px 8px',
    borderBottom: '1px solid #eeeeee',
  },
  thumbnailItem: {
    width: '42px',
    height: '42px',
    objectFit: 'cover',
    borderRadius: '3px',
    cursor: 'pointer',
    flexShrink: 0,
    marginRight: '6px',
    boxSizing: 'border-box',
  },
  popupBody: {
    padding: '12px 14px 14px 14px',
  },
  popupTitle: {
    margin: '0 0 6px 0',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#212121',
    lineHeight: 1.3,
  },
  popupBadge: {
    display: 'inline-block',
    padding: '3px 8px',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: 500,
    marginBottom: '6px',
  },
  popupAddress: {
    fontSize: '12px',
    color: '#757575',
    margin: '0 0 8px 0',
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1.3,
  },
  popupDesc: {
    fontSize: '12px',
    color: '#555555',
    lineHeight: 1.4,
    margin: '0 0 10px 0',
    maxHeight: '75px',
    overflowY: 'auto',
  },
  popupLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '6px 0 10px 0',
    borderTop: '1px solid #eeeeee',
    paddingTop: '8px',
  },
  linkBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '11px',
    fontWeight: 500,
    color: '#00838f',
    backgroundColor: '#e0f7fa',
    padding: '4px 8px',
    borderRadius: '12px',
    textDecoration: 'none',
    marginRight: '6px',
    marginBottom: '6px',
  },
  linkBtnVideo: {
    color: '#c2185b',
    backgroundColor: '#fce4ec',
  },
  detailBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#00bcd4',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    outline: 'none',
  },
  dialogGalleryMain: {
    width: '100%',
    maxHeight: '440px',
    objectFit: 'contain',
    backgroundColor: '#111111',
    borderRadius: '4px',
    display: 'block',
    margin: '0 auto',
  },
  dialogPhotoCounter: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    color: '#ffffff',
    fontSize: '12px',
    padding: '3px 10px',
    borderRadius: '12px',
    pointerEvents: 'none',
  },
}

export class WorldLocationPopup extends PureComponent {
  state = {
    activePhotoIndex: 0,
    mediaTab: 'photo',
  }

  handlePrevPhoto = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const { allPictures } = this.props
    this.setState((prevState) => ({
      activePhotoIndex:
        prevState.activePhotoIndex > 0
          ? prevState.activePhotoIndex - 1
          : allPictures.length - 1,
    }))
  }

  handleNextPhoto = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const { allPictures } = this.props
    this.setState((prevState) => ({
      activePhotoIndex:
        prevState.activePhotoIndex < allPictures.length - 1
          ? prevState.activePhotoIndex + 1
          : 0,
    }))
  }

  handleSelectPhoto = (idx, e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.setState({ activePhotoIndex: idx })
  }

  handleTabChange = (tab, e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.setState({ mediaTab: tab })
  }

  render() {
    const { loc, categoryDef, allPictures, formatMessage, onOpenDetail } =
      this.props
    const { activePhotoIndex, mediaTab } = this.state

    const hasPictures = allPictures && allPictures.length > 0
    const currentPhoto = hasPictures
      ? allPictures[activePhotoIndex] || allPictures[0]
      : null
    const embedVideoUrl = getYouTubeEmbedUrl(loc.video)
    const hasEmbedVideo = Boolean(embedVideoUrl)
    const hasBothMedia = hasPictures && hasEmbedVideo

    const isShowingVideo =
      (hasBothMedia && mediaTab === 'video') || (!hasPictures && hasEmbedVideo)
    const isShowingPhoto =
      hasPictures && (!hasBothMedia || mediaTab === 'photo')

    const locationAddress = [
      loc.address && loc.address.city,
      loc.address && loc.address.province,
      loc.address && loc.address.country,
    ]
      .filter(Boolean)
      .join(', ')

    const badgeColor = categoryDef ? categoryDef.color : '#00bcd4'

    return (
      <div style={styles.popupCard}>
        {/* If both photos and video are available, show tabs */}
        {hasBothMedia && (
          <div style={styles.popupMediaTabs}>
            <button
              type="button"
              style={{
                ...styles.popupTabBtn,
                ...(mediaTab === 'photo' ? styles.popupTabBtnActive : {}),
              }}
              onClick={(e) => this.handleTabChange('photo', e)}
            >
              📷 {formatMessage(messages.photosTab, { count: allPictures.length })}
            </button>
            <button
              type="button"
              style={{
                ...styles.popupTabBtn,
                ...(mediaTab === 'video' ? styles.popupTabBtnActive : {}),
              }}
              onClick={(e) => this.handleTabChange('video', e)}
            >
              ▶ {formatMessage(messages.videoTab)}
            </button>
          </div>
        )}

        {/* Photo view */}
        {isShowingPhoto && (
          <div style={styles.popupMediaContainer}>
            <img
              src={currentPhoto}
              alt={loc.name}
              style={styles.popupMainImage}
              onClick={() => onOpenDetail(loc, activePhotoIndex)}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            {allPictures.length > 1 && (
              <div>
                <span style={styles.photoCounterBadge}>
                  {activePhotoIndex + 1} / {allPictures.length}
                </span>
                <button
                  type="button"
                  style={{ ...styles.photoNavBtn, left: '6px' }}
                  onClick={this.handlePrevPhoto}
                  aria-label="Previous photo"
                >
                  &#8249;
                </button>
                <button
                  type="button"
                  style={{ ...styles.photoNavBtn, right: '6px' }}
                  onClick={this.handleNextPhoto}
                  aria-label="Next photo"
                >
                  &#8250;
                </button>
              </div>
            )}
          </div>
        )}

        {/* Thumbnail strip if multiple photos and showing photos */}
        {isShowingPhoto && allPictures.length > 1 && (
          <div style={styles.thumbnailStrip}>
            {allPictures.map((pic, idx) => (
              <img
                key={idx}
                src={pic}
                alt=""
                style={{
                  ...styles.thumbnailItem,
                  border:
                    idx === activePhotoIndex
                      ? `2px solid ${badgeColor}`
                      : '1px solid #ddd',
                  opacity: idx === activePhotoIndex ? 1 : 0.65,
                }}
                onClick={(e) => this.handleSelectPhoto(idx, e)}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            ))}
          </div>
        )}

        {/* Video view */}
        {isShowingVideo && (
          <div style={styles.popupVideoContainer}>
            <iframe
              src={embedVideoUrl}
              title={loc.name}
              width="100%"
              height="180"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: 'block' }}
            />
          </div>
        )}

        {/* Popup Information Body */}
        <div style={styles.popupBody}>
          <h4 style={styles.popupTitle}>{loc.name}</h4>

          {loc.tipo && (
            <span style={{ ...styles.popupBadge, backgroundColor: badgeColor }}>
              {loc.tipo}
            </span>
          )}

          {locationAddress && (
            <div style={styles.popupAddress}>
              <PinIcon />
              <span>{locationAddress}</span>
            </div>
          )}

          {loc.description && <p style={styles.popupDesc}>{loc.description}</p>}

          {/* Links */}
          <div style={styles.popupLinks}>
            {loc.links &&
              loc.links.mainWeb &&
              isValidUrl(loc.links.mainWeb) && (
                <a
                  href={loc.links.mainWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.linkBtn}
                >
                  <GlobeIcon />
                  {formatMessage(messages.mainWeb)}
                </a>
              )}
            {loc.links &&
              loc.links.proyectWeb &&
              isValidUrl(loc.links.proyectWeb) && (
                <a
                  href={loc.links.proyectWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.linkBtn}
                >
                  <ProjectIcon />
                  {formatMessage(messages.proyectWeb)}
                </a>
              )}
            {loc.links &&
              loc.links.urlNews &&
              isValidUrl(loc.links.urlNews) && (
                <a
                  href={loc.links.urlNews}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.linkBtn}
                >
                  <NewsIcon />
                  {formatMessage(messages.urlNews)}
                </a>
              )}
            {loc.video && isValidUrl(loc.video) && !hasEmbedVideo && (
              <a
                href={loc.video}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.linkBtn, ...styles.linkBtnVideo }}
              >
                <VideoIcon />
                {formatMessage(messages.video)}
              </a>
            )}
          </div>

          {/* View Details Button */}
          <button
            type="button"
            style={{ ...styles.detailBtn, backgroundColor: badgeColor }}
            onClick={() => onOpenDetail(loc, activePhotoIndex)}
          >
            <ZoomInIcon />
            {formatMessage(messages.viewDetails)}
          </button>
        </div>
      </div>
    )
  }
}

WorldLocationPopup.propTypes = {
  loc: PropTypes.object.isRequired,
  categoryDef: PropTypes.object,
  allPictures: PropTypes.array.isRequired,
  formatMessage: PropTypes.func.isRequired,
  onOpenDetail: PropTypes.func.isRequired,
}

export class WorldView extends PureComponent {
  state = {
    locations: [],
    loading: true,
    error: null,
    searchText: '',
    selectedCategory: '',
    zoom: 3,
    center: [30, 0],
    selectedLocation: null,
    dialogPhotoIndex: 0,
  }

  async componentDidMount() {
    try {
      const locations = await api.WORLD_REQUEST()
      if (Array.isArray(locations)) {
        this.setState({ locations, loading: false })
      } else {
        this.setState({ locations: [], loading: false })
      }
    } catch (err) {
      this.setState({ error: err.message, loading: false })
    }
  }

  handleSearchChange = (event) => {
    this.setState({ searchText: event.target.value })
  }

  setMapRef = (ref) => {
    this.map = ref ? ref.leafletElement : null
  }

  // Mac trackpad pinch gestures arrive as wheel events with ctrlKey set.
  // Plain two-finger scroll (no ctrlKey) is left alone so the page scrolls.
  handlePinchWheel = (event) => {
    if (!event.ctrlKey || !this.map) return
    event.preventDefault()
    this.pinchDelta = (this.pinchDelta || 0) - event.deltaY * 0.05
    if (Math.abs(this.pinchDelta) >= 1) {
      const step = this.pinchDelta > 0 ? 1 : -1
      this.pinchDelta = 0
      this.map.setZoomAround(
        this.map.mouseEventToContainerPoint(event),
        this.map.getZoom() + step
      )
    }
  }

  setMapWrapperRef = (el) => {
    if (this.mapWrapper) {
      this.mapWrapper.removeEventListener('wheel', this.handlePinchWheel)
    }
    this.mapWrapper = el
    if (el) {
      // non-passive so preventDefault stops the browser page zoom
      el.addEventListener('wheel', this.handlePinchWheel, { passive: false })
    }
  }

  handleCategoryChange = (event, index, value) => {
    this.setState({ selectedCategory: value })
  }

  handleOpenDetail = (location, photoIndex) => {
    this.setState({
      selectedLocation: location,
      dialogPhotoIndex: typeof photoIndex === 'number' ? photoIndex : 0,
    })
  }

  handleCloseDetail = () => {
    this.setState({ selectedLocation: null })
  }

  handlePrevDialogPhoto = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const { selectedLocation, dialogPhotoIndex } = this.state
    if (!selectedLocation) return
    const pictures = getAllPictures(selectedLocation)
    this.setState({
      dialogPhotoIndex:
        dialogPhotoIndex > 0 ? dialogPhotoIndex - 1 : pictures.length - 1,
    })
  }

  handleNextDialogPhoto = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const { selectedLocation, dialogPhotoIndex } = this.state
    if (!selectedLocation) return
    const pictures = getAllPictures(selectedLocation)
    this.setState({
      dialogPhotoIndex:
        dialogPhotoIndex < pictures.length - 1 ? dialogPhotoIndex + 1 : 0,
    })
  }

  getFilteredLocations = () => {
    const { locations, searchText, selectedCategory } = this.state
    const query = searchText.trim().toLowerCase()

    return locations.filter((loc) => {
      // Filter by category if selected
      if (selectedCategory) {
        const catKey = getLocationCategoryKey(loc)
        if (catKey !== selectedCategory) {
          return false
        }
      }

      // Filter by search text if provided
      if (query) {
        const nameMatch =
          loc.name && loc.name.toLowerCase().indexOf(query) !== -1
        const tipoMatch =
          loc.tipo && loc.tipo.toLowerCase().indexOf(query) !== -1
        const descMatch =
          loc.description && loc.description.toLowerCase().indexOf(query) !== -1
        const cityMatch =
          loc.address &&
          loc.address.city &&
          loc.address.city.toLowerCase().indexOf(query) !== -1
        const countryMatch =
          loc.address &&
          loc.address.country &&
          loc.address.country.toLowerCase().indexOf(query) !== -1
        const provinceMatch =
          loc.address &&
          loc.address.province &&
          loc.address.province.toLowerCase().indexOf(query) !== -1

        return (
          nameMatch ||
          tipoMatch ||
          descMatch ||
          cityMatch ||
          countryMatch ||
          provinceMatch
        )
      }

      return true
    })
  }

  getAvailableCategories = () => {
    const { locations } = this.state
    const counts = {}

    locations.forEach((loc) => {
      const catKey = getLocationCategoryKey(loc)
      counts[catKey] = (counts[catKey] || 0) + 1
    })

    return Object.keys(CATEGORY_DEFINITIONS)
      .filter((catKey) => counts[catKey] > 0)
      .map((catKey) => ({
        ...CATEGORY_DEFINITIONS[catKey],
        count: counts[catKey],
      }))
  }

  render() {
    const {
      loading,
      error,
      searchText,
      selectedCategory,
      zoom,
      center,
      selectedLocation,
      dialogPhotoIndex,
    } = this.state
    const { intl } = this.props
    const { formatMessage } = intl

    const filteredLocations = this.getFilteredLocations()
    const availableCategories = this.getAvailableCategories()

    const selectedCatKey = selectedLocation
      ? getLocationCategoryKey(selectedLocation)
      : 'otro'
    const selectedCatDef =
      CATEGORY_DEFINITIONS[selectedCatKey] || CATEGORY_DEFINITIONS.otro

    const dialogPictures = selectedLocation
      ? getAllPictures(selectedLocation)
      : []
    const dialogEmbedVideo = selectedLocation
      ? getYouTubeEmbedUrl(selectedLocation.video)
      : null

    const dialogAddress =
      selectedLocation &&
      [
        selectedLocation.address && selectedLocation.address.address,
        selectedLocation.address && selectedLocation.address.city,
        selectedLocation.address && selectedLocation.address.province,
        selectedLocation.address && selectedLocation.address.country,
      ]
        .filter(Boolean)
        .join(', ')

    return (
      <div>
        <View
          left={true}
          right={true}
          top={1}
          bottom={0}
          style={{ paddingBottom: '16px' }}
        >
          <ReadMargin>
            <P>
              <FormattedMessage {...messages.arasaacInWorld} />
            </P>
          </ReadMargin>

          <Paper zDepth={0} style={styles.controlsContainer}>
            <div style={styles.controlItem}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ActionSearch
                  style={{
                    marginRight: '8px',
                    color: '#757575',
                    minWidth: '24px',
                    marginTop: '14px',
                  }}
                />
                <TextField
                  id="world-search-input"
                  floatingLabelText={formatMessage(messages.searchPlaceholder)}
                  value={searchText}
                  onChange={this.handleSearchChange}
                  fullWidth={true}
                  underlineShow={true}
                />
              </div>
            </div>

            <div style={styles.controlItem}>
              <SelectField
                floatingLabelText={formatMessage(messages.filterByTipo)}
                floatingLabelFixed={true}
                value={selectedCategory}
                onChange={this.handleCategoryChange}
                fullWidth={true}
              >
                <MenuItem
                  value=""
                  primaryText={formatMessage(messages.allTypes)}
                />
                {availableCategories.map((cat) => (
                  <MenuItem
                    key={cat.key}
                    value={cat.key}
                    label={`${formatMessage(cat.message)} (${cat.count})`}
                    primaryText={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: cat.color,
                            marginRight: '10px',
                            display: 'inline-block',
                            flexShrink: 0,
                          }}
                        />
                        <span>
                          {formatMessage(cat.message)} ({cat.count})
                        </span>
                      </div>
                    }
                  />
                ))}
              </SelectField>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={styles.counterText}>
                <FormattedMessage
                  {...messages.resultsCount}
                  values={{ count: filteredLocations.length }}
                />
              </div>
              <Link to="/world/upload" style={{ textDecoration: 'none', marginLeft: '16px' }}>
                <RaisedButton
                  label={formatMessage(messages.addInitiative)}
                  primary={true}
                />
              </Link>
            </div>
          </Paper>
        </View>

        {/* Leaflet CSS overrides scoped to world-map-wrapper */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .world-map-wrapper .custom-cat-marker {
                background: transparent !important;
                border: none !important;
              }
              .world-map-wrapper .custom-map-marker {
                transition: transform 0.15s ease, filter 0.15s ease;
              }
              .world-map-wrapper .custom-map-marker:hover {
                transform: scale(1.18);
                filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.45));
                z-index: 1000 !important;
              }
              .world-map-wrapper .leaflet-popup-content-wrapper {
                padding: 0 !important;
                border-radius: 8px !important;
                overflow: hidden !important;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25) !important;
              }
              .world-map-wrapper .leaflet-popup-content {
                margin: 0 !important;
                width: 320px !important;
                line-height: 1.4 !important;
              }
              .world-map-wrapper a.leaflet-popup-close-button {
                top: 8px !important;
                right: 8px !important;
                color: #ffffff !important;
                background: rgba(0, 0, 0, 0.55) !important;
                border-radius: 50% !important;
                width: 24px !important;
                height: 24px !important;
                line-height: 1 !important;
                padding: 0 !important;
                box-sizing: border-box !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                text-align: center !important;
                z-index: 20 !important;
                text-shadow: none !important;
                border: 1px solid rgba(255, 255, 255, 0.4) !important;
                text-decoration: none !important;
                font-size: 16px !important;
                font-weight: bold !important;
              }
              .world-map-wrapper a.leaflet-popup-close-button:hover {
                background: rgba(0, 0, 0, 0.85) !important;
                color: #ffffff !important;
              }
            `,
          }}
        />

        {loading ? (
          <div style={styles.loadingContainer}>
            <CircularProgress size={60} thickness={5} />
            <P style={{ marginTop: '16px', color: '#666' }}>
              <FormattedMessage {...messages.loading} />
            </P>
          </div>
        ) : error ? (
          <div style={styles.loadingContainer}>
            <P style={{ color: '#d32f2f' }}>{error}</P>
          </div>
        ) : (
          <div
            className="world-map-wrapper"
            style={styles.mapWrapper}
            ref={this.setMapWrapperRef}
          >
            <ReactMap
              ref={this.setMapRef}
              center={center}
              zoom={zoom}
              style={{ width: '100%', height: '800px' }}
              scrollWheelZoom={false}
              dragging={!(L.Browser && L.Browser.mobile)}
              touchZoom={!(L.Browser && L.Browser.mobile)}
            >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {filteredLocations.map((loc) => {
                  const lat =
                    loc.latitude !== undefined && loc.latitude !== null
                      ? parseFloat(loc.latitude)
                      : loc.location && loc.location.coordinates
                      ? parseFloat(loc.location.coordinates[1])
                      : NaN
                  const lng =
                    loc.longitude !== undefined && loc.longitude !== null
                      ? parseFloat(loc.longitude)
                      : loc.location && loc.location.coordinates
                      ? parseFloat(loc.location.coordinates[0])
                      : NaN

                  if (isNaN(lat) || isNaN(lng)) return null

                  const allPictures = getAllPictures(loc)
                  const catKey = getLocationCategoryKey(loc)
                  const catDef =
                    CATEGORY_DEFINITIONS[catKey] || CATEGORY_DEFINITIONS.otro
                  const markerIcon = getCategoryIcon(catKey)

                  return (
                    <Marker
                      key={loc.id || loc._id}
                      position={[lat, lng]}
                      icon={markerIcon}
                    >
                      <Popup minWidth={320} maxWidth={340} autoPan={true}>
                        <WorldLocationPopup
                          loc={loc}
                          categoryDef={catDef}
                          allPictures={allPictures}
                          formatMessage={formatMessage}
                          onOpenDetail={this.handleOpenDetail}
                        />
                      </Popup>
                    </Marker>
                  )
                })}
              </ReactMap>
            </div>
          )}

        {/* Modal Dialog for full view of images, video and details */}
        {selectedLocation && (
          <Dialog
            title={selectedLocation.name}
            modal={false}
            open={Boolean(selectedLocation)}
            onRequestClose={this.handleCloseDetail}
            autoScrollBodyContent={true}
            contentStyle={{ maxWidth: '820px', width: '92%' }}
            actions={[
              <FlatButton
                label={formatMessage(messages.close)}
                primary={true}
                onClick={this.handleCloseDetail}
              />,
            ]}
          >
            <div>
              {selectedLocation.tipo && (
                <div style={{ marginBottom: '12px' }}>
                  <span
                    style={{
                      ...styles.popupBadge,
                      backgroundColor: selectedCatDef.color,
                    }}
                  >
                    {selectedLocation.tipo}
                  </span>
                  {dialogAddress && (
                    <span
                      style={{
                        marginLeft: '10px',
                        fontSize: '13px',
                        color: '#666666',
                      }}
                    >
                      {dialogAddress}
                    </span>
                  )}
                </div>
              )}

              {/* Full photo gallery */}
              {dialogPictures.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div
                    style={{
                      position: 'relative',
                      backgroundColor: '#111111',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={dialogPictures[dialogPhotoIndex] || dialogPictures[0]}
                      alt={selectedLocation.name}
                      style={styles.dialogGalleryMain}
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                    {dialogPictures.length > 1 && (
                      <div>
                        <span style={styles.dialogPhotoCounter}>
                          {dialogPhotoIndex + 1} / {dialogPictures.length}
                        </span>
                        <button
                          type="button"
                          style={{
                            ...styles.photoNavBtn,
                            left: '10px',
                            width: '36px',
                            height: '36px',
                            fontSize: '22px',
                          }}
                          onClick={this.handlePrevDialogPhoto}
                          aria-label="Previous photo"
                        >
                          &#8249;
                        </button>
                        <button
                          type="button"
                          style={{
                            ...styles.photoNavBtn,
                            right: '10px',
                            width: '36px',
                            height: '36px',
                            fontSize: '22px',
                          }}
                          onClick={this.handleNextDialogPhoto}
                          aria-label="Next photo"
                        >
                          &#8250;
                        </button>
                      </div>
                    )}
                  </div>

                  {dialogPictures.length > 1 && (
                    <div style={{ ...styles.thumbnailStrip, marginTop: '8px' }}>
                      {dialogPictures.map((pic, idx) => (
                        <img
                          key={idx}
                          src={pic}
                          alt=""
                          style={{
                            ...styles.thumbnailItem,
                            width: '56px',
                            height: '56px',
                            border:
                              idx === dialogPhotoIndex
                                ? `2px solid ${selectedCatDef.color}`
                                : '1px solid #ccc',
                            opacity: idx === dialogPhotoIndex ? 1 : 0.6,
                          }}
                          onClick={() =>
                            this.setState({ dialogPhotoIndex: idx })
                          }
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Embedded video player */}
              {dialogEmbedVideo && (
                <div
                  style={{
                    marginBottom: '16px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    backgroundColor: '#000000',
                  }}
                >
                  <iframe
                    src={dialogEmbedVideo}
                    title={selectedLocation.name}
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ display: 'block' }}
                  />
                </div>
              )}

              {/* Full description */}
              {selectedLocation.description && (
                <div
                  style={{ margin: '14px 0', fontSize: '14px', lineHeight: 1.6 }}
                >
                  <P>{selectedLocation.description}</P>
                </div>
              )}

              {/* External Links */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  marginTop: '14px',
                }}
              >
                {selectedLocation.links &&
                  selectedLocation.links.mainWeb &&
                  isValidUrl(selectedLocation.links.mainWeb) && (
                    <RaisedButton
                      href={selectedLocation.links.mainWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      primary={true}
                      label={formatMessage(messages.mainWeb)}
                      icon={<ActionLanguage />}
                      style={{ marginRight: '10px', marginBottom: '8px' }}
                    />
                  )}
                {selectedLocation.links &&
                  selectedLocation.links.proyectWeb &&
                  isValidUrl(selectedLocation.links.proyectWeb) && (
                    <RaisedButton
                      href={selectedLocation.links.proyectWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      label={formatMessage(messages.proyectWeb)}
                      icon={<ActionAssignment />}
                      style={{ marginRight: '10px', marginBottom: '8px' }}
                    />
                  )}
                {selectedLocation.links &&
                  selectedLocation.links.urlNews &&
                  isValidUrl(selectedLocation.links.urlNews) && (
                    <RaisedButton
                      href={selectedLocation.links.urlNews}
                      target="_blank"
                      rel="noopener noreferrer"
                      label={formatMessage(messages.urlNews)}
                      icon={<ActionDescription />}
                      style={{ marginRight: '10px', marginBottom: '8px' }}
                    />
                  )}
                {selectedLocation.video &&
                  isValidUrl(selectedLocation.video) &&
                  !dialogEmbedVideo && (
                    <RaisedButton
                      href={selectedLocation.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      secondary={true}
                      label={formatMessage(messages.video)}
                      icon={<AvVideoLibrary />}
                      style={{ marginRight: '10px', marginBottom: '8px' }}
                    />
                  )}
              </div>
            </div>
          </Dialog>
        )}
      </div>
    )
  }
}

WorldView.propTypes = {
  theme: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
}

const mapStateToProps = (state) => ({
  theme: state.get('theme'),
})

export default connect(mapStateToProps)(injectIntl(WorldView))
