import { Component, AfterViewInit, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { Location } from '@angular/common';
import { getContrastColor } from '../contrast-color.util';

@Component({
  selector: 'app-hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.scss']
})
export class HotComponent implements AfterViewInit, OnInit {
  players: string[] = [];
  currentPhrase: string = '';
  phrases: string[] = [
    'Señalen a la persona que cree se calienta más fácil, esa persona toma 1 shot',
    'Todos dicen que es lo más raro que han hecho en la cama. El más básico toma 1 shot',
    'La última persona en quitarse una prenda toma 1 shot',
    '#, crea una regla hot que durará 3 rondas',
    'Para todos, cada que agarren su bebida con la mano dominante, se quitan una prenda. Hasta el final del juego',
    '#, como prefieres que sea tu pareja? Traviesa o inocente. Roar',
    '#, te gusta que te besen en el cuello?',
    '# bésale el cuello a #',
    'Hombres, cuál es el lugar más extraño en donde se te ha parado',
    '#, del 1 al 10 que tan pervertido eres',
    'A la cuenta de 3, señalen a quien crean que es más pervertido aquí, por puerco te toca shot',
    'Tema: posiciones sexuales. Todos van diciendo una y quien no, toma shot. Comienza #',
    'Tema: formas de seducir a una mujer. Todos van diciendo una y quien no, toma shot. Comienza #',
    '# y #, interpreten el misionero por 10 segundos o 5 shots',
    'A la cuenta de 3, señalen a la persona más caliente de aquí. Toma un shot para que se enfríe',
    '#, cuenta una fantasía sexual que tengas',
    '# y # váyanse a un lugar privado por 3 mins. Aprovechen traviesos',
    '# y # hagan el perrito con movimiento y sonidos por 10 segundos',
    '# bésale el cuello a #',
    '# dale el beso más sexy que puedas a #',
    '# dile un cumplido a # sobre sus genitales',
    '# hazle un baile sexy a #',
    '#, dile algo sexi al oído a #. Si se sonroja todos los demás toman, si no tú tomas',
    'Quien de los hombres creen que la tenga mas grande, campeón reparte 3 shots',
    '#, sácate el ano y todos los participantes lo tienen que lamer',
    '#, besa a la persona de tu izquierda',
    'Todos besan en la boca a la persona de su derecha. Comienza #',
    'Todos besan en la boca a la persona de su izquierda. Comienza #',
    'Todos nalguean a la persona a su izquierda. Que chille, la peor nalgada toma 2 shots',
    '#, hazle un chupetón a # en el cuello',
    '#, hazle un chupetón a # en la nalga',
    '#, tómate un shot de la clavícula de #',
    '#, tómate un shot del ombligo de #',
    '# haz un beso francés con #',
    'Tema: Formas de decirle al pene. Todos van diciendo una, quien no toma 1 shot. Comienza #',
    'Toman los virgenes',
    '#, a quién de los presentes te cogerías?',
    '#, a quién de las mujeres presentes pondrías en 4?',
    'Chuparías culo? Comienza #',
    'Si haz mamado culo, toma un shot',
    '#, con quién aquí presente le serías infiel a tu pareja?',
    '#, di un atributo sexual que extrañes de tu ex',
    '#, que es lo más loco que has hecho estando caliente',
    '#, has fantaseado sexualmente con #',
    'Te has arrepentido de coger con alguien? Comienza #',
    'Mujeres, creen que el tamaño importa?',
    'Para todos, cuándo fue la ultima vez que te masturbaste? Comienza #',
    '#, que es lo que te da más placer en la cama',
    'Tema: todos digan un color, el perdedor se quita una prenda.',
    '# te gusta dominar o ser dominado?',
    '# crees que le gustas a alguien de aquí?',
    '# que es lo más asqueroso que has hecho en la cama?',
    '# prefieres que esté depilado',
    'Mujeres, describan su pito perfecto',
    'Modo regio. #, has teñido fantasías eroticas con alguien de tu familia?',
    'Mujeres, si tienes la ropa interior combinada toma 1 shot',
    '#, di nombre, quien ha sido tu mejor sexo o toma 4 shots.',
    '# que categoría de porno te gusta más',
    '#, prefieres un pene grande precoz, o uno chiquito y eficaz',
    '#, que tipo de ropa interior te prende más',
    'Todos si tienes un babydoll toma 1 shot',
    '#, # y #,¿ harían un trío ? Haber beso de 3.',
    '#, has usado un juguete sexual? Cual?',
    'Mujeres, toma un shot si se los han tragado alguna vez',
    'Hombres, quítense una prenda si no se te ha parado cuando más lo necesitas',
    'Hombres, sus partes íntimas tienen nombre?',
    '#, califica el culo de #',
    '#, tómate un shot de las tetas de quien el grupo decida',
    '#, agarra un vaso de shot y póntelo en la boca. Pásaselo a # y que se lo tome sin despegarse y sin usar las manos',
    'Con una carta o tarjeta, pásensela de boca en boca, quien se le caiga shot. Comienza #',
    '# chúpale un dedo a # de la forma más sensual que puedas',
    '# pásale un shot de boca a boca a #',
    '# muerde los labios de #',
    '# pega la lengua por 6 segundos con alguien del sexo que menos te guste, el grupo decide quién',
    'Todos besen a alguien en la boca, el último toma un shot',
    '# y # intercámbiense camisas',
    '# y # véanse a los ojos, el primero que parpadee besa a la otra persona'
  ];

  backgroundColors: string[] = [
    "#fe7018",
    "#f8df85",
    "#ecba09",
    "#cf2426",
    "#cf2426"
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
    const unusedPhrases = this.phrases.filter(phrase => !this.usedPhrases.includes(phrase));
  
    // Selecciona aleatoriamente una frase de las frases no utilizadas
    newPhrase = unusedPhrases[Math.floor(Math.random() * unusedPhrases.length)];
  
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
