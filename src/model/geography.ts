import type { Locale } from '../i18n/locale.tsx'
import type { Playback } from '../viz/playback.ts'
import { commitTouches } from '../viz/playback.ts'
import { branchOf, BRANCH_COLOR, world, type World } from './history.ts'
import type { Author, Commit, Selection } from './types.ts'

export type GeoSite = {
  /** Latitude in degrees (-90 South to +90 North). */
  lat: number
  /** Longitude in degrees (-180 West to +180 East). */
  lon: number
  /** Angular radius on the globe in degrees representing the historical area. */
  radius: number
  /** English place/region name. */
  en: string
  /** Traditional Chinese place/region name. */
  zh: string
}

export type CommitGeo = {
  commitId: string
  year: number
  color: string
  primary: GeoSite
  sites: { authorId: string; site: GeoSite }[]
}

export type GlobeTarget = {
  lat: number
  lon: number
  radius: number
  label: string
  coords: string
  color: string
  activeSite: GeoSite
  coSites: GeoSite[]
  previousSite: GeoSite | null
  travel: number
}

/**
 * Base coordinates and area radii for all 79 contributor traditions.
 */
export const TRADITION_GEO: Record<string, GeoSite> = {
  Sumer: { lat: 31.32, lon: 45.64, radius: 5.5, en: 'Uruk · Sumer', zh: '蘇美 · 烏魯克' },
  Egypt: { lat: 29.85, lon: 31.25, radius: 6.0, en: 'Nile Valley · Egypt', zh: '埃及 · 尼羅河流域' },
  Mesopotamia: { lat: 32.54, lon: 44.42, radius: 6.2, en: 'Babylon · Mesopotamia', zh: '美索不達米亞 · 巴比倫' },
  India: { lat: 25.32, lon: 82.99, radius: 7.5, en: 'India', zh: '印度' },
  'Greek world': { lat: 38.25, lon: 22.5, radius: 6.0, en: 'Greek world · Aegean', zh: '希臘世界 · 愛琴海' },
  Alexandria: { lat: 31.2, lon: 29.92, radius: 3.6, en: 'Alexandria · Egypt', zh: '埃及 · 亞歷山大' },
  Syracuse: { lat: 37.07, lon: 15.29, radius: 3.2, en: 'Syracuse · Sicily', zh: '西西里 · 敘拉古' },
  'Hellenistic world': { lat: 36.96, lon: 30.85, radius: 5.5, en: 'Perga · Hellenistic world', zh: '希臘化世界 · 佩爾加' },
  Rhodes: { lat: 36.43, lon: 28.22, radius: 3.2, en: 'Rhodes · Aegean', zh: '愛琴海 · 羅德島' },
  Mesoamerica: { lat: 16.74, lon: -93.02, radius: 6.5, en: 'Chiapa de Corzo · Mesoamerica', zh: '中美洲 · 恰帕德科爾索' },
  China: { lat: 34.27, lon: 108.94, radius: 7.8, en: 'China', zh: '中國' },
  Baghdad: { lat: 33.31, lon: 44.36, radius: 4.0, en: 'Baghdad · House of Wisdom', zh: '巴格達 · 智慧宮' },
  'Upper Mesopotamia': { lat: 35.95, lon: 39.01, radius: 4.8, en: 'Raqqa · Upper Mesopotamia', zh: '上美索不達米亞 · 拉卡' },
  Cairo: { lat: 30.04, lon: 31.24, radius: 3.8, en: 'Cairo · Egypt', zh: '埃及 · 開羅' },
  Persia: { lat: 34.8, lon: 51.4, radius: 6.8, en: 'Persia', zh: '波斯' },
  Pisa: { lat: 43.72, lon: 10.4, radius: 3.2, en: 'Pisa · Italy', zh: '義大利 · 比薩' },
  France: { lat: 47.4, lon: 2.2, radius: 5.2, en: 'France', zh: '法國' },
  Kerala: { lat: 10.32, lon: 76.21, radius: 4.2, en: 'Kerala · Malabar Coast', zh: '印度 · 喀拉拉' },
  Italy: { lat: 44.8, lon: 10.8, radius: 4.8, en: 'Northern Italy', zh: '義大利北部' },
  Flanders: { lat: 51.21, lon: 3.22, radius: 3.6, en: 'Bruges · Flanders', zh: '法蘭德斯 · 布魯日' },
  'Holy Roman Empire': { lat: 50.08, lon: 14.44, radius: 5.5, en: 'Prague · Holy Roman Empire', zh: '神聖羅馬帝國 · 布拉格' },
  Scotland: { lat: 55.95, lon: -3.19, radius: 4.0, en: 'Edinburgh · Scotland', zh: '蘇格蘭 · 愛丁堡' },
  'Dutch Republic': { lat: 52.16, lon: 4.49, radius: 3.8, en: 'Leiden · Dutch Republic', zh: '荷蘭共和國 · 萊頓' },
  England: { lat: 52.1, lon: -0.1, radius: 4.4, en: 'England', zh: '英格蘭' },
  Hanover: { lat: 52.37, lon: 9.73, radius: 3.6, en: 'Hanover · Germany', zh: '德國 · 漢諾威' },
  Japan: { lat: 35.68, lon: 139.77, radius: 5.2, en: 'Edo · Japan', zh: '日本 · 江戶（東京）' },
  Switzerland: { lat: 47.56, lon: 7.59, radius: 3.8, en: 'Basel · Switzerland', zh: '瑞士 · 巴塞爾' },
  Basel: { lat: 47.56, lon: 7.59, radius: 3.2, en: 'Basel · Switzerland', zh: '瑞士 · 巴塞爾' },
  'Basel, Berlin, St. Petersburg': {
    lat: 59.94,
    lon: 30.31,
    radius: 5.5,
    en: 'St. Petersburg · Berlin · Basel',
    zh: '聖彼得堡 · 柏林 · 巴塞爾',
  },
  Milan: { lat: 45.46, lon: 9.19, radius: 3.2, en: 'Milan · Italy', zh: '義大利 · 米蘭' },
  'Turin and Paris': { lat: 48.86, lon: 2.35, radius: 4.5, en: 'Paris & Turin', zh: '巴黎與都靈' },
  Göttingen: { lat: 51.53, lon: 9.93, radius: 3.2, en: 'Göttingen · Germany', zh: '德國 · 哥廷根' },
  Prague: { lat: 50.08, lon: 14.44, radius: 3.4, en: 'Prague · Bohemia', zh: '波希米亞 · 布拉格' },
  Paris: { lat: 48.86, lon: 2.35, radius: 3.2, en: 'Paris · France', zh: '法國 · 巴黎' },
  Norway: { lat: 59.91, lon: 10.75, radius: 4.6, en: 'Christiania · Norway', zh: '挪威 · 奧斯陸' },
  Kazan: { lat: 55.79, lon: 49.12, radius: 3.8, en: 'Kazan · Russia', zh: '俄羅斯 · 喀山' },
  Hungary: { lat: 46.54, lon: 24.56, radius: 4.6, en: 'Marosvásárhely · Hungary', zh: '匈牙利 · 特란西瓦尼亞' },
  Berlin: { lat: 52.52, lon: 13.4, radius: 3.4, en: 'Berlin · Germany', zh: '德國 · 柏林' },
  Dublin: { lat: 53.35, lon: -6.26, radius: 3.4, en: 'Dublin · Ireland', zh: '愛爾蘭 · 都柏林' },
  London: { lat: 51.51, lon: -0.13, radius: 3.4, en: 'London · England', zh: '英國 · 倫敦' },
  'Ireland and England': { lat: 51.9, lon: -8.47, radius: 4.6, en: 'Cork · Ireland & England', zh: '愛爾蘭與英格蘭' },
  Cambridge: { lat: 52.2, lon: 0.12, radius: 3.2, en: 'Cambridge · England', zh: '英國 · 劍橋' },
  'Erlangen and Göttingen': { lat: 49.6, lon: 11.0, radius: 3.8, en: 'Erlangen & Göttingen', zh: '埃爾朗根與哥廷根' },
  Braunschweig: { lat: 52.27, lon: 10.52, radius: 3.2, en: 'Braunschweig · Germany', zh: '德國 · 布倫瑞克' },
  Halle: { lat: 51.48, lon: 11.97, radius: 3.2, en: 'Halle · Germany', zh: '德國 · 哈勒' },
  Germany: { lat: 50.73, lon: 7.1, radius: 4.8, en: 'Germany', zh: '德國' },
  Stockholm: { lat: 59.33, lon: 18.07, radius: 3.6, en: 'Stockholm · Sweden', zh: '瑞典 · 斯德哥爾摩' },
  Turin: { lat: 45.07, lon: 7.69, radius: 3.2, en: 'Turin · Italy', zh: '義大利 · 都靈' },
  Belgium: { lat: 50.88, lon: 4.7, radius: 3.6, en: 'Louvain · Belgium', zh: '比利時 · 魯汶' },
  Lwów: { lat: 49.84, lon: 24.03, radius: 3.6, en: 'Lwów (Lviv)', zh: '利沃夫' },
  Vienna: { lat: 48.21, lon: 16.37, radius: 3.4, en: 'Vienna · Austria', zh: '奧地利 · 維也納' },
  Moscow: { lat: 55.76, lon: 37.62, radius: 3.8, en: 'Moscow · Russia', zh: '俄羅斯 · 莫斯科' },
  Princeton: { lat: 40.35, lon: -74.66, radius: 3.2, en: 'Princeton · New Jersey', zh: '美國 · 普林斯頓' },
  'Bell Labs': { lat: 40.68, lon: -74.4, radius: 3.2, en: 'Bell Labs · New Jersey', zh: '美國 · 貝爾實驗室' },
  Columbia: { lat: 40.81, lon: -73.96, radius: 3.2, en: 'Columbia · New York', zh: '美國 · 哥倫比亞大學' },
  Chicago: { lat: 41.79, lon: -87.6, radius: 3.4, en: 'Chicago · Illinois', zh: '美國 · 芝加哥' },
  'Los Alamos': { lat: 35.88, lon: -106.3, radius: 3.6, en: 'Los Alamos · New Mexico', zh: '美國 · 洛斯阿拉莫斯' },
  'United States': { lat: 39.8, lon: -77.0, radius: 6.5, en: 'United States', zh: '美國' },
  'France and the United States': { lat: 41.79, lon: -87.6, radius: 5.5, en: 'France & United States', zh: '法國與美國' },
  NASA: { lat: 37.09, lon: -76.38, radius: 3.6, en: 'NASA Langley · Virginia', zh: '美國 · 國家航空暨太空總署' },
  Stanford: { lat: 37.43, lon: -122.17, radius: 3.4, en: 'Stanford · California', zh: '美國 · 史丹佛' },
  Oxford: { lat: 51.75, lon: -1.26, radius: 3.2, en: 'Oxford · England', zh: '英國 · 牛津' },
  MIT: { lat: 42.36, lon: -71.09, radius: 3.2, en: 'MIT · Cambridge, MA', zh: '美國 · 麻省理工學院' },
  Leningrad: { lat: 59.94, lon: 30.31, radius: 3.6, en: 'Leningrad (St. Petersburg)', zh: '列寧格勒（聖彼得堡）' },
  IHÉS: { lat: 48.7, lon: 2.17, radius: 3.2, en: 'IHÉS · Bures-sur-Yvette', zh: '法國高等科學研究所' },
  'IBM and Yale': { lat: 41.21, lon: -73.72, radius: 3.8, en: 'IBM Yorktown & Yale', zh: 'IBM 與耶魯大學' },
  Illinois: { lat: 40.11, lon: -88.23, radius: 3.6, en: 'Urbana-Champaign · Illinois', zh: '美國 · 伊利諾大學' },
  'MIT and Weizmann': { lat: 31.91, lon: 34.81, radius: 4.5, en: 'MIT & Weizmann Institute', zh: '麻省理工學院與魏茨曼研究所' },
  'MIT and USC': { lat: 34.02, lon: -118.29, radius: 4.5, en: 'MIT & USC · Los Angeles', zh: '麻省理工學院與南加州大學' },
  Cornell: { lat: 42.45, lon: -76.48, radius: 3.4, en: 'Cornell · Ithaca, NY', zh: '美國 · 康奈爾大學' },
  Purdue: { lat: 40.42, lon: -86.92, radius: 3.4, en: 'Purdue · Indiana', zh: '美國 · 普渡大學' },
  Kanpur: { lat: 26.51, lon: 80.23, radius: 3.6, en: 'IIT Kanpur · India', zh: '印度 · 坎普爾' },
  'St. Petersburg': { lat: 59.94, lon: 30.31, radius: 3.6, en: 'St. Petersburg · Russia', zh: '俄羅斯 · 聖彼得堡' },
  UCLA: { lat: 34.07, lon: -118.44, radius: 3.4, en: 'UCLA · Los Angeles', zh: '美國 · 加州大學洛杉磯分校' },
  Pittsburgh: { lat: 40.44, lon: -79.96, radius: 3.4, en: 'Pittsburgh · Pennsylvania', zh: '美國 · 匹茲堡' },
  Bonn: { lat: 50.73, lon: 7.1, radius: 3.2, en: 'Bonn · Germany', zh: '德國 · 波恩' },
  Freiburg: { lat: 47.99, lon: 7.85, radius: 3.2, en: 'Freiburg · Germany', zh: '德國 · 弗萊堡' },
  'UC San Diego': { lat: 32.88, lon: -117.23, radius: 3.4, en: 'UC San Diego · California', zh: '美國 · 加州大學聖地牙哥分校' },
  Yale: { lat: 41.31, lon: -72.92, radius: 3.2, en: 'Yale · New Haven', zh: '美國 · 耶魯大學' },
  Gandhara: { lat: 34.02, lon: 71.98, radius: 4.8, en: 'Shalatura & Taxila · Gandhara', zh: '犍陀羅 · 娑羅覩羅與怛叉始羅' },
  'Roman Syria': { lat: 32.28, lon: 35.89, radius: 4.2, en: 'Gerasa · Roman Syria', zh: '羅馬敘利亞 · 傑拉什' },
  Damascus: { lat: 33.51, lon: 36.29, radius: 3.8, en: 'Damascus · Syria', zh: '敘利亞 · 大馬士革' },
  'Khwarazm and Ghazni': { lat: 33.55, lon: 68.42, radius: 5.5, en: 'Ghazni & Khwarazm', zh: '加茲尼與花剌子模' },
  Samarkand: { lat: 39.65, lon: 66.96, radius: 4.0, en: 'Samarkand · Transoxiana', zh: '河中地區 · 撒馬爾罕' },
  Provence: { lat: 44.14, lon: 4.81, radius: 3.8, en: 'Orange · Provence', zh: '普羅旺斯 · 奧朗日' },
  Florence: { lat: 43.77, lon: 11.26, radius: 3.4, en: 'Florence · Italy', zh: '義大利 · 佛羅倫斯' },
  Bologna: { lat: 44.49, lon: 11.34, radius: 3.4, en: 'Bologna · Italy', zh: '義大利 · 波隆那' },
  Padua: { lat: 45.41, lon: 11.88, radius: 3.4, en: 'Padua · Italy', zh: '義大利 · 帕多瓦' },
  Poland: { lat: 54.35, lon: 19.68, radius: 4.6, en: 'Frombork · Poland', zh: '波蘭 · 弗龍堡' },
  Warsaw: { lat: 52.23, lon: 21.01, radius: 3.8, en: 'Warsaw · Poland', zh: '波蘭 · 華沙' },
  Korea: { lat: 37.57, lon: 126.98, radius: 4.5, en: 'Hanseong (Seoul) · Joseon', zh: '朝鮮 · 漢城（首爾）' },
  Geneva: { lat: 46.2, lon: 6.14, radius: 3.2, en: 'Geneva · Switzerland', zh: '瑞士 · 日內瓦' },
  Zürich: { lat: 47.37, lon: 8.54, radius: 3.2, en: 'Zürich · Switzerland', zh: '瑞士 · 蘇黎世' },
  Copenhagen: { lat: 55.68, lon: 12.57, radius: 3.6, en: 'Copenhagen · Denmark', zh: '丹麥 · 哥本哈根' },
  Königsberg: { lat: 54.71, lon: 20.51, radius: 3.6, en: 'Königsberg · Prussia', zh: '普魯士 · 哥尼斯堡' },
  Leipzig: { lat: 51.34, lon: 12.37, radius: 3.4, en: 'Leipzig · Germany', zh: '德國 · 萊比錫' },
  Jena: { lat: 50.93, lon: 11.59, radius: 3.2, en: 'Jena · Germany', zh: '德國 · 耶拿' },
  Hamburg: { lat: 53.55, lon: 9.99, radius: 3.4, en: 'Hamburg · Germany', zh: '德國 · 漢堡' },
  Kharkov: { lat: 49.99, lon: 36.23, radius: 3.8, en: 'Kharkov (Kharkiv)', zh: '哈爾科夫' },
  Budapest: { lat: 47.5, lon: 19.04, radius: 3.6, en: 'Budapest · Hungary', zh: '匈牙利 · 布達佩斯' },
  Amsterdam: { lat: 52.37, lon: 4.9, radius: 3.4, en: 'Amsterdam · Netherlands', zh: '荷蘭 · 阿姆斯特丹' },
  Tokyo: { lat: 35.71, lon: 139.76, radius: 3.8, en: 'Tokyo · Japan', zh: '日本 · 東京' },
  Kyoto: { lat: 35.01, lon: 135.77, radius: 3.6, en: 'Kyoto · Japan', zh: '日本 · 京都' },
  Uppsala: { lat: 59.86, lon: 17.64, radius: 3.6, en: 'Uppsala · Sweden', zh: '瑞典 · 烏普薩拉' },
  Innsbruck: { lat: 47.27, lon: 11.4, radius: 3.4, en: 'Innsbruck · Austria', zh: '奧地利 · 因斯布魯克' },
  Harvard: { lat: 42.37, lon: -71.12, radius: 3.2, en: 'Harvard · Cambridge, MA', zh: '美國 · 哈佛大學' },
  Berkeley: { lat: 37.87, lon: -122.26, radius: 3.4, en: 'UC Berkeley · California', zh: '美國 · 加州大學柏克萊分校' },
  Caltech: { lat: 34.14, lon: -118.13, radius: 3.4, en: 'Caltech · Pasadena', zh: '美國 · 加州理工學院' },
  Toronto: { lat: 43.66, lon: -79.4, radius: 3.6, en: 'Toronto · Canada', zh: '加拿大 · 多倫多大學' },
  Waterloo: { lat: 43.47, lon: -80.54, radius: 3.4, en: 'Waterloo · Canada', zh: '加拿大 · 滑鐵盧大學' },
  Lausanne: { lat: 46.52, lon: 6.57, radius: 3.2, en: 'EPFL · Lausanne', zh: '瑞士 · 洛桑' },
  Warwick: { lat: 52.38, lon: -1.56, radius: 3.2, en: 'Warwick · England', zh: '英國 · 華威大學' },
}

