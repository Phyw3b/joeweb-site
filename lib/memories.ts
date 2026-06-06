export type Memory = {
  id: number;
  previewSrc: string;
  finalSrc: string;
  subtitle?: string;
  story: string;
};

const sourcePhotos = [
  "/hero/hero.jpg",
  "/historia/01.jpg",
  "/historia/02.jpg",
  "/historia/03.jpg",
  "/historia/04.jpg",
  "/historia/05.jpg",
  "/evento/local.jpg",
];

export const memories: Memory[] = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  previewSrc: sourcePhotos[index % sourcePhotos.length],
  finalSrc: sourcePhotos[index % sourcePhotos.length],
  story: `Essa é uma memória simbólica da nossa caminhada, marcada pelo carinho de quem participou da nossa história. A foto ${
    index + 1
  } guarda um pedacinho desse caminho e agora fica colorida para celebrar esse presente.`,
}));

memories[0] = {
  id: 1,
  previewSrc: "/presentes/memorias/memoria-01.jpeg",
  finalSrc: "/presentes/memorias/memoria-01.jpeg",
  subtitle: "Albânia, 2025",
  story:
    "Entre histórias e risadas\n\nA Albânia era um destino que poucos conheciam, mas que nos surpreendeu de muitas formas.\n\nDepois de um dia incrível de praia e de uma noite cheia de risadas, brindes e histórias para contar, ainda encontramos energia para registrar mais um capítulo da nossa jornada.\n\nTalvez porque, no fundo, sempre soubemos que os lugares são especiais.\n\nMas são as pessoas ao nosso lado que tornam cada viagem inesquecível.",
};

memories[1] = {
  id: 2,
  previewSrc: "/presentes/memorias/memoria-02.jpeg",
  finalSrc: "/presentes/memorias/memoria-02.jpeg",
  subtitle: "Aniversário Jô",
  story: "Essa é uma daquelas lembranças que aquecem o coração\n\nEntre aniversários, abraços e momentos simples, existem fotografias que se tornam verdadeiros tesouros.\n\nEsta guarda o sorriso da Dona Heroína, uma pessoa que sempre valorizou a alegria e a companhia das pessoas.\n\nMais do que uma foto, é o registro de um momento feliz que temos a sorte de carregar para sempre conosco.",
};

memories[2] = {
  id: 3,
  previewSrc: "/presentes/memorias/memoria-03.jpeg",
  finalSrc: "/presentes/memorias/memoria-03.jpeg",
  subtitle: "Natal Gergelim Pernambuco",
  story: "A noite tinha sido repleta de abraços, conversas e daqueles momentos que aquecem o coração.\n\nAntes que cada um seguisse seu caminho, fomos presenteados por um amanhecer inesquecível.\n\nO céu parecia celebrar junto conosco, encerrando um Natal especial da forma mais bonita possível.\n\nAlgumas lembranças não precisam de grandes acontecimentos. Apenas das pessoas certas.",
};

memories[3] = {
  id: 4,
  previewSrc: "/presentes/memorias/memoria-04.jpeg",
  finalSrc: "/presentes/memorias/memoria-04.jpeg",
  subtitle: "Buenos Aires, Argentina 2018",
  story: "Dizem que nunca voltamos ao mesmo lugar duas vezes.\n\nTalvez porque os lugares mudem.\nTalvez porque nós também mudamos.\n\nQuando retornamos à Argentina, encontramos muito mais do que pontos turísticos e novas paisagens.\n\nEncontramos a alegria de viver aquela experiência novamente, agora em família e com novos olhos para descobrir o mundo.",
};

memories[4] = {
  id: 5,
  previewSrc: "/presentes/memorias/memoria-05.jpeg",
  finalSrc: "/presentes/memorias/memoria-05.jpeg",
  subtitle: "Arraial do Cabo, RJ",
  story: "Existem lugares que surpreendem até quem já viajou bastante.\n\nArraial do Cabo foi um deles.\n\nÁguas cristalinas, paisagens impressionantes e aquela sensação de estar descobrindo um pequeno paraíso sem sair do Brasil. Um pôr do sol que Deus fez à mão.\n\nEntre trilhas, mirantes e momentos em família, colecionamos mais uma lembrança daquelas que merecem ser guardadas para sempre.",
};

memories[5] = {
  id: 6,
  previewSrc: "/presentes/memorias/memoria-06.jpeg",
  finalSrc: "/presentes/memorias/memoria-06.jpeg",
  subtitle: "Peruíbe, São Paulo",
  story: "Não lembramos exatamente sobre o que conversávamos naquele momento.\n\nNem o que aconteceu antes ou depois da foto.\n\nMas lembramos da sensação.\n\nDa leveza, da cumplicidade e daquele jeito silencioso que duas pessoas têm de se entender sem precisar dizer nada.\n\nOlhando para esta imagem hoje, temos a impressão de que tudo o que construiríamos juntos já estava ali.",
};

memories[6] = {
  id: 7,
  previewSrc: "/presentes/memorias/memoria-07.jpeg",
  finalSrc: "/presentes/memorias/memoria-07.jpeg",
  subtitle: "Campos Jordão, São Paulo",
  story: "Frio, chocolate quente, caminhada sem destino e tempo para conversar.\n\nNada muito planejado.\n\nNada muito sofisticado.\n\nApenas nós dois aproveitando um fim de semana juntos, como sempre gostamos.\n\nAlgumas coisas mudaram com o tempo.\n\nOutras continuam exatamente iguais.",
};

