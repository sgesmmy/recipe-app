// ============================================================
// レシピ管理アプリ — script.js
// ============================================================

// --- 初期データ ---
const defaultRecipes = [
  {
    id: 1, name: "豚バラもやし蒸し", servings: 1,
    features: { difficulty: "1", taste: "あっさり", genre: "和風", mealType: "メインおかず", time: 10, freeTags: ["レンジ調理", "ヘルシー"] },
    ingredients: [
      { name: "豚肉", qty: "150", unit: "g", isPantry: false, group: null },
      { name: "もやし", qty: "1", unit: "袋", isPantry: false, group: null },
      { name: "ポン酢", qty: "適量", unit: "適量", isPantry: true, group: null }
    ], groups: [], steps: ["もやしの上に豚肉をのせる", "電子レンジで5分温める"]
  },
  {
    id: 2, name: "鶏の照り焼き", servings: 2,
    features: { difficulty: "2", taste: "こってり", genre: "和風", mealType: "メインおかず", time: 20, freeTags: [] },
    ingredients: [
      { name: "鶏もも肉", qty: "300", unit: "g", isPantry: false, group: null },
      { name: "醤油", qty: "大さじ2", unit: "大さじ", isPantry: true, group: null },
      { name: "みりん", qty: "大さじ2", unit: "大さじ", isPantry: true, group: null },
      { name: "砂糖", qty: "大さじ1", unit: "大さじ", isPantry: true, group: null }
    ], groups: [], steps: ["鶏肉に焼き色をつける", "調味料を加えて煮絡める"]
  },
  {
    id: 3, name: "ハンバーグ", servings: 2,
    features: { difficulty: "3", taste: "こってり", genre: "洋風", mealType: "メインおかず", time: 30, freeTags: [] },
    ingredients: [
      { name: "合いびき肉", qty: "300", unit: "g", isPantry: false, group: null },
      { name: "玉ねぎ", qty: "1/2", unit: "個", isPantry: false, group: null },
      { name: "卵", qty: "1", unit: "個", isPantry: false, group: null },
      { name: "パン粉", qty: "大さじ3", unit: "大さじ", isPantry: true, group: null }
    ], groups: [], steps: ["玉ねぎをみじん切りにして炒める", "材料を混ぜて成形", "フライパンで焼く"]
  },
  {
    id: 4, name: "麻婆豆腐", servings: 2,
    features: { difficulty: "2", taste: "旨辛", genre: "中華", mealType: "メインおかず", time: 15, freeTags: [] },
    ingredients: [
      { name: "豆腐", qty: "1", unit: "丁", isPantry: false, group: null },
      { name: "豚ひき肉", qty: "100", unit: "g", isPantry: false, group: null },
      { name: "長ねぎ", qty: "1/2", unit: "本", isPantry: false, group: null },
      { name: "豆板醤", qty: "小さじ1", unit: "小さじ", isPantry: true, group: null }
    ], groups: [], steps: ["豆腐を角切りにする", "ひき肉を炒めて調味料を加える", "豆腐を加えて煮る"]
  },
  {
    id: 5, name: "ほうれん草のおひたし", servings: 2,
    features: { difficulty: "1", taste: "あっさり", genre: "和風", mealType: "サブおかず", time: 5, freeTags: ["作り置き"] },
    ingredients: [
      { name: "ほうれん草", qty: "1", unit: "袋", isPantry: false, group: null },
      { name: "醤油", qty: "適量", unit: "適量", isPantry: true, group: null },
      { name: "かつお節", qty: "適量", unit: "適量", isPantry: true, group: null }
    ], groups: [], steps: ["ほうれん草を茹でて水気を絞る", "醤油とかつお節で和える"]
  },
  {
    id: 6, name: "ポテトサラダ", servings: 3,
    features: { difficulty: "2", taste: "こってり", genre: "洋風", mealType: "サブおかず", time: 20, freeTags: ["作り置き"] },
    ingredients: [
      { name: "じゃがいも", qty: "3", unit: "個", isPantry: false, group: null },
      { name: "きゅうり", qty: "1", unit: "本", isPantry: false, group: null },
      { name: "にんじん", qty: "1/2", unit: "本", isPantry: false, group: null },
      { name: "マヨネーズ", qty: "大さじ3", unit: "大さじ", isPantry: true, group: null }
    ], groups: [], steps: ["じゃがいもを茹でてつぶす", "野菜を切って塩もみ", "マヨネーズで和える"]
  },
  {
    id: 7, name: "中華風きゅうり", servings: 2,
    features: { difficulty: "1", taste: "あっさり", genre: "中華", mealType: "サブおかず", time: 5, freeTags: ["おつまみ"] },
    ingredients: [
      { name: "きゅうり", qty: "2", unit: "本", isPantry: false, group: null },
      { name: "ごま油", qty: "大さじ1", unit: "大さじ", isPantry: true, group: null },
      { name: "醤油", qty: "適量", unit: "適量", isPantry: true, group: null }
    ], groups: [], steps: ["きゅうりを叩いて一口大に", "ごま油と醤油で和える"]
  },
  {
    id: 8, name: "味噌汁", servings: 2,
    features: { difficulty: "1", taste: "あっさり", genre: "和風", mealType: "スープ/汁物", time: 10, freeTags: [] },
    ingredients: [
      { name: "豆腐", qty: "1/2", unit: "丁", isPantry: false, group: null },
      { name: "長ねぎ", qty: "1/4", unit: "本", isPantry: false, group: null },
      { name: "味噌", qty: "大さじ2", unit: "大さじ", isPantry: true, group: null }
    ], groups: [], steps: ["だしを沸かす", "豆腐とねぎを入れて味噌を溶く"]
  },
  {
    id: 9, name: "コンソメスープ", servings: 2,
    features: { difficulty: "1", taste: "あっさり", genre: "洋風", mealType: "スープ/汁物", time: 15, freeTags: [] },
    ingredients: [
      { name: "玉ねぎ", qty: "1/2", unit: "個", isPantry: false, group: null },
      { name: "にんじん", qty: "1/4", unit: "本", isPantry: false, group: null },
      { name: "コンソメ", qty: "1", unit: "個", isPantry: true, group: null }
    ], groups: [], steps: ["野菜を切って煮る", "コンソメを入れて味を調える"]
  },
  {
    id: 10, name: "チャーハン", servings: 1,
    features: { difficulty: "2", taste: "こってり", genre: "中華", mealType: "丼もの", time: 10, freeTags: [] },
    ingredients: [
      { name: "ごはん", qty: "1", unit: "膳", isPantry: false, group: null },
      { name: "卵", qty: "1", unit: "個", isPantry: false, group: null },
      { name: "長ねぎ", qty: "1/4", unit: "本", isPantry: false, group: null },
      { name: "豚肉", qty: "50", unit: "g", isPantry: false, group: null }
    ], groups: [], steps: ["卵を炒める", "ごはんと具材を加えて強火で炒める"]
  },
  {
    id: 11, name: "ナポリタン", servings: 1,
    features: { difficulty: "2", taste: "こってり", genre: "洋風", mealType: "めん系", time: 15, freeTags: [] },
    ingredients: [
      { name: "パスタ", qty: "100", unit: "g", isPantry: false, group: null },
      { name: "玉ねぎ", qty: "1/2", unit: "個", isPantry: false, group: null },
      { name: "ピーマン", qty: "1", unit: "個", isPantry: false, group: null },
      { name: "ケチャップ", qty: "大さじ3", unit: "大さじ", isPantry: true, group: null }
    ], groups: [], steps: ["パスタを茹でる", "野菜を炒めてケチャップで味付け", "パスタと和える"]
  }
];

const defaultFridge = [
  { name: "豚肉", qty: 300, unit: "g" },
  { name: "玉ねぎ", qty: 3, unit: "個" },
  { name: "卵", qty: 6, unit: "個" },
  { name: "にんじん", qty: 2, unit: "本" },
  { name: "長ねぎ", qty: 1, unit: "本" },
  { name: "きゅうり", qty: 2, unit: "本" },
  { name: "豆腐", qty: 1, unit: "丁" },
  { name: "もやし", qty: 1, unit: "袋" }
];

// ============================================================
// Firebase 設定 & クラウド同期
// ============================================================
const firebaseConfig = {
  apiKey: atob("QUl6YVN5RHFzb2owaHFQZzRaY2F6dWFoXy00UmEwcV9CNEtocUN3"),
  authDomain: "wak-recipe-app.firebaseapp.com",
  projectId: "wak-recipe-app",
  storageBucket: "wak-recipe-app.firebasestorage.app",
  messagingSenderId: "408600777170",
  appId: "1:408600777170:web:6aa1db9250dc718ed8380b"
};

let db = null;
let currentGroupId = localStorage.getItem('sync_group_id') || '';
let isSyncActive = false;
let isRemoteUpdating = false;
let unsubscribeRecipes = null;
let unsubscribeFridge = null;
let unsubscribeHistory = null;
let unsubscribeSettings = null;

function initFirebase() {
  try {
    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      db = firebase.firestore();
    } else if (typeof firebase !== 'undefined') {
      db = firebase.firestore();
    }
  } catch (err) {
    console.error("Firebase init failed:", err);
  }
}

// ============================================================
// IndexedDB ユーティリティ（大容量ストレージ・ギガバイト対応）
// ============================================================
const DB_NAME = 'RecipeAppDB';
const DB_VERSION = 1;
let dbInstance = null;

function openAppDB() {
  if (dbInstance) return Promise.resolve(dbInstance);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('recipes')) {
        d.createObjectStore('recipes', { keyPath: 'id' });
      }
      if (!d.objectStoreNames.contains('keyval')) {
        d.createObjectStore('keyval', { keyPath: 'key' });
      }
    };
    req.onsuccess = (e) => {
      dbInstance = e.target.result;
      resolve(dbInstance);
    };
    req.onerror = (e) => {
      console.error("IndexedDB open error:", e);
      reject(e);
    };
  });
}

async function idbSaveAllRecipes(recipeList) {
  try {
    const d = await openAppDB();
    const tx = d.transaction('recipes', 'readwrite');
    const store = tx.objectStore('recipes');
    await new Promise((res, rej) => {
      const clearReq = store.clear();
      clearReq.onsuccess = res;
      clearReq.onerror = rej;
    });
    recipeList.forEach(r => store.put(r));
    await new Promise((res, rej) => {
      tx.oncomplete = res;
      tx.onerror = rej;
    });
  } catch (err) {
    console.error("idbSaveAllRecipes error:", err);
  }
}

async function idbLoadAllRecipes() {
  try {
    const d = await openAppDB();
    const tx = d.transaction('recipes', 'readonly');
    const store = tx.objectStore('recipes');
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = reject;
    });
  } catch (err) {
    console.error("idbLoadAllRecipes error:", err);
    return [];
  }
}

async function idbSetVal(key, val) {
  try {
    const d = await openAppDB();
    const tx = d.transaction('keyval', 'readwrite');
    tx.objectStore('keyval').put({ key, val });
    return new Promise((res, rej) => {
      tx.oncomplete = res;
      tx.onerror = rej;
    });
  } catch (err) {
    console.error("idbSetVal error:", err);
  }
}

async function idbGetVal(key) {
  try {
    const d = await openAppDB();
    const tx = d.transaction('keyval', 'readonly');
    const req = tx.objectStore('keyval').get(key);
    return new Promise((resolve, reject) => {
      req.onsuccess = () => resolve(req.result ? req.result.val : null);
      req.onerror = reject;
    });
  } catch (err) {
    console.error("idbGetVal error:", err);
    return null;
  }
}

// --- 状態管理 ---
let recipes = JSON.parse(localStorage.getItem('my_recipes')) || defaultRecipes;
let myFridge = JSON.parse(localStorage.getItem('my_fridge')) || defaultFridge;
let cookingHistory = JSON.parse(localStorage.getItem('cooking_history')) || [];
let recentSettings = JSON.parse(localStorage.getItem('recent_settings')) || {
  days: 7,
  mode: 'lower_priority' // 'lower_priority' | 'exclude' | 'tag_only'
};

let currentCalYear = new Date().getFullYear();
let currentCalMonth = new Date().getMonth();
let selectedCalDateStr = new Date().toISOString().split('T')[0];

const defaultFeatures = {
  difficulty: "1", taste: "あっさり", genre: "和風",
  mealType: "メインおかず", time: 15, freeTags: []
};
let currentFeatures = { ...defaultFeatures };
let currentGroups = [];
let editingGroupIndex = null;
let editingRecipeId = null;
let currentTab = 'single';

// ページネーション状態
let currentPage = 1;
const pageSize = 10;
let currentKondatePage = 1;
const kondatePageSize = 6;

const singleFilter = { maxDifficulty: null, tastes: [], genres: [], mealTypes: [], sortBy: 'missing' };
const kondateFilter = {
  genres: [],
  comboType: 'main+side',
  customTypes: ['メインおかず', 'スープ/汁物'],
  mainTastes: [],
  tastePairing: 'opposite',
  sortBy: 'missing'
};

// --- マイグレーション ---
(function migrate() {
  // mealType リネーム
  const mealMap = {
    'おかず': 'メインおかず',
    '主菜': 'メインおかず',
    '副菜': 'サブおかず',
    'ごはんもの': '丼もの',
    'ごはん系': '丼もの',
    'めん類': 'めん系',
    '汁物/スープ': 'スープ/汁物'
  };
  let recipeChanged = false;

  // デフォルトテストレシピの自動補完（まだ登録されていないものを追加）
  defaultRecipes.forEach(defR => {
    if (!recipes.some(r => r.name === defR.name)) {
      recipes.push(JSON.parse(JSON.stringify(defR)));
      recipeChanged = true;
    }
  });

  recipes.forEach(r => {
    // 必須フィールドの補完
    if (!r.features) { r.features = { ...defaultFeatures }; recipeChanged = true; }
    if (!r.ingredients) { r.ingredients = []; recipeChanged = true; }
    if (!r.groups) { r.groups = []; recipeChanged = true; }
    if (!r.steps) { r.steps = []; recipeChanged = true; }

    // 旧ジャンル「炊き込みご飯」をタイプに移行
    if (r.features && r.features.genre === '炊き込みご飯') {
      r.features.mealType = '炊き込みご飯';
      r.features.genre = '和風';
      recipeChanged = true;
    }

    // mealType リネーム & ごはん系から丼もの/炊き込みご飯への振り分け
    if (r.features && r.features.mealType) {
      if (r.features.mealType === 'ごはん系') {
        const isTaki = r.name.includes('炊き込み') || r.name.includes('炊きこみ') || r.name.includes('釜飯') || (r.features.freeTags || []).includes('炊き込みご飯');
        r.features.mealType = isTaki ? '炊き込みご飯' : '丼もの';
        recipeChanged = true;
      } else if (mealMap[r.features.mealType]) {
        r.features.mealType = mealMap[r.features.mealType];
        recipeChanged = true;
      }
    }
    // servings フィールドがなければ追加
    if (r.servings === undefined) {
      r.servings = 1;
      recipeChanged = true;
    }
    // 所要時間（time）の数値正規化（例: "10分" → 10）
    if (r.features && r.features.time) {
      const parsed = parseInt(r.features.time, 10);
      if (!isNaN(parsed) && r.features.time !== parsed) {
        r.features.time = parsed;
        recipeChanged = true;
      }
    }
  });
  if (recipeChanged) localStorage.setItem('my_recipes', JSON.stringify(recipes));

  // 冷蔵庫: 旧フォーマット（文字列配列）→ 構造化
  let fridgeChanged = false;
  if (Array.isArray(myFridge) && myFridge.length > 0 && typeof myFridge[0] === 'string') {
    myFridge = myFridge.map(name => ({ name, qty: null, unit: '' }));
    fridgeChanged = true;
  }
  // デフォルト食材の補完（テストレシピ検証を容易にするため、不足食材をマージ）
  defaultFridge.forEach(df => {
    if (!myFridge.some(f => f.name === df.name)) {
      myFridge.push({ ...df });
      fridgeChanged = true;
    }
  });
  if (fridgeChanged) {
    localStorage.setItem('my_fridge', JSON.stringify(myFridge));
  }
})();

