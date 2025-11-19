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

interface Props {
    onAddPeca: (nome: string, largura: number, altura: number, quantidade: number) => void;
}

const PecaForm: React.FC<Props> = ({ onAddPeca }) => {
    const { t } = useTranslation();
    const [nome, setNome] = useState('');
    const [largura, setLargura] = useState<number>(0);
    const [altura, setAltura] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome || largura <= 0 || altura <= 0 || quantidade <= 0) return;

        onAddPeca(nome, largura, altura, quantidade);

        setNome('');
        setLargura(0);
        setAltura(0);
        setQuantidade(1);
    };

    return (
        <Paper elevation={2} sx={{ p: 2.5, height: 'fit-content' }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ fontSize: '1.1rem' }}>
                {t('form.addPiece')}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1.5 }}>
                <Stack spacing={1.5}>
                    <Tooltip title={t('form.tooltips.name')} arrow placement="top">
                        <TextField
                            fullWidth
                            label={t('form.name')}
                            placeholder={t('form.namePlaceholder')}
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            required
                            variant="outlined"
                            size="small"
                        />
                    </Tooltip>

                    <Stack direction="row" spacing={1.5}>
                        <Tooltip title={t('form.tooltips.width')} arrow placement="top">
                            <TextField
                                type="number"
                                label={t('form.width')}
                                placeholder={t('form.widthPlaceholder')}
                                value={largura || ''}
                                onChange={e => setLargura(+e.target.value)}
                                required
                                variant="outlined"
                                size="small"
                                slotProps={{ htmlInput: { min: 1 } }}
                                sx={{ flex: 1 }}
                            />
                        </Tooltip>
                        <Tooltip title={t('form.tooltips.height')} arrow placement="top">
                            <TextField
                                type="number"
                                label={t('form.height')}
                                placeholder={t('form.heightPlaceholder')}
                                value={altura || ''}
                                onChange={e => setAltura(+e.target.value)}
                                required
                                variant="outlined"
                                size="small"
                                slotProps={{ htmlInput: { min: 1 } }}
                                sx={{ flex: 1 }}
                            />
                        </Tooltip>
                        <Tooltip title={t('form.tooltips.quantity')} arrow placement="top">
                            <TextField
                                type="number"
                                label={t('form.quantity')}
                                placeholder={t('form.quantityPlaceholder')}
                                value={quantidade}
                                onChange={e => setQuantidade(+e.target.value)}
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
                        {t('form.add')}
                    </Button>
                </Stack>
            </Box>
        </Paper>
    );
};

export default PecaForm;
