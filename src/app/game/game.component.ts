import { Component, AfterViewInit, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { Location } from '@angular/common';
import { getContrastColor } from '../contrast-color.util';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit, OnInit {
  players: string[] = [];
  currentPhrase: string = '';
  phrases: string[] = [
    'Si te limpias el culo parado toma 2 shots',
    'La última persona en haber terminado con su pareja toma 3 shots. A ahogar las penas',
    '#, escoge a 3 jugadores, ¿a quien matas?, ¿con quien te casas? y a ¿quien te coges?',
    '#, tomate en segundos la diferencia de edad entre tu y # ',
    'Los que están en una relación tóxica toman 2 shots. No se sordeen',
    'Los tóxicos toman 3 shots',
    '#, platica como término tu última relación. Sin llorar',
    'Todos cuenten el mejor atributo físico que tenía su ex',
    'A la cuenta de 3 señalen a la persona más malacopa, tendrá que tomar 3 tragos',
    '#, cuenta una experiencia tan loca que te haya sucedido que nadie te crea',
    'Toma 1 shot si alguna vez has hecho sexting',
    '# y # veanse cara a cara sin parpadear, el primero en hacerlo toma 2 shots',
    'El más matado para la escuela toma 2 shots. Tranquilo cerebrito',
    'Toma 2 shots la persona que viva más lejos',
    'Quien tenga la ropa interior más chistosa tiene que enseñarla o tomar 3 shots',
    'Si tu celular acaba en un número impar tomate ese número en shots',
    '#, crea una regla que durará dos rondas, quien la rompa toma 2 shots',
    '#, qué prefieres, ¿besar a la persona de tu izquierda o derecha? Tendrán que besarse o ambos tomar 3 shots',
    'Todos cambian su vaso con el jugador de su derecha. Lo bueno es que ya no hay COVID',
    '#, menciona la parte del cuerpo de # que más te gusta ',
    '#, menciona el personaje de ficción que más te atrae',
    'Toma a quien le hayan tirado la onda una persona de su mismo sexo ',
    'Todos cuentan cual es el regalo de su ex que aún conservan. Comienza #',
    '#, cuenta cuál es el momento que te mantiene humilde ',
    'Toma 1 shot quien su crush se llame como alguien aqui presente  ',
    '#, comienza a cantar una canción, continuan cantando a la derecha, quien no lo haga toma 1 shot',
    'A la cuenta de 3 señalen a la persona mas guapa, tendrá que tomar 1 shot',
    '#, has una figura de algún animal con las manos, quien la adivine toma 1 shot, si nadie adivina tú tomas 1 shot ',
    '# tiene que decir una verdad, estilo verdad o reto, la pregunta la pone #',
    '#, cuenta a qué edad perdiste tu virginidad, toma 1 shot si no la haz perdido',
    '#, menciona tu mayor inseguridad o toma 1 shot ',
    'Si alguien toca la guitarra toma 1 shot por básico ',
    '#, si alguien de aqui te gusta toma 1 shot, no digas quién es ',
    '#, perrea, si no lo haces # toma 1 shot ',
    'Todos toman 1 shot ',
    '#, di una palabra complicada, quien no sepa qué significa toma 1 shot ',
    '#, menciona tu mejor momento con # ',
    '#, toma en segundos la mitad de tu edad, si tienes 20 años, toma 10 segundos ',
    'Toma 1 shot la persona con el acento más raro ',
    '#, toma 1 shot si haz tenido un blackout ',
    '#, menciona la tradición más extraña de tu familia',
    'Termina la frase, la menos original toma un shot. Mi prima... (Comienza #)',
    '#, tápate los ojos y volteate. Alguien deberá nalguearte, si adivinas quien fue todos toman, si no, tu tomas.',
    '#, menciona tu canción favorita del momento, si es la misma que la de alguien más, los dos toman ',
    '#, menciona un chisme que sepas de #, si no sabes ninguno toma 1 shot',
    'Toman 1 shot todos los que usen lentes',
    'La persona con más dinero en su cuenta bancaria toma 1 shot ',
    '#, si tu bebida tiene menos de la mitad te la tienes que fondear',
    'La persona que tomó un vuelo por última vez toma 1 shot ',
    '#, señala una cosa que hace a # especial',
    '#, elige entre un beso con # o 3 shots',
    '#, elige que # tome 2 shots, o que todos tomen 1',
    'La última persona en haber vomitado por la peda reparte 3 shots',
    'Los que vengan de blanco toman 2 shots',
    'Cuenten la peor date que han tenido, la peor reparte 3 shots. Comienza #',
    'Cuenten la peor experiencia sexual, la peor reparte 2 shots. Comienza #',
    '#, di algo que odies de # o toma un shot de 5 segundos ',
    'Toma 1 shot si naciste en México',
    'Si naciste fuera de México, toma 2 shots',
    '# toma 3 shots, o decide si los toma # o #',
    '# besa a #, si no quiere # toma una vez',
    'Te falta alcohol, # toma un shot',
    'Termina la frase, la menos original toma un shot. El otro día... (Comienza #)',
    'Termina la frase, la menos original toma un shot. En la peda... (Comienza #)',
    'Toma el que este tomando cheve',
    '#, di tu posicion sexual favorita o toma un shot ',
    'Si tendrías un cerdo como mascota toma 1 shot ',
    '#, toma un shot si tendrías un hijo con #',
    'Si eres vegano/a toma 2 shots ',
    '#, toma un shot si te ha llamado la atención alguien de tu mismo sexo ',
    '#, gime o toma 1 shot ',
    'Quien esté poniendo música, gracias, reparte 3 shots',
    'Los que traten a su mascota como si fuera su hijo, se toman 1 shot',
    'Todos cuentan su sueño más grande y # toma 1 shot. Comienza #',
    '# tienes 5 segundos para decir 3 partes del cuerpo que se pueden lamer',
    '¿Quien ha cogido en el lugar más extraño? La persona elegida toma 2 shots',
    'Toma 2 shots quien tenga el cumpleaños más cercano',
    'Yo nunca he tenido un trío',
    'Yo nunca me he medido el pene ',
    'Toma 1 shot la última persona que llegó a la fiesta. ',
    '#, ¿qué es lo más extraño que te han pedido en la cama?',
    'Quién sea más probable de tener un embarazo no deseado toma 2 shots',
    'Toma 1 shot si alguna vez te gustó tu mejor amigo',
    '#, da un pico a todas las personas de tu mismo género o bebe 3 shots. Para reforzar la amistad',
    'Toman los hombres',
    'Toman las mujeres',
    'La persona que ha cogido más esta semana toma 2 shots. Pasa tips',
    '#, por 2 turnos cada vez que te toque tomar, tomará # por ti',
    'Tema: Marcas de autos. Todos van diciendo una, quien no, toma un shot. Comienza #',
    'Tema: Cosas que encuentras en una cocina. Todos van diciendo una, quien no, toma un shot. Comienza #',
    'Tema: Canciones de Bad Bunny. Todos van diciendo una, quien no, toma un shot. Comienza #',
    'Tema: Canciones de Taylor Swift. Todos van diciendo una, quien no, toma un shot. Comienza #',
    'Tema: Series de Netflix. Todos van diciendo una, quien no, toma un shot. Comienza #',
    'Tema: Formas de preparar el tequila. Todos van diciendo una, quien no, toma un shot. Comienza #',
    'Tema: Bebidas alcoholicas. Todos van diciendo una, quien no, toma un shot. Comienza #',
    'Tema: Peliculas de Disney. Todos van diciendo una, quien no, toma un shot. Comienza #',
    'Tema: Animales. Todos van diciendo una, quien no, toma un shot. Comienza #',
    'Tema: Formas de decirle al pene. Todos van diciendo una, quien no, toma un shot. Comienza #',
    'Tema: Formas de decirle a la vagina. Todos van diciendo una, quien no, toma un shot. Comienza #',
    'Tema: Posiciones sexuales. Todos van diciendo una, quien no, toma un shot. Comienza #. Si pierde # toma 6 shots',
    '#, durante 3 rondas deja tu celular boca arriba en el centro de la mesa, si te llegan mensajes tendrás que leernos en voz alta',
    'Tema: Excusas para no salir de fiesta. Todos van diciendo una, quien no, toma un shot. Comienza #',
    '#, ¿jalarías a tener sexo con #? Ojito👀',
    '#, ¿jalarías a besarte con #? ¿De una vez o que?',
    '#, en promedio, ¿cuánto duran tus relaciones sexuales?',
    'Si alguna vez tuviste una erección en la escuela toma 3 shots',
    'Toma 1 shot la persona más probable en tener hijos accidentalmente',
    'El último en lanzarle algo a # toma 3 shots',
    '#, solo puedes salvar a una persona, ¿a # o #?',
    'Toma 2 shots si alguna vez fingiste un orgasmo',
    '#, dí el nombre de la persona que más te ha hecho disfrutar en la cama. Hora de quemar gente',
    '#, ¿qué prefieres, que tus abuelos te cachen teniendo relaciones o tu cachar a tus abuelos teniendo relaciones?',
    'Toma la persona que es más probable que incendie la casa cocinando',
    'Para todos, ¿con cuantas personas han cogido?, empieza #',
    '#, ¿te darías a #? La sinceridad ante todo',
    '¿Cuál ha sido su mejor anécdota en una peda? Comienza #',
    'Toma la última persona en tirarse al piso',
    '#, cuenta un chiste, si nadie se rie toma 1 shot',
    'Quien tenga el mejor culo toma 2 shot',
    '#, manda fueguitos a la tercer persona de tus historias o toma 2 shots',
    '#, ¿qué prefieres, saber como vas a morir o cuándo vas a morir?',
    '#, tomas un shot por cada persona más pequeña de edad que tú',
    '# y # juegan piedra, papel o tijeras, quien pierda se fondea su bebida',
    '¿Que prefieren, comer una caca con sabor a pastel o un pastel con sabor a caca?',
    'Toma 2 shots si eres foráneo',
    'Un brindis por lo que el grupo decida. ¡Salud!',
    'Fumadores brinden con 4 shots por sus pulmones',
    '¿Qué jugador creen que coge mejor? Empieza #',
    '#, dale 5 likes a fotos diferentes de la cuarta persona que te aparezca en tus historias insta',
    '#, abre el perfil de la tercera persona que te aparezca en tus historia de insta, el resto decida a que foto darle like',
    'Quien no le comentó la última foto a # toma 1 shot y comenten algo sexy',
    'Todos digan un piropo, el peor piropo toma 1 shot',
    '#, todos te dan un pico en los labios, quien se niegue toma 4 shots, si nadie se niega tu tomas 4 shots',
    '#, ¿qué prefieres, darle un beso a # o marcarle a tu ex? Date',
    '#, toma 1 shot con el brazo completamente extendido',
    'Para todos, ¿has cometido un delito? Cuenta el chisme',
    'Toma 1 shot la persona que conduza peor. ¿Cómo es posible que tengas licencia?',
    '#, ¿cuál sería tu apodo de pornstar? ',
    'Yo nunca he hecho un amarre',
    'Yo nunca he terminado en el hospital después de una fiesta',
    '#, mándale un mensaje a tu tercera persona de WhatsApp y dile que si presta dinero para pagar una multa  ',
    '#, ¿a quién llamarías para enterrar un cadaver? Ojalá no sea necesario',
    '#, lame el ombligo de # o toma 3 shots',
    ' #, ¿tendrías algo más que amistad con alguien de esta mesa?',
    'Vasos arriba, el primero en bajarlo se lo fondea',
    'A partir de este punto y hasta el final del juego, quién agarre su bebida con la mano dominante se la fondea',
    '#, gira una botella y besa a la persona señalada',
    '#, lee el último mensaje que enviaste y recibiste',
    'Para todos, fingan un orgasmo, el peor toma 2 shots. Comienza #',
    '#, si tuvieras un record guinness, ¿cuál sería?',
    '#, se ve que te falta alcohol, toma 2 shots',
    '#, toma un shot de alguna parte del cuerpo de #. El grupo decide de donde',
    'Toma la última persona que besó a alguien',
    '#, envíale una foto a tu ex o toma 3 shots',
    '#, quítale una prenda a # sin utilizar las manos',
    '#, dile algo al oído a # con la voz más sexy que puedas',
    'Toma si haz tenido alguna fantasía sexual con un profesor/a ',
    '#, cuenta cuál ha sido tu pareja más tacaña',
    '#, toma un shot si piensas que # sería bueno en la cama, no digas nada, solo toma ',
    'Toma 1 shot la última persona en decir "Ponte Pedo"',
    'Toma 1 shot si en tu licencia dice que eres donador de órganos, si no tienes toma 2',
    '#, cuenta si alguna vez haz hecho algo por presión social ',
    '#, desde ahora # es tu esclavo de shots, lo que tu debías tomar, ahora tu esclavo debe tomarlo. Será libre después de 2 rondas',
    '#, mira directamente a los ojos a # y dile lo que más odias de su persona ',
    'La persona con menos seguidores en Instagram toma 1 shot',
    'La persona más solterona reparte 3 shots. ¡Viva la libertad!',
    'La persona con la relación más larga toma 1 shot',
    'Toma quien haya enviado nudes',
    '#, ¿eres feliz?',
    '#, qué es algo que hiciste con # y solo ustedes dos saben',
    '#, ¿Saldrías con la persona que tienes enfrente?',
    'Todos jueguen a mantener los ojos abiertos, la primer persona que los cierre toma 1 shot',
    '#, ¿crees que # sea capáz de ponerle los cuernos a su pareja?',
    '#, cuenta lo que te hace sentir más orgulloso',
    'Todos toman si ninguno es virgen',
    'Toman lo que aún son virgenes',
    '#, di algo que siempre le has querido decir a #, ánimo, nadie te va a juzgar',
    '# y #, el grupo elige que postura sexual interpretarán ',
    '#, si le quieres pedir el insta a alguien del grupo aprovecha esta oportunidad',
    'A la cuenta de 3, señalen a la persona más dramática. Esa persona debe tomar 2 shots',
    'Digan algo que les gusta de la persona a su derecha, comienza #',
    'Tómense una selfie todos los que estén jugando',
    '#, sigue a @pontepedoclub en insta o tómate 18 shots. Yo lo veo claro',
    'La persona con más seguidores en Instagram toma 1 shot',
    'Pásense una tarjeta o algo similar de boca a boca entre todo el grupo, a quien se le caiga deberá tomar 1 shot',
    'Los que hayan usado Tinder u otra app de citas, tomen 1 shot',
    'Para todos, digan algún fetiche que tengan, el más raro toma 2 shots. Comienza #',
    'Toma un shot si has terminado a alguien por mensaje o te han terminado a ti',
    '#, dale tu celular a # y podrá hacer lo que quiera con él durante 30 segundos o toma 4 shots',
    '#, ¿cuál es el número máximo de personas con quienes te has besado en una noche?',
    '#, ¿quién de los presentes te parece más guapo o guapa?',
    'La persona con menos dinero en su cuenta bancaria toma 1 shot ',
    'Toma 2 shots la persona que propuso jugar "Ponte Pedo". ¡Héroe!',
    '#, el grupo te hará una pregunta y tienes que contestar con sinceridad',
    '#, di dos verdades y una mentria, todos tienen que adivinar la mentira, si fallan # toma 3 shots',
    'A la cuenta de 3 señalen a la persona más esquizofrénica, deberá tomar 1 shot ',
    '#, mándale mensaje a tu crush e invitale a salir o toma 4 segundos',
    '#, toma un shot si te haz drogado ',
    '#, cuenta cómo conociste a #',
    'Tema: Corridos bélicos. Todos van diciendo uno, quien no, toma un shot. (Comienza #)'
  ];

  backgroundColors: string[] = [
    "#6357F1",
    "#D0F36F",
    "#F06060",
    "#C5F7FC",
    "#019C70",
    "#F2AFC1",
    "#2A64E6",
    "#FFA23C",
    "#F5E663",
    "#A1D064",
    "#202020"
  ];
  contrastColor: 'black' | 'white' = 'white';
  usedPhrases: string[] = [];

  ngOnInit(): void {
  }
  
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      this.nextPhrase();
    }
  }

  constructor(private router: Router, private gameService: GameService, private location: Location) {
    this.players = this.gameService.getPlayers();
    this.nextPhrase();
  }

  ngAfterViewInit(): void {
    this.nextPhrase();
    window.scrollTo(0,0);
  }

  getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  replacePlayerName(phrase: string): string {
    let replacedPhrase = phrase;
  
    while (replacedPhrase.includes("#")) {
      let uniquePlayers: string[] = [];
  
      for (const player of this.players) {
        if (!replacedPhrase.includes(player)) {
          uniquePlayers.push(player);
        }
      }
  
      // Si no hay jugadores únicos restantes, reinicia la lista de jugadores únicos.
      if (uniquePlayers.length === 0) {
        uniquePlayers = [...this.players];
      }
  
      const randomPlayer = this.getRandomElement(uniquePlayers);
      replacedPhrase = replacedPhrase.replace("#", randomPlayer);
    }
  
    return replacedPhrase;
  }
  

  changeBackgroundColor(): void {
    const newColor = this.getRandomElement(this.backgroundColors);
    document.body.style.backgroundColor = newColor;
    
    this.contrastColor = getContrastColor(newColor);
    
    const textColorClass = this.contrastColor === 'black' ? 'black-text' : 'white-text';
    const borderColorClass = this.contrastColor === 'black' ? 'black-border' : 'white-border';
    
    const phraseElement = document.querySelector('.phrase');
    const buttonElement = document.querySelector('.next-button');
    
    if (phraseElement) {
      phraseElement.classList.remove('black-text', 'white-text');
      phraseElement.classList.add(textColorClass);
    }
    
    if (buttonElement) {
      buttonElement.classList.remove('black-text', 'black-border', 'white-text', 'white-border');
      buttonElement.classList.add(textColorClass, borderColorClass);
    }
  }

  nextPhrase(): void {
    // Si todas las frases han sido utilizadas, reinicia la lista de usedPhrases
    if (this.usedPhrases.length === this.phrases.length) {
      this.usedPhrases = [];
    }

    let newPhrase: string;

    // Encuentra todas las frases que aún no se han utilizado
    const unusedPhrases = this.phrases.filter(phrase => !this.usedPhrases.includes(phrase));

    // Selecciona una frase al azar de las frases no utilizadas
    newPhrase = this.getRandomElement(unusedPhrases);

    this.currentPhrase = this.replacePlayerName(newPhrase);
    this.usedPhrases.push(newPhrase);
    this.changeBackgroundColor();
  }

  goBack(): void {
    document.body.style.backgroundColor = '#F4F3F3';
    this.location.back();
  }

  onScreenClick() {
    this.nextPhrase();
  }
  

}
