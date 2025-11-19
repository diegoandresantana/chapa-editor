import { PecaAlocada } from '../contexts/AppContext';

export interface PecaComPosicao {
  x: number;
  y: number;
  largura: number;
  altura: number;
}

export const detectarColisao = (
  novaPeca: PecaComPosicao, 
  pecasExistentes: PecaAlocada[]
): boolean => {
  return pecasExistentes.some(peca => {
    const naoSobrepoe = (
      novaPeca.x + novaPeca.largura <= peca.x ||
      peca.x + peca.largura <= novaPeca.x ||
      novaPeca.y + novaPeca.altura <= peca.y ||
      peca.y + peca.altura <= novaPeca.y
    );
    
    return !naoSobrepoe;
  });
};

export const verificarLimitesChapa = (
  peca: PecaComPosicao,
  larguraChapa: number,
  alturaChapa: number
): boolean => {
  return (
    peca.x >= 0 &&
    peca.y >= 0 &&
    peca.x + peca.largura <= larguraChapa &&
    peca.y + peca.altura <= alturaChapa
  );
};