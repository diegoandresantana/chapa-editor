export interface Chapa {
  id: string;
  nome: string;
  largura: number;
  altura: number;
}

let chapas: Chapa[] = [
  { id: '1', nome: 'Chapa A', largura: 1000, altura: 2000 },
];

export function listarChapas(): Promise<Chapa[]> {
  return Promise.resolve([...chapas]);
}

export function adicionarChapa(chapa: Omit<Chapa, 'id'>): Promise<Chapa> {
  const novaChapa = { id: Date.now().toString(), ...chapa };
  chapas.push(novaChapa);
  return Promise.resolve(novaChapa);
}

export function editarChapa(id: string, dados: Partial<Omit<Chapa, 'id'>>): Promise<Chapa | null> {
  const index = chapas.findIndex(c => c.id === id);
  if (index === -1) return Promise.resolve(null);
  chapas[index] = { ...chapas[index], ...dados };
  return Promise.resolve(chapas[index]);
}

export function removerChapa(id: string): Promise<boolean> {
  const index = chapas.findIndex(c => c.id === id);
  if (index === -1) return Promise.resolve(false);
  chapas.splice(index, 1);
  return Promise.resolve(true);
}