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
