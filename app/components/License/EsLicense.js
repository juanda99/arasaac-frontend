import React from 'react'
import Divider from 'material-ui/Divider'
import H3 from 'components/H3'
import P from 'components/P'
import CreativeCommons from './CreativeCommons'
import Arasaac from './Arasaac'
const EsLicense = () => (
  <div>
    <P>
      <Arasaac /> es una marca del Gobierno de Aragón, inscrita en la Oficina
      Española de Patentes y Marcas. La colección de pictogramas <Arasaac />{' '}
      está inscrita en el Registro General de la Propiedad Intelectual (Núm.
      Depósito Legal Z 901-2013) como obra colectiva a nombre de la Diputación
      General de Aragón, quien la ha editado y divulgado de conformidad a lo
      dispuesto en el artículo 8 del texto refundido de la Ley de Propiedad
      Intelectual, aprobado por el Real Decreto Legislativo 1/1996, de 12 de
      abril.
    </P>
    <P>
      Los recursos que se ofrecen en el sitio web (pictogramas,imágenes,
      locuciones o vídeos), al igual que los Materiales elaborados a partir de
      éstos, se publican bajo <CreativeCommons locale='es' />, autorizándose su
      uso para fines sin ánimo lucrativo siempre que se cite la fuente, autor y
      se compartan bajo la misma licencia.
    </P>
    <P>
      Queda excluido de este permiso, por tanto, el uso de estos recursos dentro
      de cualquier producto o publicación con fines comerciales.
    </P>

    <P>
      Para cualquier otro uso quedan rigurosamente prohibidas, sin la
      autorización por escrito de los titulares del “Copyright”, bajo las
      sanciones establecidas por las leyes, la reproducción total o parcial de
      estos recursos por cualquier medio o procedimiento, comprendida la
      reprografía y el tratamiento informático.
    </P>
    <P>
      Cualquier obra derivada a partir los recursos contenidos en los catálogos
      de <Arasaac /> (pictogramas, imágenes, locuciones o vídeos), se debe
      distribuir con la misma <CreativeCommons locale='es' />, se debe citar al
      autor y al propietario de los mismos (Gobierno de Aragón), la procedencia
      de los mismos (<Arasaac />) y la licencia bajo la que se distribuyen (
      <CreativeCommons locale='es' />
      ).
    </P>
    <P>
      En el caso de los pictogramas el modo de atribuir la autoría de los mismos
      es:
    </P>
    <P>
      <em>
        Los símbolos pictográficos utilizados son propiedad del Gobierno de
        Aragón y han sido creados por Sergio Palao para <Arasaac link={true} />,
        que los distribuye bajo <CreativeCommons locale='es' />.
      </em>
    </P>
    <P>O de modo breve:</P>
    <P>
      <em>
        Autor pictogramas: Sergio Palao <br /> Procedencia:{' '}
        <Arasaac link={true} />
        <br />
        Licencia: CC (BY-NC-SA)
        <br /> Propiedad: Gobierno de Aragon
      </em>
    </P>
    <Divider />
    <H3>Cláusula de exención de responsabilidad</H3>
    <P>
      El Gobierno de Aragón, no se responsabiliza del uso indebido o negligente
      de recursos contenidos en los catálogos de <Arasaac /> realizado por
      terceros que exceda los términos de la <CreativeCommons locale='es' />.
    </P>
  </div>
)

export default EsLicense
