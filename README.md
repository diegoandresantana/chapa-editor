# Editor de Layout 2D

## Descrição do Projeto
Aplicação web em React + TypeScript para edição de layouts 2D com funcionalidades de seleção de chapas, alocação de peças via drag-and-drop, controle de colisão e suporte a múltiplos idiomas.

## Pré-requisitos
- Node.js (versão 16 ou superior)
- npm (gerenciador de pacotes do Node)

## Como iniciar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/diegoandresantana/chapa-editor.git
```

2. Navegue até a pasta do projeto:
```bash
cd chapa-editor
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie a aplicação em modo de desenvolvimento:
```bash
npm start
```

5. Acesse a aplicação no navegador:
```
http://localhost:3000
```

## Funcionalidades

- ✅ **Drag-and-Drop:** Arraste peças da sidebar para o editor
- ✅ **Detecção de Colisão:** Impede sobreposição de peças
- ✅ **Movimentação:** Mova peças dentro do editor
- ✅ **Múltiplos Idiomas:** Suporte a PT, EN, ES, DE, FR
- ✅ **Interface Responsiva:** Design moderno com Material-UI
- ✅ **Import CSV:** Importe peças em lote via arquivo CSV
- ✅ **Validação de Limites:** Peças não podem sair da área da chapa

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Editor/         # Editor principal com drag-and-drop
│   ├── PecaAlocada/    # Peças no editor
│   ├── SidebarPecas/   # Lista de peças disponíveis
│   ├── PecaForm/       # Formulário para adicionar peças
│   └── UploadPecasCSV/ # Import de CSV
├── contexts/           # Context API para estado global
├── i18n/              # Internacionalização (5 idiomas)
├── services/          # Simulação de APIs
├── utils/             # Utilitários (detecção de colisão)
└── mocks/             # Dados de exemplo
```

## Tecnologias Utilizadas

- **React** (^19.2.0) - Biblioteca principal
- **TypeScript** (^4.9.5) - Tipagem estática
- **Material-UI** (^7.3.5) - Framework de componentes
- **React DnD** (^16.0.1) - Drag-and-drop
- **i18next** (^25.6.3) - Internacionalização

## Como Usar

1. **Adicionar Peças:** Use o formulário ou importe via CSV
2. **Colocar no Editor:** Arraste da sidebar ou clique em "Usar"
3. **Mover Peças:** Selecione a peça e arraste para nova posição
4. **Remover Peças:** Clique no X vermelho da peça selecionada
5. **Trocar Idioma:** Use o seletor no canto superior direito
