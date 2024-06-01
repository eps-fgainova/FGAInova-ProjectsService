<div align="center">
<p style="display: flex; justify-content: center;">
    <img src='https://i.ibb.co/h7hg8PL/logo-Botom-Info.png' width="300" height="auto">
</p>
</div>








# FGA Inova - Back End 📢
Repositório voltado para o desenvolvimento do serviço de autenticação de usuário da aplicação da disciplina "Engenharia De Produto De Software" da UnB no Semestre 2024/1 do Grupo 04. Para mais detalhes consultar a documentação do projeto <a href="https://fgaad-docs-fga-eps-rmc-marketing-digital-g4-2-fe120e506e2a802aa.gitlab.io/#/" target="_blank">AQUI!</a> 

## Alunos 👩‍💻

| Matrícula  | Aluno                            |
| ---------- | -------------------------------- |
| 17/0032591 | Edvan Barreira Gomes Junior      |
| 17/0020525 | Pedro Henrique de Lima Malaquias |
| 16/0141842 | Philipe Rosa Serafim             |


## Sobre 📣

O FGAInova se trata de uma aplicação web voltada para o marketing digital de projetos de inovação desenvolvidos em ambiente universitário. Após o cadastro, o usuário pode promover suas ideias e conectar-se com uma comunidade de estudantes, pesquisadores e profissionais.

## Executar o projeto 💻

Para executar o projeto localmente sera necessário ter instalado o Docker e Docker Compose. Para se ter uma maior praticidade foi elaborado um Makefile.
Primeiramente é necessário clonar o projeto e entrar na pasta raiz.

```
git clone https://github.com/eps-fgainova/FGAInova-ProjectsService.git
```
Antes de rodar o projeto, primeiro é necessário configurar as váriaveis de ambiente usadas no projeto, para isso, crie um arquivo chamado .env na pasta raíz do projeto e coloque as seguintes variáveis:

```
MONGO_CONNECTION=mongodb+srv://admin:chaveForNecidaPeloMongo
PORT=3333
```

**Obs:** O variável MONGO_CONNECTION se refere ao banco de desenvolvimento e testes do projeto, caso queira fazer alterações no código e testar mais exaustivamente, é recomendado que crie e use um banco próprio para teste, aqui segue um tutorial: https://www.coderrocketfuel.com/article/create-and-connect-to-a-mongodb-atlas-database-with-node-js

Para rodar o projeto na primeira vez é necessário o comando abaixo.

```
make build
```

Para rodar outras vezes basta rodar o comando abaixo
```
make run
```

### Caso não seja possível rodar o comando do makefile basta rodar os comandos abaixo.

Para  rodar a primeira vez
```
npm install && docker-compose up --build
```
Para rodar outras vezes
```
docker-compose up
```

Após rodar os comandos o projeto estará disponível ao acesso pelo navegador na porta 3000
```
http://localhost:3333
```

Ocorrendo tudo certo deve ser possivel visível a seguinte tela.
<p align='center'>
    <img src='https://imgur.com/WqSmIdQ.png' width="90%" height="auto">
</p>
