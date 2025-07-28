erDiagram
    USUARIOS {
        UUID id PK
        String nome
        String email UK
        String senha_hash
        Date data_cadastro
        Date ultimo_login
        Boolean ativo
    }

    CATEGORIAS {
        UUID id PK
        String nome
        Enum tipo "RECEITA, DESPESA"
        UUID pai_id FK "NULLable, self-referencing"
        UUID usuario_id FK
    }

    CONTAS {
        UUID id PK
        String nome
        Enum tipo "CORRENTE, POUPANCA, DINHEIRO, CARTAO_CREDITO, INVESTIMENTO, OUTRO"
        Decimal saldo_inicial
        Decimal saldo_atual
        Decimal limite_credito "NULLable"
        Date data_abertura
        UUID usuario_id FK
    }

    TRANSACOES {
        UUID id PK
        String descricao
        Decimal valor
        Date data_transacao
        Enum tipo "RECEITA, DESPESA, TRANSFERENCIA, APORTE_INVESTIMENTO, RESGATE_INVESTIMENTO, RENDIMENTO_INVESTIMENTO"
        UUID conta_id FK
        UUID categoria_id FK "NULLable"
        UUID usuario_id FK
        UUID transacao_agrupada_id FK "NULLable, self-referencing"
        Boolean parcelada
        Integer parcela_atual "NULLable"
        Integer total_parcelas "NULLable"
    }

    ORCAMENTOS {
        UUID id PK
        String nome "NULLable"
        Decimal valor_meta
        Enum periodo_tipo "MENSAL, ANUAL, PERSONALIZADO"
        Date data_inicio
        Date data_fim
        UUID categoria_id FK "NULLable"
        UUID usuario_id FK
    }

    OBJETIVOS {
        UUID id PK
        String nome
        String descricao "NULLable"
        Decimal valor_alvo
        Decimal valor_atual "NULLable"
        Date data_alvo "NULLable"
        Enum prioridade "BAIXA, MEDIA, ALTA"
        Enum tipo_prazo "CURTO_PRAZO, MEDIO_PRAZO, LONGO_PRAZO"
        UUID usuario_id FK
    }

    USUARIOS ||--o{ CONTAS : "tem"
    USUARIOS ||--o{ CATEGORIAS : "cria"
    USUARIOS ||--o{ TRANSACOES : "realiza"
    USUARIOS ||--o{ ORCAMENTOS : "define"
    USUARIOS ||--o{ OBJETIVOS : "define"

    CONTAS ||--o{ TRANSACOES : "possui"
    CATEGORIAS ||--o{ TRANSACOES : "classifica"
    CATEGORIAS ||--o{ CATEGORIAS : "tem pai"
    CATEGORIAS ||--o{ ORCAMENTOS : "é orçada por"

    TRANSACOES ||--o{ TRANSACOES : "é parte de grupo"