// ============================================================
// IndexedDB 永続化ヘルパー（LocalStorageと二重管理で超安全）
// ============================================================
function persistRecipes() {
  try {
    localStorage.setItem('my_recipes', JSON.stringify(recipes));
  } catch (e) {
    console.warn("LocalStorage save quota reached, saved to IndexedDB.");
  }
  idbSaveAllRecipes(recipes);
}

function persistFridge() {
  try {
    localStorage.setItem('my_fridge', JSON.stringify(myFridge));
  } catch (e) {
    console.warn("LocalStorage fridge quota reached, saved to IndexedDB.");
  }
  idbSetVal('my_fridge', myFridge);
}

function persistCookingHistory() {
  try {
    localStorage.setItem('cooking_history', JSON.stringify(cookingHistory));
  } catch (e) {
    console.warn("LocalStorage history quota reached, saved to IndexedDB.");
  }
  idbSetVal('cooking_history', cookingHistory);
}

function persistRecentSettings() {
  try {
    localStorage.setItem('recent_settings', JSON.stringify(recentSettings));
  } catch (e) {
    console.warn("LocalStorage settings quota reached, saved to IndexedDB.");
  }
  idbSetVal('recent_settings', recentSettings);
}

async function initIndexedDBData() {
  try {
    const idbRecipes = await idbLoadAllRecipes();
    if (idbRecipes && idbRecipes.length > 0) {
      recipes = idbRecipes;
    } else if (recipes && recipes.length > 0) {
      await idbSaveAllRecipes(recipes);
    }

    const idbFridge = await idbGetVal('my_fridge');
    if (idbFridge && Array.isArray(idbFridge)) {
      myFridge = idbFridge;
    } else if (myFridge) {
      await idbSetVal('my_fridge', myFridge);
    }

    const idbHistory = await idbGetVal('cooking_history');
    if (idbHistory && Array.isArray(idbHistory)) {
      cookingHistory = idbHistory;
    } else if (cookingHistory) {
      await idbSetVal('cooking_history', cookingHistory);
    }

    const idbSettings = await idbGetVal('recent_settings');
    if (idbSettings) {
      recentSettings = idbSettings;
    } else if (recentSettings) {
      await idbSetVal('recent_settings', recentSettings);
    }

    renderRecipes();
    renderFridgeList();
    renderCalendar();
    if (currentTab === 'kondate') generateKondateSuggestions();
  } catch (err) {
    console.warn("initIndexedDBData error:", err);
  }
}

// --- DOM要素 ---
const mainView = document.getElementById('main-view');
const addView = document.getElementById('add-view');
const fridgeView = document.getElementById('fridge-view');
const detailView = document.getElementById('detail-view');
const featureModal = document.getElementById('feature-modal');
const groupModal = document.getElementById('group-modal');
const singleFilterModal = document.getElementById('single-filter-modal');
const kondateFilterModal = document.getElementById('kondate-filter-modal');
const cookedModal = document.getElementById('cooked-modal');
const deductConfirmModal = document.getElementById('deduct-confirm-modal');

const openAddBtn = document.getElementById('open-add-btn');
const cancelAddBtn = document.getElementById('cancel-add-btn');
const saveRecipeBtn = document.getElementById('save-recipe-btn');
const openFeatureModalBtn = document.getElementById('open-feature-modal-btn');
const saveFeatureModalBtn = document.getElementById('save-feature-modal-btn');
const featureSummaryTags = document.getElementById('feature-summary-tags');
const openGroupModalBtn = document.getElementById('open-group-modal-btn');
const cancelGroupModalBtn = document.getElementById('cancel-group-modal-btn');
const saveGroupModalBtn = document.getElementById('save-group-modal-btn');
const groupModalItems = document.getElementById('group-modal-items');
const groupModalName = document.getElementById('group-modal-name');
const groupModalAddItemBtn = document.getElementById('group-modal-add-item-btn');
const addIngredientBtn = document.getElementById('add-ingredient-btn');
const ingredientContainer = document.getElementById('ingredient-container');
const addStepBtn = document.getElementById('add-step-btn');
const stepContainer = document.getElementById('step-container');
const recipeListContainer = document.getElementById('recipe-list');
const kondateResults = document.getElementById('kondate-results');
const filterSummary = document.getElementById('filter-summary');
const fridgeList = document.getElementById('fridge-list');
const acDropdown = document.getElementById('autocomplete-dropdown');
const acWarning = document.getElementById('ac-warning');

// カレンダー画面DOM
const calendarView = document.getElementById('calendar-view');
const openCalendarBtn = document.getElementById('open-calendar-btn');
const closeCalendarBtn = document.getElementById('close-calendar-btn');
const recentDaysSelect = document.getElementById('recent-days-select');
const calPrevMonthBtn = document.getElementById('cal-prev-month-btn');
const calNextMonthBtn = document.getElementById('cal-next-month-btn');
const calMonthTitle = document.getElementById('cal-month-title');
const calDaysGrid = document.getElementById('cal-days-grid');
const calSelectedDateLabel = document.getElementById('cal-selected-date-label');
const calOpenAddBtn = document.getElementById('cal-open-add-btn');
const calDayHistoryList = document.getElementById('cal-day-history-list');

// カレンダー手動追加モーダルDOM
const calendarAddModal = document.getElementById('calendar-add-modal');
const calAddDate = document.getElementById('cal-add-date');
const calAddRecipeSelect = document.getElementById('cal-add-recipe-select');
const calAddCustomName = document.getElementById('cal-add-custom-name');
const calAddServings = document.getElementById('cal-add-servings');
const cancelCalAddBtn = document.getElementById('cancel-cal-add-btn');
const saveCalAddBtn = document.getElementById('save-cal-add-btn');

// 写真関連DOM & 状態
const recipePhotoBox = document.getElementById('recipe-photo-box');
const recipePhotoInput = document.getElementById('recipe-photo-input');
const photoBoxLabel = document.getElementById('photo-box-label');
const photoPreviewImg = document.getElementById('photo-preview-img');

const photoCropModal = document.getElementById('photo-crop-modal');
const cropViewport = document.getElementById('crop-viewport');
const cropPreviewImg = document.getElementById('crop-preview-img');
const cropZoomSlider = document.getElementById('crop-zoom-slider');
const cancelCropBtn = document.getElementById('cancel-crop-btn');
const deleteCropBtn = document.getElementById('delete-crop-btn');
const saveCropBtn = document.getElementById('save-crop-btn');

let currentRecipePhoto = null; // トリミング済みDataURL
let currentRawPhoto = null;    // 元画像DataURL
let cropState = {
  zoom: 1,
  x: 0,
  y: 0,
  isDragging: false,
  startX: 0,
  startY: 0,
  initialX: 0,
  initialY: 0,
  imgWidth: 0,
  imgHeight: 0,
  baseScale: 1
};

// --- 写真プレビュー更新 ---
function setRecipePhotoPreview(photoUrl, rawUrl = null) {
  currentRecipePhoto = photoUrl || null;
  currentRawPhoto = rawUrl !== null ? rawUrl : (photoUrl || null);

  if (photoUrl) {
    photoPreviewImg.src = photoUrl;
    photoPreviewImg.style.display = 'block';
    photoBoxLabel.style.display = 'none';
    recipePhotoBox.classList.add('has-photo');
    let overlay = recipePhotoBox.querySelector('.photo-edit-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'photo-edit-overlay';
      overlay.textContent = 'タップで編集';
      recipePhotoBox.appendChild(overlay);
    }
    overlay.style.display = 'block';
  } else {
    photoPreviewImg.src = '';
    photoPreviewImg.style.display = 'none';
    photoBoxLabel.style.display = 'block';
    recipePhotoBox.classList.remove('has-photo');
    const overlay = recipePhotoBox.querySelector('.photo-edit-overlay');
    if (overlay) overlay.style.display = 'none';
  }
}

// --- 写真トリミングモーダル制御 ---
function clampCropPosition(x, y, zoom = cropState.zoom) {
  const vpSize = 240;
  const scale = cropState.baseScale * zoom;
  const renderedW = cropState.imgWidth * scale;
  const renderedH = cropState.imgHeight * scale;

  // 画像がビューポート（240×240）を完全に覆うように制限
  const minX = vpSize - renderedW;
  const maxX = 0;
  const minY = vpSize - renderedH;
  const maxY = 0;

  return {
    x: Math.min(maxX, Math.max(minX, x)),
    y: Math.min(maxY, Math.max(minY, y))
  };
}

function initCropDimensions() {
  const vpSize = 240;
  const nw = cropPreviewImg.naturalWidth || 400;
  const nh = cropPreviewImg.naturalHeight || 400;
  cropState.imgWidth = nw;
  cropState.imgHeight = nh;

  // ビューポートにカバーするように基準スケールを算出
  cropState.baseScale = Math.max(vpSize / nw, vpSize / nh);
  cropState.zoom = 1;
  cropZoomSlider.value = '1';

  // 中央配置 & クランプ
  const renderedW = nw * cropState.baseScale;
  const renderedH = nh * cropState.baseScale;
  const initialX = (vpSize - renderedW) / 2;
  const initialY = (vpSize - renderedH) / 2;

  const clamped = clampCropPosition(initialX, initialY, 1);
  cropState.x = clamped.x;
  cropState.y = clamped.y;

  updateCropTransform();
}

function openCropModal(imageUrl, isNew = false) {
  photoCropModal.classList.add('active');
  deleteCropBtn.style.display = currentRecipePhoto ? 'block' : 'none';

  cropPreviewImg.onload = () => {
    initCropDimensions();
  };

  cropPreviewImg.src = imageUrl;

  // すでに完了している場合のフォールバック
  if (cropPreviewImg.complete && cropPreviewImg.naturalWidth > 0) {
    initCropDimensions();
  }
}

function updateCropTransform() {
  const scale = cropState.baseScale * cropState.zoom;
  cropPreviewImg.style.width = `${cropState.imgWidth}px`;
  cropPreviewImg.style.height = `${cropState.imgHeight}px`;
  cropPreviewImg.style.left = '0px';
  cropPreviewImg.style.top = '0px';
  cropPreviewImg.style.transform = `translate3d(${cropState.x}px, ${cropState.y}px, 0) scale(${scale})`;
  cropPreviewImg.style.transformOrigin = '0 0';
}

// ドラッグ / スワイプ操作
function onCropDragStart(clientX, clientY) {
  cropState.isDragging = true;
  cropState.startX = clientX;
  cropState.startY = clientY;
  cropState.initialX = cropState.x;
  cropState.initialY = cropState.y;
}

function onCropDragMove(clientX, clientY) {
  if (!cropState.isDragging) return;
  const dx = clientX - cropState.startX;
  const dy = clientY - cropState.startY;
  const rawX = cropState.initialX + dx;
  const rawY = cropState.initialY + dy;

  const clamped = clampCropPosition(rawX, rawY, cropState.zoom);
  cropState.x = clamped.x;
  cropState.y = clamped.y;
  updateCropTransform();
}

function onCropDragEnd() {
  cropState.isDragging = false;
}

cropViewport.addEventListener('mousedown', (e) => {
  e.preventDefault();
  onCropDragStart(e.clientX, e.clientY);
});
window.addEventListener('mousemove', (e) => {
  if (cropState.isDragging) {
    onCropDragMove(e.clientX, e.clientY);
  }
});
window.addEventListener('mouseup', onCropDragEnd);

// タッチ操作（スマホ対応）
cropViewport.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    e.preventDefault();
    onCropDragStart(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: false });

window.addEventListener('touchmove', (e) => {
  if (cropState.isDragging && e.touches.length === 1) {
    e.preventDefault();
    onCropDragMove(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: false });

window.addEventListener('touchend', onCropDragEnd);

cropZoomSlider.addEventListener('input', (e) => {
  const oldZoom = cropState.zoom;
  const newZoom = parseFloat(e.target.value);
  cropState.zoom = newZoom;

  // ズーム時にビューポート中央（120, 120）を基準に拡大縮小
  const vpCenter = 120;
  const oldScale = cropState.baseScale * oldZoom;
  const newScale = cropState.baseScale * newZoom;

  const imgCenterX = (vpCenter - cropState.x) / oldScale;
  const imgCenterY = (vpCenter - cropState.y) / oldScale;

  const rawX = vpCenter - imgCenterX * newScale;
  const rawY = vpCenter - imgCenterY * newScale;

  const clamped = clampCropPosition(rawX, rawY, newZoom);
  cropState.x = clamped.x;
  cropState.y = clamped.y;

  updateCropTransform();
});

cancelCropBtn.addEventListener('click', () => {
  photoCropModal.classList.remove('active');
});

deleteCropBtn.addEventListener('click', () => {
  if (confirm('写真を削除しますか？')) {
    setRecipePhotoPreview(null);
    photoCropModal.classList.remove('active');
  }
});

saveCropBtn.addEventListener('click', () => {
  // Canvasで400×400pxの正方形JPEGを生成
  const canvas = document.createElement('canvas');
  const targetSize = 400;
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext('2d');

  const vpSize = 240;
  const scale = cropState.baseScale * cropState.zoom;

  // ビューポート左上（0,0）に対応する元画像ピクセル座標
  const srcX = -cropState.x / scale;
  const srcY = -cropState.y / scale;
  const srcW = vpSize / scale;
  const srcH = vpSize / scale;

  // 元画像の自然サイズ内にクランプ
  const safeSrcX = Math.max(0, Math.min(cropState.imgWidth - srcW, srcX));
  const safeSrcY = Math.max(0, Math.min(cropState.imgHeight - srcH, srcY));

  // 背景を白で初期化
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, targetSize, targetSize);

  // 見た目通りの矩形を正確に切り抜いてCanvasに描画
  ctx.drawImage(
    cropPreviewImg,
    safeSrcX, safeSrcY, srcW, srcH,
    0, 0, targetSize, targetSize
  );

  const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.75);
  setRecipePhotoPreview(croppedDataUrl, cropPreviewImg.src);
  photoCropModal.classList.remove('active');
});

