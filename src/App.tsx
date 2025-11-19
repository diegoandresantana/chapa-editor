import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SidebarPecas from './components/SidebarPecas/SidebarPecas';
import PecaForm from './components/PecaForm/PecaForm';
import { Editor } from './components/Editor/Editor';
import { useAppContext } from './contexts/AppContext';
import UploadPecasCSV from './components/UploadPecasCSV/UploadPecasCSV';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import { detectarColisao, verificarLimitesChapa } from './utils/colisao';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  const { t } = useTranslation();
  const {
    pecas,
    pecasAlocadas,
    pecaSelecionada,
    adicionarPeca,
    adicionarPecaAlocada,
    removerPecaAlocada,
    selecionarPeca,
    moverPeca,
    decrementarQuantidade,
    incrementarQuantidade
  } = useAppContext();

  const handleAddPeca = (nome: string, largura: number, altura: number, quantidade: number) => {
    adicionarPeca({ nome, largura, altura, quantidade });
  };

  const handleImportPecas = (pecasImportadas: { nome: string; largura: number; altura: number; quantidade: number }[]) => {
    pecasImportadas.forEach(({ nome, largura, altura, quantidade }) => {
      adicionarPeca({ nome, largura, altura, quantidade });
    });
  };

  const handleDrop = (item: any, x: number, y: number) => {
    const peca = pecas.find(p => p.id === item.id);
    if (!peca || peca.quantidade <= 0) {
      return;
    }

    const novaPecaAlocada = {
      ...peca,
      alocadaId: `${item.id}-${Date.now()}`,
      x,
      y,
    };

    const temColisao = detectarColisao(novaPecaAlocada, pecasAlocadas);
    // Usar dimensões grandes temporárias - o Editor fará a validação real
    const dentroLimites = verificarLimitesChapa(novaPecaAlocada, 2000, 2000);

    if (!temColisao && dentroLimites) {
      adicionarPecaAlocada(novaPecaAlocada);
      decrementarQuantidade(item.id);
    }
  };

  const handleRemovePeca = (alocadaId: string) => {
    const pecaAlocada = pecasAlocadas.find(p => p.alocadaId === alocadaId);
    if (pecaAlocada) {
      removerPecaAlocada(alocadaId);
      incrementarQuantidade(pecaAlocada.id);
    }
  };

  const handleUsarPeca = React.useCallback((id: string) => {
    const peca = pecas.find(p => p.id === id);
    if (!peca || peca.quantidade <= 0) {
      return;
    }

    // Buscar posição livre automaticamente
    let x = 20;
    let y = 20;
    let posicaoEncontrada = false;
    
    for (let tentativaY = 20; tentativaY < 500 && !posicaoEncontrada; tentativaY += 50) {
      for (let tentativaX = 20; tentativaX < 700 && !posicaoEncontrada; tentativaX += 50) {
        const novaPecaTest = {
          ...peca,
          alocadaId: `${id}-test`,
          x: tentativaX,
          y: tentativaY,
        };

        const temColisao = detectarColisao(novaPecaTest, pecasAlocadas);
        const dentroLimites = verificarLimitesChapa(novaPecaTest, 2000, 2000);

        if (!temColisao && dentroLimites) {
          x = tentativaX;
          y = tentativaY;
          posicaoEncontrada = true;
        }
      }
    }

    const novaPecaAlocada = {
      ...peca,
      alocadaId: `${id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      x,
      y,
    };
    
    adicionarPecaAlocada(novaPecaAlocada);
    decrementarQuantidade(id);
  }, [pecas, pecasAlocadas, adicionarPecaAlocada, decrementarQuantidade]);

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl" sx={{ py: 2, height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1" color="primary" sx={{ fontSize: '1.8rem' }}>
              {t('app.title')}
            </Typography>
            <LanguageSelector />
          </Box>

          <Box sx={{ display: 'flex', gap: 3, flex: 1, minHeight: 0 }}>
            <Box sx={{ width: '35%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <UploadPecasCSV onImportPecas={handleImportPecas} />
              <PecaForm onAddPeca={handleAddPeca} />
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <SidebarPecas pecas={pecas} onUsarPeca={handleUsarPeca} />
              </Box>
            </Box>
            <Box sx={{ width: '65%', display: 'flex', alignItems: 'flex-start' }}>
              <Editor
                pecasAlocadas={pecasAlocadas}
                pecaSelecionada={pecaSelecionada}
                onDrop={handleDrop}
                onSelect={selecionarPeca}
                onRemove={handleRemovePeca}
                onMove={moverPeca}
                larguraChapa="100%"
                alturaChapa="100%"
              />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </DndProvider>
  );
};

export default App;
