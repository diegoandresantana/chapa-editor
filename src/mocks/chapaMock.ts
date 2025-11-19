export interface Chapa {
    id: string;
    nome: string;
    largura: number;
    altura: number;
  }
  
  export const chapaMockData: Chapa[] = [
    { id: '1', nome: 'Chapa A', largura: 1000, altura: 2000 },
    { id: '2', nome: 'Chapa B', largura: 1500, altura: 2500 },
  ];