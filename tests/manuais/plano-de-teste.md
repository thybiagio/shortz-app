# Plano de Teste — Shortz-App 

Versão: 1.0 

Data: 31 de Março de 2026 

Autores: Bryan Bellinaso, Nicolas Francisco, Thyago Silva, Tiago Silva 

---

## 1. Introdução 

Este documento apresenta a estrutura e as diretrizes para a execução das atividades de teste do aplicativo Shortz-App. O plano tem como finalidade validar se o sistema atende aos 
requisitos previamente definidos, assegurando o correto funcionamento de suas funcionalidades e a consistência da experiência oferecida aos usuários. A estratégia de testes contempla a verificação dos principais recursos da aplicação, com foco na identificação de falhas, inconsistências e possíveis vulnerabilidades que possam comprometer se desempenho, segurança e usabilidade. 

---

## 2. Escopo dos Testes 

### 2.1 Em Escopo 

As funcionalidades a seguir representam o foco das atividades de teste nesta etapa do projeto, sendo priorizadas de acordo com sua relevância para o funcionamento do sistema: 

• Gestão de Usuários:  
Cadastro e autenticação de usuários, incluindo validação de credenciais e 
controle de acesso ao sistema. 

• Validação de Dados:  
Verificação dos campos de formulários, assegurando o correto preenchimento, 
formatação e integridade das informações inseridas pelos usuários. 

• Gestão de Arquivos:  
Upload de arquivos, contemplando validações de formato, tamanho e 
consistência dos dados enviados. 

• Controle de Acesso:  
Gerenciamento de permissões e restrição de acesso a rotas administrativas, garantindo que apenas usuários autorizados possam executar determinadas 
ações.  

• Segurança da Informação:  
Proteção de dados sensíveis, com foco na confidencialidade, integridade e prevenção de acessos indevidos.  

### 2.2 Fora de Escopo 

As seguintes funcionalidades não serão contempladas neste ciclo de testes, estando previstas em fases futuras do projeto ou sendo tratadas separadamente em etapas posteriores, conforme a necessidade do sistema: 

• Integração com serviços externos:  
APIs de terceiros, autenticação via redes sociais, entre outros. 

• Funcionalidades administrativas avançadas:  
Painéis de controle, relatórios gerenciais e gestão completa do sistema. 

• Mecanismos de recuperação de conta:  
Recuperação de senha via email, SMS ou autenticação multifator. 

• Customizações avançadas d perfil ou preferências do usuário. 

---

## 3. Estratégia 

### Níveis de Teste 

Testes Unitários: 

Os testes unitários têm como objetivo validar os componentes do sistema de forma isolada, garantindo o funcionamento das regras de negócio.  

Os seguintes pontos serão abordados: 

• Validação de permissões de usuário  
• Processo de criptografia de senha  
• Validação de campos obrigatórios no cadastro  
• Validação de tamanho máximo de campos  

Testes de Integração: 

Os testes de integração verificam a comunicação e o funcionamento de diferentes partes do sistema.  

Os pontos abordados serão: 

• Teste de rotas de autenticação  
• Testes de upload de arquivos  
• Teste de duplicidade de usuário no banco  
• Teste de isolamento de sessões de usuários  

### Ferramentas 

Para apoio a execução dos testes, será usada a seguinte ferramenta: 

• GitHub Actions. 

---

## 4. Riscos Identificados 

## 4. Riscos Identificados

| ID   | Descrição                                                         | Categoria                         | Prob. | Impacto | Prioridade |
|------|------------------------------------------------------------------|----------------------------------|------|--------|-----------|
| R-01 | Usuário não cadastrado como administrador acessa rotas restritas | Segurança/Autorização            | Média | Crítico | Alta |
| R-02 | Formulários não demonstram mensagens de erro                     | Interface/Usabilidade            | Baixa | Médio   | Médio |
| R-03 | Sistema aceita upload de arquivos em formatos incorretos         | Funcional/Validação de Dados     | Média | Alto    | Alta |
| R-04 | Senhas armazenadas sem criptografia                              | Segurança                        | Baixa | Crítico | Alta |
| R-05 | Informações sensíveis visíveis no perfil                         | Segurança/Privacidade            | Média | Crítico | Alta |
| R-06 | Nome de usuário sem limite de caracteres                         | Funcional/Validação de Dados     | Média | Médio   | Média |
| R-07 | Criação de usuários duplicados                                   | Funcional/Integridade de Dados   | Média | Alto    | Alta |
| R-08 | Redirecionamento incorreto de sessão                             | Segurança/Autenticação           | Baixa | Crítico | Alta |
| R-09 | Botões não executam suas funções                                 | Interface/Usabilidade            | Média | Médio   | Média |
| R-10 | Criação de usuário sem senha                                     | Segurança/Autenticação           | Baixa | Crítico | Alta |

---

## 5. Casos de Teste Planejados (Black-Box) 

