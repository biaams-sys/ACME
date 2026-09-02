# Atividades - IoT

Repositório desenvolvido para armazenar as atividades e experimentos realizados durante as aulas de **IoT**, envolvendo Arduino, sensores, LEDs, displays, motores e automação.

As atividades foram desenvolvidas durante as aulas **02, 03 e 04**, incluindo também a criação de um **Dashboard Web para análise de dados**.

---

# Atividades

- Dashboard Web
- Experimento 01 - Poste com LED e Fotoresistor
- Experimento 02 - Semáforo de duas vias e pedestre
- Experimento 03 - Pista de pouso
- Experimento 04 - Servo motor com potenciômetro
- Experimento 05 - Display de 7 segmentos
- Experimento 06 - Portão eletrônico


---

# Dashboard Web

Foi desenvolvido um Dashboard Web para apresentar e analisar os dados relacionados aos acionamentos de um portão eletrônico.

##  Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Chart.js
- CSV
- JSON

## 📁Estrutura do Dashboard

```text
Dashboard Web/
│
├── index.html
├── style.css
├── script.js
├── dados.csv
└── dados.json

```

##  Telas

<p align="center">
  <img src="/fotos/1.png" width="700">
</p>

<p align="center">
  <img src="/fotos/2.png" width="700">
</p>

---

# Experimentos

## Experimento 01 - Poste com LED e Fotoresistor

### Objetivo

Criar um sistema de iluminação automática utilizando um **LED e um fotoresistor (LDR)**.

O sistema com Arduino identifica a quantidade de luz no ambiente:

-  Durante o dia: o LED permanece apagado.
-  Durante a noite: o LED acende.

Também foi realizada uma versão **sem Arduino**, utilizando apenas componentes eletrônicos.

---

###  Circuito com Arduino

<p align="center">
  <img src="/fotos/circuitocomarduino.png" width="600">
</p>

### Código

```cpp
int led = 9;
int ldr = A0;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {

  int luz = analogRead(ldr);

  if (luz < 500) {
    digitalWrite(led, HIGH);
  } else {
    digitalWrite(led, LOW);
  }

  delay(100);
}
```

---

###  Circuito sem Arduino

Nesta versão, o funcionamento é realizado sem programação, utilizando componentes eletrônicos para controlar o acionamento do LED.

<p align="center">
  <img src="/fotos/circuitosemarduino.png" width="600">
</p>

### 💻 Código

```text
Não possui código.
```

---

#  Experimento 02 - Semáforo de duas vias e pedestre

###  Objetivo

Criar um sistema de semáforo utilizando Arduino, contendo:

-  Semáforo da primeira via
-  Semáforo da segunda via
-  Semáforo para pedestres
-  LEDs vermelhos
-  LEDs amarelos
-  LEDs verdes

O Arduino controla a sequência de funcionamento dos semáforos utilizando diferentes intervalos de tempo.

---

### Circuito

<p align="center">
  <img src="/fotos/semaforo.png" width="600">
</p>

###  Código

```cpp
const int vermelho1 = 8;
const int amarelo1  = 6;
const int verde1    = 10;

const int vermelhoPedestre = 7;
const int verdePedestre    = 2;

const int vermelho2 = 11;
const int amarelo2  = 12;
const int verde2    = 13;

void setup() {

  pinMode(vermelho1, OUTPUT);
  pinMode(amarelo1, OUTPUT);
  pinMode(verde1, OUTPUT);

  pinMode(vermelhoPedestre, OUTPUT);
  pinMode(verdePedestre, OUTPUT);

  pinMode(vermelho2, OUTPUT);
  pinMode(amarelo2, OUTPUT);
  pinMode(verde2, OUTPUT);

  apagarTudo();
}

void loop() {

  apagarTudo();

  digitalWrite(verde1, LOW);
  digitalWrite(vermelho2, LOW);
  digitalWrite(verdePedestre, LOW);

  delay(5000);

  apagarTudo();

  digitalWrite(amarelo1, LOW);
  digitalWrite(vermelho2, LOW);
  digitalWrite(vermelhoPedestre, LOW);

  delay(2000);

  apagarTudo();

  digitalWrite(vermelho1, LOW);
  digitalWrite(vermelho2, LOW);
  digitalWrite(vermelhoPedestre, LOW);

  delay(1000);

  apagarTudo();

  digitalWrite(vermelho1, LOW);
  digitalWrite(verde2, LOW);
  digitalWrite(verdePedestre, LOW);

  delay(5000);

  apagarTudo();

  digitalWrite(vermelho1, LOW);
  digitalWrite(amarelo2, LOW);
  digitalWrite(vermelhoPedestre, LOW);

  delay(2000);

  apagarTudo();

  digitalWrite(vermelho1, LOW);
  digitalWrite(vermelho2, LOW);
  digitalWrite(vermelhoPedestre, LOW);

  delay(1000);
}

void apagarTudo() {

  digitalWrite(vermelho1, HIGH);
  digitalWrite(amarelo1, HIGH);
  digitalWrite(verde1, HIGH);

  digitalWrite(vermelhoPedestre, HIGH);
  digitalWrite(verdePedestre, HIGH);

  digitalWrite(vermelho2, HIGH);
  digitalWrite(amarelo2, HIGH);
  digitalWrite(verde2, HIGH);
}
```

