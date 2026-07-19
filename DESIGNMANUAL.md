# Faaborg Tools – designmanual v1

## Grundprincip
Én app = én funktion.

## Fast struktur
- Stort resultat øverst.
- Kort statuslinje under resultatet.
- Input i et 2-kolonne gitter.
- Info-knap nederst til højre.
- Ingen menuer, login, reklamer eller swipe.
- Ingen scrolling på almindelige iPhone-skærme, når det er praktisk muligt.

## Visuelt
- Hvid baggrund.
- Mørkegrå tekst.
- Apple-systemfont.
- Store tal.
- Afrundede lysegrå kort.
- Få elementer og god luft.

## Teknisk
- Fælles CSS: `assets/faaborg.css`
- Fælles JavaScript: `assets/faaborg.js`
- Hver app har sin egen mappe og `index.html`.
- App-specifik kode ligger i appens egen `index.html`.
- Seneste værdier gemmes med `FaaborgTools.bindPersistence(...)`.
- Tal læses med `FaaborgTools.parseNumber(...)`.
- Tal formateres med `FaaborgTools.formatNumber(...)`.

## Versionsregel
Kun den seneste fungerende version lægges i GitHub.
