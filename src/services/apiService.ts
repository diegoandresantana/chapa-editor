// Simulação de API para chapas e layouts
import { Chapa, Peca, PecaAlocada } from '../contexts/AppContext';

// Simulação de delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock de dados de chapas
const mockChapas: Chapa[] = [
  { id: '1', nome: 'Chapa Padrão 1', largura: 800, altura: 600 },
  { id: '2', nome: 'Chapa Grande', largura: 1200, altura: 800 },
  { id: '3', nome: 'Chapa Pequena', largura: 600, altura: 400 },
];

// Mock de dados de peças
const mockPecas: Peca[] = [
  { id: '1', nome: 'Mesa Retangular', largura: 120, altura: 80, quantidade: 5 },
  { id: '2', nome: 'Cadeira', largura: 40, altura: 40, quantidade: 10 },
  { id: '3', nome: 'Estante', largura: 60, altura: 180, quantidade: 3 },
  { id: '4', nome: 'Mesa Redonda', largura: 100, altura: 100, quantidade: 2 },
];

// Interface para layout salvo
export interface LayoutSalvo {
  id: string;
  nome: string;
  chapaId: string;
  pecasAlocadas: PecaAlocada[];
  dataCriacao: string;
  dataModificacao: string;
}

// Mock de layouts salvos
let mockLayouts: LayoutSalvo[] = [
  {
    id: '1',
    nome: 'Layout Escritório',
    chapaId: '1',
    pecasAlocadas: [
      {
        id: '1',
        alocadaId: '1-1',
        nome: 'Mesa Retangular',
        largura: 120,
        altura: 80,
        quantidade: 5,
        x: 100,
        y: 100,
      },
    ],
    dataCriacao: '2024-01-15T10:00:00Z',
    dataModificacao: '2024-01-15T10:00:00Z',
  },
];

// API Service
export class ApiService {
  // Chapas
  static async buscarChapas(): Promise<Chapa[]> {
    await delay(500); // Simula latência
    return [...mockChapas];
  }

  static async buscarChapaPorId(id: string): Promise<Chapa | null> {
    await delay(300);
    return mockChapas.find(chapa => chapa.id === id) || null;
  }

  static async criarChapa(chapa: Omit<Chapa, 'id'>): Promise<Chapa> {
    await delay(800);
    const novaChapa: Chapa = {
      id: Date.now().toString(),
      ...chapa,
    };
    mockChapas.push(novaChapa);
    return novaChapa;
  }

  // Peças
  static async buscarPecas(): Promise<Peca[]> {
    await delay(400);
    return [...mockPecas];
  }

  static async criarPeca(peca: Omit<Peca, 'id'>): Promise<Peca> {
    await delay(600);
    const novaPeca: Peca = {
      id: Date.now().toString(),
      ...peca,
    };
    mockPecas.push(novaPeca);
    return novaPeca;
  }

  static async atualizarQuantidadePeca(id: string, quantidade: number): Promise<void> {
    await delay(200);
    const peca = mockPecas.find(p => p.id === id);
    if (peca) {
      peca.quantidade = quantidade;
    }
  }

  // Layouts
  static async buscarLayouts(): Promise<LayoutSalvo[]> {
    await delay(600);
    return [...mockLayouts];
  }

  static async salvarLayout(layout: Omit<LayoutSalvo, 'id' | 'dataCriacao' | 'dataModificacao'>): Promise<LayoutSalvo> {
    await delay(1000);
    const novoLayout: LayoutSalvo = {
      id: Date.now().toString(),
      ...layout,
      dataCriacao: new Date().toISOString(),
      dataModificacao: new Date().toISOString(),
    };
    mockLayouts.push(novoLayout);
    return novoLayout;
  }

  static async atualizarLayout(id: string, layout: Partial<LayoutSalvo>): Promise<LayoutSalvo | null> {
    await delay(800);
    const index = mockLayouts.findIndex(l => l.id === id);
    if (index !== -1) {
      mockLayouts[index] = {
        ...mockLayouts[index],
        ...layout,
        dataModificacao: new Date().toISOString(),
      };
      return mockLayouts[index];
    }
    return null;
  }

  static async excluirLayout(id: string): Promise<boolean> {
    await delay(500);
    const index = mockLayouts.findIndex(l => l.id === id);
    if (index !== -1) {
      mockLayouts.splice(index, 1);
      return true;
    }
    return false;
  }

  // Importação de CSV
  static async importarPecasCSV(arquivo: File): Promise<Peca[]> {
    await delay(1200);
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          const lines = text.split('\n').filter(line => line.trim() !== '');
          
          const pecasImportadas: Peca[] = lines.map((line, index) => {
            const [nome, larguraStr, alturaStr, quantidadeStr] = line.split(',').map(item => item.trim());
            
            return {
              id: `imported-${Date.now()}-${index}`,
              nome,
              largura: parseFloat(larguraStr),
              altura: parseFloat(alturaStr),
              quantidade: parseInt(quantidadeStr, 10),
            };
          }).filter(p => p.nome && !isNaN(p.largura) && !isNaN(p.altura) && !isNaN(p.quantidade));

          // Adicionar ao mock
          mockPecas.push(...pecasImportadas);
          resolve(pecasImportadas);
        } catch (error) {
          reject(new Error('Erro ao processar arquivo CSV'));
        }
      };

      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsText(arquivo);
    });
  }
}