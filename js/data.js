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
    phrase: 'Gracias por estar en cada capítulo de mi vida. Esto es un pequeño recorrido por todos ellos.'
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
        { src: 'assets/fotos/etapa1/foto1.jpg', caption: 'Mi primer día de clases' },
        { src: 'assets/fotos/etapa1/foto2.jpg', caption: 'Cumpleaños #6' },
        { src: 'assets/fotos/etapa1/foto3.jpg', caption: 'Tú y yo en el parque' },
        { src: 'assets/fotos/etapa1/foto4.jpg', caption: 'Mi disfraz favorito' },
        { src: 'assets/fotos/etapa1/foto5.jpg', caption: 'Vacaciones en familia' },
        { src: 'assets/fotos/etapa1/foto6.jpg', caption: 'La foto que más te gusta' }
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
        { src: 'assets/fotos/etapa2/foto1.jpg', caption: 'Grado de primaria' },
        { src: 'assets/fotos/etapa2/foto2.jpg', caption: 'Partido del sábado' },
        { src: 'assets/fotos/etapa2/foto3.jpg', caption: 'Esa Navidad' },
        { src: 'assets/fotos/etapa2/foto4.jpg', caption: 'Paseo familiar' },
        { src: 'assets/fotos/etapa2/foto5.jpg', caption: 'Tú en la tribuna' },
        { src: 'assets/fotos/etapa2/foto6.jpg', caption: 'Mis 15 años' }
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
        { src: 'assets/fotos/etapa3/foto1.jpg', caption: 'Grado once' },
        { src: 'assets/fotos/etapa3/foto2.jpg', caption: 'Tú ayudándome a estudiar' },
        { src: 'assets/fotos/etapa3/foto3.jpg', caption: 'Mi graduación' },
        { src: 'assets/fotos/etapa3/foto4.jpg', caption: 'Viaje de fin de año' },
        { src: 'assets/fotos/etapa3/foto5.jpg', caption: 'Un domingo cualquiera' },
        { src: 'assets/fotos/etapa3/foto6.jpg', caption: 'Mis 18' }
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
        { src: 'assets/fotos/etapa4/foto1.jpg', caption: 'Nuestra foto favorita de hoy' },
        { src: 'assets/fotos/etapa4/foto2.jpg', caption: 'Universidad' },
        { src: 'assets/fotos/etapa4/foto3.jpg', caption: 'Tu cumpleaños pasado' },
        { src: 'assets/fotos/etapa4/foto4.jpg', caption: 'Almuerzo de domingo' },
        { src: 'assets/fotos/etapa4/foto5.jpg', caption: 'Nosotros hoy' }
      ]
    }
  ],

  letter: {
    eyebrow: 'Una última cosa',
    title: 'Una carta para ti',
    placeDate: '[Ciudad], [fecha]',
    greeting: 'Querida mamá:',
    // Cada elemento es un párrafo
    paragraphs: [
      'Hoy cumples años y quise regalarte algo que no se pudiera comprar: un pedacito de todo lo que hemos vivido juntos.',
      'Mientras buscaba estas fotos me di cuenta de algo: en casi todas estás tú. A veces a mi lado, a veces detrás de la cámara, a veces simplemente esperándome en casa. Nunca te fuiste de ninguna de mis etapas.',
      'Gracias por [ese recuerdo que nunca olvido]. Gracias por las veces que estabas cansada y no lo dejaste ver, por las palabras justas cuando no sabía qué hacer, y por quererme incluso en mis peores días.',
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
    madeBy: 'Deivid, tu hijo que te ama'
  }
};
