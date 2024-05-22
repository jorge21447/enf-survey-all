import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
//import cert001 from "../assets/cert001.jpg";;
import LatoRegular from "../fonts/Lato/Lato-Regular.ttf";
import LatoBold from "../fonts/Lato/Lato-Bold.ttf";
import TinoBold from "../fonts/Tinos/Tinos-Bold.ttf"

Font.register({ family: "LatoRegular", src: LatoRegular });
Font.register({ family: "LatoBold", src: LatoBold });
Font.register({ family: "TinoBold", src: TinoBold });


const CertificatePDF = ({ users }) => {
  // Obtener mes y año actual
  const today = new Date();
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();

  // Definir estilos para el documento
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "white", // Color de fondo blanco
      padding: 70, // Margen de 40px en todos los lados
      width: "100%", // Ancho del contenido al 80%
      height: "100%", // Alto del contenido al 80%
      justifyContent: "center", // Alinear contenido verticalmente
      alignItems: "center", // Alinear contenido horizontalmente
      fontFamily: "LatoRegular",
      color: "#1f4e79",
      hyphenation: false,
      marginTop: 20,
    },
    section: {
      flexGrow: 1,
    },
    title1: {
      fontSize: 18,
      textAlign: "center",
      fontFamily: "LatoBold",
    },
    title2: {
      fontSize: 45,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 15,
      fontFamily: "TinoBold",
    },
    certificateText: {
      fontSize: 24,
      textAlign: "justify",
      marginTop: 20,
      hyphenation: false,
    },
    certificateTextCenter: {
      fontSize: 28,
      textAlign: "center",
      fontWeight: "bold",
      marginTop: 30,
      fontFamily: "LatoBold",
      hyphenation: false,
    },
    certificateTextBold: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 20,
      fontFamily: "LatoBold",
      hyphenation: false,
      textAlign: "justify",
    },
    firmas: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 40,
    },
    firma: {
      textAlign: "center",
      fontSize: 9,
    },
    column: {
      marginTop: 40,
      width: "33%",
      textAlign: "center",
      fontFamily: "LatoBold",
    },
    fecha: {
      marginTop: 10,
      fontSize: 16,
      textAlign: "right",
    },
  });

  // Contenido del documento PDF
  const content = (
    <Document>
      {users.map((user) => (
        <Page
          size="LETTER"
          orientation="landscape"
          style={styles.page}
          key={user.id}
        >
          {/* <Image src={cert001} style={styles.image} /> */}
          <View style={styles.section}>
            <Text style={styles.title1}>Otorga el presente</Text>
            <Text style={styles.title2}>C E R T I F I C A D O</Text>

            {user.role_id == "3" ? (
              <>
                <Text style={styles.certificateTextCenter}>
                  A: LIC. {user.name.toUpperCase()}
                </Text>
                <Text style={styles.certificateText}>
                  Por su valiosa labor como{" "}
                  <Text style={styles.certificateTextBold}>
                    Docente Asistencial
                  </Text>
                  , en la{" "}
                  <Text style={styles.certificateTextBold}>SUPERVISIÓN</Text> de
                  los estudiantes que realizaron práctica clínica en el Hospital
                  Obrero Nro. 1 C.N.S., asignatura Enfermería Medico Quirúrgica,
                  durante la Gestión Académica 2023.
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.certificateTextCenter}>
                  A: {user.role_id == "4" ? 'UNIV.' : 'LIC.'} {user.name.toUpperCase()}
                </Text>
                <Text style={styles.certificateText}>
                  Por su participación en actividades de EXTENSION SOCIAL en la
                  asignatura de ENFERMERÍA FUNDAMENTAL, en su práctica clínica
                  y/o comunitaria, durante la Gestión Académica 2023.
                </Text>
              </>
            )}

            <Text style={styles.fecha}>
              La Paz, {month} {year}
            </Text>

            <View style={styles.firmas}>
              <View style={styles.column}>
                <Text style={styles.firma}>M. Sc. Tania A. Pinto Ucharico</Text>
                <Text style={styles.firma}>DIRECTORA</Text>
                <Text style={styles.firma}>CARRERA DE ENFERMERÍA</Text>
                <Text style={styles.firma}>FAC.M.E.N.T.M.</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.firma}>Dr. Martin Villarroel Mareño</Text>
                <Text style={styles.firma}>VICEDECANO</Text>
                <Text style={styles.firma}>
                  FACULTAD DE MEDICINA, ENFERMERÍA
                </Text>
                <Text style={styles.firma}>NUTRICIÓN Y TECNOLOGÍA MÉDICA</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.firma}>Dr. David B. Mérida Vargas</Text>
                <Text style={styles.firma}>DECANO</Text>
                <Text style={styles.firma}>
                  FACULTAD DE MEDICINA, ENFERMERÍA
                </Text>
                <Text style={styles.firma}>NUTRICIÓN Y TECNOLOGÍA MÉDICA</Text>
              </View>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );

  return content;
};

export default CertificatePDF;
