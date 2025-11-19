import React, { useEffect, useState } from 'react';
import { listarChapas, adicionarChapa, removerChapa, Chapa } from '../../services/chapaService';

const ChapaList: React.FC = () => {
  const [chapas, setChapas] = useState<Chapa[]>([]);
  const [nome, setNome] = useState('');
  const [largura, setLargura] = useState(0);
  const [altura, setAltura] = useState(0);

  useEffect(() => {
    atualizarLista();
  }, []);

  const atualizarLista = () => {
    listarChapas().then(setChapas);
  };

  const handleAdicionar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || largura <= 0 || altura <= 0) return;

    await adicionarChapa({ nome, largura, altura });
    setNome('');
    setLargura(0);
    setAltura(0);
    atualizarLista();
  };

  const handleRemover = async (id: string) => {
    await removerChapa(id);
    atualizarLista();
  };

  return (
    <div>
      <h3>Lista de Chapas</h3>
      <form onSubmit={handleAdicionar}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Largura"
          value={largura}
          onChange={(e) => setLargura(Number(e.target.value))}
          required
          min={1}
        />
        <input
          type="number"
          placeholder="Altura"
          value={altura}
          onChange={(e) => setAltura(Number(e.target.value))}
          required
          min={1}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {chapas.map((chapa) => (
          <li key={chapa.id}>
            {chapa.nome} ({chapa.largura}x{chapa.altura})
            <button onClick={() => handleRemover(chapa.id)} style={{ marginLeft: 10 }}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapaList;
