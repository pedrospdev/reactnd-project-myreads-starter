# MyReads: A Book Lending App

1° projeto do programa Nanodegree React Developer!


## Fluxo de Desenvolvimento

O projeto foi originado de um fork do repositório de referência. As alterações eventualmente realizadas pela instalação de pacotes NPM e inicialização do projeto original foram commitadas diretamente na branch master.

A partir daí, o desenvolvimento seguiu por duas branches de trabalho (projeto-udacity e material-ui), que passaram por processos de Pull Request conforme a solução ia se mostrando madura o suficiente.


## Setup e Inicialização

Todas os pacotes necessários estão devidamente registrados no arquivo package.json. Os comandos `npm install` e `npm start` devem ser suficientes para a inicialização do projeto.

De qualquer maneira, as bibliotecas incluídas podem ser instaladas da seguinte forma:

`npm i react-router-dom --save`

`npm i @material-ui/core --save`

`npm i @material-ui/icons --save`


## Guias de Estilo Adotados

Foram utilizados os guias de React/JSX, HTML, CSS e Git da própria Udacity.

O único ponto de atenção é quanto a definição de nome de arquivos. O guia adota o padrão camelCase, porém o próprio material de ensino do curso não segue esse formato, logo, foi descartado, passando a utilizar o padrão PascalCase.


## Features Adicionais

- Tooltip nos botões 'Add a book', 'Voltar' e 'Troca de Prateleira'.

- Snackbar informando troca de prateleiras e erros retornados pela API.

- Modal de detalhes aberto ao duplo clique na capa do livro.


## Próximos Passos

Implementar a troca de prateleiras via Drag-and-Drop.


## Dificuldades encontradas

É difícil escolher a correta formatação pois as informações existentes são inconsistentes. Como mencionado, o guia Udacity define camelCase para a nomenclatura de arquivos, porém a maior parte do material pesquisado utiliza PascalCase. O mesmo ocorre com a utilização de ';'. A aplicação padrão do React não finaliza, por exemplo, os imports com ';'. Entretanto, todos os exemplos do Material-UI seguem a linha contrária.

Acho que seria interessante um aprofundamento sobre o guia de estilo, não só com exemplos de o que fazer e não fazer, como também a explicação mais detalhada sobre a escolha.

Além disso, gostaria de saber se existe alguma regra para a utilização ou não de {...props}. Por praticidade, acabei utilizando esse método para o repasse de propriedades entre componentes, porém acredito que sua utilização indiscriminada poderia levar a algum prejuízo em performance ou até mesmo erros em aplicações maiores.


## Bugs conhecidos

A implementação do Modal via duplo clique acabou sendo feita de última hora :)
É sabido que o duplo clique no controlador de troca de prateleira também acaba mostrando o Modal.
É necessária refatorar o componente 'Book' para melhorar essa divisão, ou até mesmo criar um novo tipo de controle que comtemple tanto a troca de prateleira quanto a abertura do Modal. Talvez a própria funcionalidade Drag-and-Drop, já mencionada, resolveria o problema.

## Observações finais

A API retorna 3 livros semelhantes (2 com mesmo título) para o termo 'Linux'. O tratamento de livros na aplicação é feito via Id, logo, esses 3 livros são tratados como itens distintos.