memories[7] = {
  id: 8,
  previewSrc: "/presentes/memorias/memoria-08.jpeg",
  finalSrc: "/presentes/memorias/memoria-08.jpeg",
  subtitle: "Santé, Campos de Jordão",
  story: "Fomos para curtir o festival.\n\nEncontramos amigos, encaramos o frio, cantamos, dançamos e nos divertimos muito mais do que imaginávamos.\n\nEm algum momento da noite, estávamos ao lado do Alok registrando uma foto que parecia improvável algumas horas antes.\n\nDaquelas histórias que começam sem grandes expectativas e terminam virando lembrança para a vida toda.",
};

memories[8] = {
  id: 9,
  previewSrc: "/presentes/memorias/memoria-09.jpeg",
  finalSrc: "/presentes/memorias/memoria-09.jpeg",
  subtitle: "Utah",
  story:
    "Entre montanhas cobertas de neve, lareiras acesas, café quente e uma taça de vinho para aquecer o dia, encontramos um lugar especial em Utah.\n\nO cenário parecia ter saído de um cartão-postal de inverno.\n\nMas o que mais chamou nossa atenção foi uma pequena cachoeira que insistia em continuar correndo, mesmo cercada pelo frio e pela neve.\n\nDaquelas lembranças simples que transformam uma viagem em uma experiência inesquecível.",
};

memories[9] = {
  id: 10,
  previewSrc: "/presentes/memorias/memoria-10.jpeg",
  finalSrc: "/presentes/memorias/memoria-10.jpeg",
  subtitle: "Capitólio, Minas Gerais",
  story:
    "Quando pensamos em Capitólio, os cânions são as primeiras imagens que vêm à mente.\n\nMas a verdade é que a experiência foi muito maior do que isso.\n\nEntre passeios de barco, cachoeiras, boa comida, uma pousada acolhedora e paisagens impressionantes, encontramos um daqueles lugares que superam qualquer expectativa.\n\nDaquelas viagens que terminam deixando vontade de voltar.",
};

memories[10] = {
  id: 11,
  previewSrc: "/presentes/memorias/memoria-11.jpeg",
  finalSrc: "/presentes/memorias/memoria-11.jpeg",
  subtitle: "Capri, Itália",
  story:
    "O verão europeu já era um sonho.\n\nMas estar em Capri, cercados por aquele mar impossível de descrever, transformou o dia em algo ainda mais especial.\n\nEntre barcos, paisagens e águas que pareciam ter saído de um filme, ficamos ali, vivendo o momento.\n\nE, sinceramente?\n\nEu e ela. Ela e eu.\n\nPode existir coisa melhor?",
};

memories[11] = {
  id: 12,
  previewSrc: "/presentes/memorias/memoria-12.jpeg",
  finalSrc: "/presentes/memorias/memoria-12.jpeg",
  subtitle: "Capri, Itália",
  story:
    "No meio de um dos lugares mais bonitos que já visitamos, descobrimos algo curioso.\n\nEscondido na rocha, havia um coração moldado pela natureza.\n\nNão precisávamos de um motivo para tirar a foto.\n\nMas, convenhamos...\n\nQuando o coração já está lá, o registro é obrigatório.",
};

memories[12] = {
  id: 13,
  previewSrc: "/presentes/memorias/memoria-13.jpeg",
  finalSrc: "/presentes/memorias/memoria-13.jpeg",
  subtitle: "Capri, Itália",
  story:
    "Capri é um daqueles lugares que parecem ter sido desenhados para impressionar.\n\nO mar, as ruas, as cores e a atmosfera fazem tudo parecer especial.\n\nTalvez seja por isso que esta foto tenha se tornado uma das nossas favoritas.\n\nOu talvez a resposta seja mais simples:\n\néramos apenas nós dois, em um dos lugares mais bonitos que já conhecemos.",
};

memories[13] = {
  id: 14,
  previewSrc: "/presentes/memorias/memoria-14.jpeg",
  finalSrc: "/presentes/memorias/memoria-14.jpeg",
  subtitle: "Ábaco, São Bernardo do Campo",
  story:
    "Antes da cerimônia, vivemos um daqueles momentos que ficam para sempre.\n\nAbrimos uma cápsula do tempo preparada anos antes e, junto com ela, vieram lembranças, sonhos e muitas lágrimas.\n\nPouco depois, vimos nossa filha subir ao palco para celebrar mais uma conquista importante.\n\nNaquele dia entendemos que o tempo realmente passa.\n\nE que, felizmente, algumas emoções nunca mudam.",
};

memories[14] = {
  id: 15,
  previewSrc: "/presentes/memorias/memoria-15.jpeg",
  finalSrc: "/presentes/memorias/memoria-15.jpeg",
  subtitle: "Festa 15 Anos, SBC",
  story:
    "A noite foi perfeita.\n\nTeve emoção, dança, fotos, amigos e muitas histórias para contar.\n\nMas esta imagem guarda algo maior do que a festa.\n\nEla registra o momento em que brindamos não apenas aos 15 anos da Luiza, mas a tudo o que vivemos para chegar até ali.\n\nPorque algumas celebrações marcam uma data.\n\nOutras marcam uma fase da vida.",
};

