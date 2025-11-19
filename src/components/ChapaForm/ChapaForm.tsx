import React, { useState } from 'react';
import { adicionarChapa } from '../../services/chapaService';

interface Props {
  onChapaAdicionada: () => void;
}

const ChapaForm: React.FC<Props> = ({ onChapaAdicionada }) => {
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
    <form onSubmit={handleSubmit}>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
      <input type="number" placeholder="Largura" value={largura} onChange={e => setLargura(+e.target.value)} required />
      <input type="number" placeholder="Altura" value={altura} onChange={e => setAltura(+e.target.value)} required />
      <button type="submit">Adicionar Chapa</button>
    </form>
  );
};

export default ChapaForm;
