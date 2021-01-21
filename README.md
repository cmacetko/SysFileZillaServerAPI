# SysFileZillaServerAPI

>  **SysFileZillaServerAPI** é uma **API**, que roda em Nodejs e permite gerenciar o Filezilla Server utilizando o repositório **CtrlFileZillaServer**

![Language](https://img.shields.io/badge/language-nodejs-orange)
![Platforms](https://img.shields.io/badge/platforms-Windows-blue)
![License](https://img.shields.io/github/license/cmacetko/sysfilezillaserverapi)
[![HitCount](http://hits.dwyl.com/cmacetko/sysfilezillaserverapi.svg)](http://hits.dwyl.com/cmacetko/sysfilezillaserverapi)

## Diretório do Filezilla Server

O Diretório do Filezilla Server padrão é **C:\\Program Files (x86)\\FileZilla Server\\** porém pode ser alterado na variável **cfg_pathfilezilla**

## Porta

A aplicação roda na porta **9092** porém pode ser alterado na variável **cfg_porta**

## Autenticação

O acesso a api é feito utilizando **autenticação básica HTTP** *(Basic Auth)*, e os usuários/senha são controlados na variável **cfg_usuarios**

## Método

Toda chamada a API é feita via **POST** enviando no corpo da solicitação o JSON com os parâmetros

## Sucesso

Em caso de sucesso, será retornado um json com dois valores:

- **httpcode:** 200
- **body:** Json com o resultado da requisição

**Exemplo:**
```json
{
"httpcode": 200,
"body":{
}
}
```

> Em alguns métodos não é retornado o **body**, são métodos que apenas retornam o **httpcode: 200** para indicar o **SUCESSO** da requisição

## Erro

Em caso de erro, será retornado um json com dois valores:

- **httpcode:** 500
- **body/Msg:** Mensagem de erro

**Exemplo:**
```json
{
"httpcode": 500,
"body":{
"Msg": "Alguns dados nao foram preenchidos"
}
}
```

## Dependências

Para o funcionamento deste método é necessário a dependência do pacote **CtrlFileZillaServer**:

[![sysutilapi](https://github-readme-stats.vercel.app/api/pin/?username=cmacetko&repo=sysutilapi)](https://github.com/cmacetko/sysutilapi)


# Métodos

## Listagem de Contas

**Método:** 
contas_listar

**Exemplo:**
```json
null
```

**Retorno:**
```json
{
  "httpcode": 200,
  "body": [
    {
      "Nome": "teste1",
      "Diretorio": "C:\\",
      "Permissoes": {
        "FileRead": true,
        "FileWrite": true,
        "FileDelete": true,
        "DirCreate": true,
        "DirDelete": true,
        "DirList": true,
        "DirSubdirs": true
      }
    }
  ]
}
```

## Criar Conta

**Método:** 
contas_criar

**Exemplo:**
```json
{   
  "Conta": "testeabc",
  "Senha": "aaabbb", 
  "Diretorio": "C:\\PastaTeste1", 
  "Permissoes": {
    "FileRead": true,
    "FileWrite": true,
    "FileDelete": true,
    "DirCreate": true,
    "DirDelete": true,
    "DirList": true,
    "DirSubdirs": true
  } 
}
```

**Retorno:**
```json
{
  "httpcode": 200
}
```

## Verificar se Conta Existe

**Método:** 
contas_existe

**Exemplo:**
```json
{   
  "Conta": "testeabc"
}
```

**Retorno:**
```json
{
  "httpcode": 200,
  "body": true
}
```

**Detalhes:**
Em *body* será retornado um *boolean*:
- **true:** A conta existe
- **falae:** A conta não existe

## Deletar Conta

**Método:** 
contas_deletar

**Exemplo:**
```json
{   
  "Conta": "testeabc"
}
```

**Retorno:**
```json
{
  "httpcode": 200
}
```

## Alterar Conta

**Método:** 
contas_alterar

**Exemplo:**
```json
{   
  "Conta": "testeabc",
  "Senha": "aaabbb", 
  "Diretorio": "C:\\PastaTeste1", 
  "Permissoes": {
    "FileRead": true,
    "FileWrite": true,
    "FileDelete": true,
    "DirCreate": true,
    "DirDelete": true,
    "DirList": true,
    "DirSubdirs": true
  } 
}
```

**Retorno:**
```json
{
  "httpcode": 200
}
```

## Alterar Senha de Conta

**Método:** 
contas_alterar_senha

**Exemplo:**
```json
{   
  "Conta": "testeabc",
  "Senha": "aaabbb"
}
```

**Retorno:**
```json
{
  "httpcode": 200
}
```

## Alterar Diretóiro de Conta

**Método:** 
contas_alterar_diretorio

**Exemplo:**
```json
{   
  "Conta": "testeabc",
  "Diretorio": "C:\\PastaTeste1"
}
```

**Retorno:**
```json
{
  "httpcode": 200
}
```

## Alterar Permissões de Conta

**Método:** 
contas_alterar_permissoes

**Exemplo:**
```json
{   
  "Conta": "testeabc",
  "Permissoes": {
    "FileRead": true,
    "FileWrite": true,
    "FileDelete": true,
    "DirCreate": true,
    "DirDelete": true,
    "DirList": true,
    "DirSubdirs": true
  } 
}
```

**Retorno:**
```json
{
  "httpcode": 200
}
```

# Referências

## Permissões

O nó de permissões possui as permissões abaixo:
- **FileRead:** Ler Arquivos
- **FileWrite:** Criar/Editar Arquivos
- **FileDelete:** Deletar Arquivos
- **DirCreate:** Criar Diretório
- **DirDelete:** Deletar Diretório
- **DirList:** Listar Diretórios
- **DirSubdirs:** Exibir Sub Diretórios

Os valores das variaveis é sempre um **boolean**, onde:
- **true:** Tem permissão
- **false:** Não tem permissão

# Contato

**Paloma Macetko**
- cmacetko@gmail.com
- https://github.com/cmacetko/
- https://www.npmjs.com/~cmacetko
- https://cmacetko.medium.com
- https://www.facebook.com/cmacetko
- https://www.instagram.com/cmacetko/
- https://twitter.com/cmacetko
- [Skype: cmacetko](skype:cmacetko "cmacetko")
- [Whatsapp: 47-91277858](https://wa.me/554791277858 "Whatsapp: 47-91277858")