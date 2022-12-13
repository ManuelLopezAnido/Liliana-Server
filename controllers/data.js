const db = require ('../config.js')
const fs = require('graceful-fs');
const items = require ('../models/data/items.js')
const products = require('../models/data/products.js');
const machines = require('../models/data/machines.js');
const molds =  require('../models/data/molds.js');


const allInputs = [
  {
    "mold": "MAB001",
    "description": "TAPA LATERAL DERECHA BATIDORA"
  },
  {
    "mold": "MAB002",
    "description": "CUBRE LLAVE DE VELOCIDADES COLOR NEGRO"
  },
  {
    "mold": "MAB003",
    "description": "ENGRANAJE GIRADOR DE BOLW"
  },
  {
    "mold": "MAB004",
    "description": "CUBRE MANIJA COLOR NEGRO"
  },
  {
    "mold": "MAB005",
    "description": "BOWL TRANSPARENTE"
  },
  {
    "mold": "MAB007",
    "description": "CUERPO PIE DE BOWL"
  },
  {
    "mold": "MAB008",
    "description": "BASE DE CUERPO PIE BOWL"
  },
  {
    "mold": "MAB009",
    "description": "CONJUNTO GANCHO BATIDOR x 2"
  },
  {
    "mold": "MAB012",
    "description": "TAPA TRASERA ROBOT FIJA"
  },
  {
    "mold": "MAB013",
    "description": "SUJETADOR ROBOT "
  },
  {
    "mold": "MAB014",
    "description": "CARDAR DE ARRASTRE AB X 8"
  },
  {
    "mold": "MAB015",
    "description": "PRENSA CABLE BATIDORA TORPEDO X 1"
  },
  {
    "mold": "MAB016",
    "description": "CUERPO PIE DE BOWL COLOR BLANCO"
  },
  {
    "mold": "MAB017",
    "description": "BOWL AB102 COLOR BLANCO"
  },
  {
    "mold": "MAB018",
    "description": "CACHA LATERAL IZQUIERDA COLOR BLANCO MOD"
  },
  {
    "mold": "MAB019",
    "description": "CACHA DECORADORA DERECHA COLOR NEGRO "
  },
  {
    "mold": "MAC001",
    "description": "BASE REDONDA COCINA COLOR NEGRO"
  },
  {
    "mold": "MAH001",
    "description": "VARILLA PLASTICA x 2"
  },
  {
    "mold": "MAH003",
    "description": "VARILLA INTERNA COLOR BORDO"
  },
  {
    "mold": "MAH004",
    "description": "BOTONERA DE GOMA X 4"
  },
  {
    "mold": "MAH005",
    "description": "PORTA LLAVE POCKET x 1 MOD"
  },
  {
    "mold": "MAH006",
    "description": "ADAPTADOR INTERNO DE CUCHILLA"
  },
  {
    "mold": "MAH007",
    "description": "TAPA INFERIOR CAJA DE ENGRANAJE x 4"
  },
  {
    "mold": "MAH008",
    "description": "CHOPPER TRANSPARENTE"
  },
  {
    "mold": "MAH009",
    "description": "ARO SELLADOR UNION CAÑO PROT CU"
  },
  {
    "mold": "MAH010",
    "description": "ARO PLASTICO DE CIERRE "
  },
  {
    "mold": "MAH011",
    "description": "TAPA DELANTERA POCKET x 2"
  },
  {
    "mold": "MAH012",
    "description": "TAPA TRASERA POCKET x 2"
  },
  {
    "mold": "MAH013",
    "description": "ARO SELLADOR CUCHILLA PROTEC CUCHILLA"
  },
  {
    "mold": "MAH014",
    "description": "TAPA SUPERIOR CAJA ENGRANAJE BATIDOR x 2"
  },
  {
    "mold": "MAH015",
    "description": "FRENTE PLASTICO COLOR BLANCO"
  },
  {
    "mold": "MAH016",
    "description": "TAPA SUPERIOR COLOR BLANCA x 2"
  },
  {
    "mold": "MAH017",
    "description": "PERILLA VARIADORA DE VELOCIDAD x 2"
  },
  {
    "mold": "MAH018",
    "description": "BOTON ACCIONADOR 1 COLOR GRIS x 6"
  },
  {
    "mold": "MAH019",
    "description": "CUERPO PROC. MANUAL 450 x 2"
  },
  {
    "mold": "MAH020",
    "description": "PORTA BOTONERA COLOR NEGRO x 4"
  },
  {
    "mold": "MAH021",
    "description": "TAPA REDONDA COLOR NEGRO x 4"
  },
  {
    "mold": "MAH022",
    "description": "CUERPO PROC. MANUAL 850 x 2"
  },
  {
    "mold": "MAH023",
    "description": "TAPA SUPERIOR PROCESADORA MANUAL 850 X 1"
  },
  {
    "mold": "MAH024",
    "description": "TAPA DELANTERA COLOR BLANCO B&D"
  },
  {
    "mold": "MAH025",
    "description": "BOTONERA COLOR BLANCO"
  },
  {
    "mold": "MAH026",
    "description": "PASACABLE COLOR NEGRO X 8"
  },
  {
    "mold": "MAH027",
    "description": "COPA BOTONES X 1 (COPA BAJA)"
  },
  {
    "mold": "MAH028",
    "description": "TAPA DELANTERA MINIPIMER ELECTROLUX"
  },
  {
    "mold": "MAH029",
    "description": "ADAPTADOR DE BATIDOR DOBLE"
  },
  {
    "mold": "MAH031",
    "description": "SOPORTE MOTOR 850W x 1"
  },
  {
    "mold": "MAJ001",
    "description": "TAPA DE EXTRACTOR"
  },
  {
    "mold": "MAJ002",
    "description": "RECIPIENTE CONTENEDOR"
  },
  {
    "mold": "MAJ003",
    "description": "EMPUJADOR JUGUERA"
  },
  {
    "mold": "MAJ004",
    "description": "VASO MEDIDOR DE JUGUERA"
  },
  {
    "mold": "MAJ005",
    "description": "BUJES LICUADORA x 6 U"
  },
  {
    "mold": "MAL001",
    "description": "CUERPO REDONDO LICUADORA"
  },
  {
    "mold": "MAL002",
    "description": "FONDO LICUADORA p/AL540"
  },
  {
    "mold": "MAL004",
    "description": "PERILLA CONVECTOR X 1  ( BOCA 5 ) "
  },
  {
    "mold": "MAL005",
    "description": "TURBINA GRANDE DE LICUADORA"
  },
  {
    "mold": "MAL006",
    "description": "CHASIS PLASTICO SUJETA MOTOR x 2 MOD"
  },
  {
    "mold": "MAL007",
    "description": "ACCIONADOR DE MICRO LICUADORA x 2"
  },
  {
    "mold": "MAL008",
    "description": "TAPA SUP LICUADORA TRABA REDOND x 2"
  },
  {
    "mold": "MAL009",
    "description": "PERILLA REGULADORA COLOR NEGRO X 4"
  },
  {
    "mold": "MAL010",
    "description": "TAPA SUPERIOR DE CUERPO X 2"
  },
  {
    "mold": "MAL011",
    "description": "FONDO CUERPO REDONDO ELECTROL"
  },
  {
    "mold": "MAL012",
    "description": "CUERPO LICUADORA ELECTROLUX"
  },
  {
    "mold": "MAL014",
    "description": "ADAPTADOR SUPERIOR DE LICUADORA"
  },
  {
    "mold": "MAL015",
    "description": "PERILLA JUGUERA X 2"
  },
  {
    "mold": "MAL017",
    "description": "BASE CUERPO ACERO INOX. ELECTROLUX"
  },
  {
    "mold": "MAL018",
    "description": "ARTICULACION TRABA x 2"
  },
  {
    "mold": "MAL019",
    "description": "TAPON TRANSP. 1,8 ELECTROLUX 4 dedos x 2"
  },
  {
    "mold": "MAL020",
    "description": "ADAPTADOR JARRA LICUADORA 1,5 LTS"
  },
  {
    "mold": "MAL021",
    "description": "TAPA DE JARRA LICUADORA DIGITAL"
  },
  {
    "mold": "MAL022",
    "description": "FONDO LICUADORA DIGITAL VACÍO COLOR NEGRO"
  },
  {
    "mold": "MAL023",
    "description": "CUERPO LICUADORA DIGITAL COLOR NEGRO"
  },
  {
    "mold": "MAL025",
    "description": "TURBINA DE CARDAN JLL10/BLL10  X 2"
  },
  {
    "mold": "MAL026",
    "description": "CUERPO DE LICUADORA COLOR NEGRO"
  },
  {
    "mold": "MAL027",
    "description": "FONDO DE CUERPO AL116"
  },
  {
    "mold": "MAL028",
    "description": "SOPORTE SUPERIOR DE MANIJA"
  },
  {
    "mold": "MAL029",
    "description": "TAPA INFERIOR DE MANIJA"
  },
  {
    "mold": "MAL030",
    "description": "CUERPO LICUADORA AL110"
  },
  {
    "mold": "MAL031",
    "description": "FONDO DE CUERPO LICUADORA AL110"
  },
  {
    "mold": "MAL032",
    "description": "SOPORTE MOTOR LICUADORA x 2"
  },
  {
    "mold": "MAL033",
    "description": "PERILLA LICUADORA AL100 x 2"
  },
  {
    "mold": "MAL034",
    "description": "FONDO LICUADORA COLOR NEGRO AL180"
  },
  {
    "mold": "MAL035",
    "description": "CUERPO LICUADORA COLOR NEGRO AL180 x 2"
  },
  {
    "mold": "MAL036",
    "description": "SOPORTE DE MOTOR"
  },
  {
    "mold": "MAL038",
    "description": "PATITAS LICUADORA 100/180/ASM100 X 12"
  },
  {
    "mold": "MAL039",
    "description": "TAPA LICUADORA NEGRA NUEVA"
  },
  {
    "mold": "MAL040",
    "description": "TAPA SUPERIOR DE CUERPO X 1"
  },
  {
    "mold": "MAL041",
    "description": "SOPORTE DE MOTOR LICUADORA NUEVO x 1"
  },
  {
    "mold": "MAL042",
    "description": "PANEL FRONTAL DE LICUADORA COLOR BLANCO"
  },
  {
    "mold": "MAL044",
    "description": "CHASIS PLASTICO SUJETA MOTOR AL100 X 2"
  },
  {
    "mold": "MAL045",
    "description": "JARRA LICUADORA 2Lts"
  },
  {
    "mold": "MAL047",
    "description": "#N/A"
  },
  {
    "mold": "MAL048",
    "description": "#N/A"
  },
  {
    "mold": "MAL049",
    "description": "#N/A"
  },
  {
    "mold": "MAL050",
    "description": "VASO PORTATIL"
  },
  {
    "mold": "MAL052",
    "description": "SOPORTE DE MICRO X 4"
  },
  {
    "mold": "MAM 014",
    "description": "#N/A"
  },
  {
    "mold": "MAM001",
    "description": "TAZA DE PROCESADORA VIEJA"
  },
  {
    "mold": "MAM002",
    "description": "TAPA DE TAZA VIEJA"
  },
  {
    "mold": "MAM003",
    "description": "EMBUTIDOR COLOR ROJO"
  },
  {
    "mold": "MAM004",
    "description": "BATIDOR PUNTO NIEVE "
  },
  {
    "mold": "MAM005",
    "description": "CUERPO PROCESADORA REDONDO"
  },
  {
    "mold": "MAM006",
    "description": "FONDO PROCESADORA REDONDO"
  },
  {
    "mold": "MAM007",
    "description": "CUERPO PROCESADORA CUADRADO COLOR NEGRO"
  },
  {
    "mold": "MAM008",
    "description": "FONDO CUADRADO PROCESADORA COLOR GRIS"
  },
  {
    "mold": "MAM009",
    "description": "PALANCA DE TAZA"
  },
  {
    "mold": "MAM010",
    "description": "PORTA ACCESORIOS x 2"
  },
  {
    "mold": "MAM011",
    "description": "TAPON TAZA PROCESADORA NUEVA x 4"
  },
  {
    "mold": "MAM012",
    "description": "CUERPO CUADRADO PUNTA REDONDA"
  },
  {
    "mold": "MAM013",
    "description": "CARDAN DE ARRASTRE C/ PERNO x 1"
  },
  {
    "mold": "MAM014",
    "description": "PERILLA DE VELOCIDADES TRANSP. X 2"
  },
  {
    "mold": "MAM016",
    "description": "TAPA DE PERILLA "
  },
  {
    "mold": "MAM017",
    "description": "FONDO CUADRADO PUNTA REDONDA"
  },
  {
    "mold": "MAM018",
    "description": "TAZA DE PROCESADORA "
  },
  {
    "mold": "MAM019",
    "description": "TAPA DE TAZA LILIANA"
  },
  {
    "mold": "MAM020",
    "description": "TAPA TRANSPARENTE CHOPPER"
  },
  {
    "mold": "MAM021",
    "description": "AMASADOR DE ALETA x 2"
  },
  {
    "mold": "MAM022",
    "description": "TAPA SUPERIOR DE TAZA PROCEMIX"
  },
  {
    "mold": "MAM023",
    "description": "TAPA INFERIOR DE TAZA "
  },
  {
    "mold": "MAM024",
    "description": "CARDAN DE ARRASTRE TOTALMIX  X 2"
  },
  {
    "mold": "MAM025",
    "description": "TAZA DE PROCESADORA PROCEMIX"
  },
  {
    "mold": "MAM026",
    "description": "PERILLA CON CHANFLE LILIANA X 1"
  },
  {
    "mold": "MAM027",
    "description": "BOTON ENCENDIDO SUPERIOR x 4"
  },
  {
    "mold": "MAM028",
    "description": "CACHA SUPERIOR MANIJA AM460"
  },
  {
    "mold": "MAM029",
    "description": "CACHA INFERIOR MANIJA x 2"
  },
  {
    "mold": "MAM030",
    "description": "PERILLA VELOCIDAD PROCEMIX x 4"
  },
  {
    "mold": "MAM032",
    "description": "FIJACION SUPERIOR MOTOR PROCEMIX"
  },
  {
    "mold": "MAM033",
    "description": "JARRA CHOPER 700"
  },
  {
    "mold": "MAM034",
    "description": "JARRA CHOPER 350"
  },
  {
    "mold": "MAM035",
    "description": "CUERPO AM460"
  },
  {
    "mold": "MAM036",
    "description": "ARO PASA CABLE PROCEMIX NUEVA"
  },
  {
    "mold": "MAM038",
    "description": "#N/A"
  },
  {
    "mold": "MAM039",
    "description": "PERILLA REGULADORA COLOR BLANCO x 2"
  },
  {
    "mold": "MAM041",
    "description": "TAPON ASA SUP.JARRA ELECT. x 2"
  },
  {
    "mold": "MAM042",
    "description": "FILTRO EXPRIMIDOR COLOR ROJO"
  },
  {
    "mold": "MAM043",
    "description": "CONO EXPRIMIDOR COLOR ROJO"
  },
  {
    "mold": "MAM044",
    "description": "ENGRANAJE EXPRIMIDOR COLOR ROJO x 8"
  },
  {
    "mold": "MAM045",
    "description": "TAPA DE TAZA PROCESADORA 2017"
  },
  {
    "mold": "MAM046",
    "description": "EMBUTIDOR x 2"
  },
  {
    "mold": "MAM047",
    "description": "TAZA PROCESADORA 2017"
  },
  {
    "mold": "MAM048",
    "description": "BASE PROCESADORA"
  },
  {
    "mold": "MAM049",
    "description": "CUERPO PROCESADORA"
  },
  {
    "mold": "MAM050",
    "description": "AMASADOR DE ALETAS COLOR BLANCO x 1"
  },
  {
    "mold": "MAM051",
    "description": "RESPALDO INTERIOR DE PERILLA INOXIDABLE X 1"
  },
  {
    "mold": "MAM052",
    "description": "BUFANDA DE JARRA"
  },
  {
    "mold": "MAM053",
    "description": "BUJE PARA FILTRO AL110 COLOR NEGRO x1"
  },
  {
    "mold": "MAM054",
    "description": "CUERPO PROCESADORA LINEA 700 COLOR BLANCO "
  },
  {
    "mold": "MAM055",
    "description": "BASE PROCESADORA LISA LINEA 700 COLOR BLANCO"
  },
  {
    "mold": "MAM056",
    "description": "BUJE FILTRO "
  },
  {
    "mold": "MAM057",
    "description": "DISCO PORTA ACCESORIO GRANDE 700 NEGRO X2"
  },
  {
    "mold": "MAM058",
    "description": "DISCO PORTAACCESORIO CHICO 700 BLANCO x 2"
  },
  {
    "mold": "MAM059",
    "description": "PORTA ACCESORIO LINEA 700 COLOR BLANCO x 2"
  },
  {
    "mold": "MAM060",
    "description": "EJE TRANSMISION 700 BLANCO x2"
  },
  {
    "mold": "MAM061",
    "description": "SOPORTE TAPA DE TAZA 700 x 3"
  },
  {
    "mold": "MAM062",
    "description": "SOPORTE PANEL DE PERILLA PROCESADORA 700 X 2"
  },
  {
    "mold": "MAP001",
    "description": "TAPA DE MANIJA PAVA x 1"
  },
  {
    "mold": "MAP002",
    "description": "VISOR x 2"
  },
  {
    "mold": "MAP003",
    "description": "CUERPO PAVA ELECTRICA"
  },
  {
    "mold": "MAP004",
    "description": "TAPA SUP SIST.APERTURA PAVA x 2 "
  },
  {
    "mold": "MAP005",
    "description": "BOTON DE APERTURA PAVA x 2"
  },
  {
    "mold": "MAP006",
    "description": "BASE DEL CUERPO PAVA x 2"
  },
  {
    "mold": "MAP007",
    "description": "GUIA DE SISTEMA DE APERTURA PAVA"
  },
  {
    "mold": "MAP008",
    "description": "ARO PLASTICO PAVA"
  },
  {
    "mold": "MAP009",
    "description": "TRABA DE APERTURA PAVA x 4"
  },
  {
    "mold": "MAP011",
    "description": "TAPA SUPERIOR DE BASE PAVA x 2"
  },
  {
    "mold": "MAP012",
    "description": "TAPA INFERIOR DE BASE PAVA x 2"
  },
  {
    "mold": "MAP013",
    "description": "PORTAPERILLA COLOR GRIS x 2"
  },
  {
    "mold": "MAP014",
    "description": "PERILLA COLOR GRIS x 2"
  },
  {
    "mold": "MAP015",
    "description": "BANANA INTERIOR PAVA"
  },
  {
    "mold": "MAP016/A",
    "description": "CUERPO PAVA COLOR BLANCO"
  },
  {
    "mold": "MAP016/B",
    "description": "CUERPO PAVA SIN PERILLA COLOR NEGRO"
  },
  {
    "mold": "MAP018",
    "description": "VISOR DE PAVA X 4"
  },
  {
    "mold": "MAS001",
    "description": "CUERPO ENSALADORA x 1"
  },
  {
    "mold": "MAS002",
    "description": "TAPA TRASERA SALAD MAKER x 1"
  },
  {
    "mold": "MAX 018",
    "description": "#N/A"
  },
  {
    "mold": "MAX002",
    "description": "DISCO PORTA ACCESORIO COLOR ROJO"
  },
  {
    "mold": "MAX003",
    "description": "JARRA LICUADORA NUEVA 1800 CC"
  },
  {
    "mold": "MAX004",
    "description": "TAPA JARRA LICUADORA"
  },
  {
    "mold": "MAX005",
    "description": "VASO MEDIDOR TRANSPARENTE"
  },
  {
    "mold": "MAX006",
    "description": "PORTA BOTONERA x 2"
  },
  {
    "mold": "MAX007",
    "description": "PROTECTOR DE CUCHILLA x 2"
  },
  {
    "mold": "MAX008",
    "description": "PATITA RAYADA x 6"
  },
  {
    "mold": "MAX009",
    "description": "#N/A"
  },
  {
    "mold": "MAX010",
    "description": "FILTRAJUGO PARA JARRA 1,8 X 2"
  },
  {
    "mold": "MAX011",
    "description": "CUERPO CHOPPER X 2"
  },
  {
    "mold": "MAX012",
    "description": "PORTA CUCHILLA LICUADORA x 4"
  },
  {
    "mold": "MAX013",
    "description": "ROSCA DE AJUSTE INTERIOR x 4"
  },
  {
    "mold": "MAX016",
    "description": "TAPA SUPERIOR CAJA CHOPPER BORDO"
  },
  {
    "mold": "MAX017",
    "description": "TAPA INFERIOR CAJA CHOPPER BORDO"
  },
  {
    "mold": "MAX018",
    "description": "AMORTIGUADOR LICUADORA x 6"
  },
  {
    "mold": "MAX019",
    "description": "PATITA CON TOPE"
  },
  {
    "mold": "MAX020",
    "description": "TUBO FILTRAJUGO ELECTROLUX X 1"
  },
  {
    "mold": "MAX021",
    "description": "TAPON TRANSP DE TAPA LICUADORA 2 DEDOS X 2"
  },
  {
    "mold": "MAX023",
    "description": "PROTECTOR DE CUCHILLA"
  },
  {
    "mold": "MAX024",
    "description": "PORTA EMBUTIDOR FINO COLOR NARANJA"
  },
  {
    "mold": "MAX025",
    "description": "EMBUTIDOR FINO COLOR NARANJA"
  },
  {
    "mold": "MCC001",
    "description": "#N/A"
  },
  {
    "mold": "MCC002",
    "description": "CUERPO TRASERO COLOR NEGRO C/TECLAS"
  },
  {
    "mold": "MCC003",
    "description": "PLACA PORTALLAVE 3 puntos x 2"
  },
  {
    "mold": "MCC004",
    "description": "PIE PUNTA REDONDA"
  },
  {
    "mold": "MCC005",
    "description": "CARCAZA FRONTAL TRASLUCIDA"
  },
  {
    "mold": "MCC006",
    "description": "SOPORTE DE MICRO"
  },
  {
    "mold": "MCC007",
    "description": "PERILLA SELECTORA x 2"
  },
  {
    "mold": "MCC008",
    "description": "CUERPO PTC CALOVENTOR RECTANG ELX"
  },
  {
    "mold": "MCC009",
    "description": "CUERPO DELANTERO CALOVENTOR ELX"
  },
  {
    "mold": "MCC010",
    "description": "CUERPO TRASERO CALOVENTOR ELX"
  },
  {
    "mold": "MCC011",
    "description": "PERILLA REGULADORA DE POTENCIA x 2"
  },
  {
    "mold": "MCC012",
    "description": "SOPORTE LLAVE ROTATIVA x 2"
  },
  {
    "mold": "MCC013",
    "description": "SOPORTE TERMOSTATO x 2"
  },
  {
    "mold": "MCC014",
    "description": "CUERPO TRASERO COLOR BLANCO"
  },
  {
    "mold": "MCC015",
    "description": "CUERPO DELANTERO COLOR BLANCO"
  },
  {
    "mold": "MCC016",
    "description": "PERILLA DE COMANDOS COLOR BLANCO X 4"
  },
  {
    "mold": "MCC018",
    "description": "BASE CALOVENTOR COLOR BLANCO"
  },
  {
    "mold": "MCC021",
    "description": "SOPORTE PARA TERMOSTATO"
  },
  {
    "mold": "MCC022",
    "description": "RELILLA FRONTAL"
  },
  {
    "mold": "MCC023",
    "description": "LATERAL DERECHO COLOR BLANCO"
  },
  {
    "mold": "MCC024",
    "description": "PERILLA TERMOSTATO x 2"
  },
  {
    "mold": "MCC025",
    "description": "PORTA LLAVE Y TERMOSTATO x 2"
  },
  {
    "mold": "MCC026",
    "description": "FRENTE CALOVENTOR DUAL "
  },
  {
    "mold": "MCC027",
    "description": "FONDO CALOVENTOR DUAL "
  },
  {
    "mold": "MCC028",
    "description": "PALA CALOVENTOR DUAL  PERNO MODIFICADO"
  },
  {
    "mold": "MCC029",
    "description": "BASE CALOVENTOR DUAL"
  },
  {
    "mold": "MCC030",
    "description": "AJUSTE TORNILLO COLOR NEGRO"
  },
  {
    "mold": "MCC030 ",
    "description": "#N/A"
  },
  {
    "mold": "MCE002",
    "description": "ACOPLE DE GIRO TF150/FTP530"
  },
  {
    "mold": "MCE003",
    "description": "VISOR DE LED CFH510 x 2"
  },
  {
    "mold": "MCE004",
    "description": "SUPLEMENTO ACTIVADOR DE MICRO x 2"
  },
  {
    "mold": "MCE005",
    "description": "PRENSACABLE CON COLITA CP 600-630 x 8"
  },
  {
    "mold": "MCE006",
    "description": "CARCAZA PORTA RESISTENCIA CP 630"
  },
  {
    "mold": "MCE007",
    "description": "BASE SISTEMA DE GIRO"
  },
  {
    "mold": "MCE008",
    "description": "PALETA FORZADOR DE 5 ASPAS CP630"
  },
  {
    "mold": "MCE009",
    "description": "CUERPO FRONTAL RECTANGULAR"
  },
  {
    "mold": "MCE010",
    "description": "CUERPO TRASERO PTC550"
  },
  {
    "mold": "MCE011",
    "description": "TAPA SUP PORTACOMANDO "
  },
  {
    "mold": "MCE012",
    "description": "TAPA INFERIOR DE CUERPO "
  },
  {
    "mold": "MCE013",
    "description": "TAPA INFERIOR BASE DE GIRO"
  },
  {
    "mold": "MCE014",
    "description": "ARO ADAPTADOR DE CARCAZA 630"
  },
  {
    "mold": "MCE016",
    "description": "PATITA AISLANTE TURBO 12\" X 2"
  },
  {
    "mold": "MCE017",
    "description": "PRENSACABLE CALOV CP610/630 X 8"
  },
  {
    "mold": "MCF002",
    "description": "FRENTE PARRILLA CFH500 COLOR NEGRO"
  },
  {
    "mold": "MCF003",
    "description": "PERILLA COMANDO BORDO x 2"
  },
  {
    "mold": "MCF004",
    "description": "MANIJA COLOR BORDO x 2"
  },
  {
    "mold": "MCF005",
    "description": "TURBINA CALOVENTOR CP610"
  },
  {
    "mold": "MCF007",
    "description": "CARCAZA PORTA MANIJA "
  },
  {
    "mold": "MCF008",
    "description": "CARCAZA PORTA PERILLA"
  },
  {
    "mold": "MCF009",
    "description": "TAPA TRASERA COLOR NEGRO"
  },
  {
    "mold": "MCF010",
    "description": "REJILLA TRASERA CFI800"
  },
  {
    "mold": "MCF011",
    "description": "PORTA COMANDOS COLOR NEGRO"
  },
  {
    "mold": "MCG002",
    "description": "PATITAS CHOPER 350 X 4"
  },
  {
    "mold": "MCG003",
    "description": "LED CP PATA GRUESA x 8"
  },
  {
    "mold": "MCG004",
    "description": "PERILLA DE COMANDO x 4"
  },
  {
    "mold": "MCG005",
    "description": "CUERPO TRASERO REDONDO BLANCO"
  },
  {
    "mold": "MCG006",
    "description": "CUERPO FRONTAL REDONDO BLANCO"
  },
  {
    "mold": "MCG007",
    "description": "PALA PLASTICA 6 ASPAS CFH400"
  },
  {
    "mold": "MCI 008",
    "description": "#N/A"
  },
  {
    "mold": "MCI004",
    "description": "TAPA SUPERIOR C.H. "
  },
  {
    "mold": "MCI005",
    "description": "CUERPO TRASERO STE3030 1 TECLA S/FORZ"
  },
  {
    "mold": "MCI008",
    "description": "BIELA DE GIRO CH X 2"
  },
  {
    "mold": "MCI010",
    "description": "LATERAL CIEGO COLOR BLANCO"
  },
  {
    "mold": "MCI011",
    "description": "ACOPLE REDONDO DE GIRO X 2"
  },
  {
    "mold": "MCI012",
    "description": "PIE OVALADO COLOR BLANCO"
  },
  {
    "mold": "MCI013",
    "description": "CUERPO DELANTERO COLOR BLANCO"
  },
  {
    "mold": "MCI014",
    "description": "TAPA SUPERIOR COLOR NEGRO HAL 40"
  },
  {
    "mold": "MCI015",
    "description": "BASE RECTANGULAR COLOR NEGRO HAL 40"
  },
  {
    "mold": "MCI016",
    "description": "CUERPO TRASERO COLOR BLANCO"
  },
  {
    "mold": "MCI017",
    "description": "CUERPO DELANTERO CURVO COLOR NEGRO"
  },
  {
    "mold": "MCI018",
    "description": "TAPA DE TIP OVER CI070 x 2"
  },
  {
    "mold": "MCI019",
    "description": "FRENTE C.I.070 2 TUBOS"
  },
  {
    "mold": "MCM002",
    "description": "TAPA SUPERIOR LATERAL MIC40 x 2"
  },
  {
    "mold": "MCM003",
    "description": "RUEDA REDONDA IZQ/DER x 4"
  },
  {
    "mold": "MCM004",
    "description": "CUBRE NEON PATA FINA X 4"
  },
  {
    "mold": "MCM005",
    "description": "PALETA FORZADOR DE AIRE 6 ASPAS"
  },
  {
    "mold": "MCM007",
    "description": "PERILLA DE MICA COLOR NEGRO"
  },
  {
    "mold": "MCM010",
    "description": "#N/A"
  },
  {
    "mold": "MCM011",
    "description": "LATERAL LISO MICA NUEVA"
  },
  {
    "mold": "MCM012",
    "description": "RUEDA COLOR BLANCO x 4"
  },
  {
    "mold": "MCM013",
    "description": "TAPA SUPERIOR MICA NUEVA"
  },
  {
    "mold": "MCM014",
    "description": "AISLADOR MIC40 x 3"
  },
  {
    "mold": "MCM015",
    "description": "TAPA SUPERIOR CON FORZADOR TF120"
  },
  {
    "mold": "MCM016",
    "description": "EMBELLECEDOR DE RUEDAS "
  },
  {
    "mold": "MCM017",
    "description": "LATERAL PORTACOMANDO COLOR BLANCO"
  },
  {
    "mold": "MCM018",
    "description": "TAPA BASE SUPERIOR COLOR BLANCO"
  },
  {
    "mold": "MCM019",
    "description": "TAPA SUPERIOR FORZADOR MIC40"
  },
  {
    "mold": "MCO001/A",
    "description": "CARCAZA TRASERA DISEÑO BURBUJA BLANCO"
  },
  {
    "mold": "MCO001/B",
    "description": "CARCAZA FRONTAL BURBUJA P/PLAQUETA MOD"
  },
  {
    "mold": "MCO001/C",
    "description": "CARCAZA FRONTAL DISEÑO ROMBO"
  },
  {
    "mold": "MCO001/D",
    "description": "CARCASA TRASERA DISEÑO RAYADO COLOR BLANCO"
  },
  {
    "mold": "MCO002",
    "description": "LATERAL PORTA COMANDOS COLOR NARANJA"
  },
  {
    "mold": "MCO002/A",
    "description": "LATERAL PORTA COMANDOS COLOR NEGRO"
  },
  {
    "mold": "MCO002/B",
    "description": "LATERAL COMANDO DE CONVECTOR SIN FORZADOR COLOR NEGRO"
  },
  {
    "mold": "MCO003",
    "description": "REJILLA INFERIOR COLOR NEGRO MOD"
  },
  {
    "mold": "MCO004",
    "description": "COLIZA AISLADORA DE FONDO"
  },
  {
    "mold": "MCO005/A",
    "description": "PATA DE CONVECTOR C/TOPE X 1"
  },
  {
    "mold": "MCO005/B",
    "description": "PATA DE CONVECTOR X 1"
  },
  {
    "mold": "MCO006",
    "description": "PALETA FORZADOR CONVECTOR"
  },
  {
    "mold": "MCO007",
    "description": "RODILLO REBOBINADOR DE CABLE"
  },
  {
    "mold": "MCO008",
    "description": "REJILLA SUPERIOR CONVECTOR LARGA X 2"
  },
  {
    "mold": "MCO009",
    "description": "REJILLA INFERIOR CORTA x 2"
  },
  {
    "mold": "MCO010",
    "description": "LATERAL PORTACOMANDO LARGO"
  },
  {
    "mold": "MCO011",
    "description": "REJILLA SUPERIOR PLASTICA CORTA x 2"
  },
  {
    "mold": "MCO012",
    "description": "SOPORTE DE PARED X 2"
  },
  {
    "mold": "MCO013",
    "description": "SOPORTE DE RESISTENCIA X 4"
  },
  {
    "mold": "MCO014",
    "description": "DEFLECTOR TERMOSTATO X 2"
  },
  {
    "mold": "MCO015",
    "description": "FRENTE CONVECTOR CON10/20 x 1"
  },
  {
    "mold": "MCO016",
    "description": "LATERAL PORTACOMANDO ELX con tapa CON10"
  },
  {
    "mold": "MCO017",
    "description": "REJILLA SUPERIOR ELECTROLUX x 2"
  },
  {
    "mold": "MCO018",
    "description": "REJILLA INFERIOR A CON10/20 x 2"
  },
  {
    "mold": "MCO019",
    "description": "PATA CONVECTOR ELX SIN TIP OVER"
  },
  {
    "mold": "MCO021",
    "description": "#N/A"
  },
  {
    "mold": "MCO022",
    "description": "TAPA ALOJAMIENTO DE LLAVE"
  },
  {
    "mold": "MCO023",
    "description": "PLACA AISLADORA DE TEMPERATURA TCV110"
  },
  {
    "mold": "MCO024",
    "description": "TAPA DE PROTECCION INTERIOR DE PLAQUETA SISTEMA AUTOHOT"
  },
  {
    "mold": "MCR001",
    "description": "REJILLA PLASTICA R.H."
  },
  {
    "mold": "MCR002",
    "description": "DEFLECTOR PLAQUETA RH"
  },
  {
    "mold": "MCR003",
    "description": "CARCAZA PORTA RESISTENCIA R.H."
  },
  {
    "mold": "MCR006",
    "description": "VISOR DE PANEL R.H."
  },
  {
    "mold": "MCR007",
    "description": "PANEL DE COMANDO R.H. X 2"
  },
  {
    "mold": "MCR008",
    "description": "ENGRANAJE PUENTE BIELA"
  },
  {
    "mold": "MCR009",
    "description": "ALETA DEFLECTORA REBATIBLE x 2"
  },
  {
    "mold": "MCR010",
    "description": "CUERPO DELANTERO R.H. BLANCO"
  },
  {
    "mold": "MCR011",
    "description": "BOTON DE GOMA R.H. CORTO"
  },
  {
    "mold": "MCR016",
    "description": "CUERPO TRASERO COLOR BLANCO"
  },
  {
    "mold": "MCR017",
    "description": "CUERPO FRONTAL COLOR BLANCO"
  },
  {
    "mold": "MCR018",
    "description": "PLACA FRONTAL CAL50 x 2"
  },
  {
    "mold": "MCR019",
    "description": "CUERPO DELANTERO DISEÑO CON CAIDA"
  },
  {
    "mold": "MCR020",
    "description": "PLACA VISOR FRONTAL"
  },
  {
    "mold": "MCR022",
    "description": "PLACA VISOR FRONTAL TRASLUCIDO AUTOHOT"
  },
  {
    "mold": "MCT001",
    "description": "TAPA TRASERA TORRE ALTA"
  },
  {
    "mold": "MCT002",
    "description": "TAPA FRONTAL INFERIOR TC 40 X 2"
  },
  {
    "mold": "MCT003",
    "description": "PANEL DE COMANDOS TC 40 X 2"
  },
  {
    "mold": "MCT004",
    "description": "BASE DE GIRO TC40"
  },
  {
    "mold": "MCT005",
    "description": "TAPA DE BASE DE GIRO TC40"
  },
  {
    "mold": "MCT006",
    "description": "CARCAZA PORTA TURBINA"
  },
  {
    "mold": "MCT007",
    "description": "CARCAZA PORTA PTC TORRE ALTA"
  },
  {
    "mold": "MCT008",
    "description": "TAPA DE FILTRO TORRE ALTA x 2"
  },
  {
    "mold": "MCT009",
    "description": "LATERAL DERECHO TC 40"
  },
  {
    "mold": "MCT010",
    "description": "TAPA SUPERIOR TC 40 X 2"
  },
  {
    "mold": "MCT011",
    "description": "CARCAZA PORTA PTC TORRE BAJA ELECTROLUX"
  },
  {
    "mold": "MCT012",
    "description": "LATERAL DERECHO TORRE BAJA ELECTROLUX"
  },
  {
    "mold": "MCT013",
    "description": "CARDAN VARILLA X 1"
  },
  {
    "mold": "MCT014",
    "description": "BASE DE GIRO TORRE BAJA ELECTROLUX"
  },
  {
    "mold": "MCT015",
    "description": "TAPA DE BASE DE GIRO TORRE BAJA ELECTROLUX"
  },
  {
    "mold": "MCT016",
    "description": "DISPLAY TORRE BAJA ELECTROLUX"
  },
  {
    "mold": "MCT017",
    "description": "TAPA SUPERIOR TORRE BAJA ELECTROLUX"
  },
  {
    "mold": "MCT018",
    "description": "TAPA TRASERA TORRE BAJA ELECTROLUX"
  },
  {
    "mold": "MCT019",
    "description": "TAPA DE FILTRO TORRE BAJA ELECTROLUX x 2"
  },
  {
    "mold": "MCT020",
    "description": "TAPA FRONTAL INFERIOR TORRE BAJA ELECTROLUX x 2"
  },
  {
    "mold": "MCT021",
    "description": "CARCAZA PORTA TURBINA TORRE BAJA ELECTROLUX"
  },
  {
    "mold": "MCT022",
    "description": "LATERAL DERECHO TORRE ALTA PUNTUDA"
  },
  {
    "mold": "MCT023",
    "description": "FRENTE DE RESISTENCIA COLOR NEGRO x 2"
  },
  {
    "mold": "MCT024",
    "description": "BASE ADAPTADOR DE GIRO X 2"
  },
  {
    "mold": "MCT025",
    "description": "PORTA COMANDOS"
  },
  {
    "mold": "MCT026",
    "description": "DISPLAY PARA SIX FINGER x 1 (solo 1boca ok)"
  },
  {
    "mold": "MCT027",
    "description": "TAPA DE FILTRO COLOR BLANCO "
  },
  {
    "mold": "MCT028",
    "description": "CUERPO DELANTERO PORTA TPC Y PERILLA"
  },
  {
    "mold": "MCT029",
    "description": "CUERPO TRASERO PARA PTC 1 TECLA"
  },
  {
    "mold": "MCT031",
    "description": "TAPA SUPERIOR BASE GIRO "
  },
  {
    "mold": "MCT032",
    "description": "TAPA INFERIOR BASE DE GIRO "
  },
  {
    "mold": "MCT033",
    "description": "BASE DE GIRO TF 100"
  },
  {
    "mold": "MCT034",
    "description": "TAPA DE BASE DE GIRO TF 100"
  },
  {
    "mold": "MCT035",
    "description": "BUJE DE GIRO FTP 530"
  },
  {
    "mold": "MCT036",
    "description": "CARCAZA FRONTAL DE REJA"
  },
  {
    "mold": "MCT037",
    "description": "CARCAZA PRINCIPAL PTC617"
  },
  {
    "mold": "MCT038",
    "description": "BASE DE SISTEMA DE GIRO COLOR BLANCO"
  },
  {
    "mold": "MCT039",
    "description": "BASE FIJA PARA PTC620 COLOR ROJO"
  },
  {
    "mold": "MCT040",
    "description": "REJILLA FRONTAL TORRE BAJA"
  },
  {
    "mold": "MCT041",
    "description": "TAPA INFERIOR DE GIRO COLOR NEGRO"
  },
  {
    "mold": "MCV001/A",
    "description": "TAPA PORTA COMANDO 2 llaves x 1"
  },
  {
    "mold": "MCV001/B",
    "description": "TAPA PORTA COMANDO x 1"
  },
  {
    "mold": "MCV001 bis",
    "description": "CUERPO VERTICALEFACTOR X 1"
  },
  {
    "mold": "MCV002 bis",
    "description": "TAPA SUPERIOR VERTICALEFACTOR X 1"
  },
  {
    "mold": "MCV003",
    "description": "CANAL DE AIRE TC 30"
  },
  {
    "mold": "MCV005",
    "description": "#N/A"
  },
  {
    "mold": "MCV007",
    "description": "TAPA PLASTICA TRASERA TC10/30"
  },
  {
    "mold": "MCV008",
    "description": "CARCAZA PORTA RESISTENCIA TC30"
  },
  {
    "mold": "MCV009",
    "description": "PATAS PLASTICAS PPV300"
  },
  {
    "mold": "MCV011",
    "description": "SOPORTE DE PARED TC 10-30 X 2"
  },
  {
    "mold": "MCV012",
    "description": "ADAPTADOR DE PATA ALUMINIO x 2"
  },
  {
    "mold": "MCV013",
    "description": "ADAPTADOR DE CHASIS VIDRIO CURVO"
  },
  {
    "mold": "MCV014",
    "description": "TAPA TRASERA CORTA PPV200"
  },
  {
    "mold": "MCX001",
    "description": "VASTAGO OVALADO TIP OVER "
  },
  {
    "mold": "MCX002",
    "description": "PALETA VENTILADOR FORZADOR"
  },
  {
    "mold": "MCX005",
    "description": "CUBRE IONIZADOR x 1"
  },
  {
    "mold": "MCX006",
    "description": "PORTA LLAVE CFM730"
  },
  {
    "mold": "MCX007",
    "description": "TIRADOR SUPERIOR"
  },
  {
    "mold": "MCX008",
    "description": "VISOR AUTOHOT X 1"
  },
  {
    "mold": "MCX009",
    "description": "NIPLE CALEFACCION EXTERIOR "
  },
  {
    "mold": "MCX010",
    "description": "TAPA INFERIOR DE BARRAL x 2"
  },
  {
    "mold": "MFP001",
    "description": "#N/A"
  },
  {
    "mold": "MFP002",
    "description": "VISERA PLANA COLOR BLANCO "
  },
  {
    "mold": "MFP003",
    "description": "VISERA COLOR BLANCO x2"
  },
  {
    "mold": "MJB001",
    "description": "CARCAZA DERECHA DE MOTOR X 1"
  },
  {
    "mold": "MJB002",
    "description": "MANGO BORDEADORA DERECHO X 1"
  },
  {
    "mold": "MJB003",
    "description": "TUERCA CON INSERTO M6 x 1"
  },
  {
    "mold": "MJB004",
    "description": "PORTA CARRETEL C/OJAL"
  },
  {
    "mold": "MJB005",
    "description": "CARRETEL BORDEADORA x 2"
  },
  {
    "mold": "MJB006",
    "description": "AJUSTE CARRETEL x 2"
  },
  {
    "mold": "MLA001",
    "description": "TAPA DE MANIJA SUPERIOR ASPIRAD"
  },
  {
    "mold": "MLA002",
    "description": "CUERPO CARCAZA"
  },
  {
    "mold": "MLA003",
    "description": "CHASIS ASPIRADORA GRIS"
  },
  {
    "mold": "MLA004",
    "description": "TAPA SUPERIOR DE PERILLA "
  },
  {
    "mold": "MLA005",
    "description": "TAPA MANIJA INFERIOR ASPIRADORA"
  },
  {
    "mold": "MLA006",
    "description": "CARCAZA SUPERIOR MOTOR ASPIRAD"
  },
  {
    "mold": "MLA007",
    "description": "CARCAZA INFERIOR MOTOR ASPIRADO"
  },
  {
    "mold": "MLA008",
    "description": "TAPA DE TACHO"
  },
  {
    "mold": "MLA009",
    "description": "PLATO SUPERIOR DE MOTOR LA592"
  },
  {
    "mold": "MLA010",
    "description": "COBERTOR DE MOTOR"
  },
  {
    "mold": "MLA011",
    "description": "PLATO INFERIOR DE MOTOR LA 592"
  },
  {
    "mold": "MLA012",
    "description": "COBERTOR DE ACOPLE MANGUERA "
  },
  {
    "mold": "MLA013",
    "description": "ACOPLE DE MANGUERA ASP. AGUA"
  },
  {
    "mold": "MLA014",
    "description": "ACOPLE DE MANGUERA AISP. AIRE"
  },
  {
    "mold": "MLA015",
    "description": "MANIJA DE TAPA DE TACHO "
  },
  {
    "mold": "MLA016",
    "description": "TACHO 18 LTS"
  },
  {
    "mold": "MLA017",
    "description": "SOPORTE DE RUEDAS x 2"
  },
  {
    "mold": "MLA018",
    "description": "TAPA FRONTAL ASPIRADORA LA800"
  },
  {
    "mold": "MLA019",
    "description": "TAPA TRASERA ASPIRADORA LA800"
  },
  {
    "mold": "MLA020",
    "description": "SOPORTE DE CEPILLO ASP-DB01 x 2"
  },
  {
    "mold": "MLA021",
    "description": "BOTON ENCENDIDO x 1"
  },
  {
    "mold": "MLA022",
    "description": "BOTON TAPA FRONTAL x 2"
  },
  {
    "mold": "MLA023",
    "description": "CARCAZA DE MOTOR ASPIRADORA LA800"
  },
  {
    "mold": "MLA024",
    "description": "MALLA SALIDA FILTRO HEPA LA800 x 2"
  },
  {
    "mold": "MLA025",
    "description": "TAPA INFERIOR DE MANIJA X 2"
  },
  {
    "mold": "MLA026",
    "description": "BOTON DE VELOCIDADES x 4"
  },
  {
    "mold": "MLA027",
    "description": "CHASIS ASPIRADORA LA800"
  },
  {
    "mold": "MLA028",
    "description": "ACOPLE DE MANGUERA LA800 x 2"
  },
  {
    "mold": "MLA029",
    "description": "GANCHO PARA CEPILLO LA810 x 2"
  },
  {
    "mold": "MLA030",
    "description": "CARCAZA SUPERIOR DE MOTOR COLOR NEGRO"
  },
  {
    "mold": "MLA031",
    "description": "CHASIS ASPIRADORA COLOR GRIS"
  },
  {
    "mold": "MLA032",
    "description": "TAPA FRONTAL COLOR VIOLETA"
  },
  {
    "mold": "MLA033",
    "description": "TAPA TRASERA COLOR VIOLETA"
  },
  {
    "mold": "MLA034",
    "description": "TAPA DE MANIJA ASPIRADORA LA810 X 2"
  },
  {
    "mold": "MLA035",
    "description": "LATERAL CHASIS IZQUIERDO  NEGRO"
  },
  {
    "mold": "MLA036",
    "description": "TAPA TRASERA COLOR ROJO"
  },
  {
    "mold": "MLA037",
    "description": "TAPA DELANTERA COLOR ROJO"
  },
  {
    "mold": "MLA038",
    "description": "TAPA DE ACCESORIOS COLOR ROJO"
  },
  {
    "mold": "MLA039",
    "description": "CHASIS ASPIRADORA LA620"
  },
  {
    "mold": "MLA040",
    "description": "COBERTOR DE MANIJA ASPIRADORA x 2"
  },
  {
    "mold": "MLA041",
    "description": "CARCAZA DE BOLSA ASPIRADORA LILIANA"
  },
  {
    "mold": "MLA042",
    "description": "GANCHO PORTACEPILLO ASPIRADORA LILIANA x 4"
  },
  {
    "mold": "MLA043",
    "description": "LATERAL DE CHASIS IZQUIERDO"
  },
  {
    "mold": "MLA044",
    "description": "TAPA TRASERA ASPIRADORA LILIANA"
  },
  {
    "mold": "MLA045",
    "description": "TAPA DELANTERA ASPIRADORA LILIANA"
  },
  {
    "mold": "MLA046",
    "description": "GANCHO COLGADOR DE CEPILLO COLOR NEGRO "
  },
  {
    "mold": "MLA047",
    "description": "CHASIS LA110"
  },
  {
    "mold": "MLA048",
    "description": "CHASIS LA120"
  },
  {
    "mold": "MLA049",
    "description": "CHASIS LA130"
  },
  {
    "mold": "MLA050",
    "description": "CHASIS LA140"
  },
  {
    "mold": "MLB009",
    "description": "ENROLLACABLE COLOR NEGRO x 2"
  },
  {
    "mold": "MLL001",
    "description": "TAPA DE LUSTRA COLOR ROJO"
  },
  {
    "mold": "MLL002",
    "description": "CHASIS LUSTRA LILIANA"
  },
  {
    "mold": "MLL003",
    "description": "RUEDITAS DE ARRASTRE LUSTRA"
  },
  {
    "mold": "MLL004",
    "description": "PROTECTOR DE POLEAS x 4"
  },
  {
    "mold": "MLL005",
    "description": "TAPA ALOJAMIENTO x 3"
  },
  {
    "mold": "MLL006",
    "description": "TAPITA DE POLEAS x 4"
  },
  {
    "mold": "MLL007",
    "description": "TRABA DE POLEA PARA CEPILLO x 4"
  },
  {
    "mold": "MLL008",
    "description": "POLEA CHICA LUSTRA x 2"
  },
  {
    "mold": "MLL009",
    "description": "TRABA FIELTRO MODIFICADO x 2"
  },
  {
    "mold": "MLL010",
    "description": "CIERRE DE BOLSA ELECTROLUX"
  },
  {
    "mold": "MLL011",
    "description": "ACOPLE DE MANGO SUPERIOR "
  },
  {
    "mold": "MLL012",
    "description": "MANGO COLOR NEGRO"
  },
  {
    "mold": "MLL013",
    "description": "TAPA CANAL ASPIRACION X 2 (MODIFICACION)"
  },
  {
    "mold": "MLL014",
    "description": "HORQUILLA DE LUSTRA ELECTRLUX"
  },
  {
    "mold": "MLL015",
    "description": "PUENTE HORQUILLA LUSTRA"
  },
  {
    "mold": "MLL017",
    "description": "LLANTA LUSTRA x 2"
  },
  {
    "mold": "MLL018",
    "description": "TRABA PLASTICAS DE BARRAL x 4"
  },
  {
    "mold": "MLL021",
    "description": "TAPA LUSTRA ELECTROLUX"
  },
  {
    "mold": "MLL022",
    "description": "TAPITA DE LUSTRA ELECTROLUX x 2"
  },
  {
    "mold": "MLL023",
    "description": "EMPUÑADURA COLOR GRIS ELECTROLUX"
  },
  {
    "mold": "MLL024",
    "description": "SALIDA DE BOLSA x 2"
  },
  {
    "mold": "MLL026",
    "description": "TAPITA FRONTAL CENTRO PLANO"
  },
  {
    "mold": "MLL027",
    "description": "ADAPTADOR DE BARRAL LUSTRA X 2"
  },
  {
    "mold": "MOLDE VIEJO",
    "description": "#N/A"
  },
  {
    "mold": "MRO025",
    "description": "#N/A"
  },
  {
    "mold": "MRP001",
    "description": "BASE INTERMEDIA VIOLETA"
  },
  {
    "mold": "MRP002",
    "description": "TAPA TRASERA RPS100/101 x 2"
  },
  {
    "mold": "MRP003",
    "description": "PERILLA CONTROL TEMP RPS100 X 2"
  },
  {
    "mold": "MRP004",
    "description": "CUERPO RPS100"
  },
  {
    "mold": "MRP005",
    "description": "TAPA MANIJA SUPERIOR RPS100 x 2"
  },
  {
    "mold": "MRP006",
    "description": "PASACABLE PLANCHA RPS 100"
  },
  {
    "mold": "MRP007",
    "description": "TAPA MANIJA TRASERA RPS101 X 2"
  },
  {
    "mold": "MRP009",
    "description": "TAPA TRASERA PLANCHA DURABRAND"
  },
  {
    "mold": "MRP010",
    "description": "PERILLA CONTROL TEMP RPV201 X 4"
  },
  {
    "mold": "MRP012",
    "description": "TANQUE DE AGUA CELESTE TRASLÚCIDO "
  },
  {
    "mold": "MRP013",
    "description": "TAPA MANIJA PLANCHA M 201 X 2"
  },
  {
    "mold": "MRP015",
    "description": "PASACABLE PLANCHA M 201 X 4"
  },
  {
    "mold": "MRP016",
    "description": "PERILLA PLANCHA M300 x 4"
  },
  {
    "mold": "MRP017",
    "description": "BASE TANQUE DE AGUA MOD 300"
  },
  {
    "mold": "MRP018",
    "description": "TANQUE DE AGUA TURQUESA SIL40 x 2"
  },
  {
    "mold": "MRP019",
    "description": "CUERPO RPV 300"
  },
  {
    "mold": "MRP020",
    "description": "PASACABLE PLANCHA M 300"
  },
  {
    "mold": "MRP021",
    "description": "BASE INTERMEDIA MOD 400"
  },
  {
    "mold": "MRP022",
    "description": "PASACABLE MULTIDIRECCIONAL 400/401"
  },
  {
    "mold": "MRP023",
    "description": "TAPA TRASERA PLANCHA M 400"
  },
  {
    "mold": "MRP024",
    "description": "PERILLA CONTROL DE TEMPERATURA RPV400"
  },
  {
    "mold": "MRP025",
    "description": "TANQUE PLANCHA SIL50"
  },
  {
    "mold": "MRP026",
    "description": "TAPA MANIJA DE PLANCHA M 400"
  },
  {
    "mold": "MRP027",
    "description": "BUJE CENTRADOR PARTIDO X 4"
  },
  {
    "mold": "MRP028",
    "description": "VALVULA DE AGUJA RPV400 x 8"
  },
  {
    "mold": "MRP029",
    "description": "BASE TANQUE PLANTA RPV400 x 2"
  },
  {
    "mold": "MRX001",
    "description": "CONECTOR PERILLA TERMOSTATO X 2  (SOLO 2 OK)"
  },
  {
    "mold": "MRX003",
    "description": "JARRITOS PARA PLANCHAS X 3"
  },
  {
    "mold": "MVB001",
    "description": "PIE TURBO FIJO"
  },
  {
    "mold": "MVB002",
    "description": "PROLONGADOR MOTOR EJE TURBO FIJO"
  },
  {
    "mold": "MVB003",
    "description": "SUJETADOR PORTA TUERCA DER."
  },
  {
    "mold": "MVB004/A",
    "description": "CAPUCHON 20\" TURBO FIJO"
  },
  {
    "mold": "MVB004/B",
    "description": "CAPUCHON 20\" OSCILANTE C/REPELER"
  },
  {
    "mold": "MVB004/C",
    "description": "CAPUCHON 20\" TURBO FIJO C/REPELER"
  },
  {
    "mold": "MVB004/D",
    "description": "CAPUCHON 20\" OSCILANTE S/REPELER"
  },
  {
    "mold": "MVB005/A",
    "description": "CAPUCHON 18\" OSCILANTE C/IONIZADOR"
  },
  {
    "mold": "MVB005/B",
    "description": "CAPUCHON 18\" TURBO FIJO"
  },
  {
    "mold": "MVB005/C",
    "description": "CAPUCHON 18\" OSCILANTE S/IONIZADOR"
  },
  {
    "mold": "MVB006",
    "description": "PIE NUEVO TURBO FIJO X 2"
  },
  {
    "mold": "MVB008",
    "description": "MUÑON DE AJUSTE NUEVO X 2"
  },
  {
    "mold": "MVB009",
    "description": "BASE DE TURBO 18\" COLOR NEGRO"
  },
  {
    "mold": "MVB010",
    "description": "BASE DE TURBO 20\" COLOR NEGRO"
  },
  {
    "mold": "MVB011",
    "description": "CAPUCHÓN DE TURBO CORTO 18/20\" "
  },
  {
    "mold": "MVB012",
    "description": "TUERCA TURBO FIJO COLOR NEGRO X 4"
  },
  {
    "mold": "MVB013",
    "description": "PORTA TUERCA TURBO FIJO COLOR NEGRO X 2"
  },
  {
    "mold": "MVB014",
    "description": "PARRILLA DELANTERA 12\" ESPIRALADA BLANCO"
  },
  {
    "mold": "MVB015",
    "description": "PARRILLA TRASERA 12\" ESPIRALADA BLANCO"
  },
  {
    "mold": "MVB016",
    "description": "CARCASA TRASERA DE CIERRE COLOR BLANCO"
  },
  {
    "mold": "MVB017",
    "description": "PALA PLASTICA 5 ASPAS 12\" TRANSPARENTE"
  },
  {
    "mold": "MVB018",
    "description": "CUERPO FRONTAL COLOR BLANCO"
  },
  {
    "mold": "MVB019",
    "description": "BASES SISTEMA CIRCULADOR"
  },
  {
    "mold": "MVB020",
    "description": "ARANDELA SISTEMA CIRCULADOR"
  },
  {
    "mold": "MVB021",
    "description": "CENTRO DE PARRILLA COLOR BLANCO"
  },
  {
    "mold": "MVB022",
    "description": "BASE DE TURBO 16\" COLOR NEGRO"
  },
  {
    "mold": "MVC005",
    "description": "FILTRO TC 30 X 1"
  },
  {
    "mold": "MVD001",
    "description": "SOPORTE DE PARED COLOR BLANCO"
  },
  {
    "mold": "MVD003",
    "description": "SOPORTE DE PARED NUEVO"
  },
  {
    "mold": "MVD004",
    "description": "VISOR DE COMANDO P/SOPORTE PARED x 1"
  },
  {
    "mold": "MVD005",
    "description": "VISOR NUEVO SOPORTE DE PARED"
  },
  {
    "mold": "MVI001",
    "description": "BASE BARRAL INDUSTRIAL CORONA"
  },
  {
    "mold": "MVI002",
    "description": "#N/A"
  },
  {
    "mold": "MVI003",
    "description": "#N/A"
  },
  {
    "mold": "MVI004",
    "description": "DISCO INDUSTRIAL REDONDEADO X 2"
  },
  {
    "mold": "MVI005",
    "description": "PALA VENT. IND.3 ASPAS 27\" NEGRA"
  },
  {
    "mold": "MVI006",
    "description": "BUJE PALA VENTILADOR INDUST x 2"
  },
  {
    "mold": "MVI007",
    "description": "PALA PLASTICA INDUSTRIAL 4 ASPAS"
  },
  {
    "mold": "MVI008",
    "description": "CONECTOR DE GIRO INDUSTRIAL x 2"
  },
  {
    "mold": "MVI009",
    "description": "MUÑON CENTRO DE PALA 32” 2 ASPAS"
  },
  {
    "mold": "MVI010",
    "description": "SUJETADOR DE PARRILLA VENTI INDUSTRIAL"
  },
  {
    "mold": "MVI011",
    "description": "ADAPTADOR CUELLO U COLOR NEGRO x 2"
  },
  {
    "mold": "MVI012",
    "description": "CUELLO P/VENTILADOR INDUSTRIAL x 2 "
  },
  {
    "mold": "MVI013",
    "description": "SOPORTE DE PARED"
  },
  {
    "mold": "MVI014",
    "description": "CAPUCHON 32 PARA TURBO IND"
  },
  {
    "mold": "MVP 014",
    "description": "#N/A"
  },
  {
    "mold": "MVP001",
    "description": "CENTRO DE PARR. ELECTROLUX. X 3"
  },
  {
    "mold": "MVP002",
    "description": "PARRILLA PLASTICA TRASERA 18\""
  },
  {
    "mold": "MVP003",
    "description": "PARRILLA PLASTICA TRASERA 20\""
  },
  {
    "mold": "MVP004",
    "description": "TUERCA CIERRE DE PARRILLA x 4"
  },
  {
    "mold": "MVP005",
    "description": "BASE DE BARRAL LISO"
  },
  {
    "mold": "MVP006",
    "description": "PERILLA COLOR BLANCO X 2"
  },
  {
    "mold": "MVP007",
    "description": "CAPUCHON 16\" ORBITAL COLOR NEGRO"
  },
  {
    "mold": "MVP008",
    "description": "CAPUCHON 20 \" ORBITAL C/REPELER"
  },
  {
    "mold": "MVP009",
    "description": "TAPITA TRABACABLE x 8"
  },
  {
    "mold": "MVP010",
    "description": "TUERCA DE PALA x 4"
  },
  {
    "mold": "MVP011",
    "description": "PALA 18 NACIONAL"
  },
  {
    "mold": "MVP012",
    "description": "PALA 20 \" CHINA"
  },
  {
    "mold": "MVP013",
    "description": "PALA 18\" CHINA"
  },
  {
    "mold": "MVP014",
    "description": "PALA 20 \" CHINA"
  },
  {
    "mold": "MVP015",
    "description": "BOTELLON CON CUELLO x 2"
  },
  {
    "mold": "MVP016/A",
    "description": "#N/A"
  },
  {
    "mold": "MVP016/B",
    "description": "#N/A"
  },
  {
    "mold": "MVP017",
    "description": "#N/A"
  },
  {
    "mold": "MVP018",
    "description": "BIELA DE GIRO SIST. ORB. TURBO T20 x2"
  },
  {
    "mold": "MVP019",
    "description": "#N/A"
  },
  {
    "mold": "MVP020",
    "description": "#N/A"
  },
  {
    "mold": "MVP021",
    "description": "#N/A"
  },
  {
    "mold": "MVP022",
    "description": "CUELLO SISTEMA ORBITAL X 2"
  },
  {
    "mold": "MVP023/A",
    "description": "CUELLO VENTILADOR x 2"
  },
  {
    "mold": "MVP023/B",
    "description": "CUELLO VENTILADOR PARA 22\" x 2"
  },
  {
    "mold": "MVP025",
    "description": "COPA ADAPTADOR DE BARRAL GRIS x2"
  },
  {
    "mold": "MVP026",
    "description": "CACHA COLOR GRIS P/BASE X 4"
  },
  {
    "mold": "MVP027",
    "description": "PRENSA CONJUNTO TIPOVER"
  },
  {
    "mold": "MVP028",
    "description": "BASE COLOR NEGRO CON 4 ALOJ"
  },
  {
    "mold": "MVP029",
    "description": "ANILLO SISTEMA DE GIRO ORBITAL x4"
  },
  {
    "mold": "MVP030",
    "description": "BOTELLON DELANTERO CURVO NEGRO"
  },
  {
    "mold": "MVP031",
    "description": "BOTELLON DIGITAL DELANTERO BLANCO"
  },
  {
    "mold": "MVP032",
    "description": "FRENTE TRASLUCIDO BOT. DIG. ELX X 2"
  },
  {
    "mold": "MVP033",
    "description": "PALA 4 ASPAS PLASTICAS 24\" TRANSP"
  },
  {
    "mold": "MVP034",
    "description": "NIPLE GRANDE x 2"
  },
  {
    "mold": "MVP035",
    "description": "BUJE INFERIOR PARA BARRAL MIDEA"
  },
  {
    "mold": "MVP036",
    "description": "TAPA AGUJERO SUPERIOR COLOR BLANCO x 2"
  },
  {
    "mold": "MVP037",
    "description": "BASE REDONDA VENTILADOR 16\""
  },
  {
    "mold": "MVP038",
    "description": "PALA 20\" 5 ASPAS COLOR NEGRO"
  },
  {
    "mold": "MVP039",
    "description": "PARRILLA DELANTERA 16\" COLOR NEGRO"
  },
  {
    "mold": "MVP040",
    "description": "PARRILLA PLASTICA DELANTERA 18\" ESPIRALADA"
  },
  {
    "mold": "MVP041",
    "description": "PARRILLA PLASTICA DELANTERA 20\" ESPIRALADA"
  },
  {
    "mold": "MVP042",
    "description": "FRENTE BOTELLON ELX COLOR BLANCO X 2"
  },
  {
    "mold": "MVP043",
    "description": "PERILLA TIMER ELX COLOR GRIS x 2"
  },
  {
    "mold": "MVP044/A",
    "description": "CAPUCHON 18/20 c/repeler NEGRO x 2"
  },
  {
    "mold": "MVP044/B",
    "description": "CAPUCHON 18/20 s/repeler NEGRO x 2"
  },
  {
    "mold": "MVP045",
    "description": "COGOTE ORBITAL NUEVO X 4"
  },
  {
    "mold": "MVP046",
    "description": "VASTAGO DE GIRO NUEVO"
  },
  {
    "mold": "MVP047",
    "description": "PERILLA CONVECTOR VERTICAL x 4"
  },
  {
    "mold": "MVP048",
    "description": "TAPA SUPERIOR SIST. REPELER NUEVO X 2"
  },
  {
    "mold": "MVP049",
    "description": "CENTRO DE PARRILLA CON ENCASTRE COLOR NEGRO"
  },
  {
    "mold": "MVP051",
    "description": "CENTRO DE PARRILLA TURBO MATALICO X 2"
  },
  {
    "mold": "MVP052",
    "description": "BUJE ACOPLE CAÑO PARRILLA X 4"
  },
  {
    "mold": "MVP053",
    "description": "BASE CON ADAPTADOR DISEñO NUEVO"
  },
  {
    "mold": "MVP054",
    "description": "ADAPTADOR SOPORTE DE CAPUCHÓN X 5"
  },
  {
    "mold": "MVP055",
    "description": "TAPA FRONTAL BOTELLON MECANICO"
  },
  {
    "mold": "MVP056",
    "description": "TAPA FRONTAL DIGITAL BOTELLON LARGO x 2"
  },
  {
    "mold": "MVP057",
    "description": "TAPA FRONTAL MECANICO BOTELLON LARGO x 2"
  },
  {
    "mold": "MVP058",
    "description": "MUÑÓN CENTRO DE PALA 25\""
  },
  {
    "mold": "MVP059",
    "description": "NUEVO ADAPTADOR 16\" x 2"
  },
  {
    "mold": "MVP060",
    "description": "BIELA DE GIRO 16\" x 2"
  },
  {
    "mold": "MVT001",
    "description": "CARCAZA SUPERIOR VENT DE TECHO"
  },
  {
    "mold": "MVT002",
    "description": "CAPUCHON CHICO BLANCO x 2"
  },
  {
    "mold": "MVT003",
    "description": "FLORON COLOR BLANCO"
  },
  {
    "mold": "MVT004",
    "description": "PORTA PALA SUPERIOR X 2"
  },
  {
    "mold": "MVT005",
    "description": "BASE PORTA LUMINARIA"
  },
  {
    "mold": "MVT006",
    "description": "BARRAL LARGO PLASTICO COLOR MARRON"
  },
  {
    "mold": "MVT007",
    "description": "BRIDA VT x 2"
  },
  {
    "mold": "MVT008",
    "description": "PLAFON LUMINARIA"
  },
  {
    "mold": "MVT010",
    "description": "SOPORTE A TECHO x 1"
  },
  {
    "mold": "MVT011",
    "description": "TAPON ROSCA LUMINARIA x 8"
  },
  {
    "mold": "MVT012",
    "description": "BUJE PARA CAñO x 2"
  },
  {
    "mold": "MVT013",
    "description": "FLORON COLOR BLANCO"
  },
  {
    "mold": "MVX002",
    "description": "ARANDELAS BARRAL x 8"
  },
  {
    "mold": "MVX003",
    "description": "BOTELLON BARRAL FRONTAL"
  },
  {
    "mold": "MVX004",
    "description": "ADAPTADOR BARRAL x 2"
  },
  {
    "mold": "MVX005",
    "description": "SOPORTE DE MOTOR x 4"
  },
  {
    "mold": "MVX006",
    "description": "ADAPTADOR PIE TURBO OSCILANTE"
  },
  {
    "mold": "MVX008",
    "description": "BASE VENTILADOR DE MESA"
  },
  {
    "mold": "MVX009",
    "description": "CENTRO DE PALA COLOR BEIGE"
  },
  {
    "mold": "MVX010",
    "description": "BASE DE BARRAL RAYADA"
  },
  {
    "mold": "MVX011",
    "description": "BASE DISEÑO PERFORACIONES NEGRO"
  },
  {
    "mold": "MVX012",
    "description": "TAPA SUPERIOR SIST. REPELER X 2"
  },
  {
    "mold": "MVX013",
    "description": "BOTELLON BARRAL FRONTAL"
  },
  {
    "mold": "MVX014",
    "description": "PARRILLA PLASTICA DELANTERA 18\""
  },
  {
    "mold": "MVX015",
    "description": "PARRILLA PLASTICA DELANTERA 20\""
  },
  {
    "mold": "MVX017",
    "description": "PERILLA CUELLO COLOR BEIGE"
  },
  {
    "mold": "MVX018",
    "description": "TAPA CUBRE IONIZADOR x 2"
  },
  {
    "mold": "MVX021",
    "description": "PALA 5 ASPAS"
  },
  {
    "mold": "MVX022",
    "description": "#N/A"
  },
  {
    "mold": "MVX024",
    "description": "PIE TURBO ORBITAL"
  },
  {
    "mold": "MVX025",
    "description": "BASE DE MESA CON ZAPATA"
  },
  {
    "mold": "MVX026",
    "description": "BOTONERA BOTELLON DIGITAL x 4"
  },
  {
    "mold": "MVX027",
    "description": "FRENTE TRASLUCIDO BOT. DIG. X 1"
  },
  {
    "mold": "MVX028",
    "description": "CARCAZA FRONTAL DE BOT.DIG x 2"
  },
  {
    "mold": "MVX029",
    "description": "CARCAZA TRASERA DE BOT.DIG x 2"
  },
  {
    "mold": "MVX030",
    "description": "BASE BARRAL NUEVA DISEÑO CUADRA"
  },
  {
    "mold": "MVX031",
    "description": "PERILLA DE VELOCIDAD BOT. MEC x 2"
  },
  {
    "mold": "MVX032",
    "description": "CARCAZA FRONTAL DE BOTELLON MECANICO x 2"
  },
  {
    "mold": "MVX033",
    "description": "BASE DE BARRAL INDUSTRIAL BLANCO"
  },
  {
    "mold": "MVX034",
    "description": "ENCASTRE EXTERIOR CENTRO PARRILLA NEGRO"
  },
  {
    "mold": "MVX035",
    "description": "CENTRO DE PARRILLA PIEZA FONDO GRIS"
  },
  {
    "mold": "MVX036",
    "description": "PIE LISO GRANDE COLOR NEGRO"
  },
  {
    "mold": "MVX037",
    "description": "PARRILLA TRASERA 16\" COLOR NEGRO"
  },
  {
    "mold": "MVX038",
    "description": "PALA 5 ASPAS TRANSPARENTE 16\""
  },
  {
    "mold": "MVX039",
    "description": "VASTAGO DE GIRO NUEVO"
  },
  {
    "mold": "MVX040",
    "description": "BASE DE MESA COLOR BLANCO"
  },
  {
    "mold": "MVX041",
    "description": "TAPA INFERIOR PERILLA COLOR BLANCO x 2"
  },
  {
    "mold": "MVX042",
    "description": "SOPORTE DE MOTOR NUEVO x 4"
  },
  {
    "mold": "MVX043",
    "description": "MUÑÓN DE PALA TRÉBOL 20\""
  },
  {
    "mold": "MVX044",
    "description": "MUÑON DE PALA TREBOL 18\" Y 22\" AHORA 20\""
  },
  {
    "mold": "MVX046",
    "description": "PARRILLA TRASERA 18\" ESPIRALADA"
  },
  {
    "mold": "MVX047",
    "description": "PARRILLA TRASERA 20\" ESPIRALADA MODIFICADA"
  },
  {
    "mold": "MAL051",
    "description": "CARDAN DE ARRASTRE COLOR NEGRO x 4"
  },
  {
    "mold": "MVX050",
    "description": "ARO ASPERSOR TRASERO"
  },
  {
    "mold": "MVX049",
    "description": "ARO ASPERSOR FRONTAL"
  },
  {
    "mold": "MVX051",
    "description": "TAPA DE VALVULA x 1"
  },
  {
    "mold": "MVX052",
    "description": "PORTA TUERCA x 2"
  },
  {
    "mold": "MVX048",
    "description": "TERMINAL DE ZUNCHO DE PARRILLA x 8"
  },
  {
    "mold": "MVX053",
    "description": "MANIJA CON PASACABLE x 2"
  },
  {
    "mold": "MAL043",
    "description": "ARO ADAPTADOR DE JARRA PP"
  },
  {
    "mold": "MAL062",
    "description": "TOPE DE GOMA LICUADORA AL116 COLOR NEGRO x 8"
  },
  {
    "mold": "MCI020",
    "description": "TAPA DE BASE DE GIRO COLOR BLANCO"
  },
  {
    "mold": "MCF012",
    "description": "ASA INFERIOR PARA CAñO COLOR NEGRO x 1"
  },
  {
    "mold": "MCV016",
    "description": "VISOR ROTATIVO x 2"
  },
  {
    "mold": "MCX011",
    "description": "TAPA CIEGA COLOR NEGRO"
  },
  {
    "mold": "MCV017",
    "description": "TAPA LATERAL PARA TIP OVER"
  },
  {
    "mold": "MCV018",
    "description": "BASE PARTIDA A"
  },
  {
    "mold": "MCF018",
    "description": "TAPA FRONTAL PROLONGADA COLOR NEGRO"
  },
  {
    "mold": "MCF017",
    "description": "NUEVO PORTA COMANDOS COLOR NEGRO x 2"
  },
  {
    "mold": "MCF014",
    "description": "TAPA CENTRAL DE FRENTE NEGRO CFI700 x 2"
  },
  {
    "mold": "MCF016",
    "description": "SOPORTE DE RESISTENCIAS"
  },
  {
    "mold": "MCC031",
    "description": "CUERPO DELANTERO CFH450 COLOR NEGRO"
  },
  {
    "mold": "MCC032",
    "description": "CUERPO TRASERO CFH450 COLOR NEGRO"
  },
  {
    "mold": "MCF019",
    "description": "PALA 3 ASPAS CALOVENTOR COLOR NEGRO"
  },
  {
    "mold": "MCF013",
    "description": "DORSO CFI700 COLOR NEGRO"
  },
  {
    "mold": "MCF015",
    "description": "FRENTE CFI700 COLOR NEGRO"
  },
  {
    "mold": "MCT042",
    "description": "SOPORTE DE PLAQUETA"
  },
  {
    "mold": "MAP030",
    "description": "BOTÓN DE ENCENDIDO COLOR AZUL"
  },
  {
    "mold": "MAP029",
    "description": "TAPA INFERIOR DE BASE COLOR BLANCO"
  }
]