// 画像自動圧縮ユーティリティ（長辺をmaxDimensionに縮小しJPEG圧縮）
function compressImage(fileOrDataUrl, maxDimension = 800, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const processImg = (src) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxDimension || h > maxDimension) {
          if (w > h) {
            h = Math.round((h * maxDimension) / w);
            w = maxDimension;
          } else {
            w = Math.round((w * maxDimension) / h);
            h = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = src;
    };

    if (typeof fileOrDataUrl === 'string') {
      processImg(fileOrDataUrl);
    } else {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (ev) => processImg(ev.target.result);
      reader.readAsDataURL(fileOrDataUrl);
    }
  });
}

// 写真枠クリック
recipePhotoBox.addEventListener('click', () => {
  if (currentRecipePhoto) {
    const choice = confirm('登録済みの写真があります。\n\n【OK】: トリミング位置を再調整\n【キャンセル】: 新しい写真を選択');
    if (choice) {
      openCropModal(currentRawPhoto || currentRecipePhoto, false);
    } else {
      recipePhotoInput.click();
    }
  } else {
    recipePhotoInput.click();
  }
});

recipePhotoInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    // 巨大な写真（数MB〜10MB）を即座に軽量化（長辺最大800px・50〜80KB程度に圧縮）
    const compressedDataUrl = await compressImage(file, 800, 0.75);
    openCropModal(compressedDataUrl, true);
  } catch (err) {
    console.error("Image compression error:", err);
    alert('写真の読み込みに失敗しました');
  } finally {
    recipePhotoInput.value = ''; // リセット
  }
});

// ============================================================
// ユーティリティ
// ============================================================
function switchView(targetView) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  targetView.classList.add('active');
}

// --- 分量パーサ（分数・適量対応） ---
function parseQty(str) {
  if (!str) return null;
  str = String(str).trim();
  if (['適量', '少々', 'お好みで', ''].includes(str)) return null;
  // "2と1/2" or "2 1/2"
  const mixed = str.match(/^(\d+(?:\.\d+)?)\s*[とと\s]\s*(\d+)\/(\d+)$/);
  if (mixed) return parseFloat(mixed[1]) + parseInt(mixed[2]) / parseInt(mixed[3]);
  // "1/2"
  const frac = str.match(/^(\d+)\/(\d+)$/);
  if (frac) return parseInt(frac[1]) / parseInt(frac[2]);
  // 通常の数値
  const num = parseFloat(str);
  return isNaN(num) ? null : num;
}

function formatQty(num) {
  if (num === null || num === undefined) return '';
  return Number.isInteger(num) ? String(num) : num.toFixed(1).replace(/\.0$/, '');
}

function formatCookingTime(time) {
  if (time === null || time === undefined || time === '') return '';
  const num = parseInt(time, 10);
  return isNaN(num) ? String(time) : `${num}分`;
}

// --- 「最近作った」判定（メイン系のみ対象） ---
function getRecentCookingInfo(recipe) {
  if (!recipe) return null;
  const mealType = recipe.features?.mealType;
  if (!['メインおかず', '丼もの', '炊き込みご飯', 'ごはん系', 'めん系'].includes(mealType)) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let mostRecentDaysAgo = null;
  let mostRecentDateStr = null;

  cookingHistory.forEach(h => {
    if ((h.recipeId && h.recipeId === recipe.id) || (h.recipeName && h.recipeName === recipe.name)) {
      if (!h.date) return;
      const parts = h.date.split('-').map(Number);
      if (parts.length < 3) return;
      const recordDate = new Date(parts[0], parts[1] - 1, parts[2]);
      recordDate.setHours(0, 0, 0, 0);

      const diffTime = today.getTime() - recordDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= 0 && diffDays <= recentSettings.days) {
        if (mostRecentDaysAgo === null || diffDays < mostRecentDaysAgo) {
          mostRecentDaysAgo = diffDays;
          mostRecentDateStr = h.date;
        }
      }
    }
  });

  if (mostRecentDaysAgo !== null) {
    return {
      daysAgo: mostRecentDaysAgo,
      date: mostRecentDateStr,
      label: mostRecentDaysAgo === 0 ? '今日作った' : `${mostRecentDaysAgo}日前に調理`
    };
  }
  return null;
}

// --- カナ正規化（カタカナ→ひらがな + 小文字化） ---
function normalizeKana(str) {
  return str.replace(/[\u30A1-\u30F6]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  ).toLowerCase();
}

// --- 既知の食材名を収集 ---
function getKnownIngredientNames() {
  const names = new Set();
  recipes.forEach(r => r.ingredients.forEach(ing => { if (ing.name) names.add(ing.name); }));
  myFridge.forEach(f => { if (f.name) names.add(f.name); });
  return [...names];
}

// ============================================================
// 材料行HTML生成 & 単位切り替え
// ============================================================
function createIngredientRowHTML(name = '', qty = '', unit = '個', isPantry = false) {
  const standardUnits = ['個', 'g', 'ml', '大さじ', '小さじ', '本', '枚', '束', 'かけ', '適量'];
  const isCustomUnit = !standardUnits.includes(unit) && unit !== '';
  const unitOptions = standardUnits.map(u => `<option value="${u}" ${u === unit ? 'selected' : ''}>${u}</option>`).join('');
  return `
    <div class="ingredient-row">
      <input type="text" placeholder="食材名" class="input-main ing-name ac-ingredient-input" value="${name}">
      <input type="text" placeholder="分量" class="input-qty ing-qty" value="${qty}">
      <select class="input-unit ing-unit" style="${isCustomUnit ? 'display:none;' : ''}">
        ${unitOptions}
        <option value="__custom__" ${isCustomUnit ? 'selected' : ''}>その他</option>
      </select>
      <input type="text" placeholder="単位" class="input-unit-custom ing-unit-custom"
             value="${isCustomUnit ? unit : ''}" style="${isCustomUnit ? 'display:block;' : 'display:none;'}">
      <label class="pantry-check" title="調味料などの常備品">
        <input type="checkbox" class="ing-pantry" ${isPantry ? 'checked' : ''}>常備
      </label>
      <button type="button" class="del-row-btn" onclick="this.parentElement.remove()">×</button>
    </div>`;
}

function attachUnitChangeHandler(container) {
  container.addEventListener('change', (e) => {
    if (e.target.classList.contains('ing-unit')) {
      const row = e.target.closest('.ingredient-row');
      const customInput = row.querySelector('.ing-unit-custom');
      if (e.target.value === '__custom__') {
        e.target.style.display = 'none';
        customInput.style.display = 'block';
        customInput.value = '';
        customInput.focus();
      }
    }
  });
  container.addEventListener('blur', (e) => {
    if (e.target.classList.contains('ing-unit-custom')) {
      const row = e.target.closest('.ingredient-row');
      const select = row.querySelector('.ing-unit');
      if (!e.target.value.trim()) {
        e.target.style.display = 'none';
        select.style.display = 'block';
        select.value = '個';
      }
    }
  }, true);
}
attachUnitChangeHandler(ingredientContainer);
attachUnitChangeHandler(groupModalItems);

function extractIngredientFromRow(row) {
  const name = row.querySelector('.ing-name').value.trim();
  if (!name) return null;
  const qty = row.querySelector('.ing-qty').value.trim();
  const select = row.querySelector('.ing-unit');
  const customInput = row.querySelector('.ing-unit-custom');
  let unit = select.value;
  if (select.value === '__custom__' || customInput.style.display !== 'none') unit = customInput.value.trim() || '個';
  const isPantry = row.querySelector('.ing-pantry').checked;
  return { name, qty, unit, isPantry };
}

// ============================================================
// フォーム状態
// ============================================================
function getFormData() {
  const name = document.getElementById('recipe-name').value.trim();
  const servings = parseInt(document.getElementById('recipe-servings').value, 10) || 1;
  const singleIngredients = [];
  ingredientContainer.querySelectorAll(':scope > .ingredient-row').forEach(row => {
    const item = extractIngredientFromRow(row);
    if (item) singleIngredients.push(item);
  });
  const steps = [];
  stepContainer.querySelectorAll('.step-desc').forEach(ta => { const d = ta.value.trim(); if (d) steps.push(d); });
  return {
    name,
    servings,
    features: { ...currentFeatures },
    singleIngredients,
    groups: [...currentGroups],
    steps,
    photo: currentRecipePhoto,
    rawPhoto: currentRawPhoto
  };
}

function resetForm() {
  document.getElementById('recipe-name').value = '';
  document.getElementById('recipe-servings').value = '1';
  currentFeatures = { ...defaultFeatures };
  currentGroups = [];
  editingRecipeId = null;
  setRecipePhotoPreview(null);
  document.getElementById('add-view-title').textContent = 'レシピ登録';
  ingredientContainer.innerHTML = '';
  stepContainer.innerHTML = `<div class="step-card" draggable="true"><span class="drag-handle">☰</span><span class="step-num">1</span><textarea placeholder="手順を入力" rows="2" class="step-desc"></textarea><button type="button" class="del-step-btn">×</button></div>`;
  attachStepEvents(stepContainer.querySelector('.step-card'));
  renderFeatureSummary();
  renderGroupCards();
}

function restoreDraftForm(draft) {
  resetForm();
  document.getElementById('recipe-name').value = draft.name || '';
  if (draft.servings) document.getElementById('recipe-servings').value = draft.servings;
  currentFeatures = draft.features || { ...defaultFeatures };
  currentGroups = draft.groups || [];
  setRecipePhotoPreview(draft.photo || null, draft.rawPhoto || null);
  if (draft.singleIngredients?.length > 0) {
    draft.singleIngredients.forEach(ing => {
      const w = document.createElement('div');
      w.innerHTML = createIngredientRowHTML(ing.name, ing.qty, ing.unit, ing.isPantry);
      ingredientContainer.appendChild(w.firstElementChild);
    });
  }
  if (draft.steps?.length > 0) {
    stepContainer.innerHTML = '';
    draft.steps.forEach(desc => {
      const card = document.createElement('div'); card.className = 'step-card'; card.draggable = true;
      card.innerHTML = `<span class="drag-handle">☰</span><span class="step-num"></span><textarea placeholder="手順を入力" rows="2" class="step-desc">${desc}</textarea><button type="button" class="del-step-btn">×</button>`;
      attachStepEvents(card); stepContainer.appendChild(card);
    });
    updateStepNumbers();
  }
  renderFeatureSummary(); renderGroupCards();
}

function loadRecipeIntoForm(recipe) {
  resetForm();
  editingRecipeId = recipe.id;
  document.getElementById('add-view-title').textContent = 'レシピ編集';
  document.getElementById('recipe-name').value = recipe.name || '';
  document.getElementById('recipe-servings').value = recipe.servings || 1;
  currentFeatures = { ...defaultFeatures, ...(recipe.features || {}) };
  currentGroups = (recipe.groups || []).map(g => ({
    name: g.name || '調味料',
    items: (g.items || []).map(it => ({ ...it }))
  }));
  setRecipePhotoPreview(recipe.photo || null, recipe.rawPhoto || null);
  (recipe.ingredients || []).filter(i => !i.group).forEach(ing => {
    const w = document.createElement('div');
    w.innerHTML = createIngredientRowHTML(ing.name || '', ing.qty || '', ing.unit || '個', !!ing.isPantry);
    ingredientContainer.appendChild(w.firstElementChild);
  });
  if (recipe.steps && recipe.steps.length > 0) {
    stepContainer.innerHTML = '';
    recipe.steps.forEach(desc => {
      const card = document.createElement('div'); card.className = 'step-card'; card.draggable = true;
      card.innerHTML = `<span class="drag-handle">☰</span><span class="step-num"></span><textarea placeholder="手順を入力" rows="2" class="step-desc">${desc || ''}</textarea><button type="button" class="del-step-btn">×</button>`;
      attachStepEvents(card); stepContainer.appendChild(card);
    });
    updateStepNumbers();
  }
  renderFeatureSummary(); renderGroupCards();
}

// ============================================================
// ＋ボタン・キャンセル
// ============================================================
openAddBtn.addEventListener('click', () => {
  const draft = JSON.parse(localStorage.getItem('recipe_draft'));
  if (draft) restoreDraftForm(draft); else resetForm();
  switchView(addView);
});
cancelAddBtn.addEventListener('click', () => {
  try {
    const fd = getFormData();
    const has = fd.name || fd.singleIngredients.length > 0 || fd.groups.length > 0 || fd.steps.length > 0 || currentRecipePhoto;
    if (has && !editingRecipeId) {
      if (confirm('編集中の内容を下書き保存しますか？\n\n【OK】: 一時保存して閉じる\n【キャンセル】: 入力内容を破棄して閉じる')) {
        try {
          localStorage.setItem('recipe_draft', JSON.stringify(fd));
        } catch (quotaErr) {
          console.warn("Storage quota exceeded on draft save:", quotaErr);
          // 容量オーバー時は写真を除外して保存を試みる
          try {
            fd.photo = null; fd.rawPhoto = null;
            localStorage.setItem('recipe_draft', JSON.stringify(fd));
          } catch (e2) {
            localStorage.removeItem('recipe_draft');
          }
        }
      } else {
        localStorage.removeItem('recipe_draft');
        resetForm();
      }
    } else {
      localStorage.removeItem('recipe_draft');
      resetForm();
    }
  } catch (err) {
    console.error("Error in cancelAddBtn:", err);
  } finally {
    resetForm();
    switchView(mainView);
  }
});