---

#  Experimento 03 - Pista de pouso com LEDs

###  Objetivo

Criar uma representação de uma **pista de pouso** utilizando vários LEDs controlados por um Arduino.

Os LEDs acendem em sequência, criando um efeito de iluminação semelhante às luzes de uma pista de pouso.

---

### 🔌 Circuito

<p align="center">
  <img src="/fotos/posto.png" width="600">
</p>

### 💻 Código

```cpp
const byte LDR_PIN = A0;
const byte LEDS[] = {2, 3, 4, 5, 6, 7, 8, 9, 10, 11};
const int NUM_LEDS = 10;

void setup() {
  for (int i = 0; i < NUM_LEDS; i++) {
    pinMode(LEDS[i], OUTPUT);
  }
}

void loop() {
  int luz = analogRead(LDR_PIN);
 
  int quantidade = constrain(map(luz, 0, 1023, NUM_LEDS, 0), 0, NUM_LEDS);

  for (int i = 0; i < NUM_LEDS; i++) {
    digitalWrite(LEDS[i], (i < quantidade) ? HIGH : LOW);
  }

  delay(50);
}
```

---

# ⚙️ Experimento 04 - Servo motor com potenciômetro

### 📌 Objetivo

Controlar a posição de um **servo motor** utilizando um **potenciômetro**.

O valor lido pelo potenciômetro é convertido para um ângulo entre **0° e 180°**, fazendo com que o servo motor acompanhe a posição do potenciômetro.

Também foi utilizado um capacitor no circuito.

---

### 🔌 Circuito

<p align="center">
  <img src="Prints/4.png" width="600">
</p>

### 💻 Código

```cpp
#include <Servo.h>

Servo meuServo;

int potenc = 0;
int angulo = 0;

void setup() {
  meuServo.attach(9);
}

void loop() {

  potenc = analogRead(A0);

  angulo = map(potenc, 0, 1023, 0, 180);

  meuServo.write(angulo);

  delay(15);
}
```

---

# 🔢 Experimento 05 - Display de 7 segmentos

### 📌 Objetivo

Controlar um **display de 7 segmentos** utilizando Arduino.

O circuito utiliza um botão para realizar a alteração dos números apresentados no display.

Também foi realizado um desafio envolvendo display.

---

### 🔌 Circuito

<p align="center">
  <img src="Prints/5.2.png" width="600">
</p>

### 💻 Código

```cpp
int a = 4, b = 5, c = 6, d = 7, e = 8, f = 9, g = 10;

int botao = 2;
int num = 0;

int entrada[7] = {a,b,c,d,e,f,g};

int display[10][7] = {
  {a,b,c,d,e,f},
  {b,c},
  {a,b,d,e,g},
  {a,b,c,d,g},
  {b,c,f,g},
  {a,c,d,f,g},
  {a,c,d,e,f,g},
  {a,b,c},
  {a,b,c,d,e,f,g},
  {a,b,c,f,g}
};

void setup() {

  for(int i = 0; i < 7; i++)
    pinMode(entrada[i], OUTPUT);

  pinMode(botao, INPUT);
}

void loop() {

  int click = digitalRead(botao);

  delay(100);

  if(click)
    num++;

  if(num < 10)
    numero(num);
  else
    num = 0;
}

void numero(int coluna) {

  for(int i = 0; i < 7; i++)
    digitalWrite(entrada[i], 1);

  for(int linha = 0; linha < 7; linha++) {
    digitalWrite(display[coluna][linha], 0);
  }
}
```

---

## 🚪 Desafio - Controle de portão

### 📌 Objetivo

Neste desafio foi desenvolvido um sistema de controle para um **portão eletrônico**, utilizando Arduino.

