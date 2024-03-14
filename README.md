# Air Bean

av Mattias Rensmo

### Kort om arbetet

Jag började med att testa alla olika API-rutter i Postman. Sedan försökte jag planera hur jag skulle lägga upp de olika sidorna. Vilka sidor behövde använda Zustand. Vilka behövde använda API:et. Hur skulle jag göra Cart-sidan som en modal över meny-sidan. Resterna av planeringen finns längre ner i det här dokumentet men framförallt i ett fysiskt block som jag ritade ner hela sidan i.

#### Sass

Fokus när jag väl började koda var funktion sen utseende. Kanske borde jag ha gjort dem mer parallellt för att få en mer genomtänkt struktur på all scss som just nu är spretig och många gånger onödigt upprepande. Jag gjorde sass-filerna till moduler för att kunna hålla dem var för sig vilket kanske inte var så smart då det ledde till ännu mer upprepande kod.

#### React

Jag känner att jag fortfarande inte riktigt förstår React på djupet och vad som är bästa sättet att lösa saker på. Jag kämpade länge med api:et som en custom hook. I vredesmod gjorde jag en vanilj-fetch-funktion i varje fil bara för att få det att fungera. Vilket ställde till nya problem när jag ville kunna skicka med en JWT. Dags att bygga om det igen till en riktig react custom hook. Tack internet... Mycket tid försvann på att inte veta hur jag skulle göra det på rätt sätt från början.

#### TypeScript

Jag gillar TypeScript men pga tidsnöd tvingades jag använda några `any` när jag byggde om api-hanteringen sista gången. De interfaces jag ändå här är heller inte särskilt väl sorterade. Men detta var vad jag mäktade med.

#### Avslutningsvis

Jag har använt kravspecifikationen nedan för att avgränsa mitt arbete när jag inte hade tid att göra det så bra som jag ville utan fick nöja mig med att det fungerade. Jag tycker mig i alla fall ha uppfyllt alla krav för G, VG och Stilpoäng. Se nedan.

### Kravspecifikation

#### För att få Godkänt ska ni:

- ✅ Gjort enligt Figma skissen
- ✅ Är en single page application (SPA) med react-router-dom
- ✅ Använder sig av Zustand som global state
- ✅ Gå att lägga till produkter i en varukorg
- ✅ I varukorgen ändra antal/ta bort produkter
- ✅ Kunna skicka sin order och få ett svar med en ETA och ordernummer

#### För att Väl Godkänt ska ni:

- ✅ Hämta alla produkter med fetch
- ✅ Integrera API:et med SPAn
- ✅ Lägga till en profilsida där du kan skapa konto/logga in (enbart namn och email)
- ✅ Om man gör en beställning när man är inloggad ska ordern kopplas till den inloggade användaren
- ✅ Det ska även finnas en orderhistorik-sida där den inloggade användarens ordrar listas

#### För att få stilpoäng ska ni:

- ✅ Göra applikationen säkrare genom att lägga till lösenord på användaren. Authentication ska ske med hjälp av JWT

---

# Planering

Endast mobillayout

### Landing page

URL: /

#### Funktion

Klicka var som helst på sidan för att komma vidare till menyn (inte nav)

#### Sidans delar

- Logga
- Rubrik
- Underrubrik
- Löv och bakgrundsbild

### Menu

URL: /menu

#### Funktion

Header: Öppna NAV - Öppna kundvagn
Main: Tryck på + för att fylla på kundvagn

#### Sidans delar

- Header med nav och kundvagn
- Rubrik
- Coffee-komponenter med add-knapp, namn, beskrivning o pris
- Footer med löv

### About

URL: /about

#### Funktion

Header: Öppna NAV
Main: Läsa text

#### Sidans delar

- Header med nav
- Rubrik
- Ingress
- Text
- Byline med bild, text, o titel

### Cart

URL: /cart _ELLER SKA DE VARA EN MODAL SOM HÖR IHOP MED CART-KNAPPEN_
https://v5.reactrouter.com/web/example/modal-gallery

#### Funktion

Visa det som är lagt i kundvagn med global state. Ändra antal ner till 0 (ta bort) o upp till vad man vill ha.
Total ska uppdateras dynamiskt.
Knapp ska lägga beställningen. (Ska den kräva att man skapar ett konto innan man kan köpa?)

#### Sidans delar

- Rubrik
- Kafferader (Rubrik, pris, antal & pilar för att ändra)
- Knapp "Take my money"

### Status

URL: /status

#### Funktion

Visar ordernummer, och nedräkning på hur lång tid som är kvar. Går att stänga med knapp

#### Sidans delar

- Ordernummer
- Bild
- Rubrik
- Tid kvar
- Knapp: Ok, Cool!

### Profile (skapa konto/logga in OM UTLOGGAD annars visa profil)

URL: /profile

#### Funktion

Visar antingen en inloggningsruta med namn, e-post och gdpr-checkbox
Eller om man redan är inloggad en orderhistorik

#### Sidans delar

Ej inloggad
-Rubrik
-Text
-Namn-ruta
-E-post-ruta
-Checkbox
-Knapp: Brew me a cup (som är skapa konto/logga in)

Inloggad

- Profilbild
- Namn
- E-post
- Orderhistorik
- Varje rad har Ordernummer, datum, o totalsumma
- Sammanställning på hur mkt kunden bränt totalt

### Navigation

URL: ingen - en modal bara

#### Funktion

Visar länkar

#### Sidans delar

- Meny - /menu
- Vårt Kaffe - /about
- Min Profil - /profile
- Orderstatus - /status -- finns denna om ingen order är lagd?

# Uppgiften

Du ska bygga en webbapp där du kan beställa kaffe och få den levererad via drönare (drönare ingår ej i uppgiften).

Figma-skiss: https://www.figma.com/file/UeUGVefSdgio0sRxPFccJI/AirBean-v.1.0?node-id=0%3A1

API DOCS: https://airbean-api-xjlcn.ondigitalocean.app/api/docs/ API: https://airbean-api-xjlcn.ondigitalocean.app/

## Instruktioner

### Kravspecifikation

#### För att få Godkänt ska ni:

- ✅ Gjort enligt Figma skissen
- ✅ Är en single page application (SPA) med react-router-dom
- ✅ Använder sig av Zustand som global state
- ✅ Gå att lägga till produkter i en varukorg
- ✅ I varukorgen ändra antal/ta bort produkter
- ✅ Kunna skicka sin order och få ett svar med en ETA och ordernummer

#### För att Väl Godkänt ska ni:

- ✅ Hämta alla produkter med fetch
- ✅ Integrera API:et med SPAn
- ✅ Lägga till en profilsida där du kan skapa konto/logga in (enbart namn och email)
- ✅ Om man gör en beställning när man är inloggad ska ordern kopplas till den inloggade användaren
- ✅ Det ska även finnas en orderhistorik-sida där den inloggade användarens ordrar listas

#### För att få stilpoäng ska ni:

- ✅ Göra applikationen säkrare genom att lägga till lösenord på användaren. Authentication ska ske med hjälp av JWT

## Inlämning

Inlämning sker senast 14 mar 23.59 via en länk till DITT githubrepo med denna namngivningskonvention: namn*klassår* ex. john-doe_FU-JS23_individuell på Azomo.
