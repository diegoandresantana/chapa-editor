import React from 'react';
import { useDrag } from 'react-dnd';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Button, 
  Chip,
  Box,
  Divider
} from '@mui/material';
import { PlayArrow as UseIcon, DragIndicator as DragIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Peca } from '../../contexts/AppContext'; 

interface SidebarPecasProps {
  pecas: Peca[];
  onUsarPeca: (id: string) => void;
}

const DraggablePeca: React.FC<{ peca: Peca; onUse: (id: string) => void }> = ({ peca, onUse }) => {
  const { t } = useTranslation();
  const dragRef = React.useRef<HTMLLIElement>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  
  const handleUse = React.useCallback(async () => {
    if (isProcessing || peca.quantidade <= 0) return;
    
    setIsProcessing(true);
    try {
      onUse(peca.id);
    } finally {
      // Pequeno delay para evitar cliques duplos
      setTimeout(() => setIsProcessing(false), 200);
    }
  }, [peca.id, peca.quantidade, onUse, isProcessing]);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'PECA',
    item: { 
      id: peca.id, 
      nome: peca.nome, 
      largura: peca.largura, 
      altura: peca.altura 
    },
    canDrag: peca.quantidade > 0,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(dragRef);

  return (
    <ListItem 
      ref={dragRef}
      sx={{ 
        border: '1px solid',
        borderColor: peca.quantidade > 0 ? 'divider' : 'grey.300',
        borderRadius: 1,
        mb: 1,
        bgcolor: peca.quantidade > 0 ? 'background.paper' : 'grey.50',
        opacity: isDragging ? 0.5 : 1,
        cursor: peca.quantidade > 0 ? 'grab' : 'not-allowed',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: peca.quantidade > 0 ? 'action.hover' : 'grey.50',
          transform: peca.quantidade > 0 ? 'translateY(-2px)' : 'none',
          boxShadow: peca.quantidade > 0 ? 2 : 0,
        },
      }}
    >
      {peca.quantidade > 0 && (
        <DragIcon sx={{ mr: 1, color: 'text.secondary' }} />
      )}
      
      <ListItemText
        primary={peca.nome}
        secondary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              {peca.largura} × {peca.altura}
            </Typography>
            <Chip 
              label={t('sidebar.quantity', { count: peca.quantidade })}
              size="small"
              color={peca.quantidade > 0 ? "success" : "default"}
              variant="outlined"
            />
          </Box>
        }
      />
      <Button
        variant="outlined"
        size="small"
        startIcon={<UseIcon />}
        onClick={handleUse}
        disabled={peca.quantidade <= 0 || isProcessing}
        color="primary"
      >
        {isProcessing ? '...' : 'Usar'}
      </Button>
    </ListItem>
  );
};

const SidebarPecas: React.FC<SidebarPecasProps> = ({ pecas, onUsarPeca }) => {
  const { t } = useTranslation();
  
  return (
    <Paper elevation={2} sx={{ p: 2, height: 'fit-content', maxHeight: '100%', overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom color="primary" sx={{ fontSize: '1.1rem' }}>
        {t('sidebar.title')}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      {pecas.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          {t('sidebar.noPieces')}
        </Typography>
      ) : (
        <List dense sx={{ maxHeight: 400, overflow: 'auto' }}>
          {pecas.map((peca) => (
            <DraggablePeca 
              key={peca.id} 
              peca={peca} 
              onUse={onUsarPeca} 
            />
          ))}
        </List>
      )}
      
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', fontSize: '0.7rem' }}>
        💡 {t('editor.dropHere')}
      </Typography>
    </Paper>
  );
};


export default SidebarPecas;
