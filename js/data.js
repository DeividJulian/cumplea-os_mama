/* =========================================================
   CONTENIDO DE LA PÁGINA
   ---------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar.
   - Cambia los textos entre comillas.
   - En cualquier texto puedes escribir {nombre} y se reemplaza
     por el nombre de tu mamá (momName).
   - Para las fotos: copia tus imágenes en assets/fotos/etapaX/
     y escribe aquí la ruta exacta (respeta mayúsculas y extensión:
     .jpg, .jpeg, .png, .webp). Si una foto no existe, se muestra
     un recuadro bonito en su lugar, así que nada se rompe.
   - Puedes poner de 3 a 6 fotos por etapa (o más, si quieres).
   ========================================================= */

window.SITE_DATA = {
  momName: 'Nallely',
  signature: 'Deivid',

  // Canción (deja '' si no quieres música)
  music: 'assets/musica/cancion.mp3',

  cover: {
    eyebrow: 'Un regalo hecho con amor',
    titleTop: 'Feliz cumpleaños,',
    titleScript: 'mamá',
    phrase: 'Gracias por estar en cada capítulo de mi vida. Esto es un pequeño recorrido por todos ellos.',
    // Foto de presentación (deja src: '' para quitarla)
    photo: { src: 'assets/fotos/portada.jpg', caption: '', focus: '50% 30%' }
  },

  intro: {
    greeting: 'Para ti,',
    lead: 'Quise hacerte algo diferente este año: un viaje por todos los momentos en que has estado conmigo.',
    text: 'Son cuatro etapas, muchas fotos y un mismo hilo que las une a todas: tú. Ve despacio, que cada una tiene algo que decirte.'
  },

  /* ---------------------------------------------------------
     ETAPAS
     layout: no lo cambies (define el estilo de la galería).
       'polaroid'  → fotos tipo polaroid ligeramente rotadas
       'collage'   → collage con cinta adhesiva
       'grid'      → cuadrícula limpia
       'featured'  → la PRIMERA foto sale grande y el resto en miniatura
     icon: 'star' | 'sun' | 'book' | 'heart'
     En 'collage' puedes añadir size: 'big' o 'wide' a una foto
     para hacerla más grande (si no, se reparte automáticamente).
     caption (opcional): pie de foto; vacío = sin pie.
     focus (opcional): qué parte de la foto se ve cuando se recorta,
       como '50% 50%' (centro), '30% 50%' (más a la izquierda),
       '50% 20%' (más arriba). En grande siempre se ve completa.
     --------------------------------------------------------- */
  stages: [
    {
      layout: 'polaroid',
      icon: 'star',
      title: 'Pequeño',
      ages: '5 a 10 años',
      quote: 'Tú eras mi mundo entero',
      text: 'Tus manos eran el lugar más seguro del mundo. Me enseñaste a atarme los zapatos, a pedir perdón y a no tenerle miedo a la oscuridad. Cada raspón se curaba con un beso tuyo, y cada noche terminaba con tu voz.',
      photos: [
        { src: 'assets/fotos/etapa1/foto1.jpg', caption: '', focus: '40% 50%' },
        { src: 'assets/fotos/etapa1/foto2.jpg', caption: '' },
        { src: 'assets/fotos/etapa1/foto3.jpg', caption: '' },
        { src: 'assets/fotos/etapa1/foto4.jpg', caption: '' },
        { src: 'assets/fotos/etapa1/foto5.jpg', caption: '' },
        { src: 'assets/fotos/etapa1/foto6.jpg', caption: '', focus: '30% 50%' }
      ]
    },
    {
      layout: 'collage',
      icon: 'sun',
      title: 'Joven',
      ages: '13 a 15 años',
      quote: 'Aprendiendo a ser yo',
      text: 'Llegaron los años de puertas cerradas, música a todo volumen y preguntas que no sabía cómo hacerte. Aunque no siempre te lo dijera, te buscaba con la mirada en cada partido, presentación o entrega de notas. Y ahí estabas, siempre.',
      photos: [
        { src: 'assets/fotos/etapa2/foto1.jpg', caption: '', size: 'big', focus: '50% 60%' },
        { src: 'assets/fotos/etapa2/foto2.jpg', caption: '', size: '' },
        { src: 'assets/fotos/etapa2/foto3.jpg', caption: '', size: '' },
        { src: 'assets/fotos/etapa2/foto4.jpg', caption: '', size: 'wide', focus: '50% 20%' },
        { src: 'assets/fotos/etapa2/foto5.jpg', caption: '', size: 'wide', focus: '50% 25%' },
        { src: 'assets/fotos/etapa2/foto6.jpg', caption: '', size: 'wide', focus: '50% 40%' }
      ]
    },
    {
      layout: 'grid',
      icon: 'book',
      title: 'Creciendo',
      ages: '16 a 18 años',
      quote: 'Tú me enseñaste a volar',
      text: 'Entre exámenes, dudas y decisiones grandes, fuiste mi brújula. Me dejaste equivocarme, me ayudaste a levantarme y celebraste cada paso como si fuera tuyo. Hoy entiendo cuántas veces pusiste mis sueños antes que los tuyos.',
      photos: [
        { src: 'assets/fotos/etapa3/foto1.jpg', caption: '' },
        { src: 'assets/fotos/etapa3/foto2.jpg', caption: '', focus: '50% 70%' },
        { src: 'assets/fotos/etapa3/foto3.jpg', caption: '' },
        { src: 'assets/fotos/etapa3/foto4.jpg', caption: '', focus: '50% 60%' },
        { src: 'assets/fotos/etapa3/foto5.jpg', caption: '' },
        { src: 'assets/fotos/etapa3/foto6.jpg', caption: '' }
      ]
    },
    {
      layout: 'featured',
      icon: 'heart',
      title: 'Hoy',
      ages: '18 a 21 años',
      quote: 'Ahora entiendo todo lo que hiciste',
      text: 'Ya no soy el niño que te tomaba de la mano para cruzar la calle, pero sigo buscándote en cada decisión importante. Todo lo que soy tiene algo tuyo. Gracias por quedarte en cada etapa, mamá.',
      photos: [
        { src: 'assets/fotos/etapa4/foto1.jpg', caption: '', focus: '20% 50%' },
        { src: 'assets/fotos/etapa4/foto2.jpg', caption: '' },
        { src: 'assets/fotos/etapa4/foto3.jpg', caption: '', focus: '50% 40%' },
        { src: 'assets/fotos/etapa4/foto4.jpg', caption: '' },
        { src: 'assets/fotos/etapa4/foto5.jpg', caption: '', focus: '50% 25%' }
      ]
    }
  ],

  letter: {
    eyebrow: 'Una última cosa',
    title: 'Una carta para ti',
    placeDate: '', // Ej.: 'Bogotá, 28 de octubre' (vacío = no se muestra)
    greeting: 'Querida mamá:',
    // Cada elemento es un párrafo
    paragraphs: [
      'Hoy cumples años y quise regalarte algo que no se pudiera comprar: un pedacito de todo lo que hemos vivido juntos.',
      'Mientras buscaba estas fotos me di cuenta de algo: en casi todas estás tú. A veces a mi lado, a veces detrás de la cámara, a veces simplemente esperándome en casa. Nunca te fuiste de ninguna de mis etapas.',
      'Gracias por las veces que estabas cansada y no lo dejaste ver, por las palabras justas cuando no sabía qué hacer, y por quererme incluso en mis peores días.',
      'No siempre te lo digo, pero eres mi ejemplo y mi lugar seguro. Ojalá este año te devuelva un poquito de todo el amor que tú repartes.',
      'Feliz cumpleaños, {nombre}.'
    ],
    closing: 'Con todo mi amor,'
    // La firma usa "signature" (arriba)
  },

  closing: {
    eyebrow: 'Feliz cumpleaños',
    title: 'Te amo, mamá',
    phrase: 'Gracias por ser el hilo que une toda mi historia.',
    madeByLabel: 'Hecho por',
    madeBy: 'Deivid, tu hijo que te ama',
    // Foto junto a "Te amo, mamá" (deja src: '' para quitarla)
    photo: { src: 'assets/fotos/final.jpg', caption: '', focus: '35% 50%' }
  }
};
