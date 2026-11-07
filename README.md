# Portfolio - u02
**Länk till sidan:** https://maja-u02.vercel.app/

**Jag siktar på VG.** 

## Datans väg
När `loadProjects()` körs startar `Promise.all`. Det gör två anrop samtidigt till GitHub och `projects.json` och returnerar ett enda promise, istället för att köras en efter en. Väntetiden blir då lika lång som det långsammaste anropen. 

`fetchData()`i `api.js` skickar en GET-request till Github API. Jag lade till `?sort=pushed&direction=desc` på `/repos`-endpointen. API:et skickar bara 30 repos per anrop, så sorteringen gör att de senast pushade alltid kommer med. Svaret består av en statuskod, headers, och en body med en JSON-array av repo-objekt. Eftersom `fetch` bara kastar fel vid nätverksfel så kontrolleras svaret med `response.ok` och kastar ett eget fel vid exempelvis servern kan inte hitta filen eller åtkomsten är nekad. `response.json()` gör om bodyn till en JS-array. 

I `project.js`slår jag ihop varje repo med min metadata (mina bilder och om jag markerat den som "mitt val").  

## Två data källor
CV:t ligger i en JSON-fil, så fälten är kända. Anropet kan ändå misslyckas, till exempel om sökvägen är fel. Därför har CV:t samma laddnings- och felmeddelande som projekten.

Github kan däremot vara långsamt, stängas av efter ett visst antal anrop eller skicka `null` i fält som jag kanske tror finns. Repon utan beskrivning sorterar jag bort med `filter()`, eftersom jag inte vill visa dem i portfolion och kortet annars hade fått ett tomt beskrivningsfält. `topics` får `?? []` som reservvärde, och live-länken tas bort om `homepage` saknas.

Filtreringen av kategorier sker via topics projektens topics. Däremot behövde My Picks och bidlerna ligga i en json fil eftersom Github inte vet vilka repon som borde vara "My Picks". Jag hade kunna lägga in bilder direkt i repot på Github, men för detta projekt ansåg jag att det fungerar bra att lägga dem i json. 

## DOM och händelser
All rendering sker genom `renderList()`. Från början skapade funktionen korten och rendera dem, men jag delade upp det i två funktioner. Det gjorde att samma rendering även fungera för CV:et, projekten och filtreringen.

Jag använde mig av event delegation för filtret genom att sätta en lyssnare på `<fieldset>` istället för på varje knapp.  Knappen för att försöka igen kopplas en gång i `initProjects()`. Om jag hade kopplat den i `loadProjects()` hade varje nytt försök lagt till ännu en lyssnare, och ett klick hade startat flera anrop. 

## Markup du inte skrivit för hand
Markupen för projektkorten, CV-posterna och skeleton-korten skrev jag för hand i `<template>`-element. När jag skrev dessa så utgick jag ifrån semantiska html element och satte sedan texten med `textContent`.

JavaScript sätter aria-pressed på filterknapparna, så att skärmläsaren vet vilken som är vald. Eftersom bara ett filter kan vara aktivt åt gången hade radioknappar nog varit mer korrekt semantiskt. Skeleton-korten har aria-hidden, så att tomma platshållare inte läses upp. Felmeddelandet ligger i role="alert", vilket gör att skärmläsaren läser upp det direkt när det visas.

## Temaväxlingen
Färgerna är satta med variabler i `:root` och i mörkt läge ändrar jag bara färgvärderna för variablerna i mediaquerien och för `[data-theme="dark"]`. `theme.js` läser användarens val från `localStorage` och sätter `data-theme` på `<html>`. Jag valde data-attribut eftersom det endast kan ha ett värde åt gången. Med klasser finns risken att man sätter två klasser samtidigt. Om jag hade satt färgerna i JS hade alla element behövs pekas ut i koden vilket skulle ta lång tid och nya element hade inte fått rätt färger förens de var satta i JS. 

## Modern JavaScript
Jag delade upp koden i moduler där varje fil ska ha ett ansvar, tex hämtar `api.js` data och `render.js` bygger DOM. `index.js` laddas på alla sidor där varje init-funktion har en säkerhetsguard som avbryter om elementen inte finns på sidan. De fungerar som varje moduls startknapp. 

