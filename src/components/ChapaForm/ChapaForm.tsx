import React, { useState } from 'react';
import {
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Stack,
    Tooltip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { adicionarChapa } from '../../services/chapaService';

interface Props {
  onChapaAdicionada: () => void;
}

const ChapaForm: React.FC<Props> = ({ onChapaAdicionada }) => {
  const { t } = useTranslation();
  const [nome, setNome] = useState('');
  const [largura, setLargura] = useState<number>(0);
  const [altura, setAltura] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || largura <= 0 || altura <= 0) return;
    await adicionarChapa({ nome, largura, altura });
    setNome('');
    setLargura(0);
    setAltura(0);
    onChapaAdicionada();
  };

  return (
    <Paper elevation={2} sx={{ p: 2.5, height: 'fit-content' }}>
      <Typography variant="h6" gutterBottom color="primary" sx={{ fontSize: '1.1rem' }}>
        Adicionar Chapa
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1.5 }}>
        <Stack spacing={1.5}>
          <Tooltip title={t('form.tooltips.sheetName')} arrow placement="top">
            <TextField
              fullWidth
              label="Nome"
              placeholder="Nome da chapa"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              variant="outlined"
              size="small"
            />
          </Tooltip>

          <Stack direction="row" spacing={1.5}>
            <Tooltip title={t('form.tooltips.sheetWidth')} arrow placement="top">
              <TextField
                type="number"
                label="Largura"
                placeholder="Largura em mm"
                value={largura || ''}
                onChange={e => setLargura(+e.target.value)}
                required
                variant="outlined"
                size="small"
                slotProps={{ htmlInput: { min: 1 } }}
                sx={{ flex: 1 }}
              />
            </Tooltip>
            <Tooltip title={t('form.tooltips.sheetHeight')} arrow placement="top">
              <TextField
                type="number"
                label="Altura"
                placeholder="Altura em mm"
                value={altura || ''}
                onChange={e => setAltura(+e.target.value)}
                required
                variant="outlined"
                size="small"
                slotProps={{ htmlInput: { min: 1 } }}
                sx={{ flex: 1 }}
              />
            </Tooltip>
          </Stack>

          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            fullWidth
            size="medium"
          >
            Adicionar Chapa
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ChapaForm;
