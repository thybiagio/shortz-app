Plano de Teste — Shortz-App 

## 1. Identificação 
- **Projeto:** Shortz-App 
- **Versão:** 1.0 
- **Grupo:** Bryan Belinasso; Nicolas; Tiago Ramos; Thyago Silva 
- **Data de criação:** 10/03/2026
- **Objetivo:** Desenvolvimento de um plano de testes para o aplicativo Shortz-App que garantem o funcionamento correto conforme os requisitos definidos. 

## 2. Escopo 
### O que SERÁ testado 
- Cadastro de usuário
- Validação de campos de formulário
- Upload de arquivos

### O que NÃO será testado (nesta fase) 
- Integração com serviços externos 

## 3. Estratégia 
### Níveis de Teste 
- **Unitários:** 
 Validação de permissões de usuário para acesso a rotas administrativas; Processo de criptografia de senha.
 - **Integração:** Teste de envio e validação de arquivos no sistema; Teste de processamento de formulários. 
 
 ### Ferramentas 
 - GitHub Actions
 
 ## 4. Riscos Identificados 
 
 | ID | Descrição | Categoria | Prob. | Impacto | Prioridade | 
 |----|-----------|-----------|-------|---------|------------| 
 | R-01 | Usuário não cadastrado como administrador consegue acessar rotas de acesso restritas | Segurança/Autorização | Média | Crítico | Alta | 
 | R-02 | Formulários não demonstram mensagens de erro | Interface/Usabilidade | Baixa | Médio | Médio |
 | R-03 | Sistema aceita upload de arquivos em formatos incorretos | Funcional/Validação de Dados | Média | Alto | Alta |
 | R-04 | Senhas de usuários são armazenadas sem criptografia | Segurança | Baixa | Crítico | Alta

 
 ## 5. Recursos e Ambiente 
 - **Ambiente:** Node.js; MySQL; Vitest; Supertest; GitHub; GitHub Actions 
 - **Dados de teste:** Contas de usuários comuns; Contas de administradores; Arquivo de vídeo ou imagem para teste de upload; Dados inválidos para verificação de mensagens de erro e validação do sistema
 - **CI:** GitHub Actions - npm test automaticamente para cada push no repositório, para verificação contínua dos testes de forma automatizada
 
  ## 6. Cronograma 
  
  | Semana | Atividade | Entrega | 
  |--------|-----------|---------| 
  | 4 | Protótipo do Plano (esta aula) | plano-de-teste.md | 
  | 5 | Casos de teste manuais | tests/manuais/casos-de-teste.md | 
  | 6 | Plano de Teste finalizado | Entrega 1 | 
  
  ## 7. Critérios de Entrada e Saída 
  - **Entrada:** Ambiente configurado + migration ok + build passando 
  - **Saída:** Cobertura ≥ 70% + zero falhas em riscos Críticos/Altos 
  - **Suspensão:** Falha grave no ambiente que impede execução dos testes

----
Anotações
## Possíveis riscos
- Usuário não cadastrado como administrador consegue acessar rotas de acesso não permitidas - Probabilidade: Média; Impacto Crítico
- Formulários não demonstram mensagens de erro, ou não especificam - Probabilidade: Baixa; Impacto: Médio
- Aceitação de upload em formato errado - Probabilidade: Média; Impacto: Alto
- Senha armazenada sem criptografia - Probabilidade: Baixa; Impacto: Crítico