O circuito possui:

- Botão de controle
- Relé de potência
- Relé de direção
- Fim de curso aberto
- Fim de curso fechado
- LED vermelho
- LED verde

Os LEDs indicam o funcionamento do sistema enquanto o portão é controlado.

---

### 🔌 Circuito

<p align="center">
  <img src="Prints/5.1.png" width="600">
</p>

### 💻 Código

```cpp
int relePower = 12;
int releDirecao = 13;

int botaoControle = 2;
int fimCursoAberto = 3;
int fimCursoFechado = 4;

bool portaoAberto = false;
bool motorLigado = false;

int ledVermelho = 6;
int ledVerde = 7;

unsigned long tempoAnteriorLed = 0;
const long intervaloLed = 500;
bool estadoLed = false;

void setup() {

  pinMode(relePower, OUTPUT);
  pinMode(releDirecao, OUTPUT);

  pinMode(botaoControle, INPUT);
  pinMode(fimCursoAberto, INPUT);
  pinMode(fimCursoFechado, INPUT);

  pinMode(ledVermelho, OUTPUT);
  pinMode(ledVerde, OUTPUT);
}

void loop() {

  controlarPortao();
  piscarLeds();
}

void controlarPortao() {

  if (digitalRead(botaoControle) == HIGH && !motorLigado) {

    digitalWrite(releDirecao, portaoAberto ? LOW : HIGH);
    digitalWrite(relePower, HIGH);

    motorLigado = true;

    delay(300);
  }

  if (digitalRead(fimCursoAberto) == HIGH) {

    digitalWrite(relePower, LOW);

    motorLigado = false;
    portaoAberto = true;
  }

  if (digitalRead(fimCursoFechado) == HIGH) {

    digitalWrite(relePower, LOW);

    motorLigado = false;
    portaoAberto = false;
  }
}

void piscarLeds() {

  unsigned long agora = millis();

  if (agora - tempoAnteriorLed >= intervaloLed) {

    estadoLed = !estadoLed;

    digitalWrite(ledVermelho, estadoLed);
    digitalWrite(ledVerde, !estadoLed);

    tempoAnteriorLed = agora;
  }
}
```

---

# 🚧 Experimento 06 - Simulador de portão eletrônico com Arduino

### 📌 Objetivo

Criar um simulador de portão eletrônico utilizando Arduino, botões, sensores de fim de curso, relés e LEDs.

O sistema permite simular a abertura e o fechamento do portão.

O Arduino identifica o estado do portão e controla o motor através dos relés.

---

### 🔌 Circuito

<p align="center">
  <img src="Prints/6.png" width="600">
</p>

### 💻 Código

```cpp
int relePower = 12;
int releDirecao = 13;

int botaoControle = 2;
int fimCursoAberto = 3;
int fimCursoFechado = 4;

bool portaoAberto = false;
bool motorLigado = false;

int ledVermelho = 6;
int ledVerde = 7;

unsigned long tempoAnteriorLed = 0;
const long intervaloLed = 500;
bool estadoLed = false;

void setup() {

  pinMode(relePower, OUTPUT);
  pinMode(releDirecao, OUTPUT);

  pinMode(botaoControle, INPUT);
  pinMode(fimCursoAberto, INPUT);
  pinMode(fimCursoFechado, INPUT);

  pinMode(ledVermelho, OUTPUT);
  pinMode(ledVerde, OUTPUT);
}

void loop() {

  controlarPortao();
  piscarLeds();
}

void controlarPortao() {

  if (digitalRead(botaoControle) == HIGH && !motorLigado) {

    digitalWrite(releDirecao, portaoAberto ? LOW : HIGH);
    digitalWrite(relePower, HIGH);

    motorLigado = true;

    delay(300);
  }

  if (digitalRead(fimCursoAberto) == HIGH) {

    digitalWrite(relePower, LOW);

    motorLigado = false;
    portaoAberto = true;
  }

  if (digitalRead(fimCursoFechado) == HIGH) {

    digitalWrite(relePower, LOW);

    motorLigado = false;
    portaoAberto = false;
  }
}

void piscarLeds() {

  unsigned long agora = millis();

  if (agora - tempoAnteriorLed >= intervaloLed) {

    estadoLed = !estadoLed;

    digitalWrite(ledVermelho, estadoLed);
    digitalWrite(ledVerde, !estadoLed);

    tempoAnteriorLed = agora;
  }
}
```

---

# Desenvolvido por

**@biaams-sys**


---
