/* Categorias: capa = nome da imagem em assets/img (sem "-640.webp"); tom = cor do cartão */
const CATEGORIAS=[
{id:'pre',nome:'A História antes da escrita',capa:'pre-historia',tom:'#c8643c'},
{id:'eur',nome:'História Europeia',capa:'europa',tom:'#7a1f3d'},
{id:'afr',nome:'História Africana',capa:'africa',tom:'#e0932f'},
{id:'asi',nome:'História Asiática',capa:'asia',tom:'#7a1f3d'},
{id:'oce',nome:'História da Oceania',capa:'oceania',tom:'#c8643c'},
{id:'ame',nome:'História da América',capa:'america',tom:'#e0932f'},
{id:'bra',nome:'História do Brasil',capa:'brasil',tom:'#7a1f3d'},
{id:'eua',nome:'História dos Estados Unidos',capa:'eua',tom:'#c8643c'},
{id:'urs',nome:'História da União Soviética',capa:'urss',tom:'#7a1f3d'},
{id:'teo',nome:'Teoria da História',capa:'teoria',tom:'#e0932f'},
{id:'hbr',nome:'Historiografia Brasileira',capa:'historiografia',tom:'#c8643c'}
];

/* Para adicionar um artigo: copie um bloco, troque os campos e salve.
   id: sem espaços nem acentos · cat: id da categoria · hero: (opcional) imagem de destaque no início
   texto: parágrafos separados por \n (aceita <em>, <strong> e <a>) */
const ARTIGOS=[
{id:'egito-civilizacao-do-nilo',cat:'afr',hero:'egito',
titulo:'Egito: uma civilização africana feita pelo Nilo',
resumo:'Cheias anuais, escrita hieroglífica e um Estado que durou milênios: como o rio moldou a vida no Egito antigo.',
texto:'Todos os anos, o Nilo transbordava e deixava nas margens um limo fértil. Esse ritmo regular sustentou lavouras, impostos e a organização de um Estado que perdurou por cerca de três milênios.\nA escrita hieroglífica só voltou a ser lida em 1822, quando Champollion usou a Pedra de Roseta, achada em 1799, para decifrá-la. Foi o que permitiu à história do Egito falar pelos próprios documentos.'},
{id:'atenas-invencao-da-politica',cat:'eur',hero:'grecia',
titulo:'Atenas e a invenção da política',
resumo:'A assembleia dos cidadãos, os limites da cidadania e o que a democracia ateniense deixou como pergunta.',
texto:'Por volta de 508 a.C., as reformas de Clístenes ampliaram a participação política em Atenas. As decisões passaram a ser tomadas na assembleia (ekklesía), aberta aos cidadãos.\nA cidadania, porém, era restrita: ficavam de fora as mulheres, os escravizados e os estrangeiros. Estudar esse limite é tão importante quanto estudar a invenção.'},
{id:'mali-rotas-do-saara',cat:'afr',hero:'africa',
titulo:'Mali e as rotas do Saara',
resumo:'Ouro, sal e manuscritos: como o Império do Mali ligou a África Ocidental ao mundo islâmico e ao Mediterrâneo.',
texto:'No século XIV, o Império do Mali controlava rotas que levavam ouro da África Ocidental ao norte do continente. Em 1324, o imperador Mansa Musa fez uma peregrinação a Meca que ficou famosa pela riqueza exibida.\nCidades como Tombuctu e Djenné tornaram-se centros de comércio e de estudo, e os manuscritos produzidos ali ainda hoje servem como fonte para os historiadores.'},
{id:'maias-o-ceu-como-calendario',cat:'ame',hero:'america',
titulo:'Os maias e o céu como calendário',
resumo:'Dois ciclos de contagem do tempo, tabelas de Vênus e uma astronomia ligada ao poder.',
texto:'Os maias combinavam um ciclo ritual de 260 dias com um ano solar de 365 dias. Combinados, os dois ciclos só voltavam à mesma data a cada 52 anos, e a Contagem Longa registrava datas ao longo de séculos.\nO Códice de Dresden traz tabelas que acompanham os movimentos de Vênus. A observação do céu estava ligada a rituais e à autoridade dos governantes.'},
{id:'china-exames-imperiais',cat:'asi',
titulo:'China imperial: quando o mérito virou concurso',
resumo:'Os exames imperiais formaram a burocracia chinesa por mais de mil anos e só acabaram em 1905.',
texto:'Os exames imperiais selecionavam funcionários do Estado chinês a partir do conhecimento dos clássicos. Ganharam forma nas dinastias Sui e Tang e se ampliaram sob os Song.\nO sistema atraía candidatos de origens diversas, mas exigia anos de estudo, o que favorecia as famílias com recursos. Foi extinto em 1905, já no fim do período imperial.'},
{id:'scriptoria-livros-medievais',cat:'eur',
titulo:'Scriptoria: onde os livros medievais eram feitos',
resumo:'Monges copiavam textos à mão em pergaminho, e cada manuscrito carregava escolhas de quem o produziu.',
texto:'Antes da imprensa, copiar um livro era trabalho manual e lento. Em mosteiros, os escribas preparavam o pergaminho, copiavam o texto e, muitas vezes, deixavam espaço para iluminuras decoradas com pigmentos e ouro.\nComo cada cópia era feita à mão, nenhuma era idêntica. Para o historiador, as variações entre manuscritos mostram como um texto circulou e foi transformado.'},
{id:'pinturas-rupestres',cat:'pre',
titulo:'Pinturas rupestres: o que as cavernas contam',
resumo:'Mãos em negativo, bisões e cavalos ajudam a reconstruir modos de vida que não deixaram registros escritos.',
texto:'Em cavernas como Chauvet, na França, há pinturas com mais de 30 mil anos. Animais, sinais e mãos em negativo, feitas ao soprar pigmento sobre a mão apoiada na parede, aparecem em muitos sítios do mundo.\nNão existe uma explicação única para essas imagens. Rituais, caça e transmissão de conhecimento são hipóteses debatidas, e esse debate mostra como a história sem escrita depende de interpretação.'},
{id:'o-que-e-fonte-historica',cat:'teo',
titulo:'O que conta como fonte histórica?',
resumo:'Da prova documental à pergunta do historiador: como a noção de fonte se ampliou no século XX.',
texto:'Para a escola metódica do século XIX, a fonte por excelência era o documento escrito e oficial. A partir de 1929, com a revista Annales, de Marc Bloch e Lucien Febvre, a noção se ampliou.\nPassaram a valer paisagens, objetos, imagens e outros vestígios. A fonte, nessa visão, só fala quando o historiador faz uma pergunta a ela.'}
];
