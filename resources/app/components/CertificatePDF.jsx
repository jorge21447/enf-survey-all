import { Document, Page, Text, View, StyleSheet, Image, Link } from "@react-pdf/renderer";
import cert001 from '../assets/cert001.jpg'
const CertificatePDF = ({ degree, name }) => {
  // Definir estilos para el documento
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "red", // Color de fondo rojo
    },
    section: {
      
      flexGrow: 1,
      textAlign: "center",
    },
    degree: {
      fontSize: 36, // Tamaño de letra ajustado
      fontWeight: "bold",
      marginBottom: 20,
    },
    name: {
        fontSize: 24, // Tamaño de letra mediano
        fontWeight: "bold",
        color: "#44526a", // Color de texto #44526a
        position: "absolute", // Posición absoluta en el centro
        top: "53%", // Alinear al centro vertical
        left: "42%", // Alinear al centro horizontal
        transform: "translate(-50%, -50%)", // Centrar respecto al padre

      },
    image: {
        width: "100%", // Ajustar al 100% del contenedor
        height: "100%", // Ajustar al 100% del contenedor
        position: "absolute", // Posición absoluta detrás del texto
        zIndex: -1, // Z-index para colocar detrás del texto
      },
    link: {
      fontSize: 16,
      color: "blue",
    },
  });

  // Contenido del documento PDF
  const content = (
    <Document>
      <Page size="LETTER" orientation="landscape" style={styles.page}> {/* Tamaño de hoja ajustado a Letter */}
        <View style={styles.section}>
          <Text style={styles.name}>{degree} {name}</Text>
          {/* <Text style={styles.name}>{name}</Text> */}
          <Image src={cert001} style={styles.image} />
        </View>
      </Page>
    </Document>
  );

  return content;
};

export default CertificatePDF;