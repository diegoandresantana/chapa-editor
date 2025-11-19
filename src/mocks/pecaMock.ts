export interface Peca {
    id: string;
    nome: string;
    largura: number;
    altura: number;
  }
  
  export const pecaMockData: Peca[] = [
    { id: '1', nome: 'Peça 1', largura: 200, altura: 300 },
    { id: '2', nome: 'Peça 2', largura: 400, altura: 500 },
  ];