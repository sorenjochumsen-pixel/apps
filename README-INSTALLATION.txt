FAABORG TOOLS – INSTALLATION

Kopiér disse filer til roden af din lokale apps-mappe:

index.html
manifest.webmanifest
sw.js
icons/icon-192.png
icons/icon-512.png

Bevar de eksisterende mapper:
elbil/
weight/
tapet/
profil/

Derefter:
1. Åbn GitHub Desktop.
2. Skriv: Add Faaborg Tools PWA
3. Commit to main.
4. Push origin.
5. Vent ca. 1 minut.
6. Åbn https://sorenjochumsen-pixel.github.io/apps/ i Safari.
7. På iPhone: Del → Føj til hjemmeskærm.

Vigtigt:
Når sw.js ændres senere, skal CACHE_NAME ændres fra v1 til v2, v3 osv.,
så iPhone ikke bliver ved med at vise en gammel udgave.
