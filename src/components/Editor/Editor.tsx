import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Paper, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PecaAlocada } from '../PecaAlocada/PecaAlocada';
import { PecaAlocada as PecaAlocadaType } from '../../contexts/AppContext';
import { detectarColisao, verificarLimitesChapa } from '../../utils/colisao';

interface DragItem {
  id: string;
  nome: string;
  largura: number;
  altura: number;
}

interface DragPreview extends DragItem {
  x: number;
  y: number;
  temColisao: boolean;
  foraDosLimites: boolean;
}

interface EditorProps {
  pecasAlocadas: PecaAlocadaType[];
  pecaSelecionada: string | null;
  onDrop: (item: DragItem, x: number, y: number) => void;
  onSelect: (alocadaId: string | null) => void;
  onRemove: (alocadaId: string) => void;
  onMove?: (alocadaId: string, x: number, y: number) => void;
  larguraChapa?: number | string;
  alturaChapa?: number | string;
}

export const Editor: React.FC<EditorProps> = ({ 
  pecasAlocadas, 
  pecaSelecionada,
  onDrop, 
  onSelect, 
  onRemove,
  onMove,
  larguraChapa = 800,
  alturaChapa = 600
}) => {
  const { t } = useTranslation();
  const [dragPreview, setDragPreview] = useState<DragPreview | null>(null);
  const dropRef = React.useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: ['PECA', 'PECA_ALOCADA'],
    hover: (item: DragItem | any, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && dropRef.current) {
        const rect = dropRef.current.getBoundingClientRect();
        const x = Math.max(0, offset.x - rect.left);
        const y = Math.max(0, offset.y - rect.top);
        
        // Para peças alocadas sendo movidas, usar suas dimensões
        const largura = item.largura || item.width || 50;
        const altura = item.altura || item.height || 50;
        
        const pecaComPosicao = { x, y, largura, altura };
        
        // Filtrar a própria peça da verificação de colisão se estiver sendo movida
        const pecasParaVerificar = item.alocadaId 
          ? pecasAlocadas.filter(p => p.alocadaId !== item.alocadaId)
          : pecasAlocadas;
          
        const temColisao = detectarColisao(pecaComPosicao, pecasParaVerificar);
        
        const larguraReal = typeof larguraChapa === 'string' ? rect.width : larguraChapa;
        const alturaReal = typeof alturaChapa === 'string' ? rect.height : alturaChapa;
        const foraDosLimites = !verificarLimitesChapa(pecaComPosicao, larguraReal, alturaReal);
        
        setDragPreview({ 
          ...item,
          largura,
          altura,
          x, 
          y, 
          temColisao,
          foraDosLimites
        });
      }
    },
    drop: (item: DragItem | any, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && dropRef.current) {
        const rect = dropRef.current.getBoundingClientRect();
        let x = Math.max(0, offset.x - rect.left);
        let y = Math.max(0, offset.y - rect.top);
        
        if (item.alocadaId) {
          // É uma peça já alocada sendo movida - ajustar posição para o centro da peça
          x = Math.max(0, x - (item.largura || 50) / 2);
          y = Math.max(0, y - (item.altura || 50) / 2);
          
          // Verificar colisão antes de mover
          const pecaComPosicao = { x, y, largura: item.largura, altura: item.altura };
          const pecasParaVerificar = pecasAlocadas.filter(p => p.alocadaId !== item.alocadaId);
          const temColisao = detectarColisao(pecaComPosicao, pecasParaVerificar);
          
          const larguraReal = typeof larguraChapa === 'string' ? rect.width : larguraChapa;
          const alturaReal = typeof alturaChapa === 'string' ? rect.height : alturaChapa;
          const foraDosLimites = !verificarLimitesChapa(pecaComPosicao, larguraReal, alturaReal);
          
          if (!temColisao && !foraDosLimites) {
            handleMovePeca(item.alocadaId, x, y);
          }
        } else {
          // É uma nova peça sendo adicionada
          onDrop(item, x, y);
        }
      }
      setDragPreview(null);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleBackgroundClick = () => {
    onSelect(null);
  };

  const handleMovePeca = (alocadaId: string, x: number, y: number) => {
    if (onMove) {
      onMove(alocadaId, x, y);
    }
  };

  drop(dropRef);

  return (
    <Paper 
      ref={dropRef}
      onClick={handleBackgroundClick}
      elevation={3}
      sx={{ 
        position: 'relative',
        width: larguraChapa,
        height: alturaChapa,
        minHeight: '100%',
        backgroundColor: isOver ? 'action.hover' : 'background.paper',
        border: '2px solid',
        borderColor: isOver ? 'primary.main' : 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out',
        cursor: 'default',
      }}
    >
      {pecasAlocadas.length === 0 && !dragPreview && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'text.secondary',
            pointerEvents: 'none',
          }}
        >
          <Typography variant="h6" gutterBottom>
            {t('editor.title')}
          </Typography>
          <Typography variant="body2">
            {t('editor.dropHere')}
          </Typography>
        </Box>
      )}

      {pecasAlocadas.map((peca) => (
        <PecaAlocada
          key={peca.alocadaId}
          peca={peca}
          isSelected={pecaSelecionada === peca.alocadaId}
          onSelect={onSelect}
          onRemove={onRemove}
          onMove={onMove}
        />
      ))}

      {dragPreview && (
        <Box
          sx={{
            position: 'absolute',
            left: dragPreview.x,
            top: dragPreview.y,
            width: dragPreview.largura,
            height: dragPreview.altura,
            backgroundColor: dragPreview.temColisao || dragPreview.foraDosLimites 
              ? 'error.main' 
              : 'success.main',
            opacity: 0.6,
            border: '2px dashed',
            borderColor: dragPreview.temColisao || dragPreview.foraDosLimites 
              ? 'error.dark' 
              : 'success.dark',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        >
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'white',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
            }}
          >
            {dragPreview.nome}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />
    </Paper>
  );
};