// ============================================================
// 特徴モーダル
// ============================================================
openFeatureModalBtn.addEventListener('click', () => {
  document.getElementById('modal-difficulty').value = currentFeatures.difficulty;
  document.getElementById('modal-taste').value = currentFeatures.taste;
  document.getElementById('modal-genre').value = currentFeatures.genre;
  document.getElementById('modal-meal-type').value = currentFeatures.mealType;
  const rawTime = currentFeatures.time;
  document.getElementById('modal-time').value = (rawTime !== null && rawTime !== undefined && rawTime !== '') ? (parseInt(rawTime, 10) || '') : '';
  document.getElementById('modal-free-tags').value = currentFeatures.freeTags.join(', ');
  featureModal.classList.add('active');
});
saveFeatureModalBtn.addEventListener('click', () => {
  currentFeatures.difficulty = document.getElementById('modal-difficulty').value;
  currentFeatures.taste = document.getElementById('modal-taste').value;
  currentFeatures.genre = document.getElementById('modal-genre').value;
  currentFeatures.mealType = document.getElementById('modal-meal-type').value;
  const timeVal = document.getElementById('modal-time').value.trim();
  currentFeatures.time = timeVal ? (parseInt(timeVal, 10) || '') : '';
  currentFeatures.freeTags = document.getElementById('modal-free-tags').value.split(/[,、]/).map(t => t.trim()).filter(t => t);
  renderFeatureSummary(); featureModal.classList.remove('active');
});
function renderFeatureSummary() {
  featureSummaryTags.innerHTML = `
    <span class="badge">★${currentFeatures.difficulty}</span>
    <span class="badge">${currentFeatures.taste}</span>
    <span class="badge">${currentFeatures.genre}</span>
    <span class="badge">${currentFeatures.mealType}</span>
    ${currentFeatures.time ? `<span class="badge">⏱ ${formatCookingTime(currentFeatures.time)}</span>` : ''}
    ${currentFeatures.freeTags.map(t => `<span class="badge">#${t}</span>`).join('')}`;
}

// ============================================================
// 材料・グループ
// ============================================================
addIngredientBtn.addEventListener('click', () => {
  const w = document.createElement('div');
  w.innerHTML = createIngredientRowHTML();
  ingredientContainer.appendChild(w.firstElementChild);
});

function renderGroupCards() {
  document.querySelectorAll('.group-display-card').forEach(c => c.remove());
  currentGroups.forEach((group, i) => {
    const card = document.createElement('div'); card.className = 'group-display-card';
    card.innerHTML = `<div class="group-display-header"><span>【${group.name}】</span><div class="group-display-actions"><button type="button" class="sub-btn edit-group-btn" data-index="${i}">編集</button><button type="button" class="del-row-btn del-group-btn" data-index="${i}">×</button></div></div><div class="group-display-list">${group.items.map(it => `${it.name} ${it.qty}${it.unit}`).join(', ') || '（材料なし）'}</div>`;
    card.querySelector('.edit-group-btn').addEventListener('click', () => openGroupModal(i));
    card.querySelector('.del-group-btn').addEventListener('click', () => { currentGroups.splice(i, 1); renderGroupCards(); });
    ingredientContainer.appendChild(card);
  });
}

function openGroupModal(index = null) {
  editingGroupIndex = index; groupModalItems.innerHTML = '';
  if (index !== null) {
    const g = currentGroups[index];
    document.getElementById('group-modal-title').textContent = '材料グループの編集';
    groupModalName.value = g.name;
    g.items.forEach(it => { const w = document.createElement('div'); w.innerHTML = createIngredientRowHTML(it.name, it.qty, it.unit, it.isPantry); groupModalItems.appendChild(w.firstElementChild); });
  } else {
    document.getElementById('group-modal-title').textContent = '材料グループの作成';
    groupModalName.value = '';
    const w = document.createElement('div'); w.innerHTML = createIngredientRowHTML('', '', '大さじ', true); groupModalItems.appendChild(w.firstElementChild);
  }
  groupModal.classList.add('active');
}
openGroupModalBtn.addEventListener('click', () => openGroupModal(null));
cancelGroupModalBtn.addEventListener('click', () => groupModal.classList.remove('active'));
groupModalAddItemBtn.addEventListener('click', () => { const w = document.createElement('div'); w.innerHTML = createIngredientRowHTML('', '', '大さじ', true); groupModalItems.appendChild(w.firstElementChild); });
saveGroupModalBtn.addEventListener('click', () => {
  const gName = groupModalName.value.trim() || '合わせ調味料';
  const items = [];
  groupModalItems.querySelectorAll('.ingredient-row').forEach(row => { const it = extractIngredientFromRow(row); if (it) items.push(it); });
  if (!items.length) { alert('中身の材料を1つ以上入力してください'); return; }
  if (editingGroupIndex !== null) currentGroups[editingGroupIndex] = { name: gName, items };
  else currentGroups.push({ name: gName, items });
  renderGroupCards(); groupModal.classList.remove('active');
});

// ============================================================
// 手順 D&D
// ============================================================
const dropIndicator = document.createElement('div'); dropIndicator.className = 'step-drop-indicator';
function updateStepNumbers() { document.querySelectorAll('#step-container .step-card').forEach((c, i) => c.querySelector('.step-num').textContent = i + 1); }
function attachStepEvents(card) {
  const ta = card.querySelector('.step-desc');
  card.addEventListener('dragstart', e => { card.classList.add('dragging'); card.dataset.tempValue = ta.value; e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', ''); });
  card.addEventListener('dragend', () => { card.classList.remove('dragging'); if (dropIndicator.parentElement) dropIndicator.remove(); if (card.dataset.tempValue !== undefined) ta.value = card.dataset.tempValue; updateStepNumbers(); });
  card.querySelector('.del-step-btn').addEventListener('click', () => { card.remove(); updateStepNumbers(); });
}
document.querySelectorAll('.step-card').forEach(attachStepEvents);
stepContainer.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; const d = document.querySelector('.dragging'); if (!d) return; const a = getDragAfterElement(stepContainer, e.clientY); if (!a) stepContainer.appendChild(dropIndicator); else stepContainer.insertBefore(dropIndicator, a); });
stepContainer.addEventListener('drop', e => { e.preventDefault(); const d = document.querySelector('.dragging'); if (d && dropIndicator.parentElement) { stepContainer.insertBefore(d, dropIndicator); dropIndicator.remove(); } });
function getDragAfterElement(container, y) {
  return [...container.querySelectorAll('.step-card:not(.dragging)')].reduce((closest, child) => {
    const box = child.getBoundingClientRect(); const offset = y - box.top - box.height / 2;
    return (offset < 0 && offset > closest.offset) ? { offset, element: child } : closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
addStepBtn.addEventListener('click', () => {
  const card = document.createElement('div'); card.className = 'step-card'; card.draggable = true;
  card.innerHTML = `<span class="drag-handle">☰</span><span class="step-num"></span><textarea placeholder="手順を入力" rows="2" class="step-desc"></textarea><button type="button" class="del-step-btn">×</button>`;
  attachStepEvents(card); stepContainer.appendChild(card); updateStepNumbers();
});

// ============================================================
// レシピ保存
// ============================================================
saveRecipeBtn.addEventListener('click', async () => {
  const fd = getFormData();
  if (!fd.name) { alert('レシピ名を入力してください'); return; }

  // 連打防止
  saveRecipeBtn.disabled = true;

  try {
    const allIng = [...fd.singleIngredients.map(i => ({ ...i, group: null }))];
    fd.groups.forEach(g => g.items.forEach(it => allIng.push({ ...it, group: g.name })));
    let savedRecipe = null;
    if (editingRecipeId !== null) {
      const idx = recipes.findIndex(r => r.id === editingRecipeId);
      if (idx !== -1) {
        recipes[idx] = { ...recipes[idx], name: fd.name, servings: fd.servings, features: fd.features, ingredients: allIng, groups: fd.groups, steps: fd.steps, photo: fd.photo, rawPhoto: fd.rawPhoto };
        savedRecipe = recipes[idx];
      }
    } else {
      savedRecipe = { id: Date.now(), name: fd.name, servings: fd.servings, features: fd.features, ingredients: allIng, groups: fd.groups, steps: fd.steps, photo: fd.photo, rawPhoto: fd.rawPhoto };
      recipes.push(savedRecipe);
    }

    persistRecipes();
    if (savedRecipe) cloudSaveRecipe(savedRecipe);
    try { localStorage.removeItem('recipe_draft'); } catch(e){}
    resetForm();
    renderRecipes();
    switchView(mainView);
  } catch (err) {
    console.error("Error saving recipe:", err);
    alert('保存中にエラーが発生しました: ' + err.message);
  } finally {
    saveRecipeBtn.disabled = false;
  }
});

// ============================================================
// 不足食材計算（構造化冷蔵庫対応）
// ============================================================
function fridgeHasItem(name) {
  return myFridge.some(f => f.name === name && (f.qty === null || f.qty > 0));
}

function calculateMissingCount(recipeIngredients) {
  return recipeIngredients.filter(i => !i.isPantry).filter(i => !fridgeHasItem(i.name)).length;
}

function getMissingIngredients(recipeIngredients) {
  return recipeIngredients.filter(i => !i.isPantry).filter(i => !fridgeHasItem(i.name)).map(i => i.name);
}

function getTotalDifficulty(r) {
  if (Array.isArray(r)) return r.reduce((s, x) => s + parseInt(x.features?.difficulty || '3', 10), 0);
  return parseInt(r.features?.difficulty || '3', 10);
}

// ============================================================
// 単品フィルタリング & レシピ一覧描画
// ============================================================
function matchesSingleFilter(recipe) {
  const f = recipe.features || {};
  if (singleFilter.maxDifficulty !== null && parseInt(f.difficulty || '3', 10) > singleFilter.maxDifficulty) return false;
  if (singleFilter.tastes.length > 0 && !singleFilter.tastes.includes(f.taste)) return false;
  if (singleFilter.genres.length > 0 && !singleFilter.genres.includes(f.genre)) return false;
  if (singleFilter.mealTypes.length > 0 && !singleFilter.mealTypes.includes(f.mealType)) return false;

  // 「最近作ったもの」の除外モード判定
  if (recentSettings.mode === 'exclude' && getRecentCookingInfo(recipe)) {
    return false;
  }

  return true;
}

function renderRecipes() {
  recipeListContainer.innerHTML = '';
  const paginationContainer = document.getElementById('recipe-pagination');
  if (paginationContainer) paginationContainer.innerHTML = '';

  const filtered = recipes.filter(matchesSingleFilter);
  const sorted = [...filtered].sort((a, b) => {
    // 「最近作ったもの」の優先順位下げモード
    if (recentSettings.mode === 'lower_priority') {
      const aRecent = getRecentCookingInfo(a) ? 1 : 0;
      const bRecent = getRecentCookingInfo(b) ? 1 : 0;
      if (aRecent !== bRecent) return aRecent - bRecent;
    }
    return singleFilter.sortBy === 'difficulty'
      ? getTotalDifficulty(a) - getTotalDifficulty(b)
      : calculateMissingCount(a.ingredients) - calculateMissingCount(b.ingredients);
  });

  const totalItems = sorted.length;
  if (!totalItems) {
    recipeListContainer.innerHTML = '<p style="text-align:center;color:#94a3b8;padding:24px 0;font-size:13px;">条件に合うレシピがありません</p>';
    return;
  }

  // ページ範囲計算
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIdx = (currentPage - 1) * pageSize;
  const pagedRecipes = sorted.slice(startIdx, startIdx + pageSize);

  pagedRecipes.forEach(recipe => {
    const mc = calculateMissingCount(recipe.ingredients);
    const f = recipe.features || {};
    const recentInfo = getRecentCookingInfo(recipe);
    const card = document.createElement('div'); card.className = 'recipe-card';
    card.innerHTML = `
      <div class="recipe-thumb">${recipe.photo ? `<img src="${recipe.photo}" alt="${recipe.name}" loading="lazy">` : '画像'}</div>
      <div class="recipe-info">
        <div class="recipe-title">${recipe.name}</div>
        <div class="recipe-tags">
          <span class="badge">★${f.difficulty||1}</span>
          <span class="badge">${f.taste||'あっさり'}</span>
          <span class="badge">${f.mealType||'メインおかず'}</span>
          ${f.time ? `<span class="badge">⏱ ${formatCookingTime(f.time)}</span>` : ''}
          ${recentInfo ? `<span class="badge recent-cooked-badge">🕒 ${recentInfo.label}</span>` : ''}
          <span class="badge ${mc===0?'match-badge':'match-badge warning'}">追加食材: ${mc}個</span>
        </div>
      </div>`;
    card.addEventListener('click', () => openDetailView(recipe.id));
    recipeListContainer.appendChild(card);
  });

  // ページネーションコントロールの描画
  if (paginationContainer) {
    if (totalPages > 1) {
      renderPaginationUI(paginationContainer, currentPage, totalPages, totalItems, (p) => {
        currentPage = p;
        renderRecipes();
        recipeListContainer.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } else {
      paginationContainer.innerHTML = '';
    }
  }
}

function renderPaginationUI(container, current, totalPages, totalItems, onPageChange) {
  let html = `<div class="pagination-controls">`;

  // 「＜ 前へ」ボタン
  html += `<button type="button" class="page-btn page-nav-btn" ${current === 1 ? 'disabled' : ''} data-page="${current - 1}">＜ 前へ</button>`;

  // ページ番号ボタン（改行防止のためコンパクトに制御）
  let startPage = Math.max(1, current - 1);
  let endPage = Math.min(totalPages, current + 1);
  if (current <= 2) endPage = Math.min(totalPages, 3);
  if (current >= totalPages - 1) startPage = Math.max(1, totalPages - 2);

  if (startPage > 1) {
    html += `<button type="button" class="page-btn" data-page="1">1</button>`;
    if (startPage > 2) html += `<span style="color:#94a3b8;padding:0 2px;font-size:11px;">…</span>`;
  }

  for (let p = startPage; p <= endPage; p++) {
    html += `<button type="button" class="page-btn ${p === current ? 'active' : ''}" data-page="${p}">${p}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) html += `<span style="color:#94a3b8;padding:0 2px;font-size:11px;">…</span>`;
    html += `<button type="button" class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
  }

  // 「次へ ＞」ボタン
  html += `<button type="button" class="page-btn page-nav-btn" ${current === totalPages ? 'disabled' : ''} data-page="${current + 1}">次へ ＞</button>`;
  html += `</div>`;

  // ページ情報表示
  html += `<div class="page-info">${current} / ${totalPages} ページ (全 ${totalItems} 件)</div>`;

  container.innerHTML = html;
  container.style.padding = '4px 8px 2px';
  container.style.gap = '2px';
  container.style.margin = '0';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  container.style.backgroundColor = '#fff';
  container.style.borderTop = '1px solid #f1f5f9';

  container.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const p = parseInt(e.currentTarget.dataset.page, 10);
      if (p && p !== current && p >= 1 && p <= totalPages) {
        onPageChange(p);
      }
    });
  });
}

// ============================================================
// フィルターサマリー
// ============================================================
function renderFilterSummary() {
  filterSummary.innerHTML = '';
  const badges = [];
  if (currentTab === 'single') {
    if (singleFilter.maxDifficulty !== null) badges.push({ label: `★${singleFilter.maxDifficulty}以下`, remove: () => { singleFilter.maxDifficulty = null; } });
    singleFilter.tastes.forEach(t => badges.push({ label: t, remove: () => { singleFilter.tastes = singleFilter.tastes.filter(x => x !== t); } }));
    singleFilter.genres.forEach(g => badges.push({ label: g, remove: () => { singleFilter.genres = singleFilter.genres.filter(x => x !== g); } }));
    singleFilter.mealTypes.forEach(m => badges.push({ label: m, remove: () => { singleFilter.mealTypes = singleFilter.mealTypes.filter(x => x !== m); } }));
    if (singleFilter.sortBy === 'difficulty') badges.push({ label: 'めんどくさ度順▲', remove: () => { singleFilter.sortBy = 'missing'; } });
  } else {
    kondateFilter.genres.forEach(g => badges.push({ label: g, remove: () => { kondateFilter.genres = kondateFilter.genres.filter(x => x !== g); } }));
    if (kondateFilter.comboType === 'staple+side-or-soup') badges.push({ label: '丼もの/めん＋サブ', remove: () => { kondateFilter.comboType = 'main+side'; } });
    else if (kondateFilter.comboType === 'takikomi+main') badges.push({ label: '炊き込み＋メイン', remove: () => { kondateFilter.comboType = 'main+side'; } });
    else if (kondateFilter.comboType === 'custom') badges.push({ label: `カスタム:${(kondateFilter.customTypes||[]).join('+')}`, remove: () => { kondateFilter.comboType = 'main+side'; } });

    if (kondateFilter.mainTastes && kondateFilter.mainTastes.length > 0) {
      const p = kondateFilter.tastePairing === 'opposite' ? '(対照)' : kondateFilter.tastePairing === 'same' ? '(統一)' : '';
      badges.push({ label: `味:${kondateFilter.mainTastes.join(',')}${p}`, remove: () => { kondateFilter.mainTastes = []; } });
    }
    if (kondateFilter.sortBy === 'difficulty') badges.push({ label: 'めんどくさ度順▲', remove: () => { kondateFilter.sortBy = 'missing'; } });
  }
  if (!badges.length) { filterSummary.innerHTML = '<span class="filter-summary-empty">条件なし（すべて表示）</span>'; return; }
  badges.forEach(b => {
    const el = document.createElement('span'); el.className = 'filter-summary-badge';
    el.innerHTML = `${b.label}<span class="badge-remove">✕</span>`;
    el.querySelector('.badge-remove').addEventListener('click', e => { e.stopPropagation(); b.remove(); renderFilterSummary(); syncFilterModalUI(); if (currentTab === 'single') { currentPage = 1; renderRecipes(); } else generateKondateSuggestions(); });
    filterSummary.appendChild(el);
  });
}

// ============================================================
// 絞り込みモーダル
// ============================================================
function setupChipGroup(id, { mode, onSelect }) {
  const el = document.getElementById(id);
  if (!el) return;
  el.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (mode === 'single') {
        const was = chip.classList.contains('selected');
        el.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
        if (!was) chip.classList.add('selected');
      } else {
        chip.classList.toggle('selected');
      }
      if (onSelect) onSelect();
    });
  });
}
function getSelectedChipValues(id) {
  const el = document.getElementById(id);
  if (!el) return [];
  return [...el.querySelectorAll('.chip.selected')].map(c => c.dataset.value);
}
function setSelectedChipValues(id, vals) {
  const el = document.getElementById(id);
  if (!el) return;
  el.querySelectorAll('.chip').forEach(c => c.classList.toggle('selected', (vals || []).includes(c.dataset.value)));
}

