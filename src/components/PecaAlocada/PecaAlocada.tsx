import React from 'react';
import { useDrag } from 'react-dnd';
import { Paper, Typography, IconButton, Tooltip } from '@mui/material';
import { Close as CloseIcon, DragIndicator as DragIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { PecaAlocada as PecaAlocadaType } from '../../contexts/AppContext';

interface Props {
  peca: PecaAlocadaType;
  isSelected: boolean;
  onSelect: (alocadaId: string) => void;
  onRemove: (alocadaId: string) => void;
  onMove?: (alocadaId: string, x: number, y: number) => void;
}

export const PecaAlocada: React.FC<Props> = ({ 
  peca, 
  isSelected, 
  onSelect, 
  onRemove,
  onMove
}) => {
  const { t } = useTranslation();
  const dragRef = React.useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'PECA_ALOCADA',
    item: { 
      alocadaId: peca.alocadaId,
      originalX: peca.x,
      originalY: peca.y,
      largura: peca.largura,
      altura: peca.altura
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(dragRef);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(peca.alocadaId);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(peca.alocadaId);
  };

  return (
    <Paper
      ref={dragRef}
      onClick={handleClick}
      elevation={isSelected ? 8 : 2}
      sx={{
        position: 'absolute',
        left: peca.x,
        top: peca.y,
        width: peca.largura,
        height: peca.altura,
        cursor: isDragging ? 'grabbing' : 'grab',
        border: isSelected ? '3px solid' : '1px solid',
        borderColor: isSelected ? 'primary.main' : 'divider',
        backgroundColor: isSelected ? 'primary.light' : 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: isDragging ? 'none' : 'all 0.2s ease-in-out',
        opacity: isDragging ? 0.7 : 1,
        transform: isDragging ? 'rotate(5deg)' : 'none',
        zIndex: isDragging ? 1000 : isSelected ? 10 : 1,
        '&:hover': {
          backgroundColor: isSelected ? 'primary.light' : 'action.hover',
          transform: isDragging ? 'rotate(5deg)' : 'scale(1.02)',
        },
      }}
    >
      {isSelected && (
        <>
          <Tooltip title={t('editor.remove')}>
            <IconButton
              size="small"
              onClick={handleRemove}
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                backgroundColor: 'error.main',
                color: 'white',
                width: 20,
                height: 20,
                '&:hover': {
                  backgroundColor: 'error.dark',
                },
              }}
            >
              <CloseIcon sx={{ fontSize: 12 }} />
            </IconButton>
          </Tooltip>
          <DragIcon 
            sx={{ 
              position: 'absolute',
              top: -8,
              left: -8,
              backgroundColor: 'primary.main',
              color: 'white',
              width: 20,
              height: 20,
              borderRadius: '50%',
              padding: '2px',
              fontSize: 14
            }} 
          />
        </>
      )}
      
      <Typography 
        variant="caption" 
        align="center"
        sx={{ 
          fontWeight: isSelected ? 'bold' : 'normal',
          color: isSelected ? 'primary.contrastText' : 'text.primary'
        }}
      >
        {peca.nome}
      </Typography>
      <Typography 
        variant="caption" 
        align="center"
        sx={{ 
          fontSize: '0.7rem',
          color: isSelected ? 'primary.contrastText' : 'text.secondary'
        }}
      >
        {peca.largura}×{peca.altura}
      </Typography>
    </Paper>
  );
};