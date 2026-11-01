import type { ZhCommit } from './zh-tw-commits-early.ts'

export const zhCommitsLate: Record<string, ZhCommit> = {
  'kerala-series': {
    message: '導出圓周率、正弦和餘弦的級數',
    body: '喀拉拉學派把後來叫作 James Gregory–Gottfried Wilhelm Leibniz 的圓周率級數，以及用角度的冪展開的正弦和餘弦，歸給 माधव。後來的喀拉拉文本給出有理的誤差界，所以這些不是猜測。是否傳到歐洲並未證實，對優先權也不必要：級數首先在馬拉巴爾海岸為人所知。',
  },
  'kashi-pi-and-decimals': {
    message: '將 2π 算到十六位小數並寫下餘弦定律',
    body: 'غياث الدين الكاشي 在撒馬爾罕以 3 × 2²⁸ 邊形把 2π 算到六十進位九位與十進位十六位小數，並在《算術之鑰》中將十進小數與六十進小數並列系統化。',
  },
  'alberti-perspective': {
    message: '以消失點形式化線性透視',
    body: 'Leon Battista Alberti 的《論繪畫》（De pictura）把畫面看成截斷視線角錐的透明窗戶，給出透視縮短方格地面的幾何作圖法，埋下射影幾何的種子。',
  },
  'regiomontanus-triangles': {
    message: '在《論各種三角形》中系統化文藝復興三角學',
    body: 'Regiomontanus (Johannes Müller) 於1464年完成的《論各種三角形》（De Triangulis Omnimodis）為拉丁語世界的歐洲提供第一部系統求解平面與球面三角形的獨立專著。',
  },
  summa: {
    message: '印出一部歐洲算術的總彙',
    body: 'Luca Pacioli 的《算術概要》更像百科，而不是一項發現：印度—阿拉伯計算、當時義大利實行的代數，以及複式簿記第一次付印的記述。它是 Gerolamo Cardano 前一代歐洲代數的依賴清單。',
  },
  tantrasangraha: {
    message: '把喀拉拉級數寫進《坦特羅總集》',
    body: 'नीलकण्ठ सोमयाजि 在一部有系統的天文論著裡記錄並擴充 माधव 級數。他還提出一種行星模型：行星繞太陽，太陽繞地球，這是根據數學對天的局部重組。級數這個檔案是對 माधव 那筆提交的修訂，證明寫了出來。',
  },
  'del-ferro-depressed-cubic': {
    message: '在波隆那秘密解出缺二次項三次方程',
    body: 'Scipione del Ferro 找到 x³ + px = q 的根式解公式，這是代數學自古典二次方程以來的第一次突破。他為了學術競賽將解法保密，臨終前才傳給學生 Antonio Maria Fior。',
  },
  yuktibhasha: {
    message: '在《算術理據》完整寫出喀拉拉級數的證明',
    body: 'ज्येष्ठदेव 以馬拉雅拉姆語散文撰寫《算術理據》（Gaṇita-Yuktibhāṣā），透過整數次冪求和與極限步驟，逐一寫出 माधव 的 π、正弦與餘弦無窮級數證明。',
  },
  'de-revolutionibus': {
    message: '把行星天球重新排列在太陽周圍',
    body: 'Nicolaus Copernicus 的《天體運行論》把太陽放在行星系統中心附近，以地球公轉解釋行星逆行，並用圖西偶（Tusi couple）由圓周運動合成直線往復運動。',
  },
  'ars-magna': {
    message: '發表三次和四次方程式的公式',
    body: '《大術》給出三次方程式的根式解，來自 Scipione del Ferro 和 Niccolò Tartaglia，以及 Lodovico Ferrari 把四次化成三次。Gerolamo Cardano 注意到，即使根是實數，三次公式有時也會經過負數的平方根。他還沒有這些數的理論。Rafael Bombelli 會有。',
  },
  'equals-sign': {
    message: '引入平行雙線等號',
    body: 'Robert Recorde 在《機智的磨刀石》中用兩條平行橫線 = 取代反覆書寫的「等於」，因為「沒有兩樣東西能比兩條平行線更相等」。',
  },
  'mercator-projection': {
    message: '在世界地圖上把恆向線投射為直線',
    body: 'Gerardus Mercator 按正割比例向兩極拉開緯線間距，使航海家保持固定羅盤方位角航行的恆向線（loxodrome）在地圖上成為直線。',
  },
  'complex-rules': {
    message: '寫下虛數的算術',
    body: 'Rafael Bombelli 寫下 a + b√−1 這種式子的加法和乘法規則，並表明它們如何化簡不可約情形裡 Gerolamo Cardano 的三次公式。他稱它們是一種詭辯，卻照樣使用。「虛數」這個名字後來來自 René Descartes，而且不是誇獎。',
  },
  'decimal-fractions': {
    message: '為日常計算引入十進分數',
    body: 'Simon Stevin 的《十進算術》向測量員和商人說明十分之一、百分之一和千分之一，而不只向天文學家。他的記法比後來的小數點笨。任何實際的量都可以寫成十進展開，這件事開始顯得理所當然，那正是它落地的標誌。',
  },
  'letter-algebra': {
    message: '用字母表示已知量和未知量',
    body: 'François Viète 的《解析術入門》把一般係數寫成字母，於是二次方程式是一個物件，而不是一頁例子。他仍偏好齊次方程式，那是幾何上的顧慮。收穫是：一個證明現在可以對某一類的所有方程式做量化。',
  },
  'suanfa-tongzong': {
    message: '在《算法統宗》把珠算口訣法典化',
    body: '程大位刊行十七卷《算法統宗》，將算盤（珠算）口訣、幻方與傳統應用算題編成韻語與圖解，成為明清兩代流通最廣的算學手冊。',
  },
  'chinese-elements': {
    message: '將 Εὐκλείδης《幾何原本》前六卷譯為中文',
    body: '徐光啟與 Matteo Ricci 在北京合譯 Christoph Clavius 底本的《幾何原本》前六卷，鑄造了沿用至今的中文數學詞彙：點、線、面、直角、平行線與幾何。',
  },
  'planetary-laws': {
    message: '寫下前兩條行星定律',
    body: '行星在橢圓上運動，太陽在一個焦點；太陽連出的線在相等時間掃過相等面積。兩者都是對觀測的擬合，算得很苦，不是從力的定律推出。第三條定律把週期和距離連起來，出現在1619年。Isaac Newton 的提交會解釋全部三條。',
  },
  logarithms: {
    message: '發表對數',
    body: 'John Napier 的對數把乘積變成和。它們還不是以 10 為底；Henry Briggs 會與他合作常用對數。Johannes Kepler 用手算軌道，正是 John Napier 心裡的使用者。一張對數表是凍在紙上的演算法。',
  },
  'infinitesimal-volumes': {
    message: '用無限薄的切片計算體積',
    body: '《酒桶的新立體幾何》把立體切成無窮多個無窮小切片來量酒桶。推理大膽，也還不嚴格。它也是對的想法：積分就是切片的和。Johannes Kepler 把它歸在商業下面。',
  },
  'common-logarithms': {
    message: '編出以 10 為底的常用對數表',
    body: 'Henry Briggs 赴愛丁堡與 John Napier 會商後，發表《第一千數對數表》，定 log₁₀ 1 = 0、log₁₀ 10 = 1，使十進位小數點的移位在對數計算中一目了然。',
  },
  'harriot-inequalities': {
    message: '將多項式分解為一次因式並引入不等號',
    body: 'Thomas Harriot 在身後出版的《解析術實踐》中將多項式寫成 (x − a) 的連乘積，建立根與係數的關係，並引入大於 > 和小於 < 記號。',
  },
  jinkoki: {
    message: '出版《塵劫記》並點燃江戶和算傳統',
    body: '吉田光由出版插圖本《塵劫記》，講授算盤、開方與測量；後續版本附上不給解答的挑戰「遺題」，引發江戶時代算家競相解答與再出題的和算熱潮。',
  },
  'cavalieri-indivisibles': {
    message: '以不可分量原理比較面積與體積',
    body: 'Bonaventura Cavalieri 的《不可分量幾何學》將平面圖形看成平行弦的束、立體看成平行截面的疊，據以求出正整數次冪 xⁿ 的定積分。',
  },
  adequality: {
    message: '用等量法求極大',
    body: 'Pierre de Fermat 把一個量設成它加上小增量之後的同一個量，消去，再把增量設成零。他能求切線和極值。這個手續是還沒有名字、也沒有極限理論的導數。他沒有寫成專著；它在信裡流傳。',
  },
  coordinates: {
    message: '把曲線和方程式看成同一個東西',
    body: 'René Descartes 表明如何用兩個未知數的方程式表示曲線，以及如何用代數研究它。他沒有畫出現代課本的 x 軸和 y 軸。他做了更有後果的事：幾何和代數變成一個科目，題目可以在兩者之間搬運。',
  },
  'fermat-margin': {
    message: '聲稱頁邊太窄',
    body: '讀 Διόφαντος 時，Pierre de Fermat 斷言 xⁿ + yⁿ = zⁿ 在 n 大於 2 時沒有正整數解，而且他有一個美妙的證明。這則筆記在他死後才發表。對 n = 4 他確實有證明，用的是無窮下降。一般情形變成掛著他名字的猜想，一直開到1995年。',
  },
  'galileo-two-new-sciences': {
    message: '寫下落體奇數定律與無窮集合的一一對應',
    body: 'Galileo Galilei 在阿切特里軟禁期間寫成《兩門新科學》，證明落體在相等時間間隔內走過的距離比為 1, 3, 5, 7…（總距離與時間平方成正比），並指出平方數集合可與全體正整數一一對應。',
  },
  'desargues-projective': {
    message: '在射影幾何中加入無窮遠點',
    body: 'Girard Desargues 的《圓錐截面初稿》把平行線視為相交於無窮遠點，把圓錐與圓柱視為同一族曲面，並證明透視三角形對應邊交點共線的 Desargues 定理。',
  },
  'little-theorem': {
    message: '寫下小定理',
    body: '若 p 是質數，a 不被 p 整除，則 a^(p−1) − 1 能被 p 整除。Pierre de Fermat 在一封信裡說出它。Gottfried Wilhelm Leibniz 和 Leonhard Euler 後來證明它。這條定理成了現代算術裡大量檢驗的核心，包括密碼。',
  },
  'pascal-mystic-hexagram': {
    message: '證明圓錐曲線內接六邊形的神秘六線形定理',
    body: '十六歲的 Blaise Pascal 印行單頁《圓錐曲線論試作》，指出圓錐曲線內接任意六邊形的三組對邊交點必共線。',
  },
  'torricelli-trumpet': {
    message: '在無窮長的旋轉體裡算出有限的體積',
    body: 'Evangelista Torricelli 證明將雙曲線 y = 1/x（x ≥ 1）繞 x 軸旋轉所得的無窮長號角表面積無窮大，但所圍體積卻是有限的 π。',
  },
  'pascal-triangle': {
    message: '把算術三角形當成一個科目',
    body: 'Blaise Pascal 寫下二項式係數的三角形和它的遞迴規則，並用在組合和期望上。賈憲的三角形更老，喀拉拉和波斯的傳統也知道這張表。Blaise Pascal 的提交是建在上面的歐洲理論：有系統地證明它的性質。',
  },
  'division-of-stakes': {
    message: '分配一場沒有打完的賭局的賭注',
    body: '一個賭友問：比賽提早停下來，彩金怎麼分。Blaise Pascal 和 Pierre de Fermat 在信裡同意答案：枚舉比賽本來可能結束的那些同樣可能的方式。機率變成情形的演算，而不再是一張賭博規則表。Christiaan Huygens 不久就會寫出第一本小專著。',
  },
  'wallis-product': {
    message: '引入無窮大記號 ∞ 與 π/2 的無窮乘積',
    body: 'John Wallis 在《無窮算術》中對 (1 − x²)^(n/2) 的積分做插值，導出 π/2 = (2·2·4·4·6·6…)/(1·3·3·5·5·7…)，並首次引入無窮大符號 ∞。',
  },
  'huygens-expectation': {
    message: '出版第一部論機會遊戲數學期望的專著',
    body: 'Christiaan Huygens 的《論賭博中的計算》將博弈局面的價值（數學期望）定義為各結果的加權平均，並提出五道挑戰題。',
  },
  'fermat-infinite-descent': {
    message: '提出無窮下降法並證明 n = 4 的情形',
    body: 'Pierre de Fermat 在致 Carcavi 的信中闡述「無窮下降法」——假設存在正整數解就會導出更小的正整數解——並用它證明邊長為有理數的直角三角形面積不可能為平方數。',
  },
  fluxions: {
    message: '在瘟疫年間發展流數',
    body: '離開劍橋之後，Isaac Newton 把變化的量看成在流動，把它們的速率叫作流數，並把運算反過來。二項式級數擴到分數指數和負指數，打開許許多多展開。他還發現平方反比的力產生 Johannes Kepler 的橢圓。這些幾乎都沒有發表。耽擱會餵養他和 Gottfried Wilhelm Leibniz 的爭吵。',
  },
  'barrow-fundamental-theorem': {
    message: '以幾何方式證明求切線與求面積互為逆運算',
    body: 'Isaac Barrow 在劍橋的《幾何講義》中給出一般幾何證明，表明求曲線切線與求曲線下面積互為逆過程。',
  },
  'gregory-arctangent': {
    message: '從蘇格蘭寄出反正切無窮級數',
    body: 'James Gregory 在1671年的信中寫下 arctan x、tan x 與 sec x 的無窮冪級數——在歐洲重新發現 माधव 近三百年前在喀拉拉得到的級數。',
  },
  'huygens-evolutes': {
    message: '證明擺線的等時性並建立漸屈線理論',
    body: 'Christiaan Huygens 在《擺鐘論》中證明受擺線夾板約束的單擺週期與振幅無關，並發展曲線漸屈線、漸伸線與曲率半徑的微分幾何。',
  },
  'leibniz-notation': {
    message: '選定記法 dx 和積分號',
    body: '在一本筆記裡，Gottfried Wilhelm Leibniz 把 dx 定為差，把一個長長的 s，代表 summa，定為積分號。記法是一筆改變下一個人能看見什麼的提交。作為發表出來的方法，微分和積分要到1684年。手稿的痕跡從這裡開始。',
  },
  'wasan-determinants': {
    message: '用行列式的樣式消去未知數',
    body: '関孝和在和算傳統裡工作，接觸不到歐洲文獻，他用一個作用像行列式的陣列研究方程組的條件。手稿的年代是近似的。與 Gottfried Wilhelm Leibniz 的獨立是真的：同一十年裡，Gottfried Wilhelm Leibniz 在做相關的事。',
  },
  'nova-methodus': {
    message: '發表微分學',
    body: '《求極大與極小的新方法》只有六頁。它寫出乘積、商和冪的微分規則，是微積分第一篇發表的論文。Gottfried Wilhelm Leibniz 的記法在做教學。Isaac Newton 的流數這時仍是私人的儲存庫。',
  },
  principia: {
    message: '推出世界的體系',
    body: '《原理》寫下三條運動定律和平方反比的重力定律，並推出 Johannes Kepler 定律、潮汐和地球的形狀。數學是幾何的，Ἀρχιμήδης 的方式，部分是為了對沒有流數的讀者說話。力的定律是一個物理假設，由它的數學後果來核對。',
  },
  'rolle-theorem': {
    message: '在任意兩個相鄰實根之間定位導數的零點',
    body: 'Michel Rolle 對多項式證明：在 f(x) = 0 的任意兩個相異實根之間，必存在其導多項式的至少一個根——後來推廣為微分學均值定理的基石。',
  },
  lhopital: {
    message: '送出 Guillaume de l’Hôpital 將會發表的法則',
    body: 'Johann Bernoulli 教 Guillaume de l’Hôpital 微積分，包括分子分母同時趨於零時商的極限法則。他們的契約讓 Guillaume de l’Hôpital 發表這些課。1696年的《無窮小分析》是第一本微積分教科書，法則掛錯了名字。這筆提交屬於 Johann Bernoulli。',
  },
  brachistochrone: {
    message: '解出最速降線問題並開啟變分法',
    body: 'Johann Bernoulli 向全歐洲數學家提出挑戰：求質點在重力下從 A 滑到 B 耗時最短的曲線。Johann Bernoulli、Jacob Bernoulli、Gottfried Wilhelm Leibniz、Guillaume de l’Hôpital，以及 Isaac Newton 一夜之間寫就的匿名解答，共同確認最速降線為擺線，開啟變分法。',
  },
  'choe-latin-squares': {
    message: '在朝鮮《九數略》構造九階正交拉丁方陣',
    body: '崔錫鼎在《九數略》中將兩個九階拉丁方陣疊合成正交的「洛書九宮」方陣，使每一對數碼恰好出現一次並構成九階幻方——比 Leonhard Euler 的軍官問題早七十九年。',
  },
  'de-moivre-formula': {
    message: '將複數次冪連到倍角正弦與餘弦',
    body: 'Abraham de Moivre 提出相當於 (cos x + i sin x)ⁿ = cos(nx) + i sin(nx) 的關係式，把單位根、三角恆等式與複數代數連為一體。',
  },
  'bernoulli-wasan': {
    message: '在和算裡記下伯努利數',
    body: '《括要算法》在関孝和去世後出版，含有出現在冪和裡的那些數，比 Jacob Bernoulli 的《猜度術》早一年。兩人互不知道對方。兩個儲存庫，同一組常數。',
  },
  'ars-conjectandi': {
    message: '證明一條大數法則',
    body: '在 Jacob Bernoulli 死後八年出版的《猜度術》證明：試驗增加時，事件的頻率在一個精確的意義上收斂到它的機率。這本書也把伯努利數引進歐洲。它是數學機率的第一部主要論著。',
  },
  'taylor-series': {
    message: '用各階導數將函數展開為無窮級數',
    body: 'Brook Taylor 的《增量法》發展有限差分演算，提出一般函數的 Taylor 級數展開，引入分部積分法，並算出振動弦的基頻。',
  },
  'takebe-richardson': {
    message: '在江戶以累遍增約術把 π 算到 41 位並展開 (arcsin x)²',
    body: '建部賢弘在《綴術算經》中逐次消去內接多邊形周長的誤差項——與 Lewis Fry Richardson 在1910年發表的外推加速法相同——算出圓周率 41 位，並給出 (arcsin x)² 的無窮冪級數。',
  },
  'stirling-asymptotics': {
    message: '以 Stirling 公式逼近大數階乘',
    body: 'James Stirling 的《微分法》與 Abraham de Moivre 的研究共同確立 n! ~ √(2πn) (n/e)ⁿ 的漸近展開與伯努利數修正項。',
  },
  'normal-approximation': {
    message: '以常態鐘形曲線近似二項分布機率',
    body: 'Abraham de Moivre 證明當試驗次數很大時，二項分布圍繞均值的機率可用 exp(−t²/2) 的積分逼近——這是歷史上第一條中央極限定理。',
  },
  basel: {
    message: '求出平方倒數的和',
    body: '巴塞爾問題問 1/n² 的和。Leonhard Euler 求出 π²/6，方法打開 Euler 乘積：zeta 函數寫成質數上的乘積。第一個證明按後來的標準並不完全嚴格。值是對的，它打開的門是用分析的語言寫的數論。',
  },
  konigsberg: {
    message: '解決柯尼斯堡的橋',
    body: '七座橋、四塊陸地，以及一次走完每座橋的路徑。Leonhard Euler 用數奇頂點表明沒有這樣的走法。這篇論文是圖論的開始。他沒有畫出現代的圖。從橋到連接的抽象，就是整筆提交。',
  },
  'daniel-bernoulli-hydrodynamics': {
    message: '在《流體動力學》建立流速與壓力的關係',
    body: 'Daniel Bernoulli 將活力守恆應用於流體，證明流速增加時壓力下降；同年他在聖彼得堡科學院論文中以對數期望效用解決聖彼得堡賭局悖論。',
  },
  'goldbach-conjecture': {
    message: '猜想每個大於 2 的偶數都是兩個質數之和',
    body: '1742年6月 Christian Goldbach 從莫斯科致信 Leonhard Euler，猜想大於 2 的整數皆可表為三個質數之和；Leonhard Euler 回信給出等價的強形式：每個大於 2 的偶數皆為兩個質數之和。',
  },
  'euler-maclaurin-summation': {
    message: '以伯努利數修正項連結離散級數和與積分',
    body: 'Leonhard Euler 與 Colin Maclaurin 各自獨立發現 Euler–Maclaurin 求和公式，用端點各階導數與伯努利數表示有限和 ∑ f(k) 與積分 ∫ f(x) dx 的差。',
  },
  'dalembert-wave-equation': {
    message: '推導並求解一維波動方程',
    body: 'Jean le Rond d’Alembert 研究振動弦時導出第一條偏微分方程 u_tt = c² u_xx，並將其通解寫成左右行波之和 f(x − ct) + g(x + ct)。',
  },
  introductio: {
    message: '寫下虛數角度的指數',
    body: 'Leonhard Euler 的《無窮分析引論》把函數、無窮級數和對數當成分析的元素。它含有 e^(ix) = cos x + i sin x。那一行 e^(iπ) + 1 = 0 是這個關係後來的壓縮。這本書也使函數、而不是曲線，成為主角。',
  },
  instituzioni: {
    message: '發表《分析基礎》',
    body: 'Maria Gaetana Agnesi 的兩卷書，用清楚的進程教代數、座標幾何，以及微分和積分。所謂「Agnesi 的女巫」是她討論的一條曲線被誤譯，不是她的發明，也不是她選擇的輕慢。這本書把新分析帶給 Isaac Newton 的幾何文體到不了的讀者。',
  },
  'cramer-rule': {
    message: '用行列式之比求解線性方程組',
    body: 'Gabriel Cramer 在代數曲線論著的附錄中，給出用行列式之比解 n 元一次線性方程組的顯式公式。',
  },
  'euler-fluid-and-variations': {
    message: '寫下無黏流體方程與 Euler–Lagrange 變分方程',
    body: 'Leonhard Euler 在柏林建立無黏流體運動的偏微分方程，並在收到十九歲的 Joseph-Louis Lagrange 來信後，確立變分法的分析方程 δ∫L dx = 0。',
  },
  'polyhedron-formula': {
    message: '把頂點、邊和面連起來',
    body: '對凸多面體，頂點減去邊再加上面等於 2。Leonhard Euler 在1750年的信裡說出它，1758年發表一個按後來標準並不完美的證明。René Descartes 在一份 Leonhard Euler 不知道的手稿裡有相關的結果。這個公式是幾何觀察，後來會被讀成拓樸：Euler 特徵數。',
  },
  'lambert-irrationality-pi': {
    message: '用連分數證明 π 是無理數',
    body: 'Johann Heinrich Lambert 將 tan x 展開為無窮連分數，證明當非零 x 為有理數時 tan x 必為無理數；由 tan(π/4) = 1 即得 π 不可能是兩個整數之比。',
  },
  'bayes-theorem': {
    message: '由觀測結果反推未知原因的後驗機率',
    body: 'Richard Price 向皇家學會宣讀 Thomas Bayes 的遺稿〈論機會學說中一個問題的解法〉，在觀測到成功與失敗次數後更新未知二項成功率的事後分布。',
  },
  'lagrange-four-squares': {
    message: '證明四平方和定理並分析方程預解式',
    body: 'Joseph-Louis Lagrange 於1770年證明每個正整數皆為至多四個平方數之和，並在《論代數方程的解法》中研究輔助預解式在根置換下的變化——埋下子群階數整除群階的 Lagrange 定理種子。',
  },
  'minggatu-catalan': {
    message: '在三角級數展開中發現卡塔蘭數',
    body: '明安圖撰、其弟子於1774年整理完成的《割圓密率捷法》在推導弦弧冪級數遞推關係時，發現了卡塔蘭數列（Catalan numbers）1, 1, 2, 5, 14, 42…。',
  },
  'condorcet-jury-paradox': {
    message: '證明多數決兩兩比較可能出現循環偏好',
    body: 'Marquis de Condorcet 證明群體決策正確率的陪審團定理，並指出三個以上候選人的兩兩多數決投票可能出現 A 勝 B、B 勝 C 而 C 又勝 A 的循環。',
  },
  mechanique: {
    message: '不用圖重建力學',
    body: '《分析力學》從虛功原理和像能量的函數推出靜力學和動力學。約束用乘子處理，那成為微積分裡的一般方法。Joseph-Louis Lagrange 誇口書裡沒有圖。圖已經搬進方程式。',
  },
  'legendre-elements': {
    message: '引入 Legendre 符號並猜想質數分布漸近律',
    body: 'Adrien-Marie Legendre 的《幾何基礎》重組了此後百年的幾何教科書，其《數論試論》則引入二次剩餘符號 (a/p)，並由數表經驗猜想 π(x) 近似於 x / (A log x + B)。',
  },
  'wessel-complex-plane': {
    message: '將複數表示為平面上的有向線段',
    body: 'Caspar Wessel 向丹麥皇家科學院提交論文，將複數幾何化為平面有向線段：加法是向量首尾相接，乘法是角度相加與長度相乘。',
  },
  'fundamental-theorem': {
    message: '證明代數基本定理',
    body: '每一個非常數的複係數多項式都有複根。Carl Friedrich Gauß 的博士論文給出一個證明，味道是幾何的，後來的標準會看出一個缺口。他不止一次回到這條定理。結果證明複數是多項式代數閉合的地方。',
  },
  'monge-descriptive-geometry': {
    message: '發表《畫法幾何》與曲面曲率線理論',
    body: 'Gaspard Monge 將長期作為軍事要塞機密的《畫法幾何》公開於巴黎綜合理工學院課堂，以兩個正交投影面精確表示三維立體。',
  },
  disquisitiones: {
    message: '發表《算術研究》',
    body: '同餘、二次互反，以及正多邊形的可作圖性。Carl Friedrich Gauß 證明正十七邊形可以用直尺和圓規作出，這是古代以來第一次這樣的發現。二次互反把「p 是否為模 q 的平方」連到反過來的問題，他稱為黃金定理，並用好幾種方法證明。',
  },
  'least-squares': {
    message: '以最小平方法擬合含誤差的天文觀測',
    body: 'Adrien-Marie Legendre 於1805年發表最小平方法以計算彗星軌道；Carl Friedrich Gauß 自1801年用它找回穀神星（Ceres），並於1809年由常態誤差分布給出機率論推導。',
  },
  'laplace-probabilities': {
    message: '在《機率的解析理論》建立母函數與中央極限定理',
    body: 'Pierre-Simon Laplace 的《機率的解析理論》系統發展母函數、Laplace 變換、逆機率推論，以及獨立誤差和的中央極限定理。',
  },
  'intermediate-value': {
    message: '從連續性證明介值定理',
    body: 'Bernard Bolzano 用文字寫下 ε 式的連續定義，並證明變號的連續函數有一個零點。證明需要實數的完備性，他試圖補上。論文很少人讀。Augustin-Louis Cauchy 即將獨立地讓極限成為分析的公開基礎。',
  },
  'cours-danalyse': {
    message: '把微積分建立在極限上',
    body: 'Augustin-Louis Cauchy 的《分析教程》用不等式定義極限、連續和收斂，而不是把無窮小揮手送走。他有些證明仍用後來的課程會拒絕的語言，有時也不說就假設了一致。他立下的標準，是這個世紀其餘時間要修補並保留的標準。',
  },
  heat: {
    message: '把函數展開成三角級數',
    body: 'Joseph Fourier 的《熱的解析理論》推出熱方程，並聲稱很廣的一類函數可以寫成正弦和餘弦的和。這個聲稱比他的證明更寬。它也是對的猜想。Bernhard Riemann、Peter Gustav Lejeune Dirichlet 和 Henri Lebesgue 會花上一個世紀，精確說出哪些函數、在什麼意義上。',
  },
  'poncelet-projective': {
    message: '建立射影對偶與多邊形閉合定理',
    body: 'Jean-Victor Poncelet 在1812年戰役被俘於薩拉托夫期間起草《圖形的射影性質論》，以無窮遠點、交比與極點—極線對偶建立現代射影幾何。',
  },
  'navier-stokes': {
    message: '在流體運動方程中加入黏性項',
    body: 'Claude-Louis Navier 於1822年、George Gabriel Stokes 於1845年在 Leonhard Euler 流體方程中加入黏性耗散項。三維光滑解是否會在有限時間內爆破，至今仍是千禧年大獎難題。',
  },
  'germain-theorem': {
    message: '證明費馬最後定理的一種情形',
    body: '若 p 和 2p + 1 都是質數，則 x^p + y^p = z^p 沒有使 p 不整除 x、y、z 任一的解。Sophie Germain 的論證在通信裡發展，Adrien-Marie Legendre 給予承認，這是對這個問題第一次一般的進攻，而不是核對一個指數。完整的定理還要開 172 年。',
  },
  quintic: {
    message: '表明一般五次方程式不能用根式求解',
    body: 'Niels Henrik Abel 證明：沒有一個由係數經算術運算和 n 次方根建成的公式，能解每一個五次方程式。特殊的五次仍可能可解。障礙是根的置換的結構，Évariste Galois 會說明它。',
  },
  'bessel-functions': {
    message: '由行星開普勒方程系統研究 Bessel 柱函數',
    body: 'Friedrich Wilhelm Bessel 為展開行星攝動而系統研究柱函數 J_n(x) 的積分表示與遞迴關係，提供圓鼓振動與柱面波的標準特徵函數。',
  },
  'cauchy-integral': {
    message: '在複平面上寫下積分定理',
    body: '解析函數沿一條不包圍奇點的閉曲線的積分是零。Augustin-Louis Cauchy 1825年的備忘錄是複分析的轉軸：留數、Laurent 級數和極點的演算都在它的下游。他會花多年放寬假設。',
  },
  'gauss-theorema-egregium': {
    message: '證明高斯曲率是曲面的內蘊不變量',
    body: '受漢諾威大地測量啟發，Carl Friedrich Gauß 在《曲面通論》中證明絕妙定理（Theorema Egregium）：曲面的主曲率乘積只依賴曲面內部的第一基本形式，且測地三角形的角盈等於總曲率積分。',
  },
  'abel-jacobi-elliptic': {
    message: '反演橢圓積分以建立雙週期橢圓函數',
    body: '正如正弦函數反演反正弦積分，Niels Henrik Abel 與 Carl Gustav Jacob Jacobi 將橢圓積分反演，在複平面上發現具有兩個獨立週期的雙週期亞純函數。',
  },
  'green-theorem': {
    message: '在諾丁漢將體積位勢連到邊界積分',
    body: 'George Green 在諾丁漢自費募集訂戶印行《數學分析應用於電磁理論之試論》，引入位勢函數、Green 恆等式與 Green 函數。',
  },
  'hyperbolic-plane': {
    message: '發表一種平行線不唯一的幾何',
    body: '過直線外一點，存在不止一條平行線。Николай Лобачевский 發展這個平面的三角，並指出就他所能看見的範圍，它是一致的。他不能證明它相對於歐氏幾何的一致性；那要等後來的模型。1829年在《喀山信使》上的論文是一次孤立的行動。幾乎沒有人讀它。',
  },
  'galois-memoir': {
    message: '留下關於根式可解性的備忘錄',
    body: '一個多項式能用根式求解，恰好當附在它的根上的某個群有一種特殊的合成列。Évariste Galois 把置換群看成決定這個問題的物件，而 Niels Henrik Abel 已對五次回答了它。他在1832年去世。手稿在1846年發表，群論用這個世紀的其餘時間追上它。',
  },
  'absolute-geometry': {
    message: '在一篇附錄裡構造絕對幾何',
    body: 'János Bolyai 的〈附錄〉處理不假設 Εὐκλείδης 平行公設的幾何，然後處理否定它的幾何。他的父親把文章寄給 Carl Friedrich Gauß。Carl Friedrich Gauß 回說自己多年前就知道，若稱讚它就等於稱讚自己，那是出名的殘忍。數學站得住。',
  },
  'hamiltonian-mechanics': {
    message: '將力學重寫為相空間中的正則流',
    body: 'William Rowan Hamilton 把 Joseph-Louis Lagrange 的二階方程改寫為廣義座標 q 與廣義動量 p 的一階正則方程，由單一函數 H(q, p) 支配，統一幾何光學與古典力學。',
  },
  'dirichlet-theorem': {
    message: '證明等差數列裡有無窮多個質數',
    body: '若 a 和 d 沒有公因數，數列 a, a + d, a + 2d, … 含有無窮多個質數。Peter Gustav Lejeune Dirichlet 的證明把分析、L 函數帶進數論。它是一個世紀的定理的模板：質數不但無窮，而且在這個精確的意義上均勻分布。',
  },
  'wantzel-impossibility': {
    message: '證明三等分角與倍立方無法用直尺和圓規作出',
    body: 'Pierre Laurent Wantzel 證明尺規可作長度的不可約多項式次數必為 2ᵏ；倍立方與三等分 60° 角皆需解不可約三次方程，因此這兩道古希臘尺規作圖題不可能完成。',
  },
  'poisson-distribution': {
    message: '導出稀有事件的 Poisson 極限分布',
    body: 'Siméon Denis Poisson 在《論判決的機率》中固定 np = λ 並令 n → ∞、p → 0，導出稀有事件計數的極限分布 e^(−λ) λᵏ / k!。',
  },
  'jacobi-functional-determinant': {
    message: '系統建立多變數換元的 Jacobian 行列式',
    body: 'Carl Gustav Jacob Jacobi 在〈論函數行列式〉中建立偏導數行列式 ∂(f₁,…,f_n)/∂(x₁,…,x_n) 的性質，支配多重積分換元與局部可逆性。',
  },
  quaternions: {
    message: '把四元數的規則刻進橋裡',
    body: 'William Rowan Hamilton 想要一套三元數的乘法來擴張複數，它閉不起來。四元可以：i² = j² = k² = ijk = −1。1843年10月16日他把它刻進布魯姆橋的石頭。失去交換律是代價，也是警告：代數可以長出普通數的規則之外。',
  },
  'note-g': {
    message: '為分析機寫下注記 G',
    body: '翻譯 Luigi Menabrea 介紹 Charles Babbage 設計的文章時，Ada Lovelace 加上比文章更長的注。注記 G 把伯努利數的計算走完一遍，並把這台機器討論成按規則處理符號的機器，而不只是做算術。機器從未建成。這則注仍然是一份程式。',
  },
  'grassmann-ausdehnungslehre': {
    message: '定義 n 維線性空間與外積代數',
    body: 'Hermann Grassmann 的《線性擴張論》引入抽象 n 維向量空間、子空間、線性獨立、維度公式以及反對稱的外積（wedge product）。',
  },
  'liouville-transcendental': {
    message: '構造出第一批明確的超越數',
    body: 'Joseph Liouville 證明 n 次代數數不能被有理數過度逼近，並據此證明 ∑ 10^(−k!) 是超越數——比 Georg Cantor 的不可數證明早三十年確認超越數的存在。',
  },
  'boolean-algebra': {
    message: '把邏輯代數化',
    body: 'George Boole 讓 x² = x 表示一個類的冪等，並對命題做加法和乘法。《邏輯的數學分析》薄，也有點彆扭。它也是邏輯變成可以計算的演算的時刻。Claude Shannon 後來會把它接成線路。',
  },
  'kummer-ideal-numbers': {
    message: '以理想數恢復分圓整數的唯一分解',
    body: '當分圓整數環 ℤ[ζ_p] 的唯一因數分解失效時，Ernst Eduard Kummer 引入「理想複數」恢復唯一質因數分解，並對所有正則質數指數證明費馬最後定理。',
  },
  'de-morgan-laws': {
    message: '在《形式邏輯》中寫下 De Morgan 對偶律',
    body: '與 George Boole 小冊子同日出版，Augustus De Morgan 的《形式邏輯》確立合取與析取在否定下的對偶定律，並開啟二元關係代數。',
  },
  'kirchhoff-spanning-trees': {
    message: '用生成樹計數求解電路網路',
    body: '二十三歲的 Gustav Kirchhoff 提出電流與電壓迴路定律，並證明連通圖的生成樹個數等於其 Laplacian 矩陣的任一餘子式。',
  },
  'chebyshev-prime-bounds': {
    message: '將 π(x) 夾在 x / log x 的常數倍之間',
    body: 'Пафнутий Чебышёв 證明 n 與 2n 之間必有質數的 Bertrand 猜想，並證明若 π(x) / (x / log x) 當 x → ∞ 存在極限，則該極限必為 1。',
  },
  'riemann-surfaces': {
    message: '引入黎曼曲面',
    body: '像平方根這樣的多值函數，在鋪在複平面上、有好幾頁的曲面上變成單值。Bernhard Riemann 的博士論文使這成為複分析自然的家，並用 Cauchy–Riemann 方程定義解析函數。還沒有名字的拓樸已經在工作。',
  },
  'riemann-metric': {
    message: '把幾何提議成帶度量的流形',
    body: '就職演講〈論作為幾何基礎的假設〉幾乎沒有公式。它說空間可以是任意維的流形，曲率從流形所帶的度量讀出。歐氏幾何是度量的一種選擇。Carl Friedrich Gauß 坐在聽眾裡，印象深刻，也很安靜。Albert Einstein 的幾何在六十年的下游。',
  },
  'abstract-group': {
    message: '用乘法定義群',
    body: 'Arthur Cayley 把群從啟發它的置換裡抽出來：一個帶有結合的乘積、單位元和逆元的集合。定義還早，也還不是每本課本所寫的那一個，但這一步就是這一步。Évariste Galois 的群是根的置換。這些可以是任何乘得對的東西。',
  },
  'stokes-theorem': {
    message: '在劍橋 Smith 獎試卷中提出 Stokes 旋度定理',
    body: '由 William Thomson (Lord Kelvin) 於1850年致信 George Gabriel Stokes、並由 Stokes 列為1854年劍橋大學 Smith 獎試題，將向量場沿封閉邊界的線積分等同於其旋度穿過曲面的通量。',
  },
  matrices: {
    message: '發表關於矩陣的備忘錄',
    body: 'Arthur Cayley 寫下矩形陣列的代數：乘積、逆，以及矩陣滿足自己的特徵方程式，William Rowan Hamilton 在四元數上見過。矩陣以前以係數的面目出現。這筆提交使它們成為物件。',
  },
  'mobius-strip': {
    message: '把紙帶扭轉成只有一個面的單側曲面',
    body: 'August Ferdinand Möbius 與 Johann Benedict Listing 各自獨立發現只有一個面與一條邊界的不可定向曲面，使可定向性成為基本的拓樸不變量。',
  },
  zeta: {
    message: '寫下關於 zeta 零點的假說',
    body: '在一篇關於質數分布的短文裡，Bernhard Riemann 把 Leonhard Euler 的 zeta 函數延拓到複平面，並把它的零點連到質數定律的誤差。他猜想非平凡零點都在實部為二分之一的直線上。他證明不了。此後也沒有人證明。這個檔案仍是猜想。',
  },
  'maxwell-equations': {
    message: '以場方程式統一電、磁與光',
    body: 'James Clerk Maxwell 在安培定律中加入位移電流項，導出耦合偏微分波動方程，其波速恰好等於實驗測得的光速。',
  },
  'li-shanlan-identities': {
    message: '在《垛積比類》證明李善蘭組合恆等式',
    body: '李善蘭在《垛積比類》中發展高階差分三角陣列，並提出著名的李善蘭恆等式，將組合數平方表為二項式係數乘積的加權和。',
  },
  'beltrami-hyperbolic-model': {
    message: '在歐氏空間內部構造雙曲平面的模型',
    body: 'Eugenio Beltrami 在〈非歐幾何解釋試論〉中於偽球面上局部實現、並於圓盤上全域實現 Николай Лобачевский 的雙曲平面，證明非歐幾何與歐氏幾何具有相同的相對一致性。',
  },
  'jordan-canonical-form': {
    message: '以 Jordan 標準形分類線性變換與矩陣',
    body: 'Camille Jordan 的《置換與代數方程論》以專書篇幅系統闡述 Évariste Galois 的理論，並將代數閉體上的方陣化約為 Jordan 分塊標準形。',
  },
  erlangen: {
    message: '用群定義一種幾何',
    body: 'Felix Klein 的埃爾朗根綱領說：選定一個變換群，幾何就是這個群所保持的東西。歐氏、雙曲和射影幾何變成不同的子群，而不是互相敵對的世界。這是分類，也是一份和約。',
  },
  'dedekind-cuts': {
    message: '用分割構造實數',
    body: '一個實數是把有理數分成下集和上集的一個分割。Richard Dedekind 分割使完備性成為關於有理數集合的定理，而不是對連續直線的訴求。同一年，Georg Cantor、Eduard Heine 和 Charles Méray 在用別的路建造實數。直線正在從算術重建。',
  },
  'weierstrass-function': {
    message: '舉出一個連續但處處不可微的函數',
    body: 'Karl Weierstrass 給出一個三角級數，它收斂到一個連續函數，而這個函數在任何一點都沒有導數。它結束了這樣的希望：連續除了幾個角之外就意味著光滑。此後的分析必須小心自己聲稱看見了什麼。',
  },
  'sylow-theorems': {
    message: '證明質數冪子群的存在與共軛定理',
    body: '挪威中學教師 Peter Ludwig Mejdell Sylow 證明：若 pᵏ 是整除有限群階數的最大質數冪，則該群必有 pᵏ 階子群，且所有該階子群彼此共軛，個數模 p 同餘於 1。',
  },
  'transcendence-e': {
    message: '證明 e 是超越數',
    body: 'e 不是任何整係數多項式的根。Charles Hermite 的證明用一種特殊形狀的有理逼近。他寫信給朋友說自己不敢試 π。九年後 Ferdinand von Lindemann 會敢，方法是擴充 Charles Hermite 的。',
  },
  uncountable: {
    message: '表明實數不可數',
    body: 'Georg Cantor 1874年的論文證明代數數可數而實數不可數，所以幾乎每一個實數都是超越數。更好教的對角線論證出現在1891年。集合論作為科目，開始於兩種無窮之間的缺口。連續統假設，實數有多少，要等到 Paul Cohen 才被確定為獨立。',
  },
  'frege-begriffsschrift': {
    message: '在《概念文字》發明量詞邏輯',
    body: 'Gottlob Frege 用函數、自變數與約束變數上的全稱／存在量詞取代亞里斯多德邏輯的主詞—謂詞結構，打造出現代數理邏輯的表達引擎。',
  },
  'transcendence-pi': {
    message: '證明 π 是超越數',
    body: 'Ferdinand von Lindemann 證明 π 是超越數，方法是證明關於代數數的指數的一個更一般的命題。化圓為方，一道古代的作圖題，用直尺和圓規是不可能的。Charles Hermite 的方法是工具。希臘的問題在一份德國期刊裡結束。',
  },
  'kovalevskaya-top': {
    message: '積出 Софья Ковалевская 陀螺',
    body: '剛體繞固定點的轉動，在 Leonhard Euler 和 Joseph-Louis Lagrange 之外還有第三種可積情形，當慣性矩和質心滿足 Софья Ковалевская 的條件。法國科學院的博爾丹獎承認這項工作。她是第一位獲得該獎的女性，獎金也因論文的品質而提高。',
  },
  'peano-axioms': {
    message: '把自然數公理化',
    body: '零是數，每個數有後繼，零不是後繼，後繼是單射，歸納成立。Giuseppe Peano 用自己的符號語言寫下這些，那種語言沒有流行。公理流行了。Εὐκλείδης 用共通概念處理的算術，現在有了自己的形式基礎。',
  },
  'lie-transformation-groups': {
    message: '將連續變換群線性化為 Lie 代數',
    body: 'Sophus Lie 與 Friedrich Engel 發表《變換群理論》，表明微分方程的連續對稱群主要由其無窮小生成元的換位括號所決定。',
  },
  'qualitative-dynamics': {
    message: '定性地研究三體問題',
    body: 'Henri Poincaré 為奧斯卡國王的獎所寫的備忘錄含有一個出名的錯誤，他發現後自費修補。留下來的是看微分方程式的新方式：週期軌道、穩定性，以及寫不成封閉形式的行為。修好的備忘錄是動力系統的起源之一。',
  },
  'hilbert-basis-theorem': {
    message: '證明多項式環的每個理想都是有限生成的',
    body: 'David Hilbert 不靠具體算出不變量便解決了 Paul Gordan 的問題，非構造性地證明體上多項式環的每個理想都具有有限生成元集。',
  },
  'cantor-diagonal': {
    message: '以對角線論證證明冪集基數嚴格更大',
    body: 'Georg Cantor 提出對角線論證，證明對任意集合 S，其冪集 P(S) 的基數皆嚴格大於 S 本身——開啟無窮多個超限基數的階層。',
  },
  'lyapunov-stability': {
    message: '以 Lyapunov 函數定義運動的穩定性',
    body: 'Александр Ляпунов 在哈爾科夫博士論文《運動穩定性的一般問題》中證明：不需解出微分方程，只要能構造沿軌跡遞減的能量式函數即可保證平衡點穩定。',
  },
  'cartan-lie-classification': {
    message: '完成複單 Lie 代數的分類',
    body: 'Élie Cartan 在巴黎博士論文中完善 Wilhelm Killing 的根系分析，將所有有限維複單 Lie 代數完整分類為四個無限族 A_n、B_n、C_n、D_n 與五個例外代數 G₂、F₄、E₆、E₇、E₈。',
  },
  'analysis-situs': {
    message: '建立代數拓樸',
    body: 'Henri Poincaré 的《位置分析》和它的補充定義同調：給空間附上阿貝爾群，使連續變形不能改變它們。流形、Betti 數和基本群變得可以計算。多面體的 Leonhard Euler 公式是這一族裡最簡單的不變量。拓樸裡面現在有了代數。',
  },
  'prime-number-theorem': {
    message: '證明質數定理',
    body: '不超過 x 的質數個數漸近於 x / log x。Jacques Hadamard 和 Charles-Jean de la Vallée Poussin 在同一年獨立證明它，都用 zeta 函數的複分析，都用到 zeta 在實部為 1 的直線上沒有零點。黎曼假設會把誤差項弄得更尖。這一條並不需要它。',
  },
  'minkowski-geometry-of-numbers': {
    message: '以凸體格點定理創立數的幾何',
    body: 'Hermann Minkowski 的《數的幾何》證明：ℝⁿ 中體積大於 2ⁿ 的中心對稱凸體必含非零整數格點，從而為理想類數有限性與四平方和定理提供簡潔的幾何證明。',
  },
  'hensel-padic': {
    message: '引入 p 進數（p-adic numbers）',
    body: 'Kurt Hensel 類比黎曼曲面上一點附近的 Laurent 級數展開，將有理數展開為質數 p 的次冪級數並在 p 進賦值下完備化。',
  },
  'hilbert-axioms': {
    message: '重新公理化歐氏幾何',
    body: '《幾何基礎》用一份清單取代 Εὐκλείδης 的公設，明確說出關聯、順序、合同和連續被允許做什麼。Εὐκλείδης 有些圖在偷偷夾帶假設。David Hilbert 的格言——「點」和「線」應該可以換成「桌子」和「椅子」——是關於形式的主張，不是關於家具。',
  },
  'hilbert-problems': {
    message: '為這個世紀提出二十三個問題',
    body: '在巴黎，David Hilbert 列出他認為要緊的問題。有些精確，有些是計畫，第二十四個後來在他的文稿裡找到。有幾條現在是這份紀錄裡的定理：第十題、作為獨立性結果的連續統假設，以及作為模性後果的費馬。清單本身是一份研究議程的定義，不是猜想。',
  },
  'pearson-chi-squared': {
    message: '提出卡方適合度檢定（χ² test）',
    body: 'Karl Pearson 推導 χ² 統計量以檢定觀測頻率與理論分布是否顯著偏離，奠定現代數理統計學的假設檢定方法。',
  },
  'ricci-levicivita-tensors': {
    message: '發表絕對微分學與張量分析',
    body: 'Gregorio Ricci-Curbastro 與 Tullio Levi-Civita 發表〈絕對微分學方法及其應用〉，建立在任意座標變換下保持協變的張量場與協變微分。',
  },
  'lebesgue-integral': {
    message: '重建積分',
    body: 'Henri Lebesgue 量函數取值較大的集合，而不是把定義域切成片。更多函數變得可積，函數的極限在積分號下行為更好。Joseph Fourier 分析和機率都搬進這個房間，並留了下來。',
  },
  'poincare-conjecture': {
    message: '問單連通的三維流形是不是球面',
    body: 'Henri Poincaré 實際上在問：一個閉的三維流形，若每條迴圈都能縮成一點，是不是三維球面。他先猜過一個較弱的判準，然後找到反例，Poincaré 同調球面。修正後的問題一直立到 Григорий Перельман。檔案以猜想打開；證明到來時它並不關閉，證明是一個新檔案。',
  },
  'zermelo-well-ordering': {
    message: '明確提出選擇公理以證明每個集合皆可良序化',
    body: 'Ernst Zermelo 明確寫下選擇公理——非空集合族的笛卡兒積非空——並用它證明任意集合皆可良序化，引發關於非構造性存在證明的大論戰。',
  },
  'markov-chains': {
    message: '將大數法則推廣至馬可夫鏈',
    body: 'Андрей Марков 證明大數法則與中央極限定理並不要求獨立性，分析下一步只依賴當前狀態的隨機序列，並以普希金《尤金·奧涅金》詩句中的母音—子音轉移頻率作為實例。',
  },
  'frechet-metric-spaces': {
    message: '將距離抽象化為度量空間',
    body: 'Maurice Fréchet 在巴黎博士論文中定義度量空間與緊緻性，使收斂與連續的概念可直接作用於曲線與函數組成的空間。',
  },
  'riesz-fischer': {
    message: '證明 L² 的完備性及其與 ℓ² 的同構',
    body: 'Frigyes Riesz 與 Ernst Fischer 獨立證明 Lebesgue 平方可積函數空間構成完備度量空間，並透過傅立葉係數與平方可和數列空間同構——奠定 Hilbert 空間。',
  },
  spacetime: {
    message: '把狹義相對論幾何化',
    body: 'Hermann Minkowski 的演講把空間和時間看成一個四維空間，變換所保持的是間隔，而不是分開的距離。據說 Albert Einstein 覺得這種幾何是多餘的，後來又需要它。廣義相對論是帶 Hermann Minkowski 號差的 Bernhard Riemann 幾何。這筆提交是平坦的情形。',
  },
  'zermelo-set-axioms': {
    message: '以受限分類公理將集合論公理化',
    body: '為了保留 Georg Cantor 的超限集合論並排除 Bertrand Russell 悖論，Ernst Zermelo 以分離公理取代無限制概括公理；Abraham Fraenkel 與 Thoralf Skolem 後來補上替換公理，形成 ZFC。',
  },
  'principia-mathematica': {
    message: '試圖從邏輯推出數學',
    body: '《數學原理》第一卷建造一種帶類型的邏輯，想避開 Bertrand Russell 悖論並奠基算術。這項計畫是英雄式的，而按二十年後 Kurt Gödel 的定理，它無法從內部證明自己的一致性。它仍是符號邏輯的紀念碑，也是下一代會去寫形式系統的原因。',
  },
  'brouwer-fixed-point': {
    message: '證明維度的拓樸不變性與不動點定理',
    body: 'L. E. J. Brouwer 利用映射度證明當 m ≠ n 時 ℝᵐ 與 ℝⁿ 不同胚，且閉球到自身的任意連續映射必有至少一個不動點。',
  },
  'hausdorff-topology': {
    message: '在《集合論基礎》中以鄰域公理定義拓樸空間',
    body: 'Felix Hausdorff 以鄰域公理與分離條件（相異點有互不相交鄰域）定義拓樸空間，奠定現代點集拓樸學。',
  },
  'field-equations': {
    message: '把重力寫成曲率',
    body: '1915年11月的場方程式把時空的曲率等同於能量和動量的分布。曾是數學可能性的 Bernhard Riemann 幾何，成了重力的模型。David Hilbert 在同一幾個星期得到變分表述。優先權之爭是真的，就完成的方程式而言，通常判給 Albert Einstein。幾何是 Bernhard Riemann 的。',
  },
  'noether-theorems': {
    message: '把守恆律繫在對稱上',
    body: 'Emmy Noether 定理說：物理系統作用量的每一個連續對稱都給出一個守恆量。時間對稱給出能量，空間對稱給出動量。論文是為了澄清 David Hilbert 和 Felix Klein 在廣義相對論裡提出的問題。她在哥廷根工作，沒有受薪職位，因為她是女性。',
  },
  'ramanujan-partitions': {
    message: '以解析圓法導出整數分拆漸近級數與同餘性質',
    body: 'ஸ்ரீநிவாச இராமானுஜன் 與 G. H. Hardy 發明解析圓法，給出分拆數 p(n) 極度精確的漸近級數；ஸ்ரீநிவாச இராமானுஜன் 同時發現 p(5k + 4) ≡ 0 (mod 5) 等整除同餘，並提出 τ 函數界限的猜想。',
  },
  'takagi-class-field': {
    message: '建立一般阿貝爾類體論',
    body: '高木貞治在第一次世界大戰與歐洲隔絕的東京獨立研究，證明任意代數數體的阿貝爾擴張皆與基底數體的廣義理想類群一一對應。',
  },
  'noetherian-rings': {
    message: '用升鏈條件定義環',
    body: 'Emmy Noether 的《環域裡的理想論》研究每一條理想的升鏈都會停下來的環。這些現在叫作 Noether 環的環，是現代代數幾何和交換代數的場所。這筆提交把科目的基本名詞從「多項式」改成「環」。',
  },
  'banach-spaces': {
    message: '定義完備的賦範向量空間',
    body: 'Stefan Banach 的論文發表在《數學基礎》，把泛函分析大部分將要發生的空間公理化。範數量向量的大小；完備說 Augustin-Louis Cauchy 序列會收斂。David Hilbert 空間是帶內積的特例。利沃夫的咖啡館變成討論室。',
  },
  'fisher-maximum-likelihood': {
    message: '系統建立最大概似估計與變異數分析',
    body: 'Ronald Fisher 的《研究工作者的統計方法》與1922年基礎論文確立最大概似估計、Fisher 資訊量、充分統計量與變異數分析（ANOVA）。',
  },
  'artin-reciprocity': {
    message: '證明一般 Artin 互反律',
    body: 'Emil Artin 證明從廣義理想類群到阿貝爾擴張 Galois 群的典範同構，將 Carl Friedrich Gauß 的二次互反律與所有高次互反律統攝於同一條定理。',
  },
  'courant-friedrichs-lewy': {
    message: '提出偏微分方程有限差分法的 CFL 穩定性條件',
    body: 'Richard Courant、Kurt Friedrichs 與 Hans Lewy 證明：雙曲型偏微分方程的有限差分格式若要收斂，數值依賴域必須包含解析依賴域。',
  },
  'von-neumann-minimax': {
    message: '證明二人零和博弈的極小極大定理',
    body: 'John von Neumann 在〈室內博弈理論〉中證明：在允許混合策略之下，每一個有限二人零和博弈都存在唯一的鞍點均衡值。',
  },
  'kuratowski-planar-graphs': {
    message: '以禁用細分子圖刻畫平面圖',
    body: 'Kazimierz Kuratowski 給出拓樸平面性的純組合判準：一個有限圖可在平面上無交叉地畫出，當且僅當它不含完全圖 K₅ 或完全二分圖 K₃,₃ 的細分。',
  },
  'ramsey-theorem': {
    message: '證明夠大的結構必然包含單色子結構',
    body: '二十六歲的 Frank Plumpton Ramsey 在研究一階邏輯判定問題時證明：對足夠大的集合，無論如何將其 k 元子集有限著色，都必然存在一個全同色的大子集。',
  },
  incompleteness: {
    message: '證明不完備定理',
    body: 'Kurt Gödel 證明：任何一致的、能做一點不算多的算術的形式系統，都含有一條在系統內為真卻不可證明的陳述。第二定理說這樣的系統不能證明自己的一致性。David Hilbert 希望用有限方法證明數學安全，並沒有以他想要的形式活下來。這些定理是關於形式系統的，不是關於數學的終結。',
  },
  'de-rham-cohomology': {
    message: '將光滑微分形式連到拓樸上同調',
    body: 'Georges de Rham 證明 Henri Poincaré 的猜想：光滑流形上閉微分形式模去恰當微分形式所得的上同調環，透過在鏈上的積分與流形的拓樸上同調同構。',
  },
  'von-neumann-quantum': {
    message: '在 Hilbert 空間上把量子力學公理化',
    body: 'John von Neumann 在《量子力學的數學基礎》中將量子態與觀測量置於可分複 Hilbert 空間上，並證明無界自伴算子的譜定理。',
  },
  'kolmogorov-axioms': {
    message: '把機率公理化成測度',
    body: 'Андрей Колмогоров 將機率空間定義為結果的集合、在通常運算下封閉的事件族，以及為每個事件指定 0 到 1 之間一個數的測度。條件機率、獨立和期望成為測度論裡的定義。Blaise Pascal 的賭博問題現在是積分的特例。',
  },
  'haar-measure': {
    message: '在局部緊拓樸群上構造平移不變測度',
    body: 'Alfréd Haar 證明每個局部緊拓樸群都帶有除常數倍外唯一的非零左不變 Radon 測度，使調和分析得以從歐氏空間推廣至一般 Lie 群與數論群。',
  },
  'whitney-embedding': {
    message: '內在定義抽象光滑流形並將其嵌入歐氏空間',
    body: 'Hassler Whitney 給出不依賴外圍空間的光滑流形座標圖冊定義，並證明任意 n 維光滑流形皆可光滑嵌入 ℝ²ⁿ。',
  },
  'lambda-calculus': {
    message: '定義能行可計算性及其限度',
    body: 'Alonzo Church 的 λ 演算是函數的函數的記法，他的論題提出這捕捉了每一個能行可計算的函數。他證明沒有演算法能一般地判定一個 λ 表達式是否有正規形。David Hilbert 的判定問題有了否定的答案。Alan Turing 正用機器獨立地回答它。',
  },
  'turing-machine': {
    message: '定義一台通用的計算機器',
    body: 'Alan Turing 描述一台有紙帶、有限狀態和動作表的機器。他表明有一台通用機器能模擬任何其他機器，也沒有機器能判定任意一台機器最終是否停機。論文也用 Alonzo Church 沒有走的路證明判定問題不可解。兩種定義後來表明是等價的。',
  },
  'sobolev-weak-derivatives': {
    message: '為偏微分方程引入弱導數與 Sobolev 空間',
    body: 'Сергей Соболев 透過對測試函數分部積分定義弱導數，並證明將弱導數 Lᵖ 範數轉化為古典光滑性的 Sobolev 嵌入定理。',
  },
  switching: {
    message: '把 George Boole 代數用到開關電路',
    body: 'Claude Shannon 的碩士論文在1938年發表，表明繼電器電路和 George Boole 代數是同一個結構。電路是一個命題。簡化一個就是簡化另一個。George Boole 為三段論寫的演算，變成設計機器的工具。boolean-algebra 這個檔案在加入九十一年後又被碰了一下。',
  },
  'kantorovich-linear-programming': {
    message: '提出線性規劃與對偶影子價格',
    body: '受列寧格勒膠合板信託廠委託分配機台產能，Леонид Канторович 建立不等式約束下的線性最佳化模型，並引入對偶乘子（影子價格）。',
  },
  'godel-constructible-universe': {
    message: '在可構造宇宙 L 中證明選擇公理與連續統假設的一致性',
    body: 'Kurt Gödel 在 ZF 集合論內部構造可構造集合的內模型 L，證明選擇公理與廣義連續統假設在 L 中皆成立，因此不可能從 ZF 被否證。',
  },
  'gelfand-banach-algebras': {
    message: '將交換 Banach 代數表示為極大理想空間上的函數代數',
    body: 'Израиль Гельфанд 的〈賦範環〉為任意交換 Banach 代數配備緊 Hausdorff 極大理想空間與 Gelfand 變換，並用短短三頁證明 Norbert Wiener 的一般 Tauber 定理。',
  },
  'game-theory': {
    message: '發表博弈論',
    body: 'John von Neumann 與 Oskar Morgenstern 的《博弈論與經濟行為》把策略局勢當成數學：一組參與者、策略和報酬。對二人零和博弈，極小極大定理說存在一個穩定的值。期望效用被公理化，使偏好對應到數。John Nash 會把均衡的想法擴到零和之外。',
  },
  'ito-stochastic-calculus': {
    message: '定義隨機積分與伊藤引理',
    body: '由於布朗運動路徑變差無界且二次變差 (dW_t)² = dt 非零，伊藤清建立隨機積分與帶有二階導數修正項的伊藤連鎖律（Itô’s lemma）。',
  },
  categories: {
    message: '引入範疇和函子',
    body: '一個範疇是物件、箭頭和合成律。函子把一個範疇帶進另一個，並保持合成。Samuel Eilenberg 和 Saunders Mac Lane 為代數拓樸發明這種語言，以便說什麼是「自然」的變換。它成了整個科目的語言。這份紀錄裡後來的許多提交都是函子，不管它們有沒有這麼說。',
  },
  'forced-oscillations': {
    message: '在受迫振子裡找到多得離譜的週期',
    body: 'Mary Cartwright 和 J. E. Littlewood 證明，受迫的 van der Pol 方程可以有無窮多個不同週期的週期解。工作是在回答無線電工程的一個問題。後來拿著 Edward N. Lorenz 和 Stephen Smale 再讀，它是後來叫作混沌的東西的早期圖。他們沒有用那個詞。',
  },
  'monte-carlo': {
    message: '用隨機抽樣估計難算的和',
    body: '在洛斯阿拉莫斯，Stanisław Ulam 看出一種紙牌遊戲玩很多次比分析更容易，並提議對中子擴散做同樣的事。John von Neumann 算出如何在機器上做。Nicholas Metropolis 把它命名為蒙地卡羅。這個方法是被當成演算法來用的機率，所以它放在計算下面。',
  },
  'chern-characteristic-classes': {
    message: '定義複向量叢的陳類（Chern classes）',
    body: '繼在普林斯頓給出高維 Gauss–Bonnet 定理的內蘊證明後，陳省身引入複向量叢的特徵上同調類 c_k(E)，將局部曲率微分形式連到全域拓樸不變量。',
  },
  simplex: {
    message: '沿著多面體走來解線性規劃',
    body: '多面體約束上的線性目標在一個頂點達到最大。單純形演算法從頂點走到相鄰頂點，改進目標，直到不能再改進。George Dantzig 為規劃問題設計它。最壞的例子很慢；典型的例子快得驚人。幾何解釋了兩者。',
  },
  information: {
    message: '把資訊定義成熵',
    body: '《通訊的數學理論》把信源的資訊量定義成熵，證明信源編碼定理，並證明有噪通道有一個容量，低於它就能可靠傳輸。位元作為單位，背後有一條定理。這是 Claude Shannon 在紀錄裡的第二筆提交，它打開一個目錄。',
  },
  'weil-conjectures': {
    message: '寫下韋伊猜想',
    body: 'André Weil 提出：在有限體上數多項式方程式的解，由一種當時還不存在的上同調支配，而且這些計數滿足黎曼假設的類比。猜想為 Alexander Grothendieck 的代數幾何設定目標。Pierre Deligne 在1974年證明最後一條。猜想檔案留著；證明加在旁邊。',
  },
  'erdos-selberg-elementary-pnt': {
    message: '給出質數定理的初等證明',
    body: '由 Atle Selberg 的質數漸近對稱公式出發，Pál Erdős 與 Atle Selberg 構造出完全不使用複分析與 zeta 函數零點的質數定理初等證明。',
  },
  'nash-equilibrium': {
    message: '為 n 人博弈定義均衡',
    body: 'John Nash 均衡是一組策略，沒有參與者能靠自己換策略來提高報酬。John Nash 用不動點定理證明，若允許混合策略，每一個有限博弈至少有一個。John von Neumann 和 Oskar Morgenstern 解決了二人零和的情形。這筆提交拿掉兩個限制。',
  },
  'schwartz-distributions': {
    message: '在《分布理論》中將廣義函數嚴格化',
    body: 'Laurent Schwartz 將分布定義為緊支撐光滑測試函數空間上的連續線性泛函，使 Dirac δ 函數與弱導數皆可無窮次微分並進行傅立葉變換。',
  },
  'hamming-error-correcting': {
    message: '在 Hamming 空間構造錯誤更正碼',
    body: '因為繼電器電腦常在週末因單一位元錯誤而停機，Richard Hamming 定義二進位字串的 Hamming 距離，並構造出能自動糾正任意單一位元翻轉的 [7, 4] 線性方塊碼。',
  },
  'arrow-impossibility': {
    message: '證明社會選擇的 Arrow 不可能定理',
    body: 'Kenneth Arrow 證明：當選項有三個以上時，沒有任何排序投票規則能同時滿足帕累托效率、無關選項獨立性與非獨裁性。',
  },
  'kodaira-embedding': {
    message: '以小平嵌入定理刻畫複射影代數簇',
    body: '小平邦彦利用調和微分形式與層上同調消沒定理，證明緊 Kähler 流形可嵌入複射影空間當且僅當其 Kähler 類為整上同調類。',
  },
  'serre-faisceaux': {
    message: '在 FAC 中以凝聚層上同調重寫代數幾何',
    body: 'Jean-Pierre Serre 的〈代數凝聚層〉（FAC）在任意代數閉體上的代數簇引入 Zariski 拓樸與 Čech 凝聚層上同調。',
  },
  'taniyama-shimura-conjecture': {
    message: '提出有理數體上的橢圓曲線皆為模曲線',
    body: '谷山豊在1955年東京—日光國際研討會提出問題，將橢圓曲線的 L 級數連向自守形式；志村五郎與 André Weil 將其精確化為模性猜想，成為後來證明費馬最後定理的橋樑。',
  },
  'exotic-spheres': {
    message: '在七維球上找到奇異的光滑結構',
    body: 'John Milnor 構造出與七維球面同胚、卻不微分同胚的光滑流形。拓樸和微分拓樸分開了。一旦維度夠高，標準球面不是具有那個形狀的唯一光滑物件。第七維是這件事第一次發生的地方。',
  },
  'dijkstra-shortest-path': {
    message: '以貪婪鬆弛演算法尋找圖上最短路徑',
    body: '為了展示阿姆斯特丹的 ARMAC 電腦，Edsger W. Dijkstra 用二十分鐘設計出從起點逐步擴展最短路徑樹的演算法。',
  },
  'grothendieck-riemann-roch': {
    message: '在 Grothendieck–Riemann–Roch 定理中將 K 理論連向上同調',
    body: 'Alexander Grothendieck 將 Hirzebruch–Riemann–Roch 定理從單一簇推廣到固有態射 f: X → Y，把定理改寫為函子性質並創立 K 理論的 Grothendieck 群 K₀。',
  },
  'erdos-renyi-random-graphs': {
    message: '發現隨機圖中的急遽相變',
    body: 'Pál Erdős 與 Alfréd Rényi 研究隨機選邊構成的圖，證明當平均度數跨過 1 時，圖中會突然湧現出包含正比例頂點的巨大連通分支。',
  },
  schemes: {
    message: '用概形取代簇',
    body: '概形是由環的譜黏起來的空間，於是算術和幾何共用一種語言。Alexander Grothendieck 的 EGA 和討論班 SGA，與一大圈合作者一起寫成，圍繞這個定義重建代數幾何。André Weil 猜想變得可以接近，因為有限體和複數現在是同一種基。這筆提交是一個名字寫在集體的儲存庫上。',
  },
  trajectories: {
    message: '用手計算軌道',
    body: 'Katherine Johnson 為美國最早的載人太空飛行計算發射窗口和軌跡，並合寫一份技術報告，講把衛星放到地球上選定點上空的方位角。這是數值分析，誤差項關係到人命。這份紀錄把它歸在計算下面，挨著其他告訴機器某物將在何處的演算法。',
  },
  'kalman-filter': {
    message: '從含雜訊的觀測中遞迴估計動態系統狀態',
    body: 'Rudolf E. Kálmán 在時域中提出狀態空間線性濾波器，每當新的含雜訊觀測到達時即遞迴更新最小變異數狀態估計——不久後即用於阿波羅登月導航電腦。',
  },
  'smale-high-dim-poincare': {
    message: '證明五維及以上的廣義龐加萊猜想',
    body: 'Stephen Smale 在里約熱內盧海灘上透過高維流形的柄體消去（h-配邊定理），證明當維度 n ≥ 5 時有足夠空間解開糾結，從而解決高維龐加萊猜想。',
  },
  'gale-shapley-matching': {
    message: '以延遲接受演算法證明穩定配對必存在',
    body: 'David Gale 與 Lloyd Shapley 證明：對任意兩邊偏好名單，他們的延遲接受（deferred-acceptance）演算法必定在有限步內停在一個不存在私奔阻礙對的穩定配對。',
  },
  forcing: {
    message: '表明連續統假設是獨立的',
    body: 'Paul Cohen 的力迫使集合論有連續統假設失敗的模型，也有它成立的模型。加上 Kurt Gödel 更早的、它在其中成立的模型，這表明該假設獨立於帶選擇公理的 Zermelo–Fraenkel 集合論。Georg Cantor 關於實數大小的問題，在通常公理裡沒有答案。Paul Cohen 在1966年獲得菲爾茲獎。',
  },
  'index-theorem': {
    message: '宣布指標定理',
    body: '橢圓微分算子的解析指標等於由流形和算子的象徵算出的拓樸指標。Michael Atiyah 和 Isadore Singer 在1963年宣布，1968年發表證明。它說明分析裡某些存在問題其實是拓樸問題，並把幾個以前看起來不像同一條定理的不變量連起來。',
  },
  'lorenz-strange-attractor': {
    message: '在奇異吸引子上觀察到確定性混沌',
    body: 'Edward N. Lorenz 在麻省理工學院把氣象模擬的初始值從小數六位四捨五入到三位，發現兩條軌跡完全分道揚鑣，並發表三變數對流方程與蝴蝶形分形奇異吸引子。',
  },
  'feit-thompson-odd-order': {
    message: '證明每一個奇數階有限群都是可解群',
    body: 'Walter Feit 與 John G. Thompson 以整整一期 255 頁的期刊篇幅證明 William Burnside 的猜想：每一個非交換有限單群的階數必為偶數。',
  },
  'hironaka-resolution': {
    message: '在特徵零體上消解代數簇的奇點',
    body: '広中平祐以精巧的多重歸納不變量證明：特徵零體上的任意代數簇，皆可透過沿光滑中心進行有限次爆破（blow-up）化為光滑代數簇。',
  },
  fft: {
    message: '發表快速傅立葉變換',
    body: 'James Cooley–John Tukey 演算法用 n log n 階的步數而不是 n² 來計算離散傅立葉變換。Carl Friedrich Gauß 約在1805年寫過類似的方法，從未發表。1965年的論文到來時，數位機器使這個差別成為決定性的。訊號處理和大量數值分析都改以這個複雜度為底。',
  },
  'buchberger-grobner': {
    message: '為多項式理想計算 Gröbner 基底',
    body: 'Bruno Buchberger 在因斯布魯克的博士論文中提出 S-多項式約化演算法，為多變數多項式理想構造標準生成基底，統一高斯消去法與歐幾里得輾轉相除法。',
  },
  'bsd-conjecture': {
    message: '提出 Birch 與 Swinnerton-Dyer 猜想',
    body: 'Bryan Birch 與 Peter Swinnerton-Dyer 根據劍橋 EDSAC-2 電腦上的大量數值計算，猜想有理數體上橢圓曲線有理點群的秩等於其 L 函數在 s = 1 處的零點階數。',
  },
  'carleson-fourier-convergence': {
    message: '證明 L² 函數的傅立葉級數幾乎處處收斂',
    body: '繼 Андрей Колмогоров 於1923年構造出處處發散的 L¹ 傅立葉級數後，Lennart Carleson 於1966年證明 Николай Лузин 的猜想：任意平方可積函數的傅立葉級數幾乎處處收斂。',
  },
  'langlands-letter': {
    message: '把朗蘭茲綱領寄給 André Weil',
    body: '在一封十七頁的信裡，Robert Langlands 提出伽羅瓦表示和自守形式在廣大的群的風景裡以精確的方式對上。信是綱領，不是定理。其中一些現在是定理，包括蘊含費馬的模性。對應的幾何形式在2024年得到證明。數論的綱領仍然開著，檔案仍是猜想。',
  },
  'strassen-matrix-multiplication': {
    message: '用七次乘法乘開 2×2 矩陣',
    body: 'Volker Strassen 證明矩陣乘法的 O(n³) 演算法並非最佳：用 7 次乘法與 18 次加減遞迴相乘 2×2 分塊矩陣，可將複雜度指數降到 log₂ 7 ≈ 2.807。',
  },
  'hilbert-tenth': {
    message: '完成 David Hilbert 第十問題的否定解答',
    body: '沒有演算法能判定給定的丟番圖方程式是否有整數解。Юрий Матиясевич 用 Fibonacci 數列表明每一個遞迴可枚舉集合都是丟番圖的，從而結束證明。定理同樣屬於 Martin Davis、Hilary Putnam 和 Julia Robinson，是他們造好他完成的那台機器。David Hilbert 在1900年提出的第十問題是不可判定的。',
  },
  'conway-game-of-life': {
    message: '定義生命遊戲細胞自動機',
    body: 'John Horton Conway 設計出二維零玩家細胞自動機「生命遊戲」，僅靠四條局部生滅規則即可湧現滑翔機、發射器與通用圖靈計算。',
  },
  'cook-levin-np-completeness': {
    message: '定義 NP 完全性並提出 P 與 NP 問題',
    body: 'Stephen Cook（以及蘇聯獨立研究的 Леонид Левин）證明所有非確定性多項式時間搜尋問題皆可歸約至布爾可滿足性問題（SAT）；翌年 Richard M. Karp 證明 21 個經典組合與圖論問題皆為 NP 完全。',
  },
  'chen-prime-theorem': {
    message: '證明大偶數皆可表為一個質數與一個殆質數之和',
    body: '陳景潤以加權篩法證明：每一個充分大的偶數都可以寫成一個質數與一個不超過兩個質數之積的和（陳氏定理「1+2」），這是迄今朝哥德巴赫猜想推進最深的一步。',
  },
  'black-scholes-merton': {
    message: '以連續時間動態避險為選擇權定價',
    body: 'Fischer Black 與 Myron Scholes（以及推廣理論的 Robert Merton）將伊藤清的引理應用於股票與債券的動態避險投資組合，消去隨機風險並導出 Black–Scholes 偏微分方程。',
  },
  'weil-proof': {
    message: '證明有限體上的黎曼假設',
    body: 'Pierre Deligne 證明最後一條 André Weil 猜想：有限體上簇的上同調裡，Frobenius 的特徵值具有 André Weil 預測的大小。Alexander Grothendieck 的上同調理論提供場所。古典的黎曼假設是另一句話，仍然開著。這一條是定理。',
  },
  fractals: {
    message: '為分形幾何命名',
    body: 'Benoît Mandelbrot 研究粗糙在許多尺度上重複的形狀：海岸線、湍流，以及將帶著他名字的那個集合。分形維度不必是整數。1975年的書為這個科目命名；1982年的《大自然的分形幾何》把它傳開。Felix Hausdorff 維度的數學更老。這筆提交是決定把粗糙當成一種幾何。',
  },
  'szemeredi-theorem': {
    message: '證明具正上密度的整數子集必含任意長等差數列',
    body: 'Endre Szemerédi 解決了 Pál Erdős 與 Pál Turán 於1936年提出的猜想，用純組合方法證明任何具有正上密度的整數子集都包含任意有限長度的等差數列，並在證明中提出圖論正則性引理。',
  },
  'feigenbaum-universality': {
    message: '發現倍週期分岔通往混沌的普適標度律',
    body: 'Mitchell Feigenbaum 在洛斯阿拉莫斯用 HP-65 掌上型計算機發現：單峰映射通往混沌的倍週期分岔參數間距之比，普適地收斂於常數 δ ≈ 4.6692016。',
  },
  'four-color': {
    message: '用一組不可避免的構型證明四色定理',
    body: '每一張平面地圖都可以用四種顏色著色，使相鄰區域不同色。Kenneth Appel 和 Wolfgang Haken 把定理化成有限而很大的一組構型，並用電腦檢查。這是第一個出名的、人無法用手通覽的證明。Neil Robertson、Daniel P. Sanders、Paul Seymour 和 Robin Thomas 在1997年給出更簡單的電腦證明，Georges Gonthier 在2005年用 Coq 形式化了一個。',
  },
  'diffie-hellman': {
    message: '在公開通道上建立共享秘密金鑰',
    body: 'Whitfield Diffie 與 Martin Hellman 利用有限體上模指數運算的單向性，展示素未謀面的雙方如何在公開竊聽的通道上協商出共同的加密金鑰。',
  },
  'yau-calabi-conjecture': {
    message: '證明 Ricci 平坦 Kähler 度量的 Calabi 猜想',
    body: '丘成桐建立複 Monge–Ampère 方程的先驗估計，證明 Eugenio Calabi 於1954年提出的猜想：第一陳類為零的緊 Kähler 流形必容許唯一的 Ricci 平坦度量（Calabi–Yau 流形）。',
  },
  rsa: {
    message: '從因數分解發表公鑰密碼系統',
    body: 'RSA 用公開的指數和兩個大質數之積的公開模數加密，用私有指數解密。安全依賴因數分解的困難，那不是定理，只是一個頑固的事實。英國政府通信總部的 Clifford Cocks 在1973年找到同樣的構造，不能發表。公開的提交是1977年，Ron Rivest、עדי שמיר 與 Leonard Adleman 三位作者並不知道他。',
  },
  'wu-characteristic-sets': {
    message: '以特徵列方法實現幾何定理機器證明',
    body: '吳文俊結合 Joseph Fels Ritt 的微分代數與中國古代籌算消元傳統，提出特徵列方法（吳方法），在電腦上自動證明數百條非平凡的初等與微分幾何定理。',
  },
  'khachiyan-ellipsoid': {
    message: '以橢球法證明線性規劃屬於多項式時間',
    body: 'Леонид Хачиян 將凸最佳化的橢球演算法應用於線性不等式系統，首次證明線性規劃可在輸入位元長度的多項式時間內求解。',
  },
  'classification-finite-simple-groups': {
    message: '宣布完成有限單群分類定理',
    body: 'Daniel Gorenstein 宣布完成跨世代的有限單群分類工程（准薄情形於2004年由 Michael Aschbacher 與 Stephen D. Smith 補齊）：每個有限單群皆為循環群、交錯群、Lie 型群，或以魔群（Monster）為首的 26 個散在單群之一。',
  },
  'ricci-flow': {
    message: '引入里奇流',
    body: 'Richard Hamilton 定義一種流，讓黎曼度量沿里奇曲率的方向變形，像形狀的熱方程。他證明在里奇曲率為正的閉三維流形上，流收斂到圓球。曲率爆炸的奇點擋住一般情形。Григорий Перельман 會分析那些奇點。',
  },
  'yang-mills': {
    message: '證明楊—米爾斯聯絡的緊性',
    body: 'Karen Uhlenbeck 表明，適當控制的楊—米爾斯聯絡序列，除了能量冒泡而去的有限個點之外都會收斂，而且有限能量的孤立奇點可以去掉。規範理論得到它需要的解析估計。這項工作是幾何偏微分方程的分析成為自己的領域的原因之一。',
  },
  'geometrization-conjecture': {
    message: '寫下幾何化猜想',
    body: 'William Thurston 提出：每一個閉的三維流形都能沿球面和環面切成塊，每塊帶著八種模型幾何之一。雙曲幾何是典型的一種。他自己的工作證明了很大的類，包括許多在圓上成纖維的。包含龐加萊猜想的一般陳述，要等里奇流。',
  },
  'freedman-4-manifolds': {
    message: '分類單連通四維拓樸流形並證明四維龐加萊猜想',
    body: 'Michael Freedman 利用無窮 Casson 柄體，以相交形式與 Kirby–Siebenmann 不變量完整分類閉單連通四維拓樸流形，並證明四維拓樸龐加萊猜想。',
  },
  mordell: {
    message: '證明莫德爾猜想',
    body: '定義在有理數上、虧格大於一的光滑代數曲線只有有限個有理點。Gerd Faltings 在1983年證明這一點。費馬方程式改寫成曲線後，對大的指數虧格大於一，所以每一個這樣的指數只有有限個本原解。有限性不是完整的費馬定理。它是解不能永遠繼續下去的結構性理由。',
  },
  'donaldson-gauge-4-manifolds': {
    message: '用 Yang–Mills 瞬子模空間約束四維光滑流形',
    body: 'Simon Donaldson 利用反自對偶 Yang–Mills 聯絡模空間證明：具正定相交形式的單連通四維光滑流形，其相交形式必可對角化——結合 Michael Freedman 的拓樸分類，這意味著歐氏空間 ℝ⁴ 竟有無窮多種互不等價的奇異光滑結構。',
  },
  'jones-polynomial': {
    message: '從 von Neumann 代數發現紐結的 Jones 多項式',
    body: 'Vaughan Jones 在研究 II₁ 型 von Neumann 代數子因子的指標時，發現滿足辮群關係的跡，從而得出能區分許多手性紐結與其鏡像的 Laurent 多項式不變量。',
  },
  'karmarkar-interior-point': {
    message: '穿過多面體內部快速求解線性規劃',
    body: 'नरेन्द्र करमरकर 提出射影尺度內點演算法，不再沿可行多面體邊界頂點行走，而是直接穿過多面體內部，同時兼具多項式時間複雜度與媲美單純形法的實務速度。',
  },
  bieberbach: {
    message: '證明比伯巴赫猜想',
    body: '對把單位圓盤單射映到一個區域的全純函數，若 f(0) = 0 且 f′(0) = 1，第 n 個泰勒係數的絕對值至多是 n。Ludwig Bieberbach 在1916年猜想這一點。Louis de Branges 證明它；論證在1985年被核對並簡化。一個看起來像小趣味的係數界，成為關於極值形狀的定理。',
  },
  'gromov-pseudoholomorphic': {
    message: '在辛拓樸中引入偽全純曲線並證明非擠壓定理',
    body: 'Михаил Громов 將偽全純曲線引入辛流形，證明辛非擠壓定理（無法透過辛同胚把球塞進截面更細的圓柱），開啟現代辛拓樸與 Gromov–Witten 理論。',
  },
  'daubechies-wavelets': {
    message: '構造緊支撐正交小波基底',
    body: 'Ingrid Daubechies 構造出具有緊支撐與任意光滑度的正交小波函數族，使快速離散小波變換成為時頻局部分析與影像壓縮的核心工具。',
  },
  'monstrous-moonshine': {
    message: '以頂點算子代數證明魔群月光猜想',
    body: 'Richard Borcherds 讓有限單群中最大的魔群（Monster group）作用在無窮維頂點算子代數上，並利用廣義 Kac–Moody 代數分母恆等式證明模函數 j(τ) − 744 的係數恰好是魔群不可約表示的維度之和。',
  },
  shor: {
    message: '在量子電腦上分解整數',
    body: 'Peter Shor 演算法在量子電腦上以多項式時間分解整數，用量子傅立葉變換找出模指數的週期。RSA 那個頑固的事實——因數分解很難——是關於古典機器的事實。這個演算法是關於量子機器的定理。造出大到能在密碼學尺寸上跑它的機器是另一個問題，仍然開著。',
  },
  'fermat-theorem': {
    message: '證明費馬最後定理',
    body: 'Andrew Wiles 證明有理數上每一條半穩定橢圓曲線都是模的。Ken Ribet 曾表明那種模性蘊含費馬最後定理。1993年的宣布在一個 Euler 系統裡有缺口；Richard Taylor 和 Andrew Wiles 在1995年用另一個論證補上。1637年的頁邊筆記是定理。猜想檔案仍留在樹上，因為儲存庫就是這樣記住曾經被聲稱的東西。',
  },
  'lafforgue-function-fields': {
    message: '證明函數體上 GL_n 的全域朗蘭茲對應',
    body: 'Laurent Lafforgue 推廣 Владимир Дринфельд 在 GL₂ 的工作，利用 shtuka 模疊的緊化證明正特徵函數體上任意階一般線性群 GL_n 的全域朗蘭茲對應。',
  },
  'full-modularity-theorem': {
    message: '證明有理數體上所有橢圓曲線的完整模性定理',
    body: 'Christophe Breuil、Brian Conrad、Fred Diamond 與 Richard Taylor 徹底移除 Andrew Wiles 定理中的半穩定限制，證明有理數體上的每一條橢圓曲線皆為模曲線。',
  },
  aks: {
    message: '把質數判定放進確定性多項式時間',
    body: 'AKS 檢驗在位數的多項式時間內判定一個數是否為質數，沒有隨機，也沒有未證明的假設。更早實用的檢驗要麼隨機，要麼依賴猜想。मणीन्द्र अग्रवाल、नीरज कयाल 和 नितिन सक्सेना 在印度理工學院坎普爾分校表明 PRIMES 屬於 P。演算法在實務上不是最快的。它解決了複雜度問題。',
  },
  geometrization: {
    message: '用帶手術的里奇流證明幾何化',
    body: 'Григорий Перельман 貼出三篇預印本，分析 Richard Hamilton 里奇流的奇點，並做手術穿過它們。流把閉的三維流形化成 William Thurston 描述的幾何塊。龐加萊猜想是每條迴圈都能收縮的特例。到2006年，論證被幾個團隊核對。他拒絕菲爾茲獎，後來也拒絕克雷千年獎。',
  },
  'green-tao': {
    message: '在質數裡找到任意長度的等差數列',
    body: '質數含有每一種有限長度的等差數列：三項、四項、一千項，排成公差相同的一列。Ben Green 和陶哲軒把 Endre Szemerédi 關於稠密集的定理轉移到一個在精確意義上表現得像稠密的稀疏集，從而證明這一點。Peter Gustav Lejeune Dirichlet 有過長度為二的質數等差，形式是線性數列裡的無窮多個質數。任意長度是新的。',
  },
  'robertson-seymour-minors': {
    message: '完成圖子式定理（Graph Minor Theorem）',
    body: 'Neil Robertson 與 Paul Seymour 發表第二十篇圖子式論文，完成 Klaus Wagner 猜想的證明：任意無窮多個有限圖的族中必有一圖為另一圖的子式（minor），因此任何對子式封閉的性質皆可由有限個禁用子式刻畫。',
  },
  'gonthier-coq-four-color': {
    message: '在 Coq 證明助手中完成四色定理的形式化驗證',
    body: 'Georges Gonthier 與合作者將四色定理的圖構型簡化證明完整轉譯為 Coq 證明助手可逐一核驗的形式證明，消除對電腦窮舉可靠性的哲學疑慮。',
  },
  'compressed-sensing': {
    message: '以 ℓ₁ 最小化從低採樣率線性觀測精確重建稀疏訊號',
    body: 'Emmanuel Candès、陶哲軒與 Justin Romberg，以及獨立研究的 David Donoho 證明：當訊號具有稀疏性時，可用遠低於 Nyquist 採樣率的隨機線性測量，透過凸 ℓ₁ 最小化精確還原訊號。',
  },
  'moduli-volumes': {
    message: '算出曲面模空間的體積',
    body: 'مریم میرزاخانی 的論文給出帶邊黎曼曲面模空間在 Weil–Petersson 度量下的體積的遞迴公式，並重新證明 Edward Witten 關於相交數的猜想。後來的論文用這些空間上地震和撞球的動力系統。2014年的菲爾茲獎承認這一整體工作。這筆提交是數學本身，年代標在論文上。',
  },
  'ngo-fundamental-lemma': {
    message: '證明朗蘭茲綱領的基本引理',
    body: 'Ngô Bảo Châu 利用 Hitchin 纖維化上的反常層（perverse sheaves）幾何化軌道積分，證明 Robert Langlands 與 Diana Shelstad 提出、推進跡公式不可或缺的基本引理。',
  },
  'bounded-gaps': {
    message: '把質數之間的間隔加上界',
    body: '張益唐證明相鄰質數的間隔對無窮多對而言至多是七千萬。這個數很大。質的事實是新的：有界的間隔永遠發生，而孿生質數猜想要的是上界為 2。他的證明把 GPY 篩法和對模數的限制合在一起。他一直在這個科目的主流通路之外工作。',
  },
  'small-gaps': {
    message: '把質數間隔的上界降到 600',
    body: 'James Maynard，以及獨立的陶哲軒，引入多維篩法，把張益唐的七千萬改進到 600，也能產生任意長的有界質數簇。一個 Polymath 合作接著把無條件上界再降，降到幾百的低段。孿生質數猜想，上界 2，仍然開著。張益唐加上的檔案在同一年被修訂。',
  },
  'kadison-singer': {
    message: '以交錯多項式族解決 Kadison–Singer 問題',
    body: 'Adam Marcus、Daniel Spielman 與 Nikhil Srivastava 引入特徵多項式的交錯族方法，構造出任意度數的二分 Ramanujan 圖，並一舉正面解決算子代數中懸置五十四年的 Kadison–Singer 問題。',
  },
  flyspeck: {
    message: '完成克卜勒猜想經機器檢查的證明',
    body: 'Thomas Hales 在1998年證明炮彈式堆積是空間裡等球最密的裝法。審稿人對電腦的情形分析並不完全確定。Flyspeck 計畫把證明改寫成證明助手能夠檢查的形式，檢查在2014年完成。一個含有定理的儲存庫，現在也含有一個能把證明編譯出來的建置。',
  },
  'hairer-regularity-structures': {
    message: '為奇異隨機偏微分方程建立正則性結構理論',
    body: 'Martin Hairer 建立由隨機樹展開構成的「正則性結構」理論，賦予 KPZ 介面生長方程等原本因非線性乘積發散而病態的奇異隨機偏微分方程嚴格的重整化意義。',
  },
  'viazovska-sphere-packing': {
    message: '證明 E₈ 晶格是八維空間最密的等球堆積',
    body: "Марина В'язовська 利用模形式與擬模形式構造出 Henry Cohn 與 Noam Elkies 預測的神奇徑向傅立葉特徵函數，以簡短俐落的證明確認 E₈ 晶格在八維歐氏空間達到最密球堆積。",
  },
  'liquid-tensor': {
    message: '在 Lean 裡形式化液態張量定理',
    body: 'Peter Scholze 在2020年12月提議，把他凝聚數學裡的一條關鍵定理放到 Lean 證明助手裡檢查，並願意審閱這份形式化。Johan Commelin、Patrick Massot 和許多貢獻者在2022年完成證明。Peter Scholze 寫道，他現在對論證有把握。這筆提交既是一條定理，也是「怎樣才算檢查過」的一次改變。',
  },
  pfr: {
    message: '證明多項式弗賴曼—魯薩猜想',
    body: '猜想控制：若一個集合的和集很小，它必須有多大。加倍很小的集合能被一個子空間有效覆蓋，而且界是多項式的。Timothy Gowers、Ben Green、Frederick Manners 和陶哲軒在指數有界的群上證明它。由陶哲軒帶領、一大群貢獻者參與的 Lean 形式化，在預印本之後幾週內跟上。Ben Green 在這份紀錄裡的第二次出現，距第一次二十年。',
  },
  'einstein-aperiodic-monotile': {
    message: '發現平面非週期單磚（“the hat”）',
    body: 'David Smith、Joseph Samuel Myers、Craig S. Kaplan 與 Chaim Goodman-Strauss 證明一塊十三邊形多鳶形單磚「帽子」（the hat）可以鋪滿整個歐氏平面，但絕不允許任何週期性平移鋪砌；同年又發現無需鏡像翻轉的手性單磚「Spectre」。',
  },
  'geometric-langlands': {
    message: '證明非分歧的幾何朗蘭茲猜想',
    body: '2024年的一系列五篇論文，在特徵零證明範疇性的非分歧幾何朗蘭茲猜想。Dennis Gaitsgory 和 Sam Raskin 帶領與 D. Arinkin、D. Beraldo、J. Campbell、L. Chen、J. Faergeman、K. Lin、N. Rozenblyum 的合作。陳述是範疇的等價：G 叢疊上的 D 模，與對偶群局部系統疊上的一層範疇。1967年那封信打開的數論朗蘭茲綱領是另一個檔案，它仍然開著。',
  },
}