setupChipGroup('sf-difficulty-chips', { mode: 'single' });
setupChipGroup('sf-taste-chips', { mode: 'multi' });
setupChipGroup('sf-genre-chips', { mode: 'multi' });
setupChipGroup('sf-type-chips', { mode: 'multi' });
setupChipGroup('kf-genre-chips', { mode: 'multi' });
setupChipGroup('kf-custom-type-chips', { mode: 'multi' });
setupChipGroup('kf-main-taste-chips', {
  mode: 'multi',
  onSelect: () => {
    const tastes = getSelectedChipValues('kf-main-taste-chips');
    const combo = document.querySelector('input[name="kf-combo"]:checked')?.value;
    const pairSec = document.getElementById('kf-taste-pairing-section');
    if (pairSec) {
      pairSec.style.display = (combo === 'main+side' && tastes.length > 0) ? 'block' : 'none';
    }
  }
});

// 献立組み合わせラジオボタン変更リスナー
document.querySelectorAll('input[name="kf-combo"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    const customWrap = document.getElementById('kf-custom-types-wrap');
    if (customWrap) {
      customWrap.style.display = e.target.value === 'custom' ? 'block' : 'none';
    }
    const tastes = getSelectedChipValues('kf-main-taste-chips');
    const pairSec = document.getElementById('kf-taste-pairing-section');
    if (pairSec) {
      pairSec.style.display = (e.target.value === 'main+side' && tastes.length > 0) ? 'block' : 'none';
    }
  });
});

document.getElementById('open-filter-btn').addEventListener('click', () => {
  if (currentTab === 'single') { syncSingleFilterModal(); singleFilterModal.classList.add('active'); }
  else { syncKondateFilterModal(); kondateFilterModal.classList.add('active'); }
});

function syncSingleFilterModal() {
  setSelectedChipValues('sf-difficulty-chips', singleFilter.maxDifficulty !== null ? [String(singleFilter.maxDifficulty)] : []);
  setSelectedChipValues('sf-taste-chips', singleFilter.tastes);
  setSelectedChipValues('sf-genre-chips', singleFilter.genres);
  setSelectedChipValues('sf-type-chips', singleFilter.mealTypes);
  document.querySelector(`input[name="sf-sort"][value="${singleFilter.sortBy}"]`).checked = true;
}
function syncKondateFilterModal() {
  setSelectedChipValues('kf-genre-chips', kondateFilter.genres);
  const comboRadio = document.querySelector(`input[name="kf-combo"][value="${kondateFilter.comboType}"]`);
  if (comboRadio) comboRadio.checked = true;

  const customWrap = document.getElementById('kf-custom-types-wrap');
  if (customWrap) {
    customWrap.style.display = kondateFilter.comboType === 'custom' ? 'block' : 'none';
  }
  setSelectedChipValues('kf-custom-type-chips', kondateFilter.customTypes || ['メインおかず', 'スープ/汁物']);

  setSelectedChipValues('kf-main-taste-chips', kondateFilter.mainTastes || []);
  document.querySelector(`input[name="kf-taste-pair"][value="${kondateFilter.tastePairing}"]`).checked = true;
  
  const pairSec = document.getElementById('kf-taste-pairing-section');
  if (pairSec) {
    pairSec.style.display = (kondateFilter.comboType === 'main+side' && (kondateFilter.mainTastes || []).length > 0) ? 'block' : 'none';
  }
  document.querySelector(`input[name="kf-sort"][value="${kondateFilter.sortBy}"]`).checked = true;
}
function syncFilterModalUI() { if (currentTab === 'single') syncSingleFilterModal(); else syncKondateFilterModal(); }

document.getElementById('close-single-filter-btn').addEventListener('click', () => singleFilterModal.classList.remove('active'));
document.getElementById('reset-single-filter-btn').addEventListener('click', () => {
  singleFilter.maxDifficulty = null; singleFilter.tastes = []; singleFilter.genres = []; singleFilter.mealTypes = []; singleFilter.sortBy = 'missing';
  currentPage = 1;
  syncSingleFilterModal();
});
document.getElementById('apply-single-filter-btn').addEventListener('click', () => {
  const d = getSelectedChipValues('sf-difficulty-chips'); singleFilter.maxDifficulty = d.length ? parseInt(d[0], 10) : null;
  singleFilter.tastes = getSelectedChipValues('sf-taste-chips'); singleFilter.genres = getSelectedChipValues('sf-genre-chips'); singleFilter.mealTypes = getSelectedChipValues('sf-type-chips');
  singleFilter.sortBy = document.querySelector('input[name="sf-sort"]:checked').value;
  currentPage = 1;
  singleFilterModal.classList.remove('active'); renderFilterSummary(); renderRecipes();
});
document.getElementById('close-kondate-filter-btn').addEventListener('click', () => kondateFilterModal.classList.remove('active'));
document.getElementById('reset-kondate-filter-btn').addEventListener('click', () => {
  kondateFilter.genres = []; kondateFilter.comboType = 'main+side'; kondateFilter.customTypes = ['メインおかず', 'スープ/汁物']; kondateFilter.mainTastes = []; kondateFilter.tastePairing = 'opposite'; kondateFilter.sortBy = 'missing';
  currentKondatePage = 1;
  syncKondateFilterModal();
});
document.getElementById('apply-kondate-filter-btn').addEventListener('click', () => {
  kondateFilter.genres = getSelectedChipValues('kf-genre-chips');
  kondateFilter.comboType = document.querySelector('input[name="kf-combo"]:checked').value;
  kondateFilter.customTypes = getSelectedChipValues('kf-custom-type-chips');
  if (!kondateFilter.customTypes || !kondateFilter.customTypes.length) {
    kondateFilter.customTypes = ['メインおかず', 'スープ/汁物'];
  }
  kondateFilter.mainTastes = getSelectedChipValues('kf-main-taste-chips');
  kondateFilter.tastePairing = document.querySelector('input[name="kf-taste-pair"]:checked').value;
  kondateFilter.sortBy = document.querySelector('input[name="kf-sort"]:checked').value;
  currentKondatePage = 1;
  kondateFilterModal.classList.remove('active'); renderFilterSummary(); generateKondateSuggestions();
});

// ============================================================
// レシピ詳細画面
// ============================================================
let currentDetailRecipeId = null;

function openDetailView(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;
  currentDetailRecipeId = recipeId;
  const f = recipe.features || {};
  const ingredients = recipe.ingredients || [];
  const mc = calculateMissingCount(ingredients);
  const mn = getMissingIngredients(ingredients);
  document.getElementById('detail-title').textContent = recipe.name || '';
  const body = document.getElementById('detail-body'); body.innerHTML = '';

  const recentInfo = getRecentCookingInfo(recipe);
  body.innerHTML += recipe.photo
    ? `<div class="detail-photo"><img src="${recipe.photo}" alt="${recipe.name}"></div>`
    : '<div class="detail-photo">📷 写真なし</div>';
  body.innerHTML += `<div class="detail-feature-tags"><span class="badge">★${f.difficulty||1}</span><span class="badge">${f.taste||'あっさり'}</span><span class="badge">${f.genre||'和風'}</span><span class="badge">${f.mealType||'メインおかず'}</span>${f.time?`<span class="badge">⏱ ${formatCookingTime(f.time)}</span>`:''}${recentInfo?`<span class="badge recent-cooked-badge">🕒 ${recentInfo.label}</span>`:''}${(f.freeTags||[]).map(t=>`<span class="badge">#${t}</span>`).join('')}<span class="badge">👤 ${recipe.servings||1}人前</span></div>`;

  if (mc === 0) body.innerHTML += '<div><span class="badge match-badge">🎉 すべての食材が揃っています！</span></div>';
  else body.innerHTML += `<div><span class="badge match-badge warning">🛒 追加食材: ${mc}個（${mn.join('、')}）</span></div>`;

  // 材料
  let ingHTML = '<div class="detail-section"><h3>🥬 材料</h3><ul class="detail-ingredient-list">';
  ingredients.filter(i => !i.group).forEach(ing => { ingHTML += makeDetailIngHTML(ing); });
  (recipe.groups || []).forEach(g => {
    ingHTML += `<div class="detail-group-label">【${g.name}】</div>`;
    ingredients.filter(i => i.group === g.name).forEach(ing => { ingHTML += makeDetailIngHTML(ing); });
  });
  ingHTML += '</ul></div>';
  body.innerHTML += ingHTML;

  // 作り方
  if (recipe.steps?.length > 0) {
    let stHTML = '<div class="detail-section"><h3>📝 作り方</h3><ol class="detail-step-list">';
    recipe.steps.forEach((s, i) => { stHTML += `<li class="detail-step-item"><span class="detail-step-num">${i+1}</span><span>${s}</span></li>`; });
    stHTML += '</ol></div>';
    body.innerHTML += stHTML;
  }

  switchView(detailView);
}

function makeDetailIngHTML(ing) {
  return `<li class="detail-ingredient-item${ing.isPantry?' pantry-item':''}"><span class="ing-name-col">${ing.name}${ing.isPantry?'<span class="pantry-label">常備</span>':''}</span><span class="ing-qty-col">${ing.qty} ${ing.unit}</span></li>`;
}

document.getElementById('detail-back-btn').addEventListener('click', () => switchView(mainView));
document.getElementById('detail-edit-btn').addEventListener('click', () => { const r = recipes.find(r => r.id === currentDetailRecipeId); if (r) { loadRecipeIntoForm(r); switchView(addView); } });
document.getElementById('detail-delete-btn').addEventListener('click', () => {
  const r = recipes.find(r => r.id === currentDetailRecipeId);
  if (!r || !confirm(`「${r.name}」を削除しますか？`)) return;
  const deletedId = currentDetailRecipeId;
  recipes = recipes.filter(r => r.id !== deletedId);
  persistRecipes();
  cloudDeleteRecipe(deletedId);
  renderRecipes(); switchView(mainView);
});

// ============================================================
// 「今日作った！」フロー
// ============================================================
document.getElementById('detail-cooked-btn').addEventListener('click', () => {
  const recipe = recipes.find(r => r.id === currentDetailRecipeId);
  if (!recipe) return;
  document.getElementById('cooked-servings').value = recipe.servings || 1;
  document.getElementById('cooked-base-servings').textContent = recipe.servings || 1;
  document.querySelector('input[name="cooked-deduct"][value="auto"]').checked = true;
  cookedModal.classList.add('active');
});

document.getElementById('cancel-cooked-btn').addEventListener('click', () => cookedModal.classList.remove('active'));

