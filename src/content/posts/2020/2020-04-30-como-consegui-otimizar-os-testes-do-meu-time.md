---
title: 'PHPUnit: como otimizar a performance dos testes'
pubDate: 2020-04-30
tags:
  - QA
  - Automação
  - tech
---

Testes são uma das partes mais importantes na concepção de um produto digital. Através deles obtemos garantia que determinada funcionalidade cumpre com os requisitos e atende ao cliente de maneira satisfatória.

Para alcançar esse objetivo devemos ter em mente que a entrega dos testes deve ser a mais rápida possível. Com na pirâmide de testes, os unitários são rápidos, baratos e fáceis de implementar.

Subindo o nível na pirâmide o grau de complexidade aumenta e por consequência sua execução também.

Esse post irá cobrir três partes: a apresentação do problema, o uso do xdebug e configurações extras no PHP.

Esse post é a resolução de um problema que estava enfrentando no meu time. Nossos testes no backend estavam demorando cerca de **32 minutos** para rodar uma suíte com **600 testes** e aproximadamente **2000 asserções** , confesso que estava me incomodando profundamente.

Segunda-feira iniciei um processo de investigação nos testes e o primeiro passo foi detectar os testes lentos. Mas como iria fazer isso?

## Identificando os testes lentos

Pesquisando na web encontrei o [artigo](https://eltonminetto.net/2016/04/08/melhorando-a-performance-do-phpunit) do [Elton Minetto](https://twitter.com/eminetto), onde ele apresenta um pacote chamado `phpunit-speedtrap`. No post do Elton ele explica passo a passo como configurar o speedtrap.

O speedtrap executa juntamente com os testes e ao final da execução exibe os 10 primeiros testes mais lentos. Com um ponto de partida, continuei a investigar e juntamente com os desenvolvedores descobrimos que alguns testes estavam com um gargalo muito grande.

Por enquanto esses testes ainda não foram refatorados, mas está no nosso radar em corrigi-los para melhorar o desempenho dos testes.

Logo após isso, questionei os desenvolvedores sobre outros pontos que poderiam estar afetando a execução dos testes, eles me informaram que poderia ser a extensão de debug do PHP, chamada Xdebug que vem habilitada com o framework de testes que utilizamos, o PHPUnit.

## Xdebug

Meu próximo passo foi pesquisar referências na web sobre a possível lentidão dos testes relacionado ao Xdebug. Para minha sorte encontrei diversas informações a respeito que mostravam como desabilitar ou até mesmo criar filtros para melhorar o desempenho dos testes.

Tentei desabilitar a extensão do Xdebug no arquivo `php.ini`, localmente, porém não tive sucesso. Eu sabia que poderia realizar esse tipo de teste, mas iria precisar de um devops para configurar essa opção no servidor.

Mais uma vez o [Elton Minetto](https://twitter.com/eminetto) salvando a pátria. Dessa vez ele aborda em um [artigo](https://hackernoon.com/generating-code-coverage-with-phpunite-and-phpdbg-4d20347ffb45) publicado em 2016, a relação da lentidão dos testes com o Xdebug, a título de comparação ele conta no artigo que possuía uma base de código que sem o Xdebug habilita terminava em **1,08** , ao habilitar o Xdebug transformou para **22.26** minutos.

Ou seja, deve um aumento significativo. Infelizmente, a opção que era apresentada no artigo não consegui realizar, pois precisaria de instalar um novo pacote no servidor. 😭

### Conhecendo o xdebug-filter

Seguindo o lema de ser brasileiro e não desistir nunca, persisti em buscar outras alternativas para resolver meu problema. Encontrei um artigo no próprio site do Xdebug, explicando sobre a [relação da cobertura de código com o Xdebug](https://xdebug.org/docs/code_coverage).

Ele é frequentemente usado em combinação com `PHP_CodeCoverage` como parte padrão do PHPUnit. O PHPUnit atribuí uma coleção de cobertura de código para o Xdebug que por sua vez, inicia a cobertura do código por meio do método `xdebug_start_code_coverage()` e interrompe através do `xdebug_stop_code_coverage()`.

Para cada teste ele utiliza o `xdebug_get_code_coverage()` para recuperar os resultados.

Sua saída principal é detalha **quais linhas nos quais os arquivos foram “atingidos”** durante a execução do código.

Usando o Xdebug para tais atividades podemos ter um impacto adicional no desempenho, pois ele irá certificar de algumas informações como:

- _analisar quais linhas de código possuem código executável_;
- _quais linhas de código podem ser atingidas_;
- _também podem instrumentar para descobrir quais ramificações_;
- _caminhos em funções e métodos foram seguidos_.

#### Filtros para o resgate

Desde a versão 2.6 do Xdebug é possível criar filtros para a cobertura de código. Com um filtro, podemos incluir através de uma **whitelist** caminhos e prefixos que podem ser executados e também é possível negar através de uma **blacklist**.

Um exemplo, seria informar ao PHPUnit para coletar informações somente da sua pasta `src` onde fica sua base de código e os outros arquivos ele iria desconsiderar, assim, dependências do Composer, arquivos de configuração seriam descartados na cobertura do código.

Existem algumas formas de criar esse filtro, eu criei o filtro baseado nesse [artigo](https://medium.com/@nicocabot/speed-up-phpunit-code-coverage-analysis-4e35345b3dad). Com um filtro configurado corretamente podemos esperar um ganho de velocidade duas vezes maior.

Esses são alguns relatos de pessoas que usaram os filtros:

> This is the effect on the unit test suite of [@opencfp](https://twitter.com/opencfp?ref_src=twsrc%5Etfw) with/out xdebug filter. 44.39 vs. 15.34 seconds. I’d call that “much faster”. Great job [@derickr](https://twitter.com/derickr?ref_src=twsrc%5Etfw)!
> (Integration tests were omitted) [pic.twitter.com/LeNdaxBOOV](https://t.co/LeNdaxBOOV)
>
> — Holger W🌞ltersdorf (@hollodotme) [January 17, 2018](https://twitter.com/hollodotme/status/953719914686242816?ref_src=twsrc%5Etfw)
> Without the filter 6 seconds
> With the filter about 4.9 seconds
>
> Anyway specifically you want me to beta test? 🙂
>
> — Cees-Jan Kiewiet (@WyriHaximus) [January 17, 2018](https://twitter.com/WyriHaximus/status/953667730003001344?ref_src=twsrc%5Etfw)

Antes de aplicar a técnica de filtros do Xdebug os testes estavam tinham uma execução de aproximadamente **32 minutos**. 😱

### Habilitando o filtro

Para criarmos o filtro basta utilizar dois comandos que irão reduzir drasticamente o tempo de execução dos testes.

O primeiro comando cria o arquivo `xdebug-filter.php` dentro do diretório, `build` ele será gerado no diretório raiz da aplicação. Na minha pesquisa não verifiquei se podemos colocar ele em outro diretório.

```php
# dump filter file
# Caso não tenha configurado globalmente o PHPUnit rode assim.
php vendor/bin/phpunit --dump-xdebug-filter build/xdebug-filter.php

# Configurado globalmente
phpunit --dump-xdebug-filter build/xdebug-filter.php
```

Após executar o comando do `xdebug-filter` sua saída é exatamente essa:

```php
<?php
  declare(strict_types=1);
  if (!\function_exists('xdebug_set_filter')) {
    return;
  }
  \xdebug_set_filter(
    \XDEBUG_FILTER_CODE_COVERAGE,
    \XDEBUG_PATH_WHITELIST,
    ['seu-path-aqui']
  )
```

## Executando os testes

Após a configuração iremos rodar nossa suíte de testes com o seguinte comando:

```shell
# Configuração local do PHPUnit
php vendor/bin/phpunit --prepend build/xdebug-filter.php --coverage-html build/coverage-report

# Configurado globalmente
phpunit --prepend build/xdebug-filter.php --coverage-html build/coverage-report
```

Com o arquivo do `xdebug-filter` iremos referenciá-lo nas configurações. Após aplicar as modificações do `xdebug-filter`, os testes executaram em **8 minutos**.

Tive um ganho aproximadamente de 80% de execução! O processo agora está mais rápido e todo mundo feliz.

## Dicas para o phpunit.xml

O arquivo `phpunit.xml` é o setup de configuração para suíte de testes que utilizam PHPUnit.

Vou mostrar alguns parâmetros que podem ser passados que irão melhorar o desempenho. Ele vem com uma série de parâmetros pré-configurados.

O primeiro parâmetro é o `cacheResult="true"`, que permite o PHPUnit execute somente os testes que falharam anteriormente, com uma suíte grande testes isso é um ganho de tempo de resposta absurdo.

Podemos também usar os parâmetros `stopOnFailure="true"` que irá executar a suíte de testes até no momento que ela encontra alguma falha, bloqueando os restantes testes. O `stopOnError="true"` executa a suíte até encontrar algum erro, bloqueando, assim, a execução dos outros testes restantes.

O meu arquivo do phpunit.xml ficou da seguinte forma:

```xml
<?xml version="1.0" encoding="UTF-8">
  <phpunit
        backupGlobals="false"
        backupStaticAttributes="false"
        bootstrap="vendor/autoload.php"
        cacheResult="true"
        colors="true"
        convertErrorsToExceptions="true"
        convertNoticesToExceptions="true"
        convertWarningsToExceptions="true"
        processIsolation="false"
        stopOnFailure="false"
        stopOnError="false">
        <testsuites></testsuites>
        <testsuite name="Unit">
            <directory suffix="Test.php">./tests/Unit</directory>
        </testsuite>

        <testsuite name="Feature">
            <directory suffix="Test.php">./tests/Feature</directory>
        </testsuite>
    </testsuites>
    <filter>
      <whitelist addUncoveredFilesFromWhitelist="false" processUncoveredFilesFromWhitelist="true">
        <directory suffix=".php">./app</directory>
        <exclude>
          <file>./app/Modules/User/routes.php</file>
        </exclude>
      </whitelist>
    </filter>
</phpunit>
```

## Conclusão

Ficou claro para mim que a curiosidade, a gana para resolver esse problema foi o fator primordial, com isso tive vários aprendizados. Sempre seja curioso e tenta ao máximo melhorar as condições de trabalho do time.

Garantir a qualidade está também nos detalhes que podem refletir em grandes conquistas. Todas as referências de artigos que foram pesquisados estão logo abaixo.

## Para se aprofundar

- [Xdebug code coverage](https://xdebug.org/docs/code_coverage)
- [Tips to speed up phpunit tests](https://laravel-news.com/tips-to-speed-up-phpunit-tests)
- [Speed up your phpunit test disable xdebug](https://dustinfraker.com/speed-up-your-phpunit-tests-disable-xdebug/)
- [Speed up phpunit code coverage analysis](https://medium.com/@nicocabot/speed-up-phpunit-code-coverage-analysis-4e35345b3dad)
- [Generating code coverage with phpunit and phpdbg](https://hackernoon.com/generating-code-coverage-with-phpunite-and-phpdbg-4d20347ffb45)
- [Melhorando a performance do phpunit](https://eltonminetto.net/2016/04/08/melhorando-a-performance-do-phpunit/)
