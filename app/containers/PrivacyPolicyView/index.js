import React from "react";
import PropTypes from "prop-types";
import View from "components/View";
import Helmet from "react-helmet";
import ReadMargin from "components/ReadMargin";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { makeSelectLocale } from "containers/LanguageProvider/selectors";
import P from "components/P";
import A from "components/A";
import H2 from "components/H2";

export class PrivacyPolicyView extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { locale } = this.props;
    return (
      <View left={true} right={true} top={1} dir="ltr">
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
          <P>
            Esta página informa sobre la política de privacidad y protección de
            datos del sitio web{" "}
            <A href="https://www.arasaac.org">www.arasaac.org</A>, que se ha
            adaptado al{" "}
            <strong>
              "Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de
              27 de abril de 2016, relativo a la protección de las personas
              físicas en lo que respecta al tratamiento de datos personales y a
              la libre circulación de estos datos"
            </strong>{" "}
            (en adelante, RGPD) y a la Ley Orgánica 3/2018, de 5 de diciembre,
            de Protección de Datos Personales y garantía de los derechos
            digitales.
          </P>
          <P>
            Esta política es aplicable tanto a la información recogida a través
            a través del sitio web{" "}
            <A href="https://www.arasaac.org">www.arasaac.org</A> como a los
            portales y y aplicaciones dependientes del mismo.
          </P>

          <P>
            El tratamiento de los datos de carácter personal recogidos en esta
            web y en los portales y aplicaciones asociados estará sujeto a la
            legislación vigente en materia de protección de datos, el RGPD y
            demás normativa de aplicación. De esta manera se garantiza en todo
            momento la privacidad de los usuarios, así como el secreto y
            seguridad de sus datos personales.
          </P>

          <P>
            El Gobierno de Aragón se compromete a guardar la máxima reserva y
            confidencialidad sobre la información que le sea facilitada y a
            utilizarla únicamente para los fines establecidos en cada caso.
          </P>

          <H2 primary={true}>
            Responsable del tratamiento de datos personales
          </H2>

          <P>
            El Gobierno de Aragón dispone de una base de datos llamada{" "}
            <em>
              "Registro de Actividades de Tratamiento del Gobierno de Aragón"
            </em>
            . En ella los Departamentos del Gobierno Aragón identifican las
            actividades de tratamiento que se aplica a cada conjunto de datos
            personal. Los datos tratados son los estrictamente necesarios,
            adecuados y pertinentes para cada finalidad.{" "}
          </P>
          <P>
            Los datos recogidos en esta web serán incorporados y tratados en el
            Registro de Actividades de Tratamiento de la Dirección General de
            Innovación y Formación Profesional “ARASAAC”. Sus datos personales
            serán tratados con el fin exclusivo de gestión del proyecto ARASAAC,
            abarcando las reclamaciones en vía administrativa y judicial, así
            como las solicitudes en materia de transparencia.
          </P>
          <P>
            El órgano responsable del Registro de Actividades de Tratamiento es
            la Dirección General de Innovación y Formación Profesional.
          </P>

          <P>
            La licitud del tratamiento de los datos es necesaria para el
            cumplimiento de una obligación legal aplicable al responsable del
            tratamiento. Estos datos no se cederán a terceros, salvo obligación
            legal.
          </P>

          <H2 primary={true}>Derechos de los interesados</H2>

          <P>
            Cualquier persona tiene derecho a obtener información sobre los
            tratamientos de sus datos personales hechos por el Gobierno de
            Aragón. Se podrán ejercitar los derechos de acceso, rectificación,
            supresión, portabilidad de los datos y los de limitación y oposición
            a los tratamientos. También se podrá ejercitar el derecho a no ser
            objeto de decisiones basadas únicamente en el tratamiento
            automatizado de los datos, incluida la elaboración de perfiles. Los
            derechos se ejercitarán ante el órgano responsable del tratamiento.
          </P>

          <P>
            Podrá Ud. ejercer sus derechos de acceso, rectificación, supresión y
            portabilidad de datos de carácter personal, así como de limitación y
            oposición a su tratamiento, de conformidad con lo dispuesto en el
            Reglamento General de Protección de Datos, ante dicha Dirección
            General (Avda. Ranillas nº 5 D 50.071 Zaragoza), o en la dirección
            de correo electrónico dginnovacionyfp@aragon.es, de conformidad con
            lo dispuesto en el Reglamento General de Protección de Datos. Podrá
            consultar información adicional y detallada en el &nbsp;
            <A
              href="http://aplicaciones.aragon.es/notif_lopd_pub/details.action?fileId=249&fileVersion=1"
              target="_blank"
            >
              Registro de Actividades de Tratamiento del Gobierno de Aragón
            </A>
            , identificando la siguiente actividad de tratamiento: “ARASAAC".
          </P>

          <P>
            También se puede presentar una reclamación ante la Agencia Española
            de Protección de Datos en el caso de que considere que el
            tratamiento de sus datos no está siendo adecuado.
          </P>

          <H2 primary={true}>Seguridad de los datos personales</H2>
          <P>
            En cumplimiento con lo dispuesto en el artículo 32 del RGPD, el
            Gobierno de Aragón garantizará la confidencialidad, integridad,
            disponibilidad y resiliencia permanentes de los sistemas y servicios
            de tratamiento. El nivel de seguridad será proporcional al riesgo en
            el tratamiento de cada tipo de datos personales.
          </P>

          <H2 primary={true}>
            Utilización de cookies y registro de direcciones IP
          </H2>
          <P>
            La única información que se recoge de los usuarios es el formulario
            de alta (nombre, correo electrónico, empresa y sitio web). La
            información se guarda en servidores pertenecientes al Gobierno de
            Aragón y localizados en la Unión Europea.
          </P>
          <P>
            Se utilizan una serie de cookies para el funcionamiento del sitio
            web y las aplicaciones, así como la herramienta Google Analytics con
            fines exclusivamente estadísticos. Toda esta información aparece
            detallada en nuestra Política de Cookies
          </P>
        </ReadMargin>
      </View>
    );
  }
}

PrivacyPolicyView.propTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

export default connect(mapStateToProps)(PrivacyPolicyView);
