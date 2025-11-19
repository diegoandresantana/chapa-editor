# Getting Started with Create React App

# Editor de Layout 2D (Atividade Prática)

## Descrição do Projeto
Aplicação web em React + TypeScript para edição de layouts 2D com funcionalidades de seleção de chapas, alocação de peças via drag-and-drop, controle de colisão e suporte a múltiplos idiomas.

## Pré-requisitos
- Node.js (versão 16 ou superior)
- npm (gerenciador de pacotes do Node)

## Como iniciar o projeto

1. Clone o repositório:

git clone <URL-do-repositorio>

2. Navegue até a pasta do projeto:

cd chapa-editor

3. Instale as dependências:

npm install

4. Inicie a aplicação em modo de desenvolvimento:

npm start

5. Acesse a aplicação no navegador:

http://localhost:3000

# Estrutura e informações do projeto

## Arquitetura Escolhida: React Context API

> Projeto de escopo pequeno
> Estado compartilhado entre múltiplos componentes
> Organização simples para manutenção

## Arquitetura de Componentes
> Material-UI: Framework de componentes para interface moderna e consistente
> Estrutura Modular: Cada componente em sua própria pasta
> Separação de Responsabilidades:
> Componentes de UI puros
> Lógica de negócio no Context
> Utilitários separados (utils/colisao.ts)
> Justificativa: Facilita manutenção, testes e reutilização

## Estrutura de Internacionalização (i18n)

> src/i18n/index.ts - Configuração principal
> src/i18n/locales/[idioma].json - Arquivos de tradução

## Estrutura do Projeto

>src/
> ├── components/          # Componentes React
> ├── contexts/           # Context API para estado global
> ├── i18n/              # Configuração de internacionalização
> ├── services/          # Simulação de APIs
> ├── utils/             # Funções utilitárias
> └── mocks/             # Dados mockados

## Bibliotecas

# Dependências Principais (dependencies)

## Framework e Core
> react (^19.2.0) - Biblioteca principal para construção da interface
> react-dom (^19.2.0) - Renderização do React no DOM
> typescript (^4.9.5) - Superset do JavaScript com tipagem estática
## Interface de Usuário (UI)
> @mui/material (^7.3.5) - Framework de componentes Material Design
> @mui/icons-material (^7.3.5) - Ícones do Material Design
> @emotion/react (^11.14.0) - Biblioteca CSS-in-JS (dependência do MUI)
> @emotion/styled (^11.14.1) - Componentes estilizados com Emotion
Drag & Drop
>react-dnd (^16.0.1) - Biblioteca para funcionalidades de arrastar e soltar
>react-dnd-html5-backend (^16.0.1) - Backend HTML5 para React DnD
## Internacionalização (i18n)
> i18next (^25.6.3) - Framework de internacionalização
> react-i18next (^16.3.4) - Integração do i18next com React
> i18next-browser-languagedetector (^8.2.0) - Detecção automática do idioma do navegador
## Build e Desenvolvimento
> react-scripts (^5.0.1) - Scripts e configurações do Create React App
> web-vitals (^2.1.4) - Métricas de performance web


# Lógica de Colisão - Explicação Simplificada

A lógica de colisão no projeto funciona de forma bem direta e está implementada em alguns locais específicos:

## Onde está implementado:

src/utils/colisao.ts - Funções principais de detecção
src/App.tsx - Validação antes de alocar peças
src/components/Editor/Editor.tsx - Feedback visual durante o drag

## Como funciona:

1. Detecção de Colisão (detectarColisao)

// Verifica se duas peças se sobrepõem
const naoSobrepoe = (
  novaPeca.x + novaPeca.largura <= peca.x ||  // Nova peça está à esquerda
  peca.x + peca.largura <= novaPeca.x ||      // Nova peça está à direita  
  novaPeca.y + novaPeca.altura <= peca.y ||   // Nova peça está acima
  peca.y + peca.altura <= novaPeca.y          // Nova peça está abaixo
);
Se qualquer uma dessas condições for verdadeira, as peças NÃO se sobrepõem. Se todas forem falsas, há colisão.

2. Verificação de Limites (verificarLimitesChapa)

// Verifica se a peça está dentro da chapa
return (
  peca.x >= 0 &&                              // Não sai pela esquerda
  peca.y >= 0 &&                              // Não sai por cima
  peca.x + peca.largura <= larguraChapa &&    // Não sai pela direita
  peca.y + peca.altura <= alturaChapa         // Não sai por baixo
);