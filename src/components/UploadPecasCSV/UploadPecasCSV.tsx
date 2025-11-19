import React, { useRef } from 'react';
import { 
  Paper, 
  Button, 
  Typography, 
  Box, 
  Alert 
} from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface UploadPecasCSVProps {
  onImportPecas: (pecas: {
    nome: string;
    largura: number;
    altura: number;
    quantidade: number;
  }[]) => void;
}

const UploadPecasCSV: React.FC<UploadPecasCSVProps> = ({ onImportPecas }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text !== 'string') return;

      const lines = text.split('\n').filter(line => line.trim() !== '');
      const pecasParsed = lines.map(line => {
        const [nome, larguraStr, alturaStr, quantidadeStr] = line.split(',').map(item => item.trim());
        return {
          nome,
          largura: parseFloat(larguraStr),
          altura: parseFloat(alturaStr),
          quantidade: parseInt(quantidadeStr, 10),
        };
      }).filter(p => p.nome && !isNaN(p.largura) && !isNaN(p.altura) && !isNaN(p.quantidade));

      if (pecasParsed.length > 0) {
        onImportPecas(pecasParsed);
        console.log(t('upload.success', { count: pecasParsed.length }));
      } else {
        console.error(t('upload.error'));
      }
    };

    reader.readAsText(file);
  };

  return (
    <Paper elevation={2} sx={{ p: 2.5, height: 'fit-content' }}>
      <Typography variant="h6" gutterBottom color="primary" sx={{ fontSize: '1.1rem' }}>
        {t('upload.title')}
      </Typography>
      
      <Box sx={{ mb: 1.5 }}>
        <input
          type="file"
          accept=".csv,text/csv"
          id="upload-csv"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="upload-csv">
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadIcon />}
            fullWidth
            size="medium"
          >
            {t('upload.selectFile')}
          </Button>
        </label>
      </Box>

      <Alert severity="info" sx={{ mt: 1.5 }}>
        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
          {t('upload.format')}
        </Typography>
      </Alert>
    </Paper>
  );
};

export default UploadPecasCSV;