memories[15] = {
  id: 16,
  previewSrc: "/presentes/memorias/memoria-16.jpeg",
  finalSrc: "/presentes/memorias/memoria-16.jpeg",
  subtitle: "Colônia do Sacramento, Uruguai",
  story:
    "A foto não mostra o frio que estava fazendo.\n\nNem a garoa insistente que nos acompanhou naquele dia.\n\nMas mostra exatamente o que lembramos quando pensamos em Colonia del Sacramento.\n\nUma cidade charmosa, cheia de história, com clima de interior, jeito europeu e um ritmo que convida a desacelerar.\n\nE, no final das contas, valeu cada grau a menos no termômetro.",
};

memories[16] = {
  id: 17,
  previewSrc: "/presentes/memorias/memoria-17.jpeg",
  finalSrc: "/presentes/memorias/memoria-17.jpeg",
  subtitle: "Cristo Redentor, RJ",
  story:
    "Não é apenas uma foto no Cristo.\n\nÉ uma foto que reúne aquilo que mais valorizamos.\n\nA fé que nos acompanha, a família que construímos e o orgulho de estar diante de um dos maiores símbolos do Brasil.\n\nDaquelas imagens que não precisam de legenda.\n\nElas falam por si.",
};

memories[17] = {
  id: 18,
  previewSrc: "/presentes/memorias/memoria-18.jpeg",
  finalSrc: "/presentes/memorias/memoria-18.jpeg",
  subtitle: "Morumbi, SP",
  story:
    "Olê, olê, olê, olê...\n\nSão Paulo, São Paulo...\n\nExistem coisas que não precisam de explicação.\n\nO amor pelo Tricolor é uma delas.\n\nEntre jogos, vitórias, derrotas e muitas histórias para contar, aprendemos que torcer fica ainda melhor quando a família inteira compartilha a mesma paixão.\n\nPorque alguns sentimentos não passam. Onde a moeda cai em pé!\n\nApenas passam de geração para geração.",
};

memories[18] = {
  id: 19,
  previewSrc: "/presentes/memorias/memoria-19.jpeg",
  finalSrc: "/presentes/memorias/memoria-19.jpeg",
  subtitle: "São Paulo, SP",
  story:
    "Dizem que criar um filho é como plantar uma semente sem saber exatamente como será a árvore.\n\nNaquela noite tivemos a sensação de que ela floresceu.\n\nA formatura foi linda. Teve emoção, amigos, dança, uma turma de pagode que transformou a festa em algo inesquecível e muitas histórias para guardar.\n\nMas o que realmente levamos para casa foi a certeza de que cada esforço valeu a pena.\n\nO futuro ainda está começando para ela.\n\nMas aquele ciclo, nós concluímos juntos.",
};

memories[19] = {
  id: 20,
  previewSrc: "/presentes/memorias/memoria-20.jpeg",
  finalSrc: "/presentes/memorias/memoria-20.jpeg",
  subtitle: "Fortaleza, Ceará",
  story:
    'Quem já andou de buggy nas dunas sabe que existe uma pergunta clássica:\n\n"Com ou sem emoção?"\n\nA resposta, naquele dia, era óbvia.\n\nEntre areia, vento, mar e muitas gargalhadas, vivemos mais uma aventura daquelas que viram assunto por anos.\n\nPorque algumas viagens são feitas para descansar.\n\nOutras são feitas para acelerar.',
};

memories[20] = {
  id: 21,
  previewSrc: "/presentes/memorias/memoria-21.jpeg",
  finalSrc: "/presentes/memorias/memoria-21.jpeg",
  subtitle: "Santorini, Grécia",
  story:
    "A Grécia esteve presente nos nossos sonhos por muito tempo.\n\nPela história, pela cultura, pela mitologia e por tudo aquilo que ela representa.\n\nQuando finalmente chegamos, percebemos que algumas experiências são impossíveis de traduzir em fotografias.\n\nEsta imagem registra um momento bonito.\n\nMas guarda apenas uma pequena parte de tudo o que vivemos naquele lugar inesquecível.",
};

memories[21] = {
  id: 22,
  previewSrc: "/presentes/memorias/memoria-22.jpeg",
  finalSrc: "/presentes/memorias/memoria-22.jpeg",
  subtitle: "Vesúvio, Itália",
  story:
    "Sempre tivemos curiosidade por lugares que carregam histórias extraordinárias.\n\nE poucos lugares representam isso tão bem quanto o Vesúvio.\n\nVer de perto a imensidão da cratera, imaginar tudo o que aconteceu ali e compartilhar aquele momento em família foi algo especial. A caminhada para chegar não foi fácil... mas valeu cada passo.\n\nNo topo, entre paisagens incríveis e um vinho produzido na própria base do vulcão, celebramos mais uma experiência que ficará para sempre entre as nossas favoritas.",
};

memories[22] = {
  id: 23,
  previewSrc: "/presentes/memorias/memoria-23.jpeg",
  finalSrc: "/presentes/memorias/memoria-23.jpeg",
  subtitle: "Herber City, Utah",
  story:
    "Todo mundo guarda uma imagem perfeita de Natal na memória.\n\nA nossa tinha neve caindo, uma casa aconchegante, família reunida, boas conversas, jogos até tarde e uma taça de vinho para acompanhar o frio lá fora.\n\nDurante alguns dias, vivemos exatamente isso.\n\nNão foi apenas uma viagem.\n\nFoi a realização de uma lembrança que ainda nem existia.",
};