const uploadAllItems = (req,res)=>{ //checked
  molds.insertMany(allInputs)
  .then((data) => {
    console.log('EXITO: ')
    res.status(200).json({data})
  })
  .catch((error) => res.status(500).json(error));
}


const getItems = (req,res)=>{//checked
  const areaSearched = req.params.area
  console.log(areaSearched)
  items.find({
    $or: [
      {area: areaSearched}
    ]
  })
  .then((data) => {
    console.log('EXITO: ')
    res.status(200).json(data)
  })
  .catch((error) => res.status(500).json(error));
}
const addItemsAsync = (req,res) => {
  const inp = req.body
  const areaPosted = req.params.area
  console.log(inp)

  const newItem = new items(
  {
    code: inp.codigo,
    description: inp.detalle,
    area: areaPosted,
    family: inp.familia,
    inPallets: inp.cantxPallet,
    stockMin: inp.stockM,
  })
  return newItem.save()
  .catch((error) => {
    throw error
  });
}
const addItem = (req,res)=>{ //checked 
  addItemsAsync(req,res)
  .then((result) => {
    console.log('EXITO: ', result)
    res.status(200).json({result})
  })
  .catch((error) => res.status(500).json(error));
}


const getProductos = (req,res) => { //cheked
  products.find()
  .then((data) => {
    console.log('EXITO: ')
    res.status(200).json(data)
  })
  .catch((error) => res.status(500).json(error));
}
const addProductAsync = (req,res) => {
  const inp = req.body
  const newProduct = new products(
  {
    "code": inp.codigo,
    "calipso": inp.calipso,
    "description": inp.descripcion 
  })
  return newProduct.save()
  .catch((error) => {
    throw error
  });
}
const addProduct = (req,res)=>{ //checked 
  addProductAsync(req,res)
  .then((result) => {
    console.log('EXITO: ', result)
    res.status(200).json({result})
  })
  .catch((error) => res.status(500).json(error));
}