document.getElementById('confirm-cooked-btn').addEventListener('click', () => {
  const recipe = recipes.find(r => r.id === currentDetailRecipeId);
  if (!recipe) return;

  const servingsMade = parseInt(document.getElementById('cooked-servings').value, 10) || 1;
  const deductMode = document.querySelector('input[name="cooked-deduct"]:checked').value;
  cookedModal.classList.remove('active');

  if (deductMode === 'auto') {
    showDeductConfirmation(recipe, servingsMade);
  } else {
    recordCooking(recipe, servingsMade);
  }
});

function showDeductConfirmation(recipe, servingsMade) {
  const baseServings = recipe.servings || 1;
  const ratio = servingsMade / baseServings;
  const deductListEl = document.getElementById('deduct-list');
  deductListEl.innerHTML = '';

  const deductions = [];
  (recipe.ingredients || []).forEach(ing => {
    if (ing.isPantry) return; // 常備品はスキップ
    const parsedQty = parseQty(ing.qty);
    if (parsedQty === null) {
      deductions.push({ name: ing.name, amount: null, unit: ing.unit, skipped: true, reason: `${ing.qty || '適量'}のためスキップ` });
    } else {
      const amount = parsedQty * ratio;
      deductions.push({ name: ing.name, amount, unit: ing.unit, skipped: false });
    }
  });

  deductions.forEach(d => {
    const div = document.createElement('div');
    div.className = 'deduct-item' + (d.skipped ? ' skipped' : '');
    div.innerHTML = `<span class="deduct-name">${d.name}</span><span class="deduct-amount">${d.skipped ? d.reason : `−${formatQty(d.amount)} ${d.unit}`}</span>`;
    deductListEl.appendChild(div);
  });

  // 確認モーダルに控除データを保存
  deductConfirmModal._deductions = deductions;
  deductConfirmModal._recipe = recipe;
  deductConfirmModal._servingsMade = servingsMade;
  deductConfirmModal.classList.add('active');
}

document.getElementById('cancel-deduct-btn').addEventListener('click', () => {
  deductConfirmModal.classList.remove('active');
  cookedModal.classList.add('active'); // 戻る
});

document.getElementById('confirm-deduct-btn').addEventListener('click', () => {
  const { _deductions: deductions, _recipe: recipe, _servingsMade: servingsMade } = deductConfirmModal;
  deductConfirmModal.classList.remove('active');

  // 冷蔵庫から控除
  deductions.filter(d => !d.skipped).forEach(d => {
    const fridgeItem = myFridge.find(f => f.name === d.name);
    if (fridgeItem && fridgeItem.qty !== null) {
      fridgeItem.qty = Math.max(0, fridgeItem.qty - d.amount);
    }
  });
  persistFridge();
  cloudSaveFridge();

  recordCooking(recipe, servingsMade);
  renderRecipes();
  // 詳細画面を更新
  openDetailView(recipe.id);
});

function recordCooking(recipe, servingsMade) {
  cookingHistory.push({
    recipeId: recipe.id,
    recipeName: recipe.name,
    date: new Date().toISOString().split('T')[0],
    servings: servingsMade
  });
  persistCookingHistory();
  cloudSaveCookingHistory();
}

// ============================================================
// タブ切り替え
// ============================================================
document.querySelectorAll('.search-mode-tabs .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.search-mode-tabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active'); currentTab = tab.dataset.tab;
    if (currentTab === 'single') {
      recipeListContainer.style.display = 'flex';
      kondateResults.classList.remove('active');
      renderRecipes();
    } else {
      recipeListContainer.style.display = 'none';
      kondateResults.classList.add('active');
      generateKondateSuggestions();
    }
    renderFilterSummary();
  });
});

// ============================================================
// 献立検索
// ============================================================
function generateKondateSuggestions() {
  kondateResults.innerHTML = '';
  const paginationContainer = document.getElementById('recipe-pagination');
  const gf = kondateFilter.genres.length > 0 ? r => kondateFilter.genres.includes((r.features||{}).genre) : () => true;
  const all = recipes.filter(gf);
  const mains = all.filter(r => (r.features||{}).mealType === 'メインおかず');
  const sides = all.filter(r => (r.features||{}).mealType === 'サブおかず');
  const soups = all.filter(r => (r.features||{}).mealType === 'スープ/汁物');
  const staples = all.filter(r => { const m = (r.features||{}).mealType; return m === '丼もの' || m === 'めん系' || m === 'ごはん系'; });
  const takikomiDishes = all.filter(r => {
    const f = r.features || {};
    return f.mealType === '炊き込みご飯' || f.genre === '炊き込みご飯' || r.name.includes('炊き込み') || r.name.includes('炊きこみ') || r.name.includes('釜飯');
  });

  // 味の対照関係マッピング（5種類）
  const oppMap = {
    'あっさり': ['こってり', '旨辛'],
    'こってり': ['あっさり', '酸味・さっぱり'],
    '旨辛': ['甘め', 'あっさり'],
    '甘め': ['旨辛', '酸味・さっぱり', 'あっさり'],
    '酸味・さっぱり': ['こってり', '甘め']
  };

  function tasteFilter(dishes, role) {
    const selectedTastes = kondateFilter.mainTastes || [];
    if (selectedTastes.length === 0) return dishes;

    if (role === 'main' || role === 'staple' || role === 'takikomi') {
      return dishes.filter(r => selectedTastes.includes((r.features||{}).taste));
    }
    if (role === 'side') {
      if (kondateFilter.tastePairing === 'opposite') {
        const oppTargets = new Set();
        selectedTastes.forEach(t => {
          (oppMap[t] || []).forEach(o => oppTargets.add(o));
        });
        const matched = dishes.filter(r => oppTargets.has((r.features||{}).taste));
        return matched.length ? matched : dishes;
      }
      if (kondateFilter.tastePairing === 'same') {
        const matched = dishes.filter(r => selectedTastes.includes((r.features||{}).taste));
        return matched.length ? matched : dishes;
      }
      return dishes;
    }
    return dishes;
  }

  let sets = [];

  if (kondateFilter.comboType === 'main+side') {
    const fm = tasteFilter(mains, 'main'), fs = tasteFilter(sides, 'side'), sl = soups.length ? soups : [null];
    if (fm.length && fs.length) {
      for (const m of fm) for (const s of fs) for (const sp of sl) {
        const items = [{ recipe: m, role: 'メインおかず' }, { recipe: s, role: 'サブおかず' }];
        if (sp) items.push({ recipe: sp, role: 'スープ/汁物' });
        else items.push({ recipe: null, role: 'スープ/汁物', placeholder: '適当な味噌汁' });
        sets.push(buildSetData(items));
      }
    }
  } else if (kondateFilter.comboType === 'staple+side-or-soup') {
    const fst = tasteFilter(staples, 'staple'), fsd = tasteFilter(sides, 'side');
    const comps = [...fsd, ...soups];
    if (fst.length) {
      if (!comps.length) {
        fst.forEach(s => {
          const m = (s.features||{}).mealType;
          const rl = m === 'めん系' ? 'めん系' : (m === '炊き込みご飯' ? '炊き込みご飯' : '丼もの');
          sets.push(buildSetData([{ recipe: s, role: rl }, { recipe: null, role: 'スープ/汁物', placeholder: '適当なコンソメスープ' }]));
        });
      } else {
        for (const st of fst) {
          const m = (st.features||{}).mealType;
          const rl = m === 'めん系' ? 'めん系' : (m === '炊き込みご飯' ? '炊き込みご飯' : '丼もの');
          for (const c of comps) {
            const cr = (c.features||{}).mealType === 'スープ/汁物' ? 'スープ/汁物' : 'サブおかず';
            sets.push(buildSetData([{ recipe: st, role: rl }, { recipe: c, role: cr }]));
          }
        }
      }
    }
  } else if (kondateFilter.comboType === 'takikomi+main') {
    const pool = takikomiDishes.length > 0 ? takikomiDishes : staples.filter(s => (s.features||{}).mealType === '丼もの' || (s.features||{}).mealType === 'ごはん系');
    const ftk = tasteFilter(pool, 'takikomi');
    const fm = tasteFilter(mains, 'main');
    const sl = soups.length ? soups : [null];

    if (ftk.length && fm.length) {
      for (const tk of ftk) for (const m of fm) for (const sp of sl) {
        const items = [{ recipe: tk, role: '炊き込みご飯' }, { recipe: m, role: 'メインおかず' }];
        if (sp) items.push({ recipe: sp, role: 'スープ/汁物' });
        else items.push({ recipe: null, role: 'スープ/汁物', placeholder: '適当なお吸い物・味噌汁' });
        sets.push(buildSetData(items));
      }
    }
  } else if (kondateFilter.comboType === 'custom') {
    // その他（カスタム品目）
    const chosenTypes = (kondateFilter.customTypes && kondateFilter.customTypes.length >= 2)
      ? kondateFilter.customTypes
      : ['メインおかず', 'スープ/汁物'];

    const typePools = chosenTypes.map(t => {
      let pool = all.filter(r => (r.features||{}).mealType === t);
      if (t === '炊き込みご飯' && pool.length === 0) {
        pool = takikomiDishes;
      }
      if (t === 'メインおかず' || t === '丼もの' || t === '炊き込みご飯') pool = tasteFilter(pool, 'main');
      else if (t === 'サブおかず') pool = tasteFilter(pool, 'side');
      return { type: t, pool };
    });

    const validPools = typePools.filter(p => p.pool.length > 0);
    if (validPools.length >= 2) {
      function cartesian(index, currentItems) {
        if (index === validPools.length) {
          sets.push(buildSetData(currentItems));
          return;
        }
        if (sets.length > 120) return; // 組み合わせ爆発防止
        const { type, pool } = validPools[index];
        for (const item of pool.slice(0, 5)) {
          cartesian(index + 1, [...currentItems, { recipe: item, role: type }]);
        }
      }
      cartesian(0, []);
    }
  }
  function setHasRecentMain(set) {
    return set.items.some(item => {
      if (!item.recipe) return false;
      if (['メインおかず', '丼もの', '炊き込みご飯', 'ごはん系', 'めん系'].includes(item.role)) {
        return !!getRecentCookingInfo(item.recipe);
      }
      return false;
    });
  }

  if (recentSettings.mode === 'exclude') {
    sets = sets.filter(s => !setHasRecentMain(s));
  }

  if (!sets.length) {
    kondateResults.innerHTML = '<p class="kondate-empty-msg">条件に合う献立が見つかりません。</p>';
    if (paginationContainer) paginationContainer.innerHTML = '';
    return;
  }

  sets.sort((a, b) => {
    if (recentSettings.mode === 'lower_priority') {
      const aRecent = setHasRecentMain(a) ? 1 : 0;
      const bRecent = setHasRecentMain(b) ? 1 : 0;
      if (aRecent !== bRecent) return aRecent - bRecent;
    }
    return kondateFilter.sortBy === 'difficulty' ? a.totalDifficulty - b.totalDifficulty : a.missingCount - b.missingCount;
  });

  const totalKondateSets = sets.length;
  const totalKondatePages = Math.ceil(totalKondateSets / kondatePageSize) || 1;
  if (currentKondatePage > totalKondatePages) currentKondatePage = totalKondatePages;
  if (currentKondatePage < 1) currentKondatePage = 1;

  const startK = (currentKondatePage - 1) * kondatePageSize;
  const pagedSets = sets.slice(startK, startK + kondatePageSize);

  let label = '🍱 献立提案';
  if (kondateFilter.comboType === 'main+side') label = '🍱 メインおかず＋サブおかず';
  else if (kondateFilter.comboType === 'staple+side-or-soup') label = '🍝 丼もの/めん系＋サブ or スープ';
  else if (kondateFilter.comboType === 'takikomi+main') label = '🍚 炊き込みご飯＋メインおかず';
  else if (kondateFilter.comboType === 'custom') label = `✨ カスタム献立（${(kondateFilter.customTypes || ['メインおかず', 'スープ/汁物']).join('＋')}）`;

  const sec = document.createElement('div'); sec.className = 'kondate-type-section'; sec.innerHTML = `<h3>${label}</h3>`;
  pagedSets.forEach((s, i) => sec.appendChild(createKondateCard(s, startK + i + 1)));
  kondateResults.appendChild(sec);

  // 献立検索のページネーションコントロール描画（画面下側に統一）
  if (paginationContainer) {
    if (totalKondatePages > 1) {
      renderPaginationUI(paginationContainer, currentKondatePage, totalKondatePages, totalKondateSets, (p) => {
        currentKondatePage = p;
        generateKondateSuggestions();
        kondateResults.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } else {
      paginationContainer.innerHTML = '';
    }
  }
}
function buildSetData(items) {
  const req = new Set(); let td = 0;
  items.forEach(({ recipe }) => { if (!recipe) return; recipe.ingredients.forEach(i => { if (!i.isPantry) req.add(i.name); }); td += parseInt(recipe.features?.difficulty || '3', 10); });
  let mc = 0; req.forEach(n => { if (!fridgeHasItem(n)) mc++; });
  return { items, missingCount: mc, totalDifficulty: td };
}
function createKondateCard(set, rank) {
  const card = document.createElement('div'); card.className = 'kondate-set-card';
  const mc = set.missingCount === 0 ? 'perfect' : 'needs-shopping';
  const mt = set.missingCount === 0 ? '買い足し不要！' : `追加食材: ${set.missingCount}個`;
  let ih = '';
  set.items.forEach(item => {
    const rc = getRoleClass(item.role);
    if (item.placeholder) {
      ih += `<div class="kondate-item"><span class="kondate-item-role placeholder">${item.role}</span><span>${item.placeholder}</span></div>`;
    } else {
      const d = item.recipe.features?.difficulty || '?';
      const recentInfo = getRecentCookingInfo(item.recipe);
      ih += `<div class="kondate-item"><span class="kondate-item-role ${rc}">${item.role}</span><span>${item.recipe.name} <small style="color:#94a3b8">★${d}</small>${recentInfo ? ` <span class="badge recent-cooked-badge">🕒 ${recentInfo.label}</span>` : ''}</span></div>`;
    }
  });

  card.innerHTML = `
    <div class="kondate-set-header">
      <span class="kondate-set-rank">#${rank}</span>
      <span class="kondate-set-missing ${mc}">${mt}</span>
    </div>
    ${ih}
    <button type="button" class="kondate-cooked-btn">🍳 この献立を作った！</button>
  `;

  card.querySelector('.kondate-cooked-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    handleCookedKondateSet(set);
  });

  return card;
}

function handleCookedKondateSet(set) {
  const realItems = set.items.filter(it => it.recipe);
  const names = realItems.map(it => it.recipe.name).join('、');
  if (!confirm(`この献立を作った記録を保存しますか？\n\n【対象メニュー】\n${names}\n\n※冷蔵庫の材料も自動で控除されます。`)) {
    return;
  }

  // 各メニューの記録と冷蔵庫控除
  realItems.forEach(({ recipe }) => {
    const servings = recipe.servings || 1;
    (recipe.ingredients || []).forEach(ing => {
      if (ing.isPantry) return;
      const parsed = parseQty(ing.qty);
      if (parsed !== null) {
        const fridgeItem = myFridge.find(f => f.name === ing.name);
        if (fridgeItem && fridgeItem.qty !== null) {
          fridgeItem.qty = Math.max(0, fridgeItem.qty - parsed);
        }
      }
    });
    recordCooking(recipe, servings);
  });

  persistFridge();
  cloudSaveFridge();
  renderRecipes();
  generateKondateSuggestions();
  alert(`「${names}」をカレンダーに記録しました！`);
}
function getRoleClass(r) { return { 'メインおかず': 'main-dish', 'サブおかず': 'side-dish', 'スープ/汁物': 'soup', 'ごはん系': 'staple', '丼もの': 'staple', '炊き込みご飯': 'staple', 'めん系': 'staple' }[r] || ''; }

// ============================================================
// 冷蔵庫画面（構造化リスト）
// ============================================================
function createFridgeRowHTML(name = '', qty = '', unit = '') {
  const units = ['', 'g', 'kg', 'ml', '個', '本', '枚', '袋', 'パック', '束', 'かけ', '丁'];
  const opts = units.map(u => `<option value="${u}" ${u === unit ? 'selected' : ''}>${u || '-'}</option>`).join('');
  return `<div class="fridge-item-row"><input type="text" placeholder="食材名" class="fridge-item-name ac-ingredient-input" value="${name}"><input type="text" placeholder="量" class="fridge-item-qty" value="${qty}"><select class="fridge-item-unit">${opts}</select><button type="button" class="del-row-btn" onclick="this.parentElement.remove()">×</button></div>`;
}

function renderFridgeList() {
  fridgeList.innerHTML = '';
  myFridge.forEach(item => {
    const w = document.createElement('div');
    w.innerHTML = createFridgeRowHTML(item.name, item.qty !== null ? item.qty : '', item.unit);
    fridgeList.appendChild(w.firstElementChild);
  });
  if (!myFridge.length) {
    const w = document.createElement('div');
    w.innerHTML = createFridgeRowHTML();
    fridgeList.appendChild(w.firstElementChild);
  }
}

document.getElementById('open-fridge-btn').addEventListener('click', () => { renderFridgeList(); switchView(fridgeView); });
document.getElementById('close-fridge-btn').addEventListener('click', () => switchView(mainView));
document.getElementById('add-fridge-item-btn').addEventListener('click', () => {
  const w = document.createElement('div'); w.innerHTML = createFridgeRowHTML();
  fridgeList.appendChild(w.firstElementChild);
});

document.getElementById('save-fridge-btn').addEventListener('click', () => {
  const items = [];
  fridgeList.querySelectorAll('.fridge-item-row').forEach(row => {
    const name = row.querySelector('.fridge-item-name').value.trim();
    if (!name) return;
    const qtyStr = row.querySelector('.fridge-item-qty').value.trim();
    const qty = qtyStr === '' ? null : parseQty(qtyStr);
    const unit = row.querySelector('.fridge-item-unit').value;
    items.push({ name, qty, unit });
  });
  // ダブり合算
  myFridge = mergeFridgeItems(items);
  persistFridge();
  cloudSaveFridge();
  renderRecipes();
  if (currentTab === 'kondate') generateKondateSuggestions();
  switchView(mainView);
});

function mergeFridgeItems(items) {
  const merged = {};
  items.forEach(item => {
    const key = `${item.name}__${item.unit}`;
    if (merged[key]) {
      if (merged[key].qty !== null && item.qty !== null) merged[key].qty += item.qty;
      else if (item.qty !== null) merged[key].qty = item.qty;
    } else {
      merged[key] = { ...item };
    }
  });
  return Object.values(merged);
}

// ============================================================
// オートコンプリート（予測変換 + 表記ゆれ警告）
// ============================================================
let acActiveInput = null;
let acHideTimeout = null;

// イベント委任: .ac-ingredient-input クラスを持つ入力欄に対応
document.querySelector('.app-container').addEventListener('input', (e) => {
  if (!e.target.classList.contains('ac-ingredient-input')) return;
  showAutocompleteSuggestions(e.target);
});

document.querySelector('.app-container').addEventListener('focusin', (e) => {
  if (!e.target.classList.contains('ac-ingredient-input')) return;
  clearTimeout(acHideTimeout);
  showAutocompleteSuggestions(e.target);
});

document.querySelector('.app-container').addEventListener('focusout', (e) => {
  if (!e.target.classList.contains('ac-ingredient-input')) return;
  acHideTimeout = setTimeout(() => {
    hideAutocomplete();
    checkForSimilarWords(e.target);
  }, 200);
});

// ドロップダウンのクリック
acDropdown.addEventListener('mousedown', (e) => {
  e.preventDefault(); // focusout を防ぐ
  const option = e.target.closest('.ac-option');
  if (option && acActiveInput) {
    acActiveInput.value = option.dataset.value;
    hideAutocomplete();
    hideAcWarning();
  }
});

function showAutocompleteSuggestions(input) {
  acActiveInput = input;
  const query = input.value.trim();
  if (!query) { hideAutocomplete(); return; }

  const vocab = getKnownIngredientNames();
  const normalizedQuery = normalizeKana(query);
  const suggestions = vocab.filter(word => {
    if (word === query) return false; // 完全一致は除外
    return word.includes(query) || normalizeKana(word).includes(normalizedQuery);
  }).slice(0, 6);

  if (!suggestions.length) { hideAutocomplete(); return; }

  const containerRect = document.querySelector('.app-container').getBoundingClientRect();
  const inputRect = input.getBoundingClientRect();
  acDropdown.style.left = (inputRect.left - containerRect.left) + 'px';
  acDropdown.style.top = (inputRect.bottom - containerRect.top + 2) + 'px';
  acDropdown.style.width = Math.max(inputRect.width, 150) + 'px';
  acDropdown.innerHTML = suggestions.map(s => `<div class="ac-option" data-value="${s}">${highlightMatch(s, query)}</div>`).join('');
  acDropdown.style.display = 'block';
}

function highlightMatch(word, query) {
  const idx = word.indexOf(query);
  if (idx >= 0) return word.slice(0, idx) + `<span class="ac-highlight">${query}</span>` + word.slice(idx + query.length);
  return word;
}

function hideAutocomplete() {
  acDropdown.style.display = 'none';
  acDropdown.innerHTML = '';
}

function checkForSimilarWords(input) {
  const value = input.value.trim();
  if (!value) { hideAcWarning(); return; }

  const vocab = getKnownIngredientNames();
  if (vocab.includes(value)) { hideAcWarning(); return; } // 既知の語 → OK

  const normalizedValue = normalizeKana(value);
  const similar = vocab.filter(word => {
    const nw = normalizeKana(word);
    return nw === normalizedValue || nw.startsWith(normalizedValue) || normalizedValue.startsWith(nw);
  });

  if (similar.length === 0) { hideAcWarning(); return; }

  const containerRect = document.querySelector('.app-container').getBoundingClientRect();
  const inputRect = input.getBoundingClientRect();
  acWarning.style.left = (inputRect.left - containerRect.left) + 'px';
  acWarning.style.top = (inputRect.bottom - containerRect.top + 2) + 'px';
  acWarning.innerHTML = `<span class="ac-warning-close">✕</span>⚠ 「${similar[0]}」とは別の材料として保存されます`;
  acWarning.style.display = 'block';
  acWarning.querySelector('.ac-warning-close').addEventListener('click', hideAcWarning);
}

function hideAcWarning() {
  acWarning.style.display = 'none';
  acWarning.innerHTML = '';
}

// ============================================================
// カレンダー画面 & 「最近作ったもの」設定ロジック
// ============================================================
function initCalendarView() {
  recentDaysSelect.value = String(recentSettings.days);
  const modeRadio = document.querySelector(`input[name="recent-mode"][value="${recentSettings.mode}"]`);
  if (modeRadio) modeRadio.checked = true;
  renderCalendar();
  renderDayHistory();
}

openCalendarBtn.addEventListener('click', () => {
  initCalendarView();
  switchView(calendarView);
});

closeCalendarBtn.addEventListener('click', () => {
  renderRecipes();
  if (currentTab === 'kondate') generateKondateSuggestions();
  switchView(mainView);
});

recentDaysSelect.addEventListener('change', (e) => {
  recentSettings.days = parseInt(e.target.value, 10);
  persistRecentSettings();
  cloudSaveRecentSettings();
  renderRecipes();
  if (currentTab === 'kondate') generateKondateSuggestions();
});

document.querySelectorAll('input[name="recent-mode"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    recentSettings.mode = e.target.value;
    persistRecentSettings();
    cloudSaveRecentSettings();
    renderRecipes();
    if (currentTab === 'kondate') generateKondateSuggestions();
  });
});