memories[23] = {
  id: 24,
  previewSrc: "/presentes/memorias/memoria-24.jpeg",
  finalSrc: "/presentes/memorias/memoria-24.jpeg",
  subtitle: "Mikonos, Grécia",
  story:
    "Existem fotos bonitas.\n\nE existem fotos que conseguem trazer de volta exatamente o que sentimos naquele momento.\n\nO mar, o pôr do sol, o vento, os brindes e a sensação de estar vivendo algo que ficará para sempre na memória.\n\nA Grécia já tinha nos conquistado.\n\nMas naquela tarde, Mykonos resolveu deixar sua assinatura na nossa história.",
};

memories[24] = {
  id: 25,
  previewSrc: "/presentes/memorias/memoria-25.jpeg",
  finalSrc: "/presentes/memorias/memoria-25.jpeg",
  subtitle: "Guarujá, São Paulo",
  story:
    "A ideia era simples: aproveitar alguns dias de praia antes da chegada da Luiza.\n\nO problema é que, olhando essa foto hoje, fica difícil saber quem estava com a barriga maior.\n\nEnquanto ela se preparava para chegar ao mundo, nós aproveitávamos o mar, o sol e aqueles últimos momentos antes da nossa vida mudar para sempre.\n\nFelizmente, a Luiza nasceu primeiro.\n\nMas a disputa foi equilibrada.",
};

memories[25] = {
  id: 26,
  previewSrc: "/presentes/memorias/memoria-26.jpeg",
  finalSrc: "/presentes/memorias/memoria-26.jpeg",
  subtitle: "Em algum lugar, Brasil",
  story:
    "Não lembramos exatamente onde essa foto foi tirada.\n\nMas lembramos perfeitamente por que ela existe.\n\nSempre que o céu resolve fazer um espetáculo, nós paramos para assistir.\n\nAo longo dos anos colecionamos muitos pôres do sol, em diferentes lugares e momentos da vida.\n\nTalvez porque eles nos lembrem de algo simples:\n\nalgumas das melhores coisas da vida acontecem sem pressa.",
};

memories[26] = {
  id: 27,
  previewSrc: "/presentes/memorias/memoria-27.jpeg",
  finalSrc: "/presentes/memorias/memoria-27.jpeg",
  subtitle: "Miami, USA",
  story:
    "Às vezes uma viagem fica marcada pelos pontos turísticos.\n\nOutras vezes, pelo clima que um lugar transmite.\n\nMiami nos ganhou pela energia.\n\nO mar, as palmeiras, a mistura de culturas, a vida acontecendo por todos os lados e aquela sensação de férias que parece nunca terminar.\n\nFoi uma viagem extraordinária.\n\nE, honestamente?\n\nJá saímos de lá sabendo que voltaríamos.",
};

memories[27] = {
  id: 28,
  previewSrc: "/presentes/memorias/memoria-28.jpeg",
  finalSrc: "/presentes/memorias/memoria-28.jpeg",
  subtitle: "Coliseu, Roma",
  story:
    "Sempre ouvimos dizer que Roma não se conhece em uma visita.\n\nAgora entendemos o motivo.\n\nO Coliseu, as ruínas, as histórias, a grandiosidade e a sensação de estar diante de algo que atravessou dois mil anos de história são difíceis de explicar.\n\nSaímos de lá admirando ainda mais a cidade. Andamos muito, mas cada quilômetro valeu um suspiro diferente.\n\nE com a certeza de que algumas experiências ficam muito melhores quando são compartilhadas em família.",
};

memories[28] = {
  id: 29,
  previewSrc: "/presentes/memorias/memoria-29.jpeg",
  finalSrc: "/presentes/memorias/memoria-29.jpeg",
  subtitle: "Ilha Bela, SP",
  story:
    "Mais de vinte anos se passaram entre esta foto e o nosso casamento.\n\nNa época éramos apenas dois jovens aproveitando uma viagem para Ilhabela.\n\nSem planos.\n\nSem imaginar tudo o que ainda viveríamos.\n\nO curioso é que essa foto foi tirada exatamente de frente para o lugar onde escolhemos celebrar nossa união tantos anos depois.\n\nTalvez tenha sido coincidência.\n\nOu talvez o destino já soubesse de alguma coisa.",
};

memories[29] = {
  id: 30,
  previewSrc: "/presentes/memorias/memoria-30.jpeg",
  finalSrc: "/presentes/memorias/memoria-30.jpeg",
  subtitle: "Milão, Itália",
  story:
    "O calor estava absurdo.\n\nO Aperol estava gelado.\n\nE a cidade fazia questão de mostrar por que é uma das mais fascinantes da Itália.\n\nEntre a Duomo, as galerias, os passeios sem destino e as histórias que só acontecem durante uma viagem, vivemos dias que ficaram marcados muito além das fotos.\n\nAlgumas cidades são bonitas.\n\nMilão tem personalidade.",
};

memories[30] = {
  id: 31,
  previewSrc: "/presentes/memorias/memoria-31.jpeg",
  finalSrc: "/presentes/memorias/memoria-31.jpeg",
  subtitle: "Guarulhos, SP",
  story:
    "Trabalhamos a vida inteira para que ela tivesse coragem de voar.\n\nE naquele dia ela voou.\n\nO intercâmbio era um sonho.\n\nUma oportunidade incrível.\n\nUma conquista que nos enchia de orgulho.\n\nMas, enquanto ela caminhava em direção ao embarque, descobrimos uma verdade que nenhum pai e nenhuma mãe conseguem evitar:\n\nVer os filhos crescerem é maravilhoso.\n\nE dói ao mesmo tempo.",
};