Esta seção tem como objetivo descrever a utilização de técnicas de teste do tipo caixa-preta na elaboração de casos de teste manuais, com foco nas funcionalidades críticas do sistema. Será testado o comportamento do sistema com base nas entradas e saídas dos dados, sem necessidade de conhecer o código internamente. Para isso, serão usados exemplos de técnicas de Particionamento de Equivalência, Análise de Valores-Limite e Tabelas de Decisão, cobrindo melhor os cenários possíveis e ajudando na identificação de falhas ou comportamentos inesperados. 

### 5.1 Técnica: Particionamento de Equivalência e Análise de Valores-Limite 

**Funcionalidade:** Cadastro de Usuário  

**Regra:** O usuário deve informar um e-mail válido e uma senha com no mínimo 8 caracteres para validação.

| Campo | Classe Válida | Classes Inválidas |
|------|--------------|------------------|
| E-mail | Formato válido (ex: user@email.com) | Sem @, sem domínio, vazio |
| Senha | ≥ 8 caracteres | < 8 caracteres |

#### Análise de Valores-Limite para (Senha) 

| Limite            | Abaixo do mínimo | Mínimo (8) | Valor Acima do Mínimo (9) |
|-------------------|------------------|------------|----------------------------|
| Valores de Teste  | Senha1!          | Senha12!   | Senha123!                  |

#### Casos de Teste 

ID: CT-CAD-001  
Título: Cadastro com dados válidos 
<br>Prioridade: Alta  
Pré-condições: Usuário não logado, acesso à tela de cadastro. 
<br>Passos: 1. Preencher os campos com dados válidos; 2. Senha: Senha12!; 3. Confirmação de senha: Senha12!; 4. Clicar em “Cadastrar”. 
<br>Resultado Esperado: Usuário cadastrado com sucesso, sendo redirecionado para a tela de 
login ou feed. 

ID: CT-CAD-002  
Título: Cadastro com senha abaixo do limite mínimo 
<br>Prioridade: Alta  
Pré-condições: Usuário não logado, acesso à tela de cadastro. 
<br>Passos: 1. Preencher os campos com dados válidos; 2. Senha: Senha1!; 3. Confirmação de senha: Senha1!; 4. Clicar em “Cadastrar”. 
<br>Resultado Esperado: Exibição de mensagem de erro informando que a senha deve possuir no 
mínimo 8 caracteres.  

ID: CT-CAD-003  
Título: Cadastro com senha acima do limite mínimo 
<br>Prioridade: Alta  
Pré-condições: Usuário não logado, acesso à tela de cadastro. 
<br>Passos: 1. Preencher os campos com dados válidos; 2. Senha: Senha123!; 3. Confirmação de senha: Senha123!; 4. Clicar em “Cadastrar”. 
<br>Resultado Esperado: Usuário cadastrado com sucesso. 

#### Funcionalidade: Upload de Arquivos – Tamanho do Arquivo 

**Regra:** O arquivo deve possuir tamanho máximo de 10MB. 

| Campo | Classe Válida | Classes Inválidas |
|------|--------------|------------------|
| Formato | MP4 | PDF, EXE |
| Tamanho | ≤ 10MB | > 10MB |

#### Análise de Valores-Limite (Upload) 

| Limite | Valor Abaixo | Valor Máximo | Valor Acima |
|--------|-------------|-------------|-------------|
| Valores de Teste | 9.9MB | 10MB | 10.1MB |

#### Casos de Teste Resultantes 

ID: CT-UPL-004  
Título: Upload de arquivo abaixo do limite permitido 
<br>Prioridade: Alta  
Pré-condições: Usuário logado, acesso à funcionalidade de upload. 
<br>Passos: 1. Acessar a área de upload; 2. Selecionar arquivo de 9.9MB em formato válido; 3. Clicar em “Enviar”. 
<br>Resultado Esperado: Upload realizado com sucesso. 

ID: CT-UPL-005  
Título: Upload de arquivo no limite máximo permitido.
<br>Prioridade: Alta  
Pré-condições: Usuário logado, acesso à funcionalidade de upload. 
<br>Passos: 1. Acessar a área de upload; 2. Selecionar arquivo de 10MB; 3. Clicar em “Enviar”. 
<br>Resultado Esperado: Upload realizado com sucesso. 

ID: CT-UPL-006   
Título: Upload de arquivo acima do limite permitido 
<br>Prioridade: Alta  
Pré-condições: Usuário logado, acesso à funcionalidade de upload. 
<br>Passos: 1. Acessar a área de upload; 2. Selecionar arquivo de 10.1MB; 3. Clicar em “Enviar”. 
<br>Resultado Esperado: Exibição de mensagem de erro informando que o tamanho máximo foi 
excedido. 

ID: CT-UPL-007  
Título: Upload de arquivo com formato inválido 
<br>Prioridade: Alta  
Pré-condições: Usuário logado, acesso à funcionalidade de upload. 
<br>Passos: 1. Acessar a área de upload; 2. Selecionar arquivo PDF; 3. Clicar em “Enviar”. 
<br>Resultado Esperado: Exibição de mensagem de erro informando formato não suportado. 