/**
 * Author-specific refinements where an author is tied to a specific city within a broad tradition.
 */
const AUTHOR_GEO: Record<string, GeoSite> = {
  ahmes: { lat: 25.7, lon: 32.64, radius: 4.5, en: 'Thebes · Egypt', zh: '埃及 · 底比斯' },
  baudhayana: { lat: 27.5, lon: 78.5, radius: 6.5, en: 'Ganges Plain · Vedic India', zh: '印度 · 恆河平原' },
  zeno: { lat: 40.16, lon: 15.15, radius: 3.6, en: 'Elea · Magna Graecia', zh: '大希臘 · 埃利亞' },
  pythagoreans: { lat: 39.08, lon: 17.13, radius: 4.5, en: 'Croton · Magna Graecia', zh: '希臘世界 · 克羅頓' },
  eudoxus: { lat: 36.69, lon: 27.37, radius: 4.2, en: 'Cnidus · Greek world', zh: '希臘世界 · 尼多斯' },
  pingala: { lat: 25.32, lon: 82.99, radius: 6.5, en: 'Ancient India', zh: '古代印度' },
  'han-compilers': { lat: 34.27, lon: 108.94, radius: 6.5, en: 'Chang’an · Han China', zh: '中國 · 漢代長安' },
  'liu-hui': { lat: 34.62, lon: 112.45, radius: 5.2, en: 'Luoyang · China', zh: '中國 · 洛陽' },
  sunzi: { lat: 34.5, lon: 113.5, radius: 6.5, en: 'Central Plains · China', zh: '中國 · 中原' },
  'zu-chongzhi': { lat: 32.06, lon: 118.79, radius: 4.4, en: 'Jiankang (Nanjing) · China', zh: '中國 · 建康（南京）' },
  aryabhata: { lat: 25.6, lon: 85.14, radius: 4.5, en: 'Kusumapura (Patna) · India', zh: '印度 · 華氏城' },
  brahmagupta: { lat: 25.0, lon: 72.26, radius: 4.8, en: 'Bhillamala · Rajasthan', zh: '印度 · 毘羅摩羅' },
  'jia-xian': { lat: 34.8, lon: 114.3, radius: 4.5, en: 'Kaifeng · Song China', zh: '中國 · 開封' },
  'omar-khayyam': { lat: 32.65, lon: 51.67, radius: 4.8, en: 'Isfahan & Nishapur · Persia', zh: '波斯 · 伊斯法罕與內沙布爾' },
  bhaskara: { lat: 23.18, lon: 75.78, radius: 4.8, en: 'Ujjain · India', zh: '印度 · 烏賈因' },
  'qin-jiushao': { lat: 30.27, lon: 120.15, radius: 4.5, en: 'Lin’an (Hangzhou) · China', zh: '中國 · 臨安（杭州）' },
  'al-tusi': { lat: 37.39, lon: 46.24, radius: 4.2, en: 'Maragheh · Persia', zh: '波斯 · 馬拉蓋天文台' },
  'zhu-shijie': { lat: 32.39, lon: 119.41, radius: 4.8, en: 'Yangzhou · Yuan China', zh: '中國 · 揚州' },
  oresme: { lat: 49.44, lon: 1.1, radius: 4.0, en: 'Paris & Rouen · France', zh: '法國 · 巴黎與盧昂' },
  pacioli: { lat: 45.44, lon: 12.32, radius: 3.8, en: 'Venice · Italy', zh: '義大利 · 威尼斯' },
  cardano: { lat: 45.46, lon: 9.19, radius: 3.6, en: 'Milan & Pavia · Italy', zh: '義大利 · 米蘭' },
  ferrari: { lat: 44.49, lon: 11.34, radius: 3.6, en: 'Bologna & Milan · Italy', zh: '義大利 · 波隆那' },
  bombelli: { lat: 44.49, lon: 11.34, radius: 3.6, en: 'Bologna · Italy', zh: '義大利 · 波隆那' },
  viete: { lat: 48.86, lon: 2.35, radius: 4.0, en: 'Paris · France', zh: '法國 · 巴黎' },
  fermat: { lat: 43.6, lon: 1.44, radius: 3.6, en: 'Toulouse · France', zh: '法國 · 圖盧茲' },
  pascal: { lat: 48.86, lon: 2.35, radius: 3.4, en: 'Paris · France', zh: '法國 · 巴黎' },
  fourier: { lat: 48.86, lon: 2.35, radius: 3.6, en: 'Paris · France', zh: '法國 · 巴黎' },
  lindemann: { lat: 47.99, lon: 7.85, radius: 3.8, en: 'Freiburg · Germany', zh: '德國 · 弗萊堡' },
  hadamard: { lat: 48.86, lon: 2.35, radius: 3.4, en: 'Paris · France', zh: '法國 · 巴黎' },
  lebesgue: { lat: 48.69, lon: 6.18, radius: 3.8, en: 'Nancy & Paris · France', zh: '法國 · 巴黎' },
  dantzig: { lat: 38.9, lon: -77.04, radius: 4.2, en: 'Washington, D.C. · USA', zh: '美國 · 華盛頓' },
  milnor: { lat: 40.35, lon: -74.66, radius: 3.6, en: 'Princeton · United States', zh: '美國 · 普林斯頓' },
  cooley: { lat: 41.21, lon: -73.8, radius: 3.8, en: 'Yorktown Heights · New York', zh: '美國 · 紐約' },
  uhlenbeck: { lat: 41.87, lon: -87.65, radius: 4.2, en: 'Chicago · United States', zh: '美國 · 芝加哥' },
  faltings: { lat: 51.26, lon: 7.15, radius: 3.8, en: 'Wuppertal · Germany', zh: '德國 · 伍珀塔爾' },
  zhang: { lat: 43.14, lon: -70.93, radius: 3.8, en: 'Durham, NH · United States', zh: '美國 · 新罕布夏大學' },
  'shang-diviners': { lat: 36.12, lon: 114.32, radius: 4.5, en: 'Yin (Anyang) · Shang China', zh: '中國 · 殷墟（安陽）' },
  thales: { lat: 37.53, lon: 27.28, radius: 3.8, en: 'Miletus · Ionia', zh: '愛奧尼亞 · 米利都' },
  pythagoras: { lat: 39.08, lon: 17.13, radius: 4.0, en: 'Croton · Magna Graecia', zh: '大希臘 · 克羅頓' },
  archytas: { lat: 40.47, lon: 17.24, radius: 3.8, en: 'Tarentum · Magna Graecia', zh: '大希臘 · 塔蘭托' },
  aristotle: { lat: 37.97, lon: 23.73, radius: 3.6, en: 'Athens · Lyceum', zh: '希臘 · 雅典呂克昂' },
  'zhangjiashan-scribes': { lat: 30.35, lon: 112.19, radius: 4.5, en: 'Jingzhou · Han China', zh: '中國 · 荊州張家山' },
  mahavira: { lat: 17.2, lon: 77.17, radius: 4.8, en: 'Manyakheta · Deccan', zh: '印度 · 曼尼亞凱塔' },
  'shen-kuo': { lat: 32.2, lon: 119.45, radius: 4.4, en: 'Runzhou (Zhenjiang) · Song China', zh: '中國 · 潤州夢溪園' },
  'li-ye': { lat: 38.14, lon: 114.57, radius: 4.4, en: 'Zhending · Hebei', zh: '中國 · 真定（河北）' },
  'yang-hui': { lat: 30.27, lon: 120.15, radius: 4.2, en: 'Lin’an (Hangzhou) · Song China', zh: '中國 · 臨安（杭州）' },
  'guo-shoujing': { lat: 39.9, lon: 116.4, radius: 4.4, en: 'Dadu (Beijing) · Yuan China', zh: '中國 · 元大都（北京）' },
  'cheng-dawei': { lat: 29.88, lon: 118.43, radius: 4.2, en: 'Huizhou · Ming China', zh: '中國 · 徽州' },
  'xu-guangqi': { lat: 39.9, lon: 116.4, radius: 4.4, en: 'Beijing · Ming China', zh: '中國 · 北京' },
  minggatu: { lat: 39.9, lon: 116.4, radius: 4.4, en: 'Beijing · Qing China', zh: '中國 · 北京欽天監' },
  'li-shanlan': { lat: 31.23, lon: 121.47, radius: 4.2, en: 'Shanghai & Beijing · China', zh: '中國 · 上海與北京' },
  'chen-jingrun': { lat: 39.98, lon: 116.33, radius: 3.8, en: 'Beijing · Chinese Academy of Sciences', zh: '中國 · 北京中科院' },
  'wu-wenjun': { lat: 39.98, lon: 116.33, radius: 3.8, en: 'Beijing · Chinese Academy of Sciences', zh: '中國 · 北京中科院' },
}