memories[31] = {
  id: 32,
  previewSrc: "/presentes/memorias/memoria-32.jpeg",
  finalSrc: "/presentes/memorias/memoria-32.jpeg",
  subtitle: "Fontana di Trevi, Roma",
  story:
    "Durante muito tempo vimos esse lugar em filmes, livros, fotografias e documentários.\n\nEntão, um dia, ele deixou de ser uma imagem e passou a ser uma lembrança.\n\nEstar ali, juntos, em família, tornou aquele momento ainda mais especial.\n\nPorque alguns sonhos não terminam quando se realizam.\n\nEles se transformam em histórias para contar.",
};

memories[32] = {
  id: 33,
  previewSrc: "/presentes/memorias/memoria-33.jpeg",
  finalSrc: "/presentes/memorias/memoria-33.jpeg",
  subtitle: "Palácio Nacional da Pena, Portugal",
  story:
    "O Palácio da Pena é daqueles lugares que impressionam qualquer visitante.\n\nMas, olhando para esta foto hoje, o que mais gostamos de lembrar não é apenas o castelo.\n\nÉ a sensação de continuar explorando novos lugares, aprendendo novas histórias e criando novas memórias juntos.\n\nDepois de tantos anos, ainda existe algo que nunca mudou entre nós:\n\nA curiosidade de descobrir o próximo capítulo.",
};

memories[33] = {
  id: 34,
  previewSrc: "/presentes/memorias/memoria-34.jpeg",
  finalSrc: "/presentes/memorias/memoria-34.jpeg",
  subtitle: "Disney World, USA",
  story:
    "Na primeira visita, a magia estava nos personagens, nos castelos e nos olhos de uma menina encantada.\n\nNa segunda, ela estava nas lembranças.\n\nVoltamos para revisitar lugares conhecidos, recordar momentos especiais e perceber o quanto a vida havia mudado desde então.\n\nO Mickey continuava o mesmo.\n\nNós é que tínhamos crescido.\n\nE talvez seja justamente isso que torna essa foto tão especial.",
};

memories[34] = {
  id: 35,
  previewSrc: "/presentes/memorias/memoria-35.jpeg",
  finalSrc: "/presentes/memorias/memoria-35.jpeg",
  subtitle: "Milagres, Alagoas",
  story:
    "Dizem que Milagres é um lugar especial.\n\nPara nós, ele se tornou ainda mais. I believe in miracles.\n\nAli celebramos um sonho realizado, vivemos uma experiência inesquecível e criamos uma lembrança que levaremos para sempre conosco.\n\nTalvez porque soubéssemos, mesmo sem dizer em voz alta, que os ciclos da vida estavam mudando.\n\nNossa família continuava completa.\n\nMas novos caminhos já começavam a surgir.\n\nE naquele instante existia apenas gratidão.\n\nPorque, no final das contas, estar ali, juntos, já era um milagre.",
};

memories[35] = {
  id: 36,
  previewSrc: "/presentes/memorias/memoria-36.jpeg",
  finalSrc: "/presentes/memorias/memoria-36.jpeg",
  subtitle: "The Edge, New York",
  story:
    "Depois de meses longe de casa vivendo a experiência do intercâmbio, chegou o momento de nos reencontrarmos.\n\nE escolhemos fazer isso realizando um dos maiores sonhos da Luiza.\n\nNova York impressionou pela energia, pela grandiosidade e pela sensação de que tudo é possível.\n\nMas o que realmente guardamos daquela viagem não foi apenas a cidade.\n\nFoi a felicidade de viver aquele momento juntos.\n\nPorque não existe vista mais bonita do que ver quem amamos realizando um sonho.",
};

memories[36] = {
  id: 37,
  previewSrc: "/presentes/memorias/memoria-37.jpeg",
  finalSrc: "/presentes/memorias/memoria-37.jpeg",
  subtitle: "Simões, Piauí",
  story:
    "Ao longo dos anos cruzamos oceanos, conhecemos novas culturas e colecionamos experiências incríveis.\n\nMas existe algo especial em voltar para os lugares que fazem parte da nossa história.\n\nSimões não aparece nos roteiros mais famosos do mundo.\n\nMas aparece em algo muito mais importante: na nossa trajetória.\n\nE caminhar por essa terra ao lado de quem nasceu aqui tornou a viagem ainda mais significativa.",
};

memories[37] = {
  id: 38,
  previewSrc: "/presentes/memorias/memoria-38.jpeg",
  finalSrc: "/presentes/memorias/memoria-38.jpeg",
  subtitle: "Santiago, Chile",
  story:
    "Gostamos de vinho.\n\nMas gostamos ainda mais das histórias por trás dele.\n\nDurante a visita à Cousiño Macul descobrimos muito mais do que barris e adegas.\n\nConhecemos a trajetória de pessoas que ajudaram a construir parte da história do Chile e transformaram um sonho em legado.\n\nTalvez por isso essa foto represente tanto para nós.\n\nPorque reúne exatamente aquilo que mais gostamos: história, viagem, bons vinhos e a oportunidade de viver tudo isso juntos.",
};

