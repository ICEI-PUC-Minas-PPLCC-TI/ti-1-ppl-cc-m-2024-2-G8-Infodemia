# Introdução

Informações básicas do projeto.

* **Projeto:** Dopamina em tempos de Infodemia
* **Repositório GitHub:** [T1-1-PPL-CC-M-2024-2-Ghost](https://github.com/ICEI-PUC-Minas-PPLCC-TI/ti-1-ppl-cc-m-2024-2-ghost)
* **Membros da equipe:**

  * [Diego Henrique Xavier dos Santos](https://github.com/Diego-Hxs) 
  * [Guilherme Henrique Soares França](https://github.com/beltrano) 
  * [Iara Lima Publio](https://github.com/iarapublio) 
  * [Leandro Rodrigues Marques](https://github.com/leandro-rodri) 
  * [Letícia Beatriz da Silva Lopes](https://github.com/lehsiilva) 
  * [Mariana de Abreu Teles](https://github.com/marianadeabreu) 
  * [Rafael Georgetti Grossi](https://github.com/xendak) 

A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Referências Bibliográficas

![Documentação de Design Thinking (MIRO)](files/design_thinking.pdf)
<br/><br/>

# Contexto


## Problema

A infodemia se trata da disseminação excessiva de informações, um problema que tem crescido exponencialmente com o avanço da tecnologia. Isso tem gerado impactos negativos na sociedade, como desinformação, problemas psicológicos e dependência de dopamina. Nosso grupo decidiu abordar esse tema por sua relevância atual e presença constante em nosso cotidiano, onde o uso excessivo de celulares é visivelmente desenfreado. 


## Objetivos

Neste projeto, buscamos inibir os efeitos causados pela sobrecarga informacional no desempenho das pessoas, tanto no âmbito acadêmico quanto no profissional e pessoal e auxiliar a lidar com a depedência desse excesso de informações.  Para isso, propomos filtrar as informações de modo a entregar apenas o conteúdo que seja considerado produtivo ou de interesse, otimizando o tempo de uso das telas.

## Justificativa

A motivação deste trabalho foi a construção de um software que pretende abordar e aliviar o problema da *Infodemia*, que impacta diretamente na saúde mental e física das pessoas, e, também, possibilita a existência de "*FAKE NEWS*" para quem tem contato com a internet diariamente, especificamente jovens adultos e estudantes. O problema sera analisado com base em estudos recentes e levantamento de dados realizado pelos autores deste trabalho. 


## Público-Alvo

O público-alvo deste estudo são os jovens adultos e estudantes, especialmente aqueles que utilizam frequentemente a internet e as redes sociais como principal meio de obtenção de informações. A intenção é tornar esses ambientes mais seguros e confiáveis para essa faixa etária, ajudando a diminuir os danos provocados pela exposição a conteúdos distorcidos ou enganosos, ou a exposição contínua de conteúdo sem filtros.


# Product Discovery

## Etapa de Entendimento

Através da ferramenta *Miro*, e da metologia [Design Thinking](https://www.dtgbrasil.com.br/), cria-se a matriz de alinhamento CSD e o mapa de stakeholders conforme o arquivo abaixo, que proporciona uma base para execução das entrevistas qualitativas.

![ETAPA ENTENDIMENTO - INFODEMIA](./files/entendimento1.png)
<br/><br/>

### Entrevistas Qualitativas
Todas as entrevistas estão no arquivo:   
![Entrevistas](./files/entrevistas.pdf)
<br/><br/> 

1. Como você se sente com a grande quantidade de informações que você recebe na internet?
    - Os entrevistados relataram se sentir sobrecarregados e até mesmo sem controle do que estão fazendo com o bombardeamento de informações que recebem diariamente. Muito do conteúdo que é promovido não se encaixa no perfil dos participantes, que acreditam que isso possa ser um gatilho para pessoas mais sensíveis. Existe, ainda, a ideia de que, com os instrumentos corretos, a internet é um lugar que agrega no seu aprendizado.
2. Como você enxerga o impacto disso em outras pessoas? Você pode contar sobre como isso afetou alguém que você conhece?
    - De acordo com os relatos de pessoas entrevistadas, acredita-se que tanto jovens quanto pessoas mais velhas têm dificuldade em filtrar informações, mas os menos acostumados com a tecnologia podem ser mais afetados. O acesso rápido a informações, especialmente através de plataformas como TikTok e YouTube, está impactando a paciência das pessoas. O próprio público percebe que tem sido afetado por isso, preferindo consumir conteúdo em velocidades aumentadas e se incomodando quando alguém fala devagar. Esse impacto também se estende para interações sociais, como o desconforto com o uso de celulares à mesa e o afastamento de parentes que compartilham desinformação. Um dos entrevistados mencionou um amigo que tomou medidas drásticas, como desinstalar redes sociais para se concentrar melhor no trabalho, usando-as apenas quando necessário.
3. Quais são suas principais fontes de informação? Como você consome esse conteúdo?
    - As principais fontes de informação para os entrevistados são redes sociais como Instagram, TikTok e YouTube. A maioria acessa a internet diariamente, variando entre 6 a 10 horas por dia sendo algumas delas ininterruptas.
4. Você percebe alguma mudança no seu comportamento ou humor após passar muito tempo consumindo informações online? Como isso afeta sua saúde mental?  E física?
    - O consumo de informações online por longos períodos de tempo incentivou o sedentarismo e o isolamento dos entrevistados, que disseram se sentir estressados ao serem privados do acesso à Internet. Houve relatos do sentimento de apatia às atividades do cotidiano e de prejuízo à rotina de sono.
5. Como você lida com isso atualmente?
    - Os participantes lidam com o excesso de informações na internet tentando passar mais tempo desconectados da rede. Isso se prova um desafio para os entrevistados visto que muito de seu trabalho e/ou entretenimento se concentram na internet. Existem participantes que relatam também não tomar nenhuma atitude sobre, se submetendo sem empecilho ao bombardeamento de informações.
6. Qual solução você acha que pode ser tomada para resolver esse problema?
    - As pessoas acreditam que a legislação é um passo importante para monitorar o que é oferecido na internet, especialmente para menores de idade, mas que os pais têm a responsabilidade principal. Para adultos, é uma questão de consciência própria, já que eles possuem acesso a informações sobre os malefícios das redes sociais. Há uma necessidade de maior controle sobre essas plataformas, que são vistas como uma fonte de vício, projetadas para manter as pessoas conectadas o máximo possível. No entanto, muitos não veem uma solução sistêmica para o problema e acreditam que a educação digital é essencial. Essa educação ajudaria as pessoas a impor limites no uso das redes e preservar sua saúde, uma vez que a tecnologia atual não consegue filtrar informações de forma eficaz.


## Etapa de Definição

### Personas

Todas as personas do nosso projeto são jovens adultos com algumas dores em comum como gerenciamento de tempo e problemas psicológicos. Sendo essas dores muitas vezes amplificadas pela infodemia, 

#### Persona 1
1 - Túlio Trindade: É um jovem adulto, estudante e estagiário que tem diversos hobbies, como jogar jogos online e rpg de mesa. Além disso, tem problemas em balancear os estudos, estágio e seu lazer, muitas vezes se distraindo com o celular além de ansiedade. 
![Persona 1](./files/persona_1.png)
<br/><br/> 
\pagebreak

#### Persona 2 
2 - Maria Júlia: É uma jovem adulta, estudante, que adora tocar piano e se dedicar ao estudo da língua inglesa e aprender coisas novas. Também é uma pessoa ansiosa e sempre atenta a redes sociais o que acaba consumindo seu tempo.  
![Persona 2](./files/persona_2.png)
<br/><br/> 
\pagebreak

#### Persona 3  
3 - Augusto Silva: É um jovem adulto, desempregado, apaixonado por música, jogos e principalmente bateria. Ele utiliza o computador para tudo e leva o celular para todo lugar além de uma power bank para garantir que vai estar conectado. Todavia, Augusto tem dificuldade em manter atenção em suas tarefas e se frustra quando as coisa dão errado.  
![Persona 3](./files/persona_2.png)
<br/><br/> 
\pagebreak

# Product Design

Nesse momento, vamos transformar os insights e validações obtidos em soluções tangíveis e utilizáveis. Essa fase envolve a definição de uma proposta de valor, detalhando a prioridade de cada ideia e a consequente criação de wireframes, mockups e protótipos de alta fidelidade, que detalham a interface e a experiência do usuário.

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

| EU COMO | QUERO/PRECISO | PARA |
| :---------------------: | :------------------------------------------: | :--------------------------------------: |
| Estagiário | Estímulo | Realizar minhas tarefas sem me distrair |
| Jovem Usuário | Configurar alertas relativos ao uso diário de aplicativos | Gerenciar melhor meu tempo e não usar as redes sociais excessivamente |
| Estudante | Ferramentas | Melhor administrar minhas tarefas |
| Trabalhador | Um planejador | Concluir minhas tarefas com mais eficiência e organização | 
| Pessoa Ansiosa | Diminuir meu contato com distratores digitais | Atingir meus objetivos e diminuir minha ansiedade |
| Músico | Maneiras de filtrar o conteúdo desnecessário | Melhorar meu desempenho | 
| Cidadão | Uma plataforma que integre diversas funcionalidades | Ter acesso à informações de uma maneira fácil |
| Gamer | Limitar meu tempo em jogos | Reduzir o estresse advindo da competitividade online | 
| Gamer | Uma ferramenta de análise para meus jogos | Ter sucesso em meus hobbies |


## Proposta de Valor

Proposta de Valor Túlio Trindade  
<br/><br/>
<br/><br/>
<br/><br/>
![Proposta de Valor Túlio Trindade](./files/proposta_valor1.png)
<br/><br/> 

Proposta de valor Maria Júlia  
<br/><br/> 
<br/><br/> 
<br/><br/> 
![Proposta de Valor 2](./files/proposta_valor2.png)
<br/><br/> 

\pagebreak
Proposta de valor Augusto Silva  
<br/><br/> 
<br/><br/> 
<br/><br/> 
![Proposta de Valor 3](./files/proposta_valor3.png)
<br/><br/> 

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID     | Descrição do Requisito                                   | Prioridade     |
| ------ | ---------------------------------------------------------- | ---------- |
| RF01   | Exibir uma introdução e visão geral do site.               | Essencial  |
| RF02   | Fornecer links para as seções principais.                  | Essencial  |
| RF03   | Disponibilizar artigos educativos sobre infodemia e desinformação. | Essencial  |
| RF04   | Incorporar vídeos e podcasts relacionados.                 | Essencial  |
| RF05   | Incluir uma seção de FAQs com perguntas frequentes e respostas. | Importante |
| RF06   | Oferecer guias e eBooks para download.                     | Essencial  |
| RF07   | Disponibilizar exercícios interativos para autoavaliação.  | Importante |
| RF08   | Fornecer links para suporte profissional e organizações de combate à infodemia. | Importante |
| RF09   | Desenvolver um diário de progresso para monitoramento pessoal. | Essencial  |
| RF10   | Fornecer alertas e lembretes para suporte contínuo.        | Essencial  |
| RF11   | Implementar área de cadastro e login para acesso a recursos personalizados. | Essencial  |
| RF12   | Incorporar um sistema de notificações e mensagens para atualizações e suporte. | Importante |
| RF13   | Fornecer uma lista de fontes confiáveis.                   | Essencial  |
| RF14   | Disponibilizar uma ferramenta de verificação de notícias.  | Importante |
| RF15   | Fornecer uma seção de notícias atualizadas sobre infodemia. | Importante |

### Requisitos não Funcionais

| ID     | Descrição do Requisito                                   | Prioridade     |
| ------ | ---------------------------------------------------------- | ---------- |
| NRF01  | Ser acessível em dispositivos móveis e desktops.           | Essencial  |
| NRF02  | O tempo de carregamento de cada página não deve exceder 3 segundos. | Importante |
| NRF03  | Garantir a segurança dos dados pessoais e de login dos usuários. | Essencial  |
| NRF04  | Oferecer uma interface amigável e de fácil navegação.      | Importante |
| NRF05  | Ser compatível com os principais navegadores.              | Essencial  |
| NRF06  | Permitir fácil atualização de conteúdo.                    | Importante |
| NRF07  | Suportar múltiplas requisições simultâneas sem degradação perceptível no desempenho. | Essencial  |
| NRF08  | Armazenar de forma criptografada dados sensíveis.          | Essencial  |
| NRF09  | Manter o código bem documentado e estruturado.             | Importante |


## Projeto de Interface

Artefatos relacionados com a interface e a interacão do usuário na proposta de solução.

### Wireframes


##### TELA INICIAL 

A tela de ínicio do nosso site.

![Tela 1](./files/Wireframes/01.png)
<br/><br/> 

#### TELA LOGIN

A tela de login para entrar em nosso site.

![Tela 2](./files/Wireframes/02.png)
<br/><br/> 

#### TELA CADASTRO

A tela de cadastro para se cadastrar em nosso site.

![Tela 3](./files/Wireframes/03.png)
<br/><br/> 

#### TELA COMUNIDADE

Uma parte do site de comunidade, para encontrar suporte caso o usuário precise. 

![Tela 4](./files/Wireframes/04.jpeg)
<br/><br/> 

#### TELA AUTOAVALIAÇÃO

Uma parte do site onde o usuário pode fazer uma auto avaliação de como a infodemia o afeta.

![Tela 5](./files/Wireframes/05.jpeg)
<br/><br/> 

#### TELA RECURSOS

Uma parte do site destinada a diversos conteúdos informativos como vídeos e e-books, e dúvidas frequentes.

![Tela 6](./files/Wireframes/06.jpeg)
<br/><br/> 

#### TELA CONTEÚDO INFORMATIVO

Uma parte do site com artigos, notícias e podcasts para informar o usuário. 

![Tela 7](./files/Wireframes/07.jpeg)
<br/><br/> 

### User Flow

![Userflow](./files/userflow.png)
<br/><br/>

### Protótipo Interativo

[Protótipo Interativo (MarvelApp)](https://marvelapp.com/prototype/1b83aa9e)  


# Metodologia

Detalhes sobre a organização do grupo e o ferramental empregado.

## Ferramentas

Relação de ferramentas empregadas pelo grupo durante o projeto.

| Ambiente                    | Plataforma | Link de acesso                                     |
| :---------------------------: | :----------: | :--------------------------------------------------: |
| Processo de Design Thinking | Miro       | https://miro.com/app/board/uXjVKn-Si0E=/        |
| Repositório de código         | GitHub     | https://github.com/ICEI-PUC-Minas-PPLCC-TI/ti-1-ppl-cc-m-2024-2-ghost      |
| Protótipo Interativo       | MarvelApp  | https://marvelapp.com/prototype/1b83aa9e  |

## Gerenciamento do Projeto

Durante as etapas de Entendimento e Product Discovery, o grupo realizou todo o trabalho em conjunto. Apos a criação da ideia de software, dividimos conforme a tabela a seguir.

| Tarefa | Responsáveis | 
| :----: | :----------: |
| Apresentação | Guilherme e Iara | 
| Design - Wireframe | Letícia, Leandro e Mariana | 
| Documentação | Diego e Rafael |