calPrevMonthBtn.addEventListener('click', () => {
  currentCalMonth--;
  if (currentCalMonth < 0) {
    currentCalMonth = 11;
    currentCalYear--;
  }
  renderCalendar();
});

calNextMonthBtn.addEventListener('click', () => {
  currentCalMonth++;
  if (currentCalMonth > 11) {
    currentCalMonth = 0;
    currentCalYear++;
  }
  renderCalendar();
});

function renderCalendar() {
  calMonthTitle.textContent = `${currentCalYear}年 ${currentCalMonth + 1}月`;
  calDaysGrid.innerHTML = '';

  const firstDayOfWeek = new Date(currentCalYear, currentCalMonth, 1).getDay();
  const totalDays = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
  const todayStr = new Date().toISOString().split('T')[0];

  // 月初の空セル
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'cal-day-cell empty';
    calDaysGrid.appendChild(emptyCell);
  }

  // 各日付セル
  for (let day = 1; day <= totalDays; day++) {
    const mStr = String(currentCalMonth + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    const dateStr = `${currentCalYear}-${mStr}-${dStr}`;

    const cellDate = new Date(currentCalYear, currentCalMonth, day);
    const dayOfWeek = cellDate.getDay();

    const cell = document.createElement('div');
    cell.className = 'cal-day-cell';
    if (dayOfWeek === 0) cell.classList.add('sun');
    if (dayOfWeek === 6) cell.classList.add('sat');
    if (dateStr === todayStr) cell.classList.add('today');
    if (dateStr === selectedCalDateStr) cell.classList.add('selected');

    // 調理履歴があるか確認
    const dayRecords = cookingHistory.filter(h => h.date === dateStr);
    const mainItems = [];
    dayRecords.forEach(rec => {
      let isMain = true;
      if (rec.recipeId) {
        const r = recipes.find(x => x.id === rec.recipeId);
        if (r && r.features) {
          isMain = ['メインおかず', 'ごはん系', 'めん系'].includes(r.features.mealType);
        }
      }
      if (isMain && rec.recipeName) {
        mainItems.push(rec.recipeName);
      }
    });

    let cellHTML = `<span class="cal-day-num">${day}</span>`;
    if (mainItems.length > 0) {
      const firstTitle = mainItems[0];
      const shortTitle = firstTitle.length > 5 ? firstTitle.slice(0, 4) + '…' : firstTitle;
      cellHTML += `<div class="cal-cell-menu" title="${firstTitle}">${shortTitle}</div>`;
      if (mainItems.length > 1) {
        cellHTML += `<div class="cal-cell-more">+${mainItems.length - 1}</div>`;
      }
    } else if (dayRecords.length > 0) {
      cellHTML += `<span class="cal-dot"></span>`;
    }

    cell.innerHTML = cellHTML;

    cell.addEventListener('click', () => {
      selectedCalDateStr = dateStr;
      renderCalendar();
      renderDayHistory();
    });

    calDaysGrid.appendChild(cell);
  }
}

function renderDayHistory() {
  const parts = selectedCalDateStr.split('-').map(Number);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  let weekdayLabel = '';
  if (parts.length === 3) {
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    weekdayLabel = ` (${weekdays[d.getDay()]})`;
  }
  calSelectedDateLabel.textContent = `${parts[0]}年${parts[1]}月${parts[2]}日${weekdayLabel}の記録`;

  const records = cookingHistory.filter(h => h.date === selectedCalDateStr);
  calDayHistoryList.innerHTML = '';

  if (!records.length) {
    calDayHistoryList.innerHTML = '<p class="cal-history-empty">この日の調理記録はありません</p>';
    return;
  }

  records.forEach((rec, idx) => {
    const item = document.createElement('div');
    item.className = 'cal-history-item';
    item.innerHTML = `
      <div class="cal-history-info">
        <span class="cal-history-name">${rec.recipeName || '料理'}</span>
        <span class="cal-history-servings">${rec.servings || 1}人前</span>
      </div>
      <button type="button" class="cal-history-del-btn" title="記録を削除">✕</button>
    `;

    item.querySelector('.cal-history-del-btn').addEventListener('click', () => {
      if (!confirm(`「${rec.recipeName || '料理'}」の記録を削除しますか？`)) return;
      // 該当レコードを cookingHistory から削除
      const originalIdx = cookingHistory.findIndex(h => h === rec);
      if (originalIdx !== -1) {
        cookingHistory.splice(originalIdx, 1);
        persistCookingHistory();
        cloudSaveCookingHistory();
        renderCalendar();
        renderDayHistory();
        renderRecipes();
      }
    });

    calDayHistoryList.appendChild(item);
  });
}

// カレンダー手動追加モーダル
calOpenAddBtn.addEventListener('click', () => {
  calAddDate.value = selectedCalDateStr;
  calAddRecipeSelect.innerHTML = '<option value="">-- レシピから選択 --</option>' +
    recipes.map(r => `<option value="${r.id}">${r.name} (${r.features?.mealType || 'メインおかず'})</option>`).join('');
  calAddCustomName.value = '';
  calAddServings.value = '1';
  calendarAddModal.classList.add('active');
});

cancelCalAddBtn.addEventListener('click', () => {
  calendarAddModal.classList.remove('active');
});

