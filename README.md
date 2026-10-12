**Länk till sidan:** https://maja-frontendutveckling-u01.netlify.app/
# Tillvägagångssätt
Jag började med att kika på skissen, vilka färger används, spacing och textstorlek och omvandlade sedan det till CSS variabler. Därefter tittade jag på webbsidans struktur för att veta hur jag bör strukturera mina element i HTML. Efter att jag tagit fram den första sidan (index.html) skapade jag reset.css för att ta bort den mesta default stylingen. Sedan började jag skriva cssen för första sidan. Jag designade först hur det skulle se ut i mobilvy och sedan i desktop. Navigationen var svårast att översätta till kod. Jag upplevde mobilvyn som mer komplicerad, vilket gjorde att jag behövde skriva över många regler i desktopvyn. Just för navigationsdelen tror jag att desktop kan ha varit lättare att börja med och då haft en media query för mobilvyn. 
Skissen hade några element som inte klara tillgänglighetskraven i WCAG, så några designbeslut tog jag på egen för att uppfylla kraven.

# Semantik
Sidans delar ligger i `header`, `nav`, `main` och `footer` så att skärmläsare kan hoppa mellan dem, och rubrikerna går från en `h1` per sida till `h2` för sektioner och `h3` för projektkorten.

Jag använde mig av `div` när jag behövde gruppera element utan semantisk betydelse för att underlätta styling. Exempelvis i navigationen för enklare kunna styla mobilvyn både stängt och öppet läge. Jag använde också `div` element i about.html för att styla listorna. 

Det var även några ställen som jag gick in och ändrade i efterhand för att öka tillgängligheten och använda de korrekta semantiska elementen. Blandannat för projektkorten och tech stack/tools ikonerna. Jag ansåg att projektkorten bättre passar som `article` eftersom innehållet kan stå för sig självt. Korten låg också direkt i en `div` som fungerade som en container. Ja la de sedan i en `ul` eftersom de är en samling av olika projekt. Då vet även användare som använder skärmläsare hur många project som finns i listan. 

Jag använde `button`istället för en länk för hamburgemenyn eftersom den gör en handling och inte hänvisar till en annan sida. För de resterande interaktiva elementet använde jag `a`taggen eftersom de består av länkar, alltså tar användaren vidare någon stans. 

# Layout
Jag använde mestadels flexbox. Projektkorten och techstacken ligger i grid, däremot är innehållet i projektkorten stylade med flexbox.  Först använde jag flexbox för metadatan i listan för tidigare erfarenheter men bytte sedan till grid. Detta pågrund av att i mobilvy ligger texterna och ikonerna i en tvådimensionell layout, vilket gjorde det lättare genom grid. 
Jag använde mig av rem i mina media queries. Då följer brytpunkterna med när användaren förstorar texten i webbläsaren. Jag använde också rem för spacing, vilket gör att avstånden skalas tillsammans med texten. Jag valde brytpunkterna 56rem och 63rem utifrån sidans innehåll. Där texten radbröts eller layouten såg kosntig ut lade jag in en media query. Projektgridet fick en brytpunkt på 63rem. Vid 56rem var korten så smala att länkarna radbröts.
Här hade en container query passat bättre, då det handlade om att kortet blir för smalt och egentligen inte fönstret. 

# Tillgänglighet
Något jag märkte när jag byggde portfolion är att det är lätt att glömma tillgängligheten, framför allt hur innehållet faktiskt läses upp för de som använder skärmläsare.
Jag satte också `role="list"` på listorna, eftersom vissa webbläsare slutar läsa upp en `ul` som lista när den har `list-style: none`. 
Den gröna pillen på about me sidan justerade jag då de inte klara tillgänglighetskraven när de kommer till kontrast. Jag valde en mörkare grön textfärg, vilket höjde kontrasten från 4,1:1 till 6,8:1. Jag ökade också textstorleken från 9 px till 11 px för att öka läsbarheten.
Jag testade giltigheten av html-filerna genom att använda https://validator.w3.org/#validate_by_uri.  Validatorn varnar för att jag satt attribut `role="list`på mina `ul`element. Jag behöll det eftersom VoiceOver i Safari annars inte läser upp det som en lista. Jag använde mig även av https://webaim.org/resources/contrastchecker/ för att kolla färgkonstraster som var svåra att se i chrome devtools tex den gröna pillen. Jag använde mig också av lighthouse i Chrome DevTools. Utifrån resultatet valde jag att reducera mina bildstorlekar samt byta format på en av bilderna från jpg till WebP. Jag tabbade igenom alla sidor för att se att allt är nåbart med tangenbord och att fokusmarkering syns. 

Jag valde att inte använda en media query för reduce-motion då jag endast har en liten animation på hamburger-menyn. Detta är därmot något jag bör lägga till, framförallt om mer animationer tillkommer. 

# Användbarhet
Jag mätte inte hur långa textraderna är i skissen, men jag satte en `max-width` på 65ch för att hålla raderna korta och läsbara. 

# Styrkor och brister
Jag valde att lägga about me, contact och techstack i egna html sidor. Nackdelen med detta är att element som ska vara samma på varje sida och måste uppdateras på flera ställen. Jag märkte detta när jag hade ändrat navigationsbaren på index.html. Det var inte förens senare jag upptäckte att navigationen inte var detsamma på alla sidor och behövde därför uppdatera den på de andra sidorna.

Genom att använda variabler för både färger, textstorlek och spacing anser jag att webbsidan fick en genomgående konsekvens. Det var också mycket lättare att uppdatera och ändra spacing då det oftast bara behövdes göras på ett ställe. 

Om jag hade haft mer tid hade jag nog lagt in fler animationer, exempelvis för navigationen i mobilvyn. 

# AI
Jag använde Claude som AI-verktyg och hjälpmedel för att fråga om olika lösningar och hur man kan implementera dem. Exempelvis göra mobilnavigationen interaktiv. Något som jag faktiskt valde bort som AI gav som förslag var att sätta `aria-label="meny"`på hamburger menyn. Det hade fungerat men jag valde istället att använda mig av ett span med texten Menu istället och använda klassen visually-hidden för att endast dölja den visuellt. Jag tog det beslutet för att undvika använda aria attribut när det går att lösa med vanliga element.
Jag använde också AI som granskningsverktyg. Exempelvis kunde AI upptäcka när `aria-current="page"`satt på fel länk, vilket är lätt hänt när man copy och pastar samma navigationsbar på flera sidor.