Destructuring och spread gjorde mest skillnad i `projects.js`:

```js

const [repos, meta] = await Promise.all([loadRepos(), loadProjectMeta()]);

return {
...repo,
topics: repo.topics ?? [],
isMyPick: moreInfo?.isMyPick ?? false,
image: moreInfo?.image ?? meta.placeholder,
};

```
Destructuring ger de två svaren tydliga namn direkt. Spread kopierar alla fält från repot, så jag skriver bara det som är nytt.

`?.`och `??`fungerar som guards. Om ett repo tex skulle saknas i `porjects.json`ger `moreInfo?.isMyPick` värdet undefined och `??` kan då byta ut det mot ett reservvärde.

## När det inte går som tänkt
Medan anropet pågor visas skeleton-kort och filter är disabled. Från början renderade bara `loadProjects()` skeleton-korten. När jag testade med långsamt nätverk i dev-tools så syndes ingetting en stund. Detta pga att JS - laddas in senare (varje import blir en ny request innan koden körs). Därför la jag in disabled och 3 skeleton kort direkt i HTML. Det gör också att platsen reserveras och sidan inte hoppar när korten kommer in. Nackdelen är att skeleton-korten finns på två ställen, HTML och i loadProjects.

Jag valde också att sätta en `AbortSignal.timeout(8000)` i `fetchData()`, på så sätt visas ett felmeddelande inom 8 sek om inte GitHub svarar. Det undviker att sidan bara står och laddar. 
Går anropet fel visas ett felmeddelande med en knapp för att försöka igen och en länk till min GitHub. Är listan tom eller att ett filter visar 0 projekt visas ett meddelande om det istället. 

Med `Promise.all` visas inga projekt alls om `projects.json` inte går att hämta. Jag valde det eftersom filen ligger lokalt och det är sällan att det inte fungerar. Jag hade kunnat använda `Promise.allSettled` som väntar in båda anropen och får veta vilka som lyckades. Då hade jag kunnat visa repona med placeholder-bilder istället för felmeddelande.

## Styrkor och brister
En styrka är att alla lägen är hanterade. Om jag haft mer tid skulle jag kunna cacha svaret från github. Alltså spara svaret i `localStorage`med kanske en tidstämpel och bara hämta data igen när det gått en viss tid. Idag gör varje sidladdning ett nytt anrop och de flesta API:er har en maxgräns för hur många anrop man får göra. 

## Tillgänglighet och test
Jag tabbade igenom sidan på desktop och mobil, och ordningen är logisk med synlig fokusmarkering. Jag testade också sidan med VoiceOver. I mörkt läge klarade två färger inte WCAG AA, vilket jag sedan ändrade. Kontrasten mätte jag med Chrome DevTools och WebAIM Contrast Checker. Jag testade sidan i validator.w3.org, den varnar för `role="list"`, jag behåller dessa med samma motivering jag gav i u01. Den varnade också för att article saknar heading, den syftar på mina skeleten kort, därav ignorera jag det. Jag testade också sidan i lighthouse.

| Performance | Accessibility | Best Practices | SEO |
| ----------- | ------------- | -------------- | --- |
| 94          | 100           | 100            | 91  |

## AI-verktyg
Jag använde Claude för att generera JSON-filerna, förstå vilken endpoint i GitHubs API jag skulle använda och resonera kring var projektbilderna borde ligga. AI gav förslag att lägga bilderna direkt i mina projekt repon, men jag valde att JSON-filen istället. Exempelvis föreslog AI en `div` runt filterknapparna. Jag antog att det fanns ett annat mer semantiskt korrekt element, och sökte därför upp det. Jag valde då  `<fieldset>` istället, vilket gjorde att jag slapp ARIA. 

Jag tog också hjälp med strukturen för JS-filerna, vilket jag nog gjorde för tidigt. Vi hade en workshop med Andreas där han gick igenom struktur och arkitektur och hur man bör tänka i mindre projekt. Exempelvis genom el och state-objekt. I `projects.js` finns valt filter bara i DOM:en som `aria-pressed`. Med ett `state`-objekt och en `render()` som alltid läser från det hade ett filterklick bara behövt ändra `state.filter`. Jag har även använt AI för att strukturera mina egna anteckningar till den här reflektionen.