/**
 * Commit-specific geographic overrides when a specific commit occurred in a notable city.
 */
const COMMIT_GEO: Record<string, GeoSite> = {
  'planetary-laws': { lat: 50.08, lon: 14.44, radius: 3.6, en: 'Prague · Holy Roman Empire', zh: '神聖羅馬帝國 · 布拉格' },
  'infinitesimal-volumes': { lat: 48.31, lon: 14.29, radius: 3.6, en: 'Linz · Holy Roman Empire', zh: '神聖羅馬帝國 · 林茲' },
  fluxions: { lat: 52.81, lon: -0.63, radius: 3.6, en: 'Woolsthorpe & Cambridge · England', zh: '英格蘭 · 伍爾索普與劍橋' },
  principia: { lat: 52.2, lon: 0.12, radius: 3.4, en: 'Cambridge · England', zh: '英格蘭 · 劍橋' },
  basel: { lat: 59.94, lon: 30.31, radius: 3.8, en: 'St. Petersburg · Russia', zh: '俄羅斯 · 聖彼得堡' },
  konigsberg: { lat: 54.71, lon: 20.51, radius: 3.8, en: 'Königsberg & St. Petersburg', zh: '哥尼斯堡與聖彼得堡' },
  introductio: { lat: 52.52, lon: 13.4, radius: 3.6, en: 'Berlin · Prussia', zh: '普魯士 · 柏林' },
  'polyhedron-formula': { lat: 52.52, lon: 13.4, radius: 3.6, en: 'Berlin · Prussia', zh: '普魯士 · 柏林' },
  mechanique: { lat: 48.86, lon: 2.35, radius: 3.6, en: 'Paris · France', zh: '法國 · 巴黎' },
  'hilbert-problems': { lat: 48.86, lon: 2.35, radius: 3.6, en: 'Paris · International Congress', zh: '法國 · 巴黎國際數學家大會' },
  'principia-mathematica': { lat: 52.2, lon: 0.12, radius: 3.4, en: 'Cambridge · England', zh: '英格蘭 · 劍橋' },
}

