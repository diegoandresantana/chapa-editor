import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Chapa {
  id: string;
  nome: string;
  largura: number;
  altura: number;
}

export interface Peca {
  id: string;
  nome: string;
  largura: number;
  altura: number;
  quantidade: number;
}

export interface PecaAlocada extends Peca {
  alocadaId: string;
  x: number;
  y: number;
}

interface AppContextType {
  chapas: Chapa[];
  pecas: Peca[];
  pecasAlocadas: PecaAlocada[];
  pecaSelecionada: string | null;
  adicionarChapa: (chapa: Omit<Chapa, 'id'>) => void;
  adicionarPeca: (peca: Omit<Peca, 'id'>) => void;
  adicionarPecaAlocada: (peca: PecaAlocada) => void;
  removerPecaAlocada: (alocadaId: string) => void;
  selecionarPeca: (alocadaId: string | null) => void;
  moverPeca: (alocadaId: string, x: number, y: number) => void;
  decrementarQuantidade: (id: string) => void;
  incrementarQuantidade: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [chapas, setChapas] = useState<Chapa[]>([]);
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [pecasAlocadas, setPecasAlocadas] = useState<PecaAlocada[]>([]);
  const [pecaSelecionada, setPecaSelecionada] = useState<string | null>(null);

  const adicionarChapa = (chapa: Omit<Chapa, 'id'>) => {
    const novaChapa = { id: `chapa-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, ...chapa };
    setChapas((prev) => [...prev, novaChapa]);
  };

  const adicionarPeca = (peca: Omit<Peca, 'id'>) => {
    const novaPeca = { id: `peca-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, ...peca };
    setPecas((prev) => [...prev, novaPeca]);
  };

  const adicionarPecaAlocada = (peca: PecaAlocada) => {
    setPecasAlocadas((prev) => [...prev, peca]);
  };

  const removerPecaAlocada = (alocadaId: string) => {
    setPecasAlocadas((prev) => prev.filter(p => p.alocadaId !== alocadaId));
    
    if (pecaSelecionada === alocadaId) {
      setPecaSelecionada(null);
    }
  };

  const selecionarPeca = (alocadaId: string | null) => {
    setPecaSelecionada(alocadaId);
  };

  const moverPeca = (alocadaId: string, x: number, y: number) => {
    setPecasAlocadas((prev) => prev.map(p => (p.alocadaId === alocadaId ? { ...p, x, y } : p)));
  };

  const decrementarQuantidade = (id: string) => {
    setPecas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantidade: Math.max(0, p.quantidade - 1) } : p))
    );
  };

  const incrementarQuantidade = (id: string) => {
    setPecas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p))
    );
  };

  return (
    <AppContext.Provider value={{ 
      chapas, 
      pecas, 
      pecasAlocadas, 
      pecaSelecionada,
      adicionarChapa, 
      adicionarPeca, 
      adicionarPecaAlocada,
      removerPecaAlocada,
      selecionarPeca,
      moverPeca, 
      decrementarQuantidade,
      incrementarQuantidade
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro do AppProvider');
  }
  return context;
};
