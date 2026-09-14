/* BAKUFRAMED — məzmun məlumatları */

const PRODUCTS = [
  {
    id: 'rod-laver',
    name: ['ROD LAVER', 'ARENA'],
    kicker: 'TENNİS · MELBOURNE',
    image: 'assets/products/tennis-rod-laver.png',
    accent: '#e8365d',
    glow: '#1d2c63',
    statement: ['QRAND', 'SLEM'],
    text: 'Tünd göy kort fonu, mərkəzdə raketka, altda arenanın adı. Avstraliya Açıq Çempionatının sərt kortunu divarınıza gətirən klassik dizayn.',
    specs: [['Ölçü', '92 × 46 sm'], ['Fon', 'Naxışlı tünd göy kətan'], ['Qravüra', 'Arena adı + il']]
  },
  {
    id: 'padel-olive',
    name: ['PADEL', 'OLIVE'],
    kicker: 'PADEL · ARCH SERİYASI',
    image: 'assets/products/padel-olive.png',
    accent: '#c6e04b',
    glow: '#4d5c24',
    statement: ['ARCH', 'SERİYA'],
    text: 'Yuxarısı tağvarı kəsilmiş zeytun rəngli fon və miniatür kort xətləri. Neon-sarı padel raketkası üçün ən kontrastlı seçim.',
    specs: [['Ölçü', '86 × 52 sm'], ['Fon', 'Mat zeytun + ağ kort xətti'], ['Qravüra', 'Oyunçu adı']]
  },
  {
    id: 'padel-blue',
    name: ['STINGER', 'BLUE'],
    kicker: 'PADEL · İMZA SERİYASI',
    image: 'assets/products/padel-blue.png',
    accent: '#3d8bff',
    glow: '#12356e',
    statement: ['DƏRİN', 'GÖY'],
    text: 'Klub göyü fon, ağ kort xətləri və görünməz tutucular. Raketka çərçivəyə toxunmadan havada dayanır — heç bir yapışqan yoxdur.',
    specs: [['Ölçü', '86 × 52 sm'], ['Fon', 'Klub göyü + kort xətti'], ['Qravüra', 'Klub loqosu']]
  },
  {
    id: 'padel-terracotta',
    name: ['STINGER', 'TERRACOTTA'],
    kicker: 'PADEL · TORPAQ SERİYASI',
    image: 'assets/products/padel-terracotta.png',
    accent: '#e0803f',
    glow: '#6d3a19',
    statement: ['TORPAQ', 'KORT'],
    text: 'Torpaq kortun isti çalarları. Kərpic rəngli fon raketkanın karbon toxumasını qabartmaq üçün seçilib.',
    specs: [['Ölçü', '86 × 52 sm'], ['Fon', 'Terrakota kətan'], ['Qravüra', 'Turnir adı + tarix']]
  }
];

const BENEFITS = [
  {
    old: 'Adi poster çərçivəsi',
    title: ['MUZEY', 'QUTUSU'],
    text: '6 sm dərinlikli əl işi karkas. Raketka əzilmir, forma qırışmır — əşya çərçivənin içində sərbəst dayanır.'
  },
  {
    old: 'Ucuz plastik örtük',
    title: ['UV', 'ŞÜŞƏ'],
    text: 'Zərərli şüaların 99%-ni saxlayan muzey şüşəsi. İllər keçsə də rənglər solmur, işıq əks olunmur.'
  },
  {
    old: 'İkitərəfli lent',
    title: ['GÖRÜNMƏZ', 'TUTUCULAR'],
    text: 'Yapışqan yoxdur. Akril tutucular əşyanı zədələmədən saxlayır və istədiyiniz vaxt geri çıxarmağa imkan verir.'
  },
  {
    old: 'Hazır standart ölçü',
    title: ['FƏRDİ', 'DİZAYN'],
    text: 'Kort fonu, oyunçu adı, tarix və qravüra — hər çərçivə bir nəfər üçün, sıfırdan yığılır.'
  }
];

const FAQ = [
  {
    q: 'BAKUFRAMED-i digər çərçivə emalatxanalarından nə fərqləndirir?',
    a: 'Biz yalnız idman əşyaları üzərində işləyirik. Hər layihə dərin qutu karkas, UV qoruyucu muzey şüşəsi, görünməz akril tutucular və əşyaya uyğun hazırlanmış fon üzərində qurulur. Standart ölçü satmırıq — hər çərçivə sizin əşyanızın ölçüsünə görə yığılır.'
  },
  {
    q: 'Hansı əşyaları çərçivəyə salırsınız?',
    a: 'Tennis və padel raketkaları, forma və köynəklər, ayaqqabılar, toplar, medallar, imzalı fotolar, biletlər və şəxsi xatirələr. Qeyri-adi bir ideyanız varsa, şəklini göndərin — birlikdə həll edərik.'
  },
  {
    q: 'Sifariş nə qədər vaxt aparır?',
    a: 'Materiallar hazır olduqda 10–14 iş günü. Fərdi fon çapı, qravüra və ya xüsusi ölçü tələb olunan layihələr 3 həftəyə qədər çəkə bilər.'
  },
  {
    q: 'Qiymət necə formalaşır?',
    a: 'Qiymət əşyanın ölçüsü, karkas dərinliyi, şüşə növü və fon dizaynından asılıdır. Padel çərçivələri 240 ₼-dan, tennis çərçivələri 260 ₼-dan başlayır. Dəqiq qiymət üçün şəkil və ölçü göndərməyiniz kifayətdir.'
  },
  {
    q: 'Raketkam zədələnəcək?',
    a: 'Xeyr. Yapışqan, ikitərəfli lent və ya vint istifadə etmirik. Əşya lazerlə kəsilmiş akril tutucular üzərində dayanır və çərçivəni açmadan geri çıxarıla bilər.'
  },
  {
    q: 'Fon dizaynını özüm seçə bilərəm?',
    a: 'Bəli. Kort tipi (sərt, torpaq, ot), rəng, arena adı, oyunçu adı, tarix və klub loqosu — hamısı sizin seçiminizlədir. Təsdiqdən əvvəl rəqəmsal maketi göndəririk.'
  },
  {
    q: 'Çərçivə divara necə bərkidilir?',
    a: 'Hər çərçivə arxadan alüminium asma sistemi ilə təchiz olunur və həm şaquli, həm üfüqi quraşdırılır. Divar bərkitmə dəsti və şablon qutunun içindədir.'
  },
  {
    q: 'Bakıdan kənara göndərirsiniz?',
    a: 'Bəli. Bakı daxilində çatdırılma pulsuzdur. Azərbaycan üzrə kuryerlə, xaricə isə iki qatlı köpük qablaşdırma ilə beynəlxalq daşıyıcı vasitəsilə göndəririk.'
  },
  {
    q: 'Hədiyyə üçün sifariş etmək olar?',
    a: 'Ən çox verilən sifariş elə budur. Hədiyyə qablaşdırması, əl yazısı kart və istəsəniz tarixi gizli saxlayan neytral çatdırılma variantı təklif edirik.'
  },
  {
    q: 'Zəmanət var?',
    a: 'Karkas və şüşə üçün 2 il, tutucu sistem üçün müddətsiz. İstismar zamanı hər hansı problem yaranarsa, atelyedə pulsuz bərpa edirik.'
  }
];
