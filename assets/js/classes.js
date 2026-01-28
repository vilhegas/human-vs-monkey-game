// Assassin, Warrior and Sorcerer
// GosthMonkey, MeatMonkey and TwinMonkey

class Character{

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;
    speed = 1;

    constructor(name){
        this.name = name;
    }

    // Criei a variável life com getter para acessar o valor atual
    get life (){
        return this._life
    }

    // Setter da variável life
    // Garante que, ao receber dano, o valor da vida nunca fique negativo
    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife;
    }
}

//Classe de Humanos

class Assassin extends Character{
    constructor(){
        super('Nyx');
        this.life = 100;
        this.attack = 12;
        this.speed = 10;
        this.defense = 5;
        this.maxLife = this.life;
    }
}

class Warrior extends Character{
    constructor(){
        super('Bjorn');
        this.life = 100;
        this.attack = 10;
        this.speed = 6;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character{
    constructor(){
        super('Eldrin');
        this.life = 100;
        this.attack = 15;
        this.speed = 8;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

//Classe de macacos

class GhosthMonkey extends Character{
    constructor(){
        super('Koba');
        this.life = 100;
        this.attack = 12;
        this.speed = 10;
        this.defense = 5;
        this.maxLife = this.life;
    }
}

class MeatMonkey extends Character{
    constructor(){
        super('Baku');
        this.life = 100;
        this.attack = 10;
        this.speed = 6;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class TwinMonkey extends Character{
    constructor(){
        super('Zans');
        this.life = 100;
        this.attack = 15;
        this.speed = 8;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

//Classe cenario

class Stage{
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

//Evento do botão de atacar
    start() {
        this.update();

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));

    }

//Colocando e calculando a vida dos personagens
    update(){
        //Fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(0)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;
        
        //Fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(0)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
     
    }

    doAttack(attacking, attacked) {
        if(attacked.life <= 0 ){
            this.log.addMessage('Atacando cachorro morto.');
            return;
        }  
        else if (attacking.life <= 0 ) {
            this.log.addMessage('Você está morto.');
            return;
        }

        let attackFactor = (Math.random() * 2). toFixed(2);
        let defenseFactor = (Math.random() * 2). toFixed(2);
        
        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense){
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack} de dano em ${attacked.name}`);
        } else{
            this.log.addMessage(`${attacked.name} conseguiu defender...`)
        }


        this.update();
    }

}

class Log {
    list = [];

    constructor(listEl){
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg)
        this.render();
    }

    render(){
        this.listEl.innerHTML = '';

        for(let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    
    }
}

//Adicção de classes 

function createFighter(className, name) {
  switch (className) {
    case 'Assassin': return new Assassin(name);
    case 'Warrior': return new Warrior(name);
    case 'Sorcerer': return new Sorcerer(name);

    case 'GosthMonkey': return new GosthMonkey(name);
    case 'MeatMonkey': return new MeatMonkey(name);
    case 'TwinMonkey': return new TwinMonkey(name);

    default: return null;
  }
}

startButton.addEventListener('click', () => {
  const humanClass = humanSelect.value;
  const monkeyClass = monkeySelect.value;

  const char = createFighter(humanClass, 'Human');
  const monkey = createFighter(monkeyClass, 'Monkey');

  // troca de tela
  setupScreen.classList.add('hidden');
  fightScreen.classList.remove('hidden');

  // limpa log visual
  log.list = [];
  log.render();

  const stage = new Stage(
    char,
    monkey,
    document.querySelector('#char'),
    document.querySelector('#monkey'),
    log
  );

  stage.start();
});