const getMachines = (req,res)=>{
  machines.find()
  .then((data) => {
    console.log('EXITO: ')
    res.status(200).json(data)
  })
  .catch((error) => res.status(500).json(error));
}

const getMolds = (req, res) => {
  molds.find()
  .then((data) => {
    console.log('EXITO: ')
    res.status(200).json(data)
  })
  .catch((error) => res.status(500).json(error));
}





const getEmailsProcesos = (req,res)=>{
  let emailsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/emails/procesos.json','utf8')
  let emails = JSON.parse(emailsRaw)
  res.send(emails)
}
const postEmailsProcesos = (req,res)=>{
  const newEmials = req.body
  fs.writeFile('../'+db+'/emails/procesos.json',JSON.stringify(newEmials,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'Los mails fueron actualizados con éxito'})
}

const getEmailsInyeccionMaq = (req,res) => {
  let emailsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/emails/inyeccionMaquinas.json','utf8')
  let emails = JSON.parse(emailsRaw)
  res.send(emails)
}
const postEmailsInyeccionMaq = (req,res)=>{
  const newEmials = req.body
  fs.writeFile('../'+db+'/emails/inyeccionMaquinas.json',JSON.stringify(newEmials,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'Los mails fueron actualizados con éxito'})
}
const getEmailsInyeccionMol = (req,res) => {
  let emailsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/emails/inyeccionMoldes.json','utf8')
  let emails = JSON.parse(emailsRaw)
  res.send(emails)
}
const postEmailsInyeccionMol = (req,res)=>{
  const newEmials = req.body
  fs.writeFile('../'+db+'/emails/inyeccionMoldes.json',JSON.stringify(newEmials,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'Los mails fueron actualizados con éxito'})
}



//Aux MongoDB


module.exports = {
  getMachines, 
  getProductos, addProduct,
  getMolds,
  uploadAllItems, getItems, addItem,



  getEmailsProcesos, postEmailsProcesos, 
  getEmailsInyeccionMaq, postEmailsInyeccionMaq,
  getEmailsInyeccionMol, postEmailsInyeccionMol,
}