saveCalAddBtn.addEventListener('click', () => {
  const dateVal = calAddDate.value;
  if (!dateVal) {
    alert('日付を選択してください');
    return;
  }

  const selectedRecipeId = calAddRecipeSelect.value ? parseInt(calAddRecipeSelect.value, 10) : null;
  const customName = calAddCustomName.value.trim();
  const servings = parseInt(calAddServings.value, 10) || 1;

  let recipeName = '';
  if (selectedRecipeId) {
    const r = recipes.find(item => item.id === selectedRecipeId);
    recipeName = r ? r.name : 'レシピ料理';
  } else if (customName) {
    recipeName = customName;
  } else {
    alert('レシピを選択するか、料理名を入力してください');
    return;
  }

  cookingHistory.push({
    recipeId: selectedRecipeId,
    recipeName: recipeName,
    date: dateVal,
    servings: servings
  });

  persistCookingHistory();
  cloudSaveCookingHistory();
  calendarAddModal.classList.remove('active');

  selectedCalDateStr = dateVal;
  renderCalendar();
  renderDayHistory();
  renderRecipes();
  if (currentTab === 'kondate') generateKondateSuggestions();
});

// ============================================================
// クラウド同期 & バックアップ実装
// ============================================================
function showSyncIndicator(isSyncing) {
  const dot = document.getElementById('sync-status-dot');
  if (!dot) return;
  if (isSyncing) {
    dot.className = 'sync-status-dot syncing';
  } else if (isSyncActive && currentGroupId) {
    dot.className = 'sync-status-dot connected';
  } else {
    dot.className = 'sync-status-dot';
  }
}

function updateSyncUI() {
  const dot = document.getElementById('sync-status-dot');
  const badge = document.getElementById('sync-status-badge');
  const icon = document.getElementById('sync-status-icon');
  const text = document.getElementById('sync-status-text');
  const input = document.getElementById('sync-group-id');
  const startBtn = document.getElementById('start-sync-btn');
  const stopBtn = document.getElementById('stop-sync-btn');

  if (isSyncActive && currentGroupId) {
    if (dot) dot.className = 'sync-status-dot connected';
    if (badge) badge.className = 'sync-status-badge connected';
    if (icon) icon.textContent = '🟢';
    if (text) text.textContent = `同期中:「${currentGroupId}」`;
    if (input) input.value = currentGroupId;
    if (startBtn) startBtn.textContent = '合言葉を変更する';
    if (stopBtn) stopBtn.style.display = 'inline-block';
  } else {
    if (dot) dot.className = 'sync-status-dot';
    if (badge) badge.className = 'sync-status-badge';
    if (icon) icon.textContent = '⚪';
    if (text) text.textContent = '未接続（この端末のみで利用中）';
    if (input && !input.value) input.value = '';
    if (startBtn) startBtn.textContent = '同期を開始する';
    if (stopBtn) stopBtn.style.display = 'none';
  }
}

async function cloudSaveRecipe(recipe) {
  if (!isSyncActive || !db || !currentGroupId || isRemoteUpdating) return;
  try {
    showSyncIndicator(true);
    await db.collection('groups').doc(currentGroupId)
      .collection('recipes').doc(String(recipe.id)).set(recipe);
  } catch (err) {
    console.error("cloudSaveRecipe error:", err);
  } finally {
    showSyncIndicator(false);
  }
}

async function cloudDeleteRecipe(recipeId) {
  if (!isSyncActive || !db || !currentGroupId || isRemoteUpdating) return;
  try {
    showSyncIndicator(true);
    await db.collection('groups').doc(currentGroupId)
      .collection('recipes').doc(String(recipeId)).delete();
  } catch (err) {
    console.error("cloudDeleteRecipe error:", err);
  } finally {
    showSyncIndicator(false);
  }
}

async function cloudSaveFridge() {
  if (!isSyncActive || !db || !currentGroupId || isRemoteUpdating) return;
  try {
    showSyncIndicator(true);
    await db.collection('groups').doc(currentGroupId)
      .collection('data').doc('fridge').set({ items: myFridge });
  } catch (err) {
    console.error("cloudSaveFridge error:", err);
  } finally {
    showSyncIndicator(false);
  }
}

async function cloudSaveCookingHistory() {
  if (!isSyncActive || !db || !currentGroupId || isRemoteUpdating) return;
  try {
    showSyncIndicator(true);
    await db.collection('groups').doc(currentGroupId)
      .collection('data').doc('history').set({ list: cookingHistory });
  } catch (err) {
    console.error("cloudSaveCookingHistory error:", err);
  } finally {
    showSyncIndicator(false);
  }
}

async function cloudSaveRecentSettings() {
  if (!isSyncActive || !db || !currentGroupId || isRemoteUpdating) return;
  try {
    showSyncIndicator(true);
    await db.collection('groups').doc(currentGroupId)
      .collection('data').doc('settings').set({ data: recentSettings });
  } catch (err) {
    console.error("cloudSaveRecentSettings error:", err);
  } finally {
    showSyncIndicator(false);
  }
}

async function uploadAllToCloud(groupId) {
  if (!db || !groupId) return;
  showSyncIndicator(true);
  try {
    const groupRef = db.collection('groups').doc(groupId);
    const batch = db.batch();
    recipes.forEach(r => {
      const docRef = groupRef.collection('recipes').doc(String(r.id));
      batch.set(docRef, r);
    });
    batch.set(groupRef.collection('data').doc('fridge'), { items: myFridge });
    batch.set(groupRef.collection('data').doc('history'), { list: cookingHistory });
    batch.set(groupRef.collection('data').doc('settings'), { data: recentSettings });
    await batch.commit();
  } catch (err) {
    console.error("uploadAllToCloud error:", err);
    throw err;
  } finally {
    showSyncIndicator(false);
  }
}

function teardownCloudSync() {
  if (unsubscribeRecipes) { unsubscribeRecipes(); unsubscribeRecipes = null; }
  if (unsubscribeFridge) { unsubscribeFridge(); unsubscribeFridge = null; }
  if (unsubscribeHistory) { unsubscribeHistory(); unsubscribeHistory = null; }
  if (unsubscribeSettings) { unsubscribeSettings(); unsubscribeSettings = null; }
  isSyncActive = false;
  showSyncIndicator(false);
}

function setupCloudSync(groupId) {
  if (!db || !groupId) return;
  teardownCloudSync();

  isSyncActive = true;
  currentGroupId = groupId;
  localStorage.setItem('sync_group_id', groupId);
  updateSyncUI();

  const groupRef = db.collection('groups').doc(groupId);

  // 1. レシピのリスナー
  unsubscribeRecipes = groupRef.collection('recipes').onSnapshot((snapshot) => {
    if (snapshot.empty && recipes.length > 0) return;
    isRemoteUpdating = true;
    const remote = [];
    snapshot.forEach(doc => remote.push(doc.data()));
    if (remote.length > 0) {
      remote.sort((a, b) => (a.id || 0) - (b.id || 0));
      recipes = remote;
      persistRecipes();
      renderRecipes();
      if (currentDetailRecipeId) {
        const cur = recipes.find(r => r.id === currentDetailRecipeId);
        if (cur) renderDetail(cur);
      }
    }
    isRemoteUpdating = false;
  }, (err) => {
    console.error("Firestore recipes listener error:", err);
  });

  // 2. 冷蔵庫のリスナー
  unsubscribeFridge = groupRef.collection('data').doc('fridge').onSnapshot((doc) => {
    if (doc.exists && doc.data() && Array.isArray(doc.data().items)) {
      isRemoteUpdating = true;
      myFridge = doc.data().items;
      persistFridge();
      renderRecipes();
      renderFridgeList();
      isRemoteUpdating = false;
    }
  }, (err) => {
    console.error("Firestore fridge listener error:", err);
  });

  // 3. 調理履歴のリスナー
  unsubscribeHistory = groupRef.collection('data').doc('history').onSnapshot((doc) => {
    if (doc.exists && doc.data() && Array.isArray(doc.data().list)) {
      isRemoteUpdating = true;
      cookingHistory = doc.data().list;
      persistCookingHistory();
      renderCalendar();
      renderDayHistory();
      renderRecipes();
      if (currentTab === 'kondate') generateKondateSuggestions();
      isRemoteUpdating = false;
    }
  }, (err) => {
    console.error("Firestore history listener error:", err);
  });

  // 4. 設定のリスナー
  unsubscribeSettings = groupRef.collection('data').doc('settings').onSnapshot((doc) => {
    if (doc.exists && doc.data() && doc.data().data) {
      isRemoteUpdating = true;
      recentSettings = doc.data().data;
      persistRecentSettings();
      initRecentSettingsUI();
      renderRecipes();
      isRemoteUpdating = false;
    }
  }, (err) => {
    console.error("Firestore settings listener error:", err);
  });
}

async function startSyncFlow(rawGroupId) {
  const groupId = rawGroupId.trim();
  if (!groupId) {
    alert('合言葉（英数字やひらがな）を入力してください');
    return;
  }
  if (!db) {
    initFirebase();
    if (!db) {
      alert('Firebaseに接続できませんでした。ネットワーク環境をご確認ください。');
      return;
    }
  }

  showSyncIndicator(true);
  try {
    const groupRef = db.collection('groups').doc(groupId);
    const snap = await groupRef.collection('recipes').limit(1).get();

    if (snap.empty) {
      const ok = confirm(`合言葉「${groupId}」のクラウドスペースはまだデータがありません。\n\n現在この端末にあるレシピや冷蔵庫のデータをアップロードして共有スペースを作成しますか？`);
      if (ok) {
        await uploadAllToCloud(groupId);
      }
    } else {
      const ok = confirm(`合言葉「${groupId}」のクラウドデータが見つかりました。\n\nクラウドのデータをこの端末に読み込んで同期を開始しますか？`);
      if (!ok) {
        showSyncIndicator(false);
        return;
      }
    }

    setupCloudSync(groupId);
    alert(`合言葉「${groupId}」で同期を開始しました！\n別の端末でも同じ合言葉を入力すれば、自動でリアルタイムに同じレシピを見ることができます。`);
    document.getElementById('sync-modal').classList.remove('active');
  } catch (err) {
    console.error("startSyncFlow error:", err);
    alert('同期の開始に失敗しました。\n' + err.message);
  } finally {
    showSyncIndicator(false);
  }
}

function stopSyncFlow() {
  if (!confirm('クラウド同期を解除しますか？\n（解除しても、この端末内のレシピデータはそのまま残ります）')) return;
  teardownCloudSync();
  localStorage.removeItem('sync_group_id');
  currentGroupId = '';
  updateSyncUI();
  alert('クラウド同期を解除しました。この端末のみの利用に戻りました。');
}

// バックアップ出力（エクスポート）
function exportBackupData() {
  try {
    // 出力前に巨大写真を整理
    cleanupStorageData();

    const data = {
      version: 1,
      exportDate: new Date().toISOString(),
      recipes: recipes.map(r => ({
        ...r,
        // バックアップ時は生写真が巨大ならトリミング済み写真で代替してファイルサイズを小さく抑える
        rawPhoto: (r.rawPhoto && r.rawPhoto.length > 150000) ? r.photo : r.rawPhoto
      })),
      fridge: myFridge,
      cookingHistory: cookingHistory,
      recentSettings: recentSettings
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const d = new Date();
    const dateStr = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
    a.href = url;
    a.download = `recipe_backup_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (err) {
    console.error("Export backup error:", err);
    alert('バックアップの作成に失敗しました: ' + err.message);
  }
}

// バックアップ復元（インポート）
function importBackupData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || !Array.isArray(data.recipes)) {
        alert('無効なファイルです。レシピデータが見つかりませんでした。');
        return;
      }
      if (!confirm(`バックアップファイルを復元します。\nレシピ数: ${data.recipes.length}件\n現在のデータは上書きされますがよろしいですか？`)) {
        return;
      }
      recipes = data.recipes;
      if (Array.isArray(data.fridge)) myFridge = data.fridge;
      if (Array.isArray(data.cookingHistory)) cookingHistory = data.cookingHistory;
      if (data.recentSettings) recentSettings = data.recentSettings;

      persistRecipes();
      persistFridge();
      persistCookingHistory();
      persistRecentSettings();

      if (isSyncActive && db && currentGroupId) {
        await uploadAllToCloud(currentGroupId);
      }

      renderRecipes();
      renderFridgeList();
      renderCalendar();
      initRecentSettingsUI();
      alert('バックアップからの復元が完了しました！');
      document.getElementById('sync-modal').classList.remove('active');
    } catch (err) {
      console.error("importBackupData error:", err);
      alert('ファイルの復元に失敗しました: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// モーダルイベントリスナー登録
const syncModal = document.getElementById('sync-modal');
const openSyncBtn = document.getElementById('open-sync-btn');
const closeSyncModalBtn = document.getElementById('close-sync-modal-btn');
const startSyncBtn = document.getElementById('start-sync-btn');
const stopSyncBtn = document.getElementById('stop-sync-btn');
const exportBackupBtn = document.getElementById('export-backup-btn');
const importBackupBtn = document.getElementById('import-backup-btn');
const backupFileInput = document.getElementById('backup-file-input');

if (openSyncBtn) {
  openSyncBtn.addEventListener('click', () => {
    updateSyncUI();
    syncModal.classList.add('active');
  });
}
if (closeSyncModalBtn) {
  closeSyncModalBtn.addEventListener('click', () => {
    syncModal.classList.remove('active');
  });
}
if (syncModal) {
  syncModal.addEventListener('click', (e) => {
    if (e.target === syncModal) syncModal.classList.remove('active');
  });
}
if (startSyncBtn) {
  startSyncBtn.addEventListener('click', () => {
    const gid = document.getElementById('sync-group-id').value;
    startSyncFlow(gid);
  });
}
if (stopSyncBtn) {
  stopSyncBtn.addEventListener('click', stopSyncFlow);
}
if (exportBackupBtn) {
  exportBackupBtn.addEventListener('click', exportBackupData);
}
if (importBackupBtn) {
  importBackupBtn.addEventListener('click', () => {
    backupFileInput.value = '';
    backupFileInput.click();
  });
}
if (backupFileInput) {
  backupFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      importBackupData(e.target.files[0]);
    }
  });
}

// ============================================================
// 初期実行
// ============================================================
function cleanupStorageData() {
  try {
    let modified = false;
    recipes.forEach(r => {
      if (r.rawPhoto && r.rawPhoto.length > 150000) {
        r.rawPhoto = r.photo || null;
        modified = true;
      }
    });
    if (modified) {
      localStorage.setItem('my_recipes', JSON.stringify(recipes));
      console.log('Cleaned up oversized photos.');
    }
    const draft = localStorage.getItem('recipe_draft');
    if (draft && draft.length > 200000) {
      localStorage.removeItem('recipe_draft');
    }
  } catch (e) {
    console.warn("Storage cleanup warning:", e);
  }
}

cleanupStorageData();
initFirebase();
initIndexedDBData();
if (currentGroupId) {
  setupCloudSync(currentGroupId);
} else {
  updateSyncUI();
}

renderFeatureSummary();
renderFilterSummary();
renderRecipes();