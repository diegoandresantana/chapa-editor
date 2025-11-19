export interface Peca {
  id: string;
  nome: string;
  largura: number;
  altura: number;
  quantidade: number;
}

let pecas: Peca[] = [
  { id: '1', nome: 'Peça 1', largura: 200, altura: 300, quantidade: 10 },
];

export function listarPecas(): Promise<Peca[]> {
  return Promise.resolve([...pecas]);
}

export function adicionarPeca(peca: Omit<Peca, 'id'>): Promise<Peca> {
  const novaPeca = { id: Date.now().toString(), ...peca };
  pecas.push(novaPeca);
  return Promise.resolve(novaPeca);
}

export function editarPeca(id: string, dados: Partial<Omit<Peca, 'id'>>): Promise<Peca | null> {
  const index = pecas.findIndex((p) => p.id === id);
  if (index === -1) return Promise.resolve(null);
  pecas[index] = { ...pecas[index], ...dados };
  return Promise.resolve(pecas[index]);
}

export function removerPeca(id: string): Promise<boolean> {
  const index = pecas.findIndex((p) => p.id === id);
  if (index === -1) return Promise.resolve(false);
  pecas.splice(index, 1);
  return Promise.resolve(true);
}