import { Text, ChakraProvider, Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import * as Combinatorics from 'js-combinatorics';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import './style.css';

export default function App() {
  return (
    <>
      <ChakraProvider>
        <Solucionador />
      </ChakraProvider>
    </>
  );
}
function Solucionador(props) {
  const [hombres, setHombres] = useState(0);
  const [mujeres, setMujeres] = useState(0);

  let grupos = [];

  function chMuj(e) {
    setMujeres(parseInt(e.target.value));
  }

  function chHom(e) {
    setHombres(parseInt(e.target.value));
  }

  //Calcula el factorial
  function factorial(numero) {
    let f = 1,
      i;
    for (i = numero; i > 0; i--) {
      f = f * i;
    }
    return f;
  }

  //Calcula la combinatoria
  function combinatoria(n, m) {
    return factorial(n) / (factorial(n - m) * factorial(m));
  }

  //Genera la matriz de grupo
  function matriz() {
    let elementos = [];

    if (isNaN(hombres) || isNaN(mujeres)) {
      console.log('error');
      return 0;
    } else {
      //Genera nombres M*
      for (let i = 0; i < mujeres; i++) {
        elementos.push(`M${i + 1}`);
      }

      //Genera nombres H*
      for (let i = 0; i < hombres; i++) {
        elementos.push(`H${i + 1}`);
      }

      //Libreria que genera la combinatoria
      let com = Combinatorics.Combination.of(elementos, 2);
      let result = [...com];

      console.log(grupos);
      //Se deja como string
      let mat = result.map(function (x) {
        return `(${x[0] + x[1]})`;
      });
      grupos = mat;
      return mat;
    }
  }

  function totalMatriz() {
    return matriz().length;
  }

  function calcResult() {
    if (isNaN(hombres) || isNaN(mujeres)) {
      return 0;
    } else {
      matriz(hombres, mujeres);

      let numerador = 0;
      let denominador = 0;

      let res = combinatoria(mujeres, 2);

      if (res >= 1) {
        numerador = res;
      }

      denominador = combinatoria(mujeres + hombres, 2);
      if (numerador != 0) {
        return `${numerador}/${denominador} = ${parseFloat(
          ((numerador / denominador) * 100).toFixed(2)
        )}%`;
      } else {
        return 'Ingresa un valor!';
      }
    }
  }

  return (
    <Container style={{ fontSize: '2rem' }}>
      <Card style={{ width: '90%', margin: '1rem' }}>
        <Card.Body>
          <Card.Body>
            <Text style={{ fontSize: '1.5em', color: 'green' }}>
              Parametrizacion Ejercicio N°2.29 Sección.N°2.5
            </Text>
          </Card.Body>
          <Card.Img
            variant="top"
            src="https://img.freepik.com/vector-premium/jurado-juicio_81894-3200.jpg"
          />
          <Card.Body>
            <Text style={{ fontSize: '0.8em', color: 'grey' }}>
              Orden propuesto en Wackerly, Mendenhall y Scheaffer (2010, p. 39)
              Tomado de
              <a
                href="https://www.cimat.mx/ciencia_para_jovenes/bachillerato/libros/[Wackerly,Mendenhall,Scheaffer]Estadistica_Matematica_con_Aplicaciones.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Estadística matemática con aplicaciones - Wackerly, Mendenhall &
                Scheaffer - 7ED.
              </a>
            </Text>
          </Card.Body>

          <Card.Body style={{ padding: '0,5rem' }}>
            Se necesitan dos jurados adicionales para completar un jurado para
            un juicio criminal. Hay seis jurados en perspectiva, dos mujeres y
            cuatro hombres. Dos de los jurados son seleccionados al azar de
            entre los seis disponibles.
          </Card.Body>
          <Card.Body style={{ padding: '0,5rem' }}>
            Defina el experimento y describa un punto muestral. Suponga que es
            necesario describir sólo los dos jurados seleccionados y no el orden
            en el que fueron elegidos. Indique el espacio muestral asociado con
            este experimento.
          </Card.Body>

          <Card.Body style={{ padding: '0,5rem' }}>
            ¿Cuál es la probabilidad de que los dos jurados seleccionados sean
            mujeres?
          </Card.Body>
        </Card.Body>
        <Card.Body>
          <Card.Text>
            <Row>
              <Col>
                <Text>Ingrese cantidad hombres:</Text>
                <Input value={hombres} type="number" onChange={chHom} />
              </Col>
              <Col>
                <Text>Ingrese cantidad de mujeres</Text>
                <Input value={mujeres} type="number" onChange={chMuj} />
              </Col>
            </Row>
            <Row style={{ padding: '1rem' }}>
              <Text>Espacio muestral del ejercicio: </Text>

              <Text>{matriz()}</Text>

              <Text>Total del espacio muestral: {totalMatriz()}</Text>
            </Row>
            <Text>
              La probabilidad de que{' '}
              <span style={{ color: '#d4af37', fontWeight: '700' }}>
                los dos jurados seleccionados sean mujeres es:
              </span>{' '}
              {calcResult()}
            </Text>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