export function siteForAuthor(author: Author | undefined): GeoSite {
  if (!author) {
    return { lat: 31.2, lon: 29.92, radius: 4.5, en: 'Mediterranean', zh: '地中海' }
  }
  return (
    AUTHOR_GEO[author.id] ??
    TRADITION_GEO[author.tradition] ?? {
      lat: 31.2,
      lon: 29.92,
      radius: 4.5,
      en: author.tradition,
      zh: author.tradition,
    }
  )
}

export function siteForCommitAuthor(commit: Commit, authorId: string, source: World = world): GeoSite {
  if ( commit.authors.length === 1 && COMMIT_GEO[commit.id]) {
    return COMMIT_GEO[commit.id]!
  }
  const author = source.authorById.get(authorId)
  return COMMIT_GEO[commit.id] ?? siteForAuthor(author)
}

export function commitGeo(commit: Commit, source: World = world): CommitGeo {
  const sites = commit.authors.map((authorId) => ({
    authorId,
    site: siteForCommitAuthor(commit, authorId, source),
  }))
  const primary = sites[0]?.site ?? {
    lat: 31.32,
    lon: 45.64,
    radius: 5.0,
    en: 'Uruk · Sumer',
    zh: '蘇美 · 烏魯克',
  }
  const branch = branchOf(commit.files[0]?.path ?? '')
  const color = BRANCH_COLOR[branch] ?? '#f4efe6'
  return {
    commitId: commit.id,
    year: commit.year,
    color,
    primary,
    sites,
  }
}

