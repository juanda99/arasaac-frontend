import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import P from 'components/P'

export default class MaterialConditions extends React.Component {
  state = {
    open: true,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Aceptar"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          title="Información sobre publicación de materiales"
          actions={actions}
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
          <P> ARASAAC establece unos criterios para la publicación de materiales. Esperamos que comprendas la necesidad de seguir estos criterios y te agradecemos tu colaboración.  </P>
          <P>El material que va a publicar debe contener pictogramas de ARASAAC. </P>
          <P>Siempre que sea posible, se aportarán los archivos en formato de lectura/visualización (pdf, pps,....) y
          editable (doc, docx, ppt, pptx, odf, pszip...) de modo que se facilite la traducción de los mismos a otros
          idiomas y las adaptaciones. </P>
          <P>Todos los ficheros, fotografías, imágenes y textos que aparezcan en el material deberán ser compatibles con la licencia Creative Commons de ARASAAC.</P>
          <P>El material debe incluir la cita de la licencia de ARASAAC en el pie de página preferentemente junto con el nombre del autor/a del material para que la autoría intelectual del material quede también protegida bajo la misma licencia. </P>

          <P>El modo correcto de realizar la cita es el siguiente:</P>

          <em>
            Autor pictogramas: Sergio Palao <br />Procedencia: ARASAAC (http://arasaac.org) <br /> Licencia: CC (BY-NC-SA) <br />Autor/a:....
          </em>

          <P>En el caso de las traducciones, se añade el nombre del tradutor/a al final de la licencia original.</P>

          <em>
            Autor pictogramas: Sergio Palao <br />Procedencia: ARASAAC (http://arasaac.org) <br /> Licencia: CC (BY-NC-SA) <br />Autor/a:.... <br />Traductor/a: .......
           </em>


          <P>
            En el caso de la adaptación de un material existente, se añade el nombre de la persona que lo ha adaptado al final de la licencia original.
</P>

          <em>
            Autor pictogramas: Sergio Palao <br />Procedencia: ARASAAC (http://arasaac.org) <br /> Licencia: CC (BY-NC-SA) <br />Autor/a:.... <br />Adaptado por      : .......
</em>
        </Dialog>
      </div>
    );
  }
}