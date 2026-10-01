# Clio+ · Artigos de História

Site estático (HTML, CSS e JavaScript puros), sem build e sem dependências externas.

## Estrutura

```
index.html          página principal
css/style.css       estilos (cores em :root)
js/dados.js         categorias e artigos (edite aqui)
js/app.js           comportamento do site
assets/img/         imagens em WebP (1600 px e 640 px)
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie **o conteúdo** desta pasta (o `index.html` precisa ficar na raiz).
2. Vá em **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)`.
4. Salve e aguarde 1 a 2 minutos. O endereço aparece na mesma tela.

## Adicionar um artigo

Abra `js/dados.js`, copie um bloco de `ARTIGOS`, troque os campos e salve.
Use o `id` de uma categoria existente em `cat`. Para um artigo aparecer no destaque do início, informe `hero` com o nome de uma imagem de `assets/img` (sem `-1600.webp`).

## Trocar uma imagem

Gere duas versões em WebP com proporção 16:9 (`nome-1600.webp` e `nome-640.webp`), coloque em `assets/img/` e use `nome` no campo `capa` da categoria.