export function formatLatLon(lat: number, lon: number): string {
  const ns = lat >= 0 ? 'N' : 'S'
  const ew = lon >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(1)}°${ns} ${Math.abs(lon).toFixed(1)}°${ew}`
}

export function siteLabel(site: GeoSite, locale: Locale): string {
  return locale === 'zh-TW' ? site.zh : site.en
}

export function shortestDeltaLon(fromLon: number, toLon: number): number {
  let delta = ((toLon - fromLon + 540) % 360) - 180
  if (delta === -180) delta = 180
  return delta
}

export function approachAngle(current: number, target: number, dt: number, sharp: number): number {
  const k = 1 - Math.exp(-sharp * dt)
  return current + shortestDeltaLon(current, target) * k
}

/**
 * Determine the active geographic target for the current playback & selection state.
 */
export function resolveGlobeTarget(
  playback: Playback,
  selection: Selection | null,
  locale: Locale,
  source: World = world,
): GlobeTarget {
  const commit = source.commits[playback.index] ?? source.commits[0]!
  const geo = commitGeo(commit, source)
  const prevCommit = playback.index > 0 ? source.commits[playback.index - 1] : undefined
  const prevGeo = prevCommit ? commitGeo(prevCommit, source) : null

  if (selection?.kind === 'author') {
    const author = source.authorById.get(selection.id)
    const site = siteForAuthor(author)
    return {
      lat: site.lat,
      lon: site.lon,
      radius: site.radius,
      label: siteLabel(site, locale),
      coords: formatLatLon(site.lat, site.lon),
      color: geo.color,
      activeSite: site,
      coSites: [site],
      previousSite: null,
      travel: 1,
    }
  }

  if (selection?.kind === 'file') {
    const born = source.fileBorn.get(selection.path)
    const fileCommit = born !== undefined ? source.commits[born] : commit
    if (fileCommit) {
      const fGeo = commitGeo(fileCommit, source)
      const site = fGeo.primary
      return {
        lat: site.lat,
        lon: site.lon,
        radius: site.radius,
        label: siteLabel(site, locale),
        coords: formatLatLon(site.lat, site.lon),
        color: fGeo.color,
        activeSite: site,
        coSites: fGeo.sites.map((s) => s.site),
        previousSite: null,
        travel: 1,
      }
    }
  }

  const touches = commitTouches(commit)
  const settled = playback.phase === 'hold' || playback.ended
  const step = settled ? Math.max(0, touches.length - 1) : Math.min(playback.step, Math.max(0, touches.length - 1))
  const touch = touches[step]
  const activeEntry = (touch ? geo.sites.find((s) => s.authorId === touch.authorId) : undefined) ?? geo.sites[0]
  const activeSite = activeEntry?.site ?? geo.primary

  // Deduplicate co-author sites by approximate coordinates
  const coSites: GeoSite[] = []
  for (const entry of geo.sites) {
    if (!coSites.some((s) => Math.hypot(s.lat - entry.site.lat, s.lon - entry.site.lon) < 0.4)) {
      coSites.push(entry.site)
    }
  }

  // If settled on a multi-site commit, combine labels cleanly while keeping activeSite prominent
  const label =
    settled && coSites.length > 1
      ? coSites.map((s) => siteLabel(s, locale).split(' · ')[0]).join(locale === 'zh-TW' ? '・' : ' · ')
      : siteLabel(activeSite, locale)

  const travel =
    playback.phase === 'approach'
      ? playback.t * 0.75
      : playback.phase === 'touch'
        ? 0.75 + playback.t * 0.25
        : 1

  return {
    lat: activeSite.lat,
    lon: activeSite.lon,
    radius: activeSite.radius,
    label,
    coords: formatLatLon(activeSite.lat, activeSite.lon),
    color: geo.color,
    activeSite,
    coSites,
    previousSite: prevGeo ? prevGeo.primary : null,
    travel,
  }
}