memories[38] = {
  id: 39,
  previewSrc: "/presentes/memorias/memoria-39.jpeg",
  finalSrc: "/presentes/memorias/memoria-39.jpeg",
  subtitle: "João Pessoa, Paraíba",
  story:
    "Já estivemos em muitos lugares.\n\nMontanhas, castelos, grandes cidades e destinos que pareciam impossíveis.\n\nMas, de alguma forma, sempre acabamos voltando para a mesma essência.\n\nUm pedaço de areia.\n\nO som do mar.\n\nO vento no rosto.\n\nE nós dois aproveitando o momento.\n\nTalvez seja por isso que a praia sempre tenha feito parte da nossa história.",
};

memories[39] = {
  id: 40,
  previewSrc: "/presentes/memorias/memoria-40.jpeg",
  finalSrc: "/presentes/memorias/memoria-40.jpeg",
  subtitle: "Sítio São José, Simões",
  story:
    "Para muitas pessoas, essa pode parecer apenas uma construção antiga.\n\nPara nós, ela guarda muito mais.\n\nAqui vivem lembranças da infância, histórias de família, desafios, aprendizados e momentos que ajudaram a formar a mulher que conhecemos hoje.\n\nVoltar a esse lugar foi especial.\n\nNão apenas para ela.\n\nMas também para nós, que pudemos conhecer um pouco mais das raízes que ajudaram a construir a nossa história.",
};

memories[40] = {
  id: 41,
  previewSrc: "/presentes/memorias/memoria-41.jpeg",
  finalSrc: "/presentes/memorias/memoria-41.jpeg",
  subtitle: "Utah, USA",
  story:
    "Às vezes criamos expectativas tão grandes que temos medo da realidade não corresponder.\n\nCom Utah aconteceu o contrário.\n\nA neve, as montanhas, o inverno e a atmosfera daquele lugar entregaram tudo aquilo que imaginávamos.\n\nMas a melhor parte não estava na paisagem.\n\nEstava na oportunidade de viver mais uma experiência inesquecível juntos.\n\nE isso nenhuma fotografia consegue mostrar por completo.",
};

memories[41] = {
  id: 42,
  previewSrc: "/presentes/memorias/memoria-42.jpeg",
  finalSrc: "/presentes/memorias/memoria-42.jpeg",
  subtitle: "São Sebastião, SP",
  story:
    "Não precisávamos de grandes viagens.\n\nNão precisávamos de grandes planos.\n\nBastava um fim de tarde bonito, algumas horas juntos e motivos de sobra para sorrir.\n\nA vida era mais simples naquela época.\n\nMas olhando para trás, percebemos que ela já nos entregava exatamente aquilo que realmente importava.\n\nE talvez seja por isso que essa foto continua tão especial.",
};

memories[42] = {
  id: 43,
  previewSrc: "/presentes/memorias/memoria-43.jpeg",
  finalSrc: "/presentes/memorias/memoria-43.jpeg",
  subtitle: "São Paulo, SP",
  story:
    "Algumas memórias nascem de grandes viagens.\n\nOutras surgem em uma manhã comum de domingo.\n\nEssa nasceu da nossa primeira corrida de rua juntos.\n\nO percurso teve quilômetros.\n\nA lembrança ficou para a vida toda.\n\nPorque existem momentos em que a chegada importa.\n\nE outros em que o mais importante é simplesmente correr a mesma prova lado a lado.",
};

memories[43] = {
  id: 44,
  previewSrc: "/presentes/memorias/memoria-44.jpeg",
  finalSrc: "/presentes/memorias/memoria-44.jpeg",
  subtitle: "São Bernardo do Campo, SP",
  story:
    "Naquele dia estávamos comemorando apenas um ano.\n\nMas parecia que tínhamos vivido uma vida inteira de emoções.\n\nCada sorriso, cada descoberta e cada pequena conquista da Luiza transformavam nossos dias de uma forma que nunca imaginamos.\n\nA festa foi linda.\n\nMas a melhor parte estava nos nossos braços.\n\nE continua sendo até hoje.",
};

memories[44] = {
  id: 45,
  previewSrc: "/presentes/memorias/memoria-45.jpeg",
  finalSrc: "/presentes/memorias/memoria-45.jpeg",
  subtitle: "Santo André, SP",
  story:
    "A verdade é que a Luiza já chegou ao mundo com mais cabelo do que muitos bebês têm depois de alguns anos.\n\nMesmo assim, demoramos quase um ano para marcar o primeiro corte.\n\nAchávamos que seria uma aventura.\n\nChoradeira, reclamação e muito trabalho.\n\nMas ela surpreendeu todo mundo.\n\nFicou tranquila, deu risada e transformou aquele momento simples em mais uma lembrança especial da nossa história.\n\nDesde pequena, já mostrava personalidade.",
};

memories[45] = {
  id: 46,
  previewSrc: "/presentes/memorias/memoria-46.jpeg",
  finalSrc: "/presentes/memorias/memoria-46.jpeg",
  subtitle: "João Pessoa, Paraíba",
  story:
    "O dia já tinha sido perfeito.\n\nPraia, sol, mar e tudo aquilo que faz o Nordeste ser tão especial.\n\nMas ainda faltava o nosso momento favorito.\n\nSubir para um lugar com uma boa vista, pedir uma bebida e assistir a cidade acender suas luzes.\n\nNão aconteceu nada extraordinário naquela noite. Além de nós, é claro.\n\nE talvez seja exatamente por isso que ela ficou tão especial.\n\nPorque felicidade, às vezes, é simplesmente estar ali.",
};

memories[46] = {
  id: 47,
  previewSrc: "/presentes/memorias/memoria-47.jpeg",
  finalSrc: "/presentes/memorias/memoria-47.jpeg",
  subtitle: "Tennessee, USA",
  story:
    "Foram meses de saudade, mensagens, chamadas de vídeo e contagem regressiva.\n\nAté que finalmente chegou o dia.\n\nAquele momento simples de entrar no carro e seguir viagem ganhou um significado enorme.\n\nPorque depois de tanto tempo separados, nossa família estava reunida novamente.\n\nO roteiro pelos Estados Unidos seria inesquecível.\n\nMas nenhuma paisagem conseguiu superar a felicidade daquele reencontro.",
};

memories[47] = {
  id: 48,
  previewSrc: "/presentes/memorias/memoria-48.jpeg",
  finalSrc: "/presentes/memorias/memoria-48.jpeg",
  subtitle: "João Pessoa, Paraíba",
  story:
    "O mar sempre fez parte da nossa história.\n\nEm diferentes cidades, diferentes fases da vida e diferentes versões de nós mesmos.\n\nTalvez por isso gostemos tanto desta foto. Amor, pegada e mar.\n\nEla não registra um passeio, uma viagem ou um momento específico.\n\nEla registra algo muito mais simples.\n\nNós dois.\n\nO som das ondas.\n\nE a certeza de que algumas coisas nunca saem de moda.",
};

memories[48] = {
  id: 49,
  previewSrc: "/presentes/memorias/memoria-49.jpeg",
  finalSrc: "/presentes/memorias/memoria-49.jpeg",
  subtitle: "Disney World, USA",
  story:
    'Durante muito tempo, conhecer a Disney foi um sonho.\n\nDaqueles que ficam guardados na lista de "um dia nós vamos".\n\nE então esse dia chegou.\n\nDiante do Castelo da Cinderela, registramos não apenas uma viagem, mas a realização de um desejo que carregávamos havia anos.\n\nA foto já tem mais de uma década.\n\nO castelo continua lá.\n\nE o mais bonito é perceber que o amor que existia naquele dia continua exatamente aqui.',
};

memories[49] = {
  id: 50,
  previewSrc: "/presentes/memorias/memoria-50.jpeg",
  finalSrc: "/presentes/memorias/memoria-50.jpeg",
  subtitle: "Tomorrowland, SP",
  story:
    "Existem experiências que são difíceis de explicar para quem não viveu.\n\nA Tomorrowland foi uma delas.\n\nDurante algumas horas fomos transportados para um lugar onde música, tecnologia, luzes e emoções pareciam desafiar qualquer lógica.\n\nEra impossível olhar ao redor e não se impressionar.\n\nNão pelas atrações.\n\nNão pelos artistas.\n\nMas pela sensação de estar vivendo algo verdadeiramente único.\n\nDaquelas experiências raras que ficam gravadas para sempre na memória.",
};

memories[50] = {
  id: 51,
  previewSrc: "/presentes/memorias/memoria-51.jpeg",
  finalSrc: "/presentes/memorias/memoria-51.jpeg",
  subtitle: "Campos de Jordão, SP",
  story:
    "A noite anterior tinha sido inesquecível.\n\nMúsica, energia, amigos, histórias e um daqueles eventos que ficam guardados para sempre na memória.\n\nNo dia seguinte, Campos de Jordão mostrava uma versão completamente diferente, boa para uma caminhada e boa resenha em família.\n\nRuas cheias, clima agradável, boa comida e tempo para aproveitar a cidade sem pressa.\n\nEntre uma lembrança e outra, descobrimos que algumas viagens ficam especiais justamente porque conseguem reunir muitos momentos diferentes em uma única experiência.",
};

memories[51] = {
  id: 52,
  previewSrc: "/presentes/memorias/memoria-52.jpeg",
  finalSrc: "/presentes/memorias/memoria-52.jpeg",
  subtitle: "Veneza, Itália",
  story:
    "Chegar a Veneza já impressiona.\n\nMas navegar pelos canais dentro de uma gôndola transforma a experiência em algo completamente diferente.\n\nDurante alguns minutos deixamos de ser turistas correndo atrás de atrações e simplesmente aproveitamos o momento.\n\nA cidade passava devagar ao nosso redor.\n\nE nós apenas observávamos.\n\nPorque algumas experiências merecem ser vividas exatamente como foram imaginadas.",
};

memories[52] = {
  id: 53,
  previewSrc: "/presentes/memorias/memoria-53.jpeg",
  finalSrc: "/presentes/memorias/memoria-53.jpeg",
  subtitle: "Nazaré Paulista, SP",
  story:
    "Entre campos, animais, natureza e muito ar puro, vivemos uma experiência que parecia simples.\n\nMas olhando para essa foto hoje, percebemos o quanto ela significa.\n\nEra a nossa primeira grande aventura como família.\n\nAinda não sabíamos quantas viagens viveríamos juntos, quantas histórias colecionaríamos ou quantos sonhos realizaríamos.\n\nMas uma coisa já era certa:\n\na melhor parte da jornada estava ali, nos nossos braços.",
};

