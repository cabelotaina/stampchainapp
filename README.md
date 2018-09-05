# stampchainapp

Este app permite que um trabalhador armazene todos os seus passos durante um dia, em horario laboral ou não. O que isso siginifica. O trabalhador a cada 5 min deve armazenar sua latitude longitude e horario para posterior analise, de quanto tempo o trabalhador passou na empresa.

Este app permitiria que o trabalhador de maneira transparente mantenha um log de suas atividades diaria. Que pode ser transformado em prova ou mesmo ajudar o trabalhador a entender qual é sua media de horas trabalhadas durante sua jornada de trabalho.

O app pode ser um mecanismo de proteção em casos em que o relogio de ponto da empresa esteja sendo burlado. Ou mesmo que ele seja destruido o trabalhador teria sua propria copia de seus horarios aproximados de desempenho de suas atividades.

## Como tecnicamente isso se sustenta?

O app é uma das partes fundantes do processo que deve ser desenvolvido. Ele armazena todo o historico de atividades do trabalhador e deve gerar informações coerentes para o trabalhador, não permitir a alteração de seus dados nem por ele, nem por outros softwares. A unica coisa que o trabalhador pode é destruir o dado. Mas não pode alteralo de maneira que se o dado exista ele deve ser irefutavel.

## Stampchain backend

O backend do sistema stampchain basicamente oferece a possibilidade armazenar os dados em IPFS. Em caso de o dispositivo estar ficando sem espaço. E cada dia laboral (todos os pontos latlon somados aos horarios, obtidos a cada 5 min) é gerado um hash que deve ao final do dia ser armazenado na blockchain do etherium em um contrato que foi publicado pelo trabalhador.

## Mas como a blockchain ajuda

Os hashs publicados não podem ser alterados se o trabalhador quiser ele pode demonstrar que no dia x o app postou no contrato mais um hash equivalente ao dia de trabalho, se os dados do dia de trabalho apresentado não podem ser convertidos por meio de uma função hash especifica em um hash igual logo os dados apresentados não podem ser usados como referencia.

## Nosso app, nosso backend, nossas regras

Todo o codigo deve ter coesão entre si.

Apenas os apps assinados por nos devems ser validos para enviar dados ao servidor checkar essa posibilidade...)

O processo de geração do app deve ser automatizado e regulado publicamente.




