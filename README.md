# BAKUFRAMED

Bakıda hazırlanan, muzey səviyyəli idman çərçivələri üçün tək səhifəli sayt. Qara lüks tema, scroll ilə idarə olunan 3D məhsul karuseli və hər məhsul üçün ayrı rəngli səhnələr.

## Bölmələr

- Faiz sayğacı ilə loqonu dolduran preloader
- Sabit header: ambians səsi açarı + ekvalayzer, mərkəzdə loqo, tam ekran menyu
- Hero: scroll ilə fırlanan 3D çərçivə karuseli, məhsul adı, qradiyent slider
- Hər məhsul üçün rəngli işıqlı səhnə (spesifikasiyalar + nəhəng fon yazısı)
- Kolleksiya şəbəkəsi
- Üstü xətlənmiş müqayisələrlə üstünlüklər bölməsi
- FAQ akkordeonu
- Newsletter forması
- Marquee-li footer

## Lokal işə salmaq

Heç bir build addımı yoxdur — sadə statik sayt.

```bash
node server.js
```

Sonra brauzerdə [http://localhost:4321](http://localhost:4321) ünvanını açın.

## Struktur

```
index.html          # bütün bölmələrin skeleti
css/style.css       # dizayn sistemi və bölmə stilləri
js/data.js          # məhsullar, üstünlüklər və FAQ mətnləri
js/main.js          # preloader, karusel, parallaks, menyu, FAQ, form
assets/products/    # çərçivə fotoları
assets/brand/       # loqo
server.js           # lokal baxış üçün statik server
```

Məhsul, üstünlük və FAQ mətnlərini dəyişmək üçün yalnız `js/data.js` faylını redaktə etmək kifayətdir.