memories[53] = {
  id: 54,
  previewSrc: "/presentes/memorias/memoria-54.jpeg",
  finalSrc: "/presentes/memorias/memoria-54.jpeg",
  subtitle: "Campinas, SP",
  story:
    "Quem olha a foto talvez veja apenas mais um festival.\n\nNós vemos uma coleção de coisas que gostamos.\n\nMúsica.\n\nEnergia.\n\nExperiências.\n\nE tempo juntos.\n\nArmin comandava a pista.\n\nNós aproveitávamos cada minuto.\n\nE, como acontece nas melhores lembranças, o tempo passou rápido demais.",
};

memories[54] = {
  id: 55,
  previewSrc: "/presentes/memorias/memoria-55.jpeg",
  finalSrc: "/presentes/memorias/memoria-55.jpeg",
  subtitle: "Simões, Piauí",
  story:
    "À primeira vista, esta foto mostra apenas uma melancia sendo cortada.\n\nMas nós sabemos que ela guarda muito mais do que isso.\n\nEla registra um daqueles gestos simples que fazem parte da infância, da família e das lembranças que carregamos pela vida inteira.\n\nPorque algumas demonstrações de carinho não precisam de palavras.\n\nElas aparecem nos detalhes.\n\nE são justamente esses detalhes que nunca esquecemos.",
};

memories[55] = {
  id: 56,
  previewSrc: "/presentes/memorias/memoria-56.jpeg",
  finalSrc: "/presentes/memorias/memoria-56.jpeg",
  subtitle: "Maragogi, Alagoas",
  story:
    "Se existe algo que aparece repetidamente na nossa história, é o mar.\n\nEm diferentes cidades, diferentes fases da vida e diferentes versões de nós mesmos.\n\nMaragogi foi mais um desses encontros.\n\nUm dia de sol, água cristalina e a sensação de que não precisávamos estar em nenhum outro lugar.\n\nPorque algumas das nossas melhores lembranças sempre acabam começando da mesma forma:\n\nnós dois e o mar.",
};

memories[56] = {
  id: 57,
  previewSrc: "/presentes/memorias/memoria-57.jpeg",
  finalSrc: "/presentes/memorias/memoria-57.jpeg",
  subtitle: "Porto, Portugal",
  story:
    "Gostamos de vinho.\n\nGostamos de viajar.\n\nGostamos de conhecer histórias.\n\nE, de alguma forma, sempre acabamos encontrando tudo isso no mesmo lugar.\n\nEm Porto, entre taças, conversas e degustações, registramos mais um daqueles momentos simples que gostamos de guardar.\n\nMas olhando para esta foto hoje, o que mais chama nossa atenção não é o vinho.\n\nÉ perceber que, depois de tantos anos, ainda encontramos felicidade nas mesmas pequenas coisas.",
};

memories[57] = {
  id: 58,
  previewSrc: "/presentes/memorias/memoria-58.jpeg",
  finalSrc: "/presentes/memorias/memoria-58.jpeg",
  subtitle: "Porto, Portugal",
  story:
    "Quem nos conhece sabe.\n\nTemos uma fraqueza por pôr do sol.\n\nE Porto resolveu caprichar.\n\nO rio, as luzes começando a acender, os barcos descansando e aquele céu que parecia mudar de cor a cada minuto.\n\nA foto registra apenas um instante.\n\nMas a sensação daquele fim de tarde continua viva até hoje.",
};

memories[58] = {
  id: 59,
  previewSrc: "/presentes/memorias/memoria-59.jpeg",
  finalSrc: "/presentes/memorias/memoria-59.jpeg",
  subtitle: "São Bernardo do Campo, SP",
  story:
    "Nem sempre as melhores lembranças acontecem do outro lado do mundo.\n\nAlgumas nascem bem perto de casa.\n\nEm uma noite fria, uma boa taça de vinho, uma conversa sem pressa e aquele raro momento em que não existe nenhum compromisso além de aproveitar a companhia um do outro.\n\nA vida é feita de grandes viagens.\n\nMas também é feita de noites simples como essa.\n\nE, sinceramente, são elas que costumam ficar por mais tempo na memória.",
};

memories[59] = {
  id: 60,
  previewSrc: "/presentes/memorias/memoria-60.jpeg",
  finalSrc: "/presentes/memorias/memoria-60.jpeg",
  subtitle: "Caraíva, Bahia",
  story:
    "A vida já nos levou para muitos lugares incríveis.\n\nMas, de vez em quando, o que mais precisamos não é de uma nova aventura.\n\nÉ de um lugar que nos permita respirar.\n\nCaraíva foi isso para nós.\n\nEntre a areia nos pés, a travessia do rio, os caminhos sem asfalto e os dias vividos sem relógio, encontramos algo que nem sempre é fácil de achar.\n\nPresença.\n\nPresença um do outro.\n\nPresença da família.\n\nPresença no momento.\n\nE, olhando para essa foto hoje, percebemos que esse talvez tenha sido o maior presente daquela viagem.",
};

for (let memoryId = 9; memoryId <= 56; memoryId += 1) {
  const imageSrc = `/presentes/memorias/memoria-${String(memoryId).padStart(
    2,
    "0"
  )}.jpeg`;

  memories[memoryId - 1] = {
    ...memories[memoryId - 1],
    previewSrc: imageSrc,
    finalSrc: imageSrc,
  };
}

export function getMemory(memoryId: number) {
  return memories.find((memory) => memory.id === memoryId) ?? null;
}
