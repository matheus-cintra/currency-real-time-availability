const axios = require('axios')
const { Iconv } = require('iconv');
const express = require('express');
let normalMoedas = [];

const app = express();

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/get-cotation', async (req, res) => {
  let { de, para } = req.query;

  de = de.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  para = para.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  let moedasLowerCase = moedas.map(x => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())

  if (moedasLowerCase.includes(de) && moedasLowerCase.includes(para)) {
    let position1 = moedas.indexOf(de);
    let position2 = moedas.indexOf(para);
    let converterDe = moedas[position1].split(" ").join("+").normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    let converterPara = moedas[position2].split(" ").join("+").normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const uri = `https://www.google.com/search?q=${converterDe}+para+${converterPara}`
    const result = await axios.get(uri, {
      "headers": {
        "upgrade-insecure-requests": "1",
        "Content-Type": "text/plain",
        "charset": "utf-8"
      },
      responseType: "arraybuffer",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": null,
      "method": "GET",
      "mode": "cors"
    });

    const iconv = new Iconv('ISO-8859-2', 'utf-8');
    const preCotation = iconv
      .convert(new Buffer.from(result.data), 'ISO-8859-2')
      .toString('utf-8')


    let cotation = preCotation.split("<div class=")
    cotation = cotation.filter(x => x.length < 110)
    cotation = cotation.find(x => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(moedas[position2].toLowerCase()))
    cotation = cotation.split(`">`)
    cotation = cotation[1].split('</div>')
    console.warn('################################################################');
    console.warn('');
    console.warn(`Conversão de ${normalMoedas[position1]} para ${normalMoedas[position2]} (Google Results): 1 ${normalMoedas[position1]} equivalem a ${cotation[0]}`);
    console.warn('');
    console.warn('################################################################');
  }
})

app.listen(process.env.PORT || 3000, () => {
  normalMoedas = moedas;
  moedas = moedas.map(x => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())
  console.warn(`Listening on port: 3000`); // eslint-disable-line
});

module.exports = app;

let moedas = [
  "Afegane afegão",
  "Ariary malgaxe",
  "Baht tailandês",
  "Balboa panamenho",
  "Birr etíope",
  "Bitcoin",
  "Bitcoin Cash",
  "Boliviano da Bolívia",
  "Bolívar venezuelano",
  "Cedi ganês",
  "Colom salvadorenho",
  "Colón costarriquenho",
  "Coroa dinamarquesa",
  "Coroa islandesa",
  "Coroa norueguesa",
  "Coroa sueca",
  "Coroa tcheca",
  "Córdoba nicaraguense",
  "Dalasi gambiano",
  "Dinar argelino",
  "Dinar bareinita",
  "Dinar iraquiano",
  "Dinar jordaniano",
  "Dinar kuwaitiano",
  "Dinar líbio",
  "Dinar macedônio",
  "Dinar sérvio",
  "Dinar tunisiano",
  "Dirham dos Emirados Árabes Unidos",
  "Dirham marroquino",
  "Dong vietnamita",
  "Dram armênio",
  "Dólar Liberiano",
  "Dólar americano",
  "Dólar australiano",
  "Dólar bahamense",
  "Dólar barbadense",
  "Dólar belizenho",
  "Dólar bermudense",
  "Dólar bruneano",
  "Dólar canadense",
  "Dólar das Ilhas Cayman",
  "Dólar das Ilhas Salomão",
  "Dólar de Hong Kong",
  "Dólar de Trinidad e Tobago",
  "Dólar do Caribe Oriental",
  "Dólar fijiano",
  "Dólar guianense",
  "Dólar jamaicano",
  "Dólar namibiano",
  "Dólar neozelandês",
  "Dólar singapuriano",
  "Dólar surinamês",
  "Escudo cabo-verdiano",
  "Ether",
  "Euro",
  "Florim arubano",
  "Florim das Antilhas Holandesas",
  "Florim húngaro",
  "Franco CFA Central",
  "Franco CFA ocidental",
  "Franco CFP",
  "Franco burundiano",
  "Franco comoriano",
  "Franco congolês",
  "Franco do Djibouti",
  "Franco guineano",
  "Franco ruandês",
  "Franco suíço",
  "Gourde haitiano",
  "Guarani paraguaio",
  "Hryvnia ucraniano",
  "Iene japonês",
  "Kina papuásia",
  "Kip laosiano",
  "Kuna croata",
  "Kwacha malauiana",
  "Kwacha zambiano",
  "Kwanza angolano",
  "Lari georgiano",
  "Lek albanês",
  "Lempira hondurenha",
  "Leone de Serra Leoa",
  "Leu moldávio",
  "Leu romeno",
  "Lev búlgaro",
  "Libra Sudanesa",
  "Libra egípcia",
  "Libra esterlina",
  "Libra libanesa",
  "Lilangeni suazi",
  "Lira turca",
  "Litecoin",
  "Loti do Lesoto",
  "Manat azeri",
  "Manat turcomano",
  "Marco conversível da Bósnia e Herzegovina",
  "Metical moçambicano",
  "Naira nigeriana",
  "Ngultrum butanês",
  "Novo dólar taiwanês",
  "Novo shekel israelense",
  "Novo sol peruano",
  "Ouguiya mauritana",
  "Pataca",
  "Paʻanga tonganesa",
  "Peso argentino",
  "Peso chileno",
  "Peso colombiano",
  "Peso cubano",
  "Peso dominicano",
  "Peso filipino",
  "Peso mexicano",
  "Peso uruguaio",
  "Pula botsuanesa",
  "Quetzal guatemalteco",
  "Quiate",
  "Rand sul-africano",
  "Real brasileiro",
  "Remimbi",
  "Rial catariano",
  "Rial iemenita",
  "Rial iraniano",
  "Rial omanense",
  "Riel",
  "Ringgit malaio",
  "Riyal saudita",
  "Rublo bielorrusso",
  "Rublo russo",
  "Rupia Mauriciana",
  "Rupia das Seychelles",
  "Rupia do Sri Lanka",
  "Rupia indiana",
  "Rupia indonésia",
  "Rupia maldívia",
  "Rupia nepalesa",
  "Rúpia Paquistanesa",
  "Som quirguiz",
  "Som uzbeque",
  "Somoni",
  "Taka bengali",
  "Tenge cazaque",
  "Unidades de Fomento chilenas",
  "Won sul-coreano",
  "Xelim Ugandês",
  "Xelim queniano",
  "Xelim somali",
  "Xelim tanzaniano",
  "Yuan chinês (offshore)",
  "Zloty polonês"
]