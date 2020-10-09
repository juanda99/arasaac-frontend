import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import View from "components/View";
import Helmet from "react-helmet";
import ReadMargin from "components/ReadMargin";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { makeSelectLocale } from "containers/LanguageProvider/selectors";
import P from "components/P";
import H2 from "components/H2";

const cookies = [
  {
    name: "_ga",
    time: "24 meses",
    desc:
      "Google Analytics. Información estadística de navegación del usuario.",
  },
  {
    name: "_gat_gtag_UA_46065439_1",
    time: "1 minuto",
    desc:
      "Google Analytics. Limita la recogida de datos en sitios con mucho tráfico o en picos de uso. Expira después de 1 minuto y no recoge datos.",
  },
  {
    name: "_gid",
    time: "24 horas",
    desc:
      "Google Analytics. Información estadística de navegación del usuario.",
  },
  {
    name: "NID",
    time: "6 meses",
    desc:
      "Registra una identificación única que identifica el dispositivo de un usuario que vuelve. La identificación se utiliza para los anuncios específicos y para autenticar en ARASAAC mediante red social de Google.",
  },
  {
    name: "_fbp",
    time: "3 meses",
    desc:
      "Se instala por Google Analytics. La usa facebook para publicidad y ARASAAC para obtener datos demográficos de sus visitantes.",
  },
  {
    name: "DSID",
    time: "15 días",
    desc:
      "Se instala por Google Analytics con fines publicitarios. ARASAAC la usa para obtener datos demográficos de sus visitantes.",
  },
  {
    name: "id",
    time: "Sesión",
    desc:
      "Se instala por Google Analytics con fines publicitarios. ARASAAC la usa para obtener datos demográficos de sus visitantes.",
  },
  {
    name: "redux-persist:theme",
    time: "Indefinido",
    desc: "Guarda el tema por defecto de visualización de la aplicación.",
  },
];

export class CookiesPolicyView extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { locale } = this.props;
    return (
      <View left={true} right={true} top={1}>
        <Helmet
          title="Política de Privacidad"
          meta={[
            {
              name: "description",
              content: "Política de Privacidad de datos de ARASAAC",
            },
          ]}
        />
        <ReadMargin>
          <div dir="ltr">
            <P>
              Las cookies son pequeños ficheros de texto que se almacenan en los
              equipos de los usuarios a través de las distintas webs que
              visitan. Son herramientas esenciales para la prestación de
              numerosos servicios de la sociedad de la información. Entre otros,
              permiten a una página web almacenar y recuperar información sobre
              los hábitos de navegación de un usuario o de su equipo y,
              dependiendo de la información obtenida, se pueden utilizar para
              reconocer al usuario y personalizar el servicio ofrecido.{" "}
            </P>
            <P>
              ARASAAC recoge datos con las siguientes finalidades:
              <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
                <li>
                  Obtener estadísticas de uso: número de visitas, paises,
                  frecuencia...
                </li>
                <li>Mejorar el rendimiento de la aplicación</li>
                <li>Mejorar la usabilidad de la aplicación</li>
              </ul>
            </P>

            <H2 primary={true}>Cookies de estadísticas</H2>
            <P>
              La página web de ARASAAC utiliza Google Analytics, un servicio de
              analítica web desarrollado por Google, que permite la medición y
              análisis de la navegación en las páginas web.
            </P>
            <P>
              En su navegador podrá observar varias cookies de este servicio, se
              tratan de "cookies" de sesión y de análisis. Son "cookies" que
              tratan datos agregados con una finalidad estrictamente
              estadística. La norma obliga a obtener un consentimiento informado
              para su uso y se incluye la posibilidad de que los usuarios
              manifiesten su negativa sobre su utilización.
            </P>

            <H2 primary={true}>
              Cómo restringir, bloquear y eliminar las cookies
            </H2>
            <P>
              Para restringir, bloquear y eliminar las cookies instaladas en su
              equipo puede consultar:
              <ul>
                <li>
                  {" "}
                  <a
                    href="https://support.google.com/accounts/answer/61416?hl=es"
                    target="_blank"
                  >
                    Chrome
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    href="https://support.mozilla.org/es/kb/Borrar%20cookies  "
                    target="_blank"
                  >
                    Firefox
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies"
                    target="_blank"
                  >
                    Internet Explorer
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    href="https://help.opera.com/en/latest/web-preferences/#cookies"
                    target="_blank"
                  >
                    Opera
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                    target="_blank"
                  >
                    Safari{" "}
                  </a>
                </li>
              </ul>
            </P>

            <H2 primary={true}>Lista de cookies</H2>
            <P>
              Tenga en consideración que los servicios de terceros que usamos en
              ARASAAC (servicios de autenticación externos y estadísticas)
              pueden usar cookies sobre las que no tenemos control directo, pero
              que debemos usar para que los servicios funcionen
            </P>
            <Table>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Nombre</TableHeaderColumn>
                  <TableHeaderColumn>Duración</TableHeaderColumn>
                  <TableHeaderColumn>Descripción</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {cookies.map((cookie) => (
                  <TableRow key={cookie.nombre}>
                    <TableRowColumn>{cookie.name}</TableRowColumn>
                    <TableRowColumn>{cookie.time}</TableRowColumn>
                    <TableRowColumn style={{ whiteSpace: "inherit" }}>
                      {cookie.desc}
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <P>
              Además pueden aparecer cookies con proveedores Facebook y/o Google
              si iniciamos sesión en ARASAAC con una cuenta de dichas redes
              sociales.
            </P>
          </div>
        </ReadMargin>
      </View>
    );
  }
}

CookiesPolicyView.propTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

export default connect(mapStateToProps)(CookiesPolicyView);
