export type Memory = {
  id: number;
  previewSrc: string;
  finalSrc: string;
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

export function getMemory(memoryId: number) {
  return memories.find((memory) => memory.id === memoryId) ?? null;
}