### 5.2 Técnica: Tabela de Decisão 

**Funcionalidade:** Controle de Acesso a Rotas Administrativas 

**Regra:** O acesso é permitido apenas para usuários autenticados e administradores 

#### Tabela de Decisão 

| Condições / Ações | R1 | R2 | R3 | R4 |
|------------------|----|----|----|----|
| Usuário autenticado? | S | S | N | N |
| Usuário é administrador? | S | N | S | N |
| Acesso permitido | Sim | Não | Não | Não |
| Exibir erro | Não | Sim | Sim | Sim |

##### Casos de Teste Resultantes 

ID: CT-ADM-008  
Título: Acesso à rota administrativa por administrador.
<br>Prioridade: Alta  
Pré-condições: Usuário logado com perfil de administrador. 
<br>Passos: 1. Acessar a rota administrativa do sistema. 
<br>Resultado Esperado: Acesso permitido. 

ID: CT-ADM-009  
Título: Acesso à rota administrativa por usuário comum. 
<br>Prioridade: Alta  
Pré-condições: Usuário logado sem perfil de administrador. 
<br>Passos: 1. Acessar a rota administrativa do sistema. 
<br>Resultado Esperado: Acesso negado com exibição de mensagem de erro. 

ID: CT-ADM-010  
Título: Acesso à rota administrativa sem autenticação. 
<br>Prioridade: Alta  
Pré-condições: Usuário não logado. 
<br>Passos: 1. Tentar acessar diretamente a rota administrativa. 
<br>Resultado Esperado: Redirecionamento para a tela de login. 

### 5.3 Complemento – Cadastro (Validações adicionais) 

ID: CT-ADM-011  
Título: Cadastro com e-mail em formato inválido 
<br>Prioridade: Alta  
Pré-condições: Usuário não logado, acesso à tela de cadastro. 
<br>Passos: 1. Preencher e-mail como “usuarioemail.com”; 2. Inserir senha válida; 3. Clicar em “Cadastrar”. 
<br>Resultado Esperado: Exibição de mensagem de erro informando formato de e-mail inválido. 

ID: CT-ADM-012  
Título: Cadastro com campos obrigatórios não preenchidos 
<br>Prioridade: Alta  
Pré-condições: Usuário não logado. 
<br>Passos: 1. Deixar campos obrigatórios vazios; 2. Clicar em “Cadastrar”. 
<br>Resultado Esperado: Sistema impede cadastro e exibe mensagens de erro. 

### 5.4 Complemento – Segurança 

ID: CT-SEC-013  
Título: Tentativa de acesso a dados sem autenticação 
<br>Prioridade: Alta  
Pré-condições: Usuário não logado. 
<br>Passos: 1. Tentar acessar área restrita do sistema. 
<br>Resultado Esperado: Acesso negado. 

ID: CT-SEC-014  
Título: Inserção de script malicioso no cadastro 
<br>Prioridade: Média 
<br>Pré-condições: Usuário não logado, acesso ao cadastro. 
<br>Passos: 1. Inserir “<script>alert(1)</script>” em um campo; 2. Submeter cadastro. 
<br>Resultado Esperado: Sistema bloqueia ou sanitiza a entrada. 

---

## 6. Critérios de Aceitação: 

### 6.1 Critério de Entrada: 

As atividades de verificação das funcionalidades previstas somente serão iniciadas quando as seguintes condições forem atendidas: 

• Os requisitos funcionais e não funcionais devem estar devidamente implementados, com ênfase nos módulos de Gestão de Usuário, Vídeo, Feed e Descoberta, garantindo que as principais funcionalidades do sistema estejam disponíveis. 

• O sistema deve estar estável e corretamente configurado no ambiente de testes, garantindo sua execução sem falhas críticas e garantido sua futura replicação no ambiente de produção. 

• O ambiente deve estar preparado e acessível, garantido que possamos executar os cenários planejados e realizar os testes. 

### 6.2 Critério de Saída: 

A execução dos testes será concluída e as funcionalidades serão consideradas aptas para implantação quando: 

• Todos os testes classificados como de alta e crítica prioridade tiverem sido executados e aprovados, garantindo o funcionamento das principais funcionalidades do sistema. 

• No mínimo 90% dos defeitos identificados dentro do escopo total tiverem sido corrigidos e validados. 

• Não existirem falhas críticas abertas que comprometam a segurança e a confidenciabilidade dos dados do sistema. 

• Os resultados dos testes indicarem que o sistema esteja funcionando consistentemente e de forma estável dentro dos testes realizados. 

### 6.3 Critério de Suspensão 

Atividades que caso ocorram os testes serão suspensos temporariamente. 

• O sistema não possua Banco de Dados definido ou esteja inacessível. 

• Ausência de funcionalidades como Login, upload, etc... 

• Instabilidade no sistema que comprometam a execução dos testes. 

• Falhas que bloqueiem o fluxo principal do programa, impedindo que os testes sejam realizados. 