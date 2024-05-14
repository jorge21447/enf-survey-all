import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import {convertirNumeroALetras, convertirFecha} from "../utils/util";

// Images
import logoEnf from "../assets/logo-enf.png";
import logoUMSA from "../assets/logo-UMSA.png";

// Register font
import LatoRegular from "../fonts/Lato/Lato-Regular.ttf";
import LatoBold from "../fonts/Lato/Lato-Bold.ttf";
import LatoBlack from "../fonts/Lato/Lato-Black.ttf";

Font.register({ family: "LatoRegular", src: LatoRegular });
Font.register({ family: "LatoBold", src: LatoBold });
Font.register({ family: "LatoBlack", src: LatoBlack });

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    fontFamily: "LatoRegular",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: "10px",
  },
  body: {
    padding: "20px",
    fontSize: "11px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageLogo: {
    width: "35px",
  },
  imageLogoCarrera: {
    width: "50px",
  },
  title: {
    textAlign: "center",
    marginBottom: "5px",
  },
  content: {
    display: "flex",
    gap: "10",
    paddingHorizontal: "13px",
    marginTop: "15px",
  },
  divSeparador: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  span: {
    color: "black",
  },
  firmasContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "35px",
  },
  firmas: {
    display: "flex",
    alignItems: "center",
    lineHeight: "1.5",
  },
  titleNumber: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: "5px",
    marginBottom: "2px",
  },
  titleBigger: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  textRed: {
    color: "#EF4444",
  },
  container2: {
    borderTopColor: "#9e9e9e",
    borderTopStyle: "solid",
    borderTopWidth: 0.5,
    paddingTop: "20px",
    marginTop: "20px",
  },
});

const PettyCashBoxPDF = ({ expenseSelected }) => {
  const {
    number,
    amount,
    description,
    manager,
    expenseDate,
    invoiceNumber,
    interested,
  } = expenseSelected;

  return (
    <PDFViewer style={styles.container}>
      <Document>
        <Page style={styles.body} size="LETTER" orientation="portrait" wrap>
          {/* COMPROBANTE */}
          <View style={styles.header}>
            <Image src={logoUMSA} style={styles.imageLogo} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                UNIVERSIDAD MAYOR DE SAN ANDRÉS
              </Text>
              <Text style={styles.title}>
                FACULTAD DE MEDICINA, ENFERMERÍA, NUTRICIÓN Y TECNOLOGÍA
                MÉDICA{" "}
              </Text>
              <Text style={styles.title}>CARRERA DE ENFERMERÍA</Text>
            </View>
            <Image src={logoEnf} style={styles.imageLogoCarrera} />
          </View>
          <View style={styles.titleNumber}>
            <Text style={styles.titleBigger}>
              COMPROBANTE DE CAJA CHICA N. {number}
            </Text>
          </View>
          <View style={styles.content}>
            <View style={styles.divSeparador}>
              <Text style={styles.textRed}>
                Ciudad: <Text style={styles.span}>La Paz</Text>
              </Text>
              <Text style={styles.textRed}>
                Fecha: <Text style={styles.span}>{convertirFecha(expenseDate)}</Text>
              </Text>
            </View>
            <View style={styles.divSeparador}>
              <Text style={styles.textRed}>
                Pagado a: <Text style={styles.span}>{interested}</Text>
              </Text>
              {!invoiceNumber && (
                <Text style={styles.textRed}>
                  Nro. de Vale: <Text style={styles.span}>{number}</Text>
                </Text>
              )}
              {invoiceNumber && (
                <Text style={styles.textRed}>
                  Nro. de Factura:{" "}
                  <Text style={styles.span}>{invoiceNumber}</Text>
                </Text>
              )}
            </View>
            <View style={styles.divSeparador}>
              <Text style={styles.textRed}>
                La suma de:<Text style={styles.span}> {amount} Bs.</Text>
              </Text>
              <Text style={styles.textRed}>
                Literal: <Text style={styles.span}>{convertirNumeroALetras(amount)} en efectivo</Text>
              </Text>
            </View>
            <Text style={styles.textRed}>
              Por concepto de: <Text style={styles.span}>{description}</Text>
            </Text>
            <View style={styles.firmasContent}>
              <Text>Firma autorizada</Text>
              <View style={styles.firmas}>
                <Text>{`${manager}`}</Text>
                <Text>RESPONSABLE</Text>
                <Text>ENTREGUE CONFORME</Text>
              </View>
              {!invoiceNumber && (
                <View style={styles.firmas}>
                  <Text>{interested}</Text>
                  <Text>INTERESADO</Text>
                  <Text>RECIBI CONFORME</Text>
                </View>
              )}
            </View>
          </View>

          {/* VALE */}
          {!invoiceNumber && (
            <View style={styles.container2}>
              <View style={styles.header}>
                <Image src={logoUMSA} style={styles.imageLogo} />
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>
                    UNIVERSIDAD MAYOR DE SAN ANDRÉS
                  </Text>
                  <Text style={styles.title}>
                    FACULTAD DE MEDICINA, ENFERMERÍA, NUTRICIÓN Y TECNOLOGÍA
                    MÉDICA
                  </Text>
                  <Text style={styles.title}>CARRERA DE ENFERMERÍA</Text>
                </View>
                <Image src={logoEnf} style={styles.imageLogoCarrera} />
              </View>
              <View style={styles.titleNumber}>
                <Text style={styles.titleBigger}>
                  VALE DE MOVILIDAD N. {number}
                </Text>
              </View>

              <View style={styles.content}>
                <View style={styles.divSeparador}>
                  <Text style={styles.textRed}>
                    Ciudad: <Text style={styles.span}>La Paz</Text>
                  </Text>
                  <Text style={styles.textRed}>
                    Fecha:{" "}
                    <Text style={styles.span}>
                      {convertirFecha(expenseDate)}
                    </Text>
                  </Text>
                </View>
                <View style={styles.divSeparador}>
                  <Text style={styles.textRed}>
                    Pagado a: <Text style={styles.span}>{interested}</Text>
                  </Text>
                  <Text style={styles.textRed}>
                    Nro. de Vale: <Text style={styles.span}>{number}</Text>
                  </Text>
                  {invoiceNumber && (
                    <Text style={styles.textRed}>
                      Nro. de Factura:{" "}
                      <Text style={styles.span}>{invoiceNumber}</Text>
                    </Text>
                  )}
                </View>
                <View style={styles.divSeparador}>
                  <Text style={styles.textRed}>
                    La suma de:{" "}<Text style={styles.span}>{amount} Bs.</Text>
                  </Text>
                  <Text style={styles.textRed}>
                    Literal:{" "}
                    <Text style={styles.span}>
                      {convertirNumeroALetras(amount)} en efectivo
                    </Text>
                  </Text>
                </View>
                <Text style={styles.textRed}>
                  Por concepto de:{" "}
                  <Text style={styles.span}>{description}</Text>
                </Text>
                <View style={styles.firmasContent}>
                  <Text>Firma autorizada</Text>
                  <View style={styles.firmas}>
                    <Text>{`${manager}`}</Text>
                    <Text>RESPONSABLE</Text>
                    <Text>ENTREGUE CONFORME</Text>
                  </View>
                  <View style={styles.firmas}>
                    <Text>{interested}</Text>
                    <Text>INTERESADO</Text>
                    <Text>RECIBI CONFORME</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PettyCashBoxPDF;
