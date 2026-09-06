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
    features: { difficulty: "2", taste: "こってり", genre: "中華", mealType: "ごはん系", time: 10, freeTags: [] },
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

const singleFilter = { maxDifficulty: null, tastes: [], genres: [], mealTypes: [], sortBy: 'missing' };
const kondateFilter = { genres: [], comboType: 'main+side', mainTaste: null, tastePairing: 'opposite', sortBy: 'missing' };

// --- マイグレーション ---
(function migrate() {
  // mealType リネーム
  const mealMap = { 'おかず': 'メインおかず', '主菜': 'メインおかず', '副菜': 'サブおかず', 'ごはんもの': 'ごはん系', 'めん類': 'めん系', '汁物/スープ': 'スープ/汁物' };
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
    // mealType リネーム
    if (r.features && mealMap[r.features.mealType]) {
      r.features.mealType = mealMap[r.features.mealType];
      recipeChanged = true;
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

  const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
  setRecipePhotoPreview(croppedDataUrl, cropPreviewImg.src);
  photoCropModal.classList.remove('active');
});

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

recipePhotoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    openCropModal(ev.target.result, true);
    recipePhotoInput.value = ''; // リセット
  };
  reader.readAsDataURL(file);
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
  if (!['メインおかず', 'ごはん系', 'めん系'].includes(mealType)) return null;

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
  const fd = getFormData();
  const has = fd.name || fd.singleIngredients.length > 0 || fd.groups.length > 0 || fd.steps.length > 0;
  if (has && !editingRecipeId) {
    if (confirm('編集中の内容を下書き保存しますか？\n\n【OK】: 一時保存して閉じる\n【キャンセル】: 入力内容を破棄して閉じる')) {
      localStorage.setItem('recipe_draft', JSON.stringify(fd));
    } else { localStorage.removeItem('recipe_draft'); resetForm(); }
  } else { localStorage.removeItem('recipe_draft'); resetForm(); }
  switchView(mainView);
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
saveRecipeBtn.addEventListener('click', () => {
  const fd = getFormData();
  if (!fd.name) { alert('レシピ名を入力してください'); return; }
  const allIng = [...fd.singleIngredients.map(i => ({ ...i, group: null }))];
  fd.groups.forEach(g => g.items.forEach(it => allIng.push({ ...it, group: g.name })));
  if (editingRecipeId !== null) {
    const idx = recipes.findIndex(r => r.id === editingRecipeId);
    if (idx !== -1) recipes[idx] = { ...recipes[idx], name: fd.name, servings: fd.servings, features: fd.features, ingredients: allIng, groups: fd.groups, steps: fd.steps, photo: fd.photo, rawPhoto: fd.rawPhoto };
  } else {
    recipes.push({ id: Date.now(), name: fd.name, servings: fd.servings, features: fd.features, ingredients: allIng, groups: fd.groups, steps: fd.steps, photo: fd.photo, rawPhoto: fd.rawPhoto });
  }
  localStorage.setItem('my_recipes', JSON.stringify(recipes));
  localStorage.removeItem('recipe_draft');
  resetForm(); renderRecipes(); switchView(mainView);
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

  if (!sorted.length) { recipeListContainer.innerHTML = '<p style="text-align:center;color:#94a3b8;padding:24px 0;font-size:13px;">条件に合うレシピがありません</p>'; return; }
  sorted.forEach(recipe => {
    const mc = calculateMissingCount(recipe.ingredients);
    const f = recipe.features || {};
    const recentInfo = getRecentCookingInfo(recipe);
    const card = document.createElement('div'); card.className = 'recipe-card';
    card.innerHTML = `
      <div class="recipe-thumb">${recipe.photo ? `<img src="${recipe.photo}" alt="${recipe.name}">` : '画像'}</div>
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
    if (kondateFilter.comboType === 'staple+side-or-soup') badges.push({ label: 'ごはん/めん＋サブ', remove: () => { kondateFilter.comboType = 'main+side'; } });
    if (kondateFilter.mainTaste) { const p = kondateFilter.tastePairing === 'opposite' ? '(対照)' : kondateFilter.tastePairing === 'same' ? '(統一)' : ''; badges.push({ label: `メイン:${kondateFilter.mainTaste}${p}`, remove: () => { kondateFilter.mainTaste = null; } }); }
    if (kondateFilter.sortBy === 'difficulty') badges.push({ label: 'めんどくさ度順▲', remove: () => { kondateFilter.sortBy = 'missing'; } });
  }
  if (!badges.length) { filterSummary.innerHTML = '<span class="filter-summary-empty">条件なし（すべて表示）</span>'; return; }
  badges.forEach(b => {
    const el = document.createElement('span'); el.className = 'filter-summary-badge';
    el.innerHTML = `${b.label}<span class="badge-remove">✕</span>`;
    el.querySelector('.badge-remove').addEventListener('click', e => { e.stopPropagation(); b.remove(); renderFilterSummary(); syncFilterModalUI(); if (currentTab === 'single') renderRecipes(); else generateKondateSuggestions(); });
    filterSummary.appendChild(el);
  });
}

// ============================================================
// 絞り込みモーダル
// ============================================================
function setupChipGroup(id, { mode, onSelect }) {
  document.getElementById(id).querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (mode === 'single') { const was = chip.classList.contains('selected'); document.getElementById(id).querySelectorAll('.chip').forEach(c => c.classList.remove('selected')); if (!was) chip.classList.add('selected'); }
      else chip.classList.toggle('selected');
      if (onSelect) onSelect();
    });
  });
}
function getSelectedChipValues(id) { return [...document.getElementById(id).querySelectorAll('.chip.selected')].map(c => c.dataset.value); }
function setSelectedChipValues(id, vals) { document.getElementById(id).querySelectorAll('.chip').forEach(c => c.classList.toggle('selected', vals.includes(c.dataset.value))); }

setupChipGroup('sf-difficulty-chips', { mode: 'single' });
setupChipGroup('sf-taste-chips', { mode: 'multi' });
setupChipGroup('sf-genre-chips', { mode: 'multi' });
setupChipGroup('sf-type-chips', { mode: 'multi' });
setupChipGroup('kf-genre-chips', { mode: 'multi' });
setupChipGroup('kf-main-taste-chips', { mode: 'single', onSelect: () => { document.getElementById('kf-taste-pairing-section').style.display = getSelectedChipValues('kf-main-taste-chips').length > 0 ? 'block' : 'none'; } });

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
  document.querySelector(`input[name="kf-combo"][value="${kondateFilter.comboType}"]`).checked = true;
  setSelectedChipValues('kf-main-taste-chips', kondateFilter.mainTaste ? [kondateFilter.mainTaste] : []);
  document.querySelector(`input[name="kf-taste-pair"][value="${kondateFilter.tastePairing}"]`).checked = true;
  document.getElementById('kf-taste-pairing-section').style.display = kondateFilter.mainTaste ? 'block' : 'none';
  document.querySelector(`input[name="kf-sort"][value="${kondateFilter.sortBy}"]`).checked = true;
}
function syncFilterModalUI() { if (currentTab === 'single') syncSingleFilterModal(); else syncKondateFilterModal(); }

document.getElementById('close-single-filter-btn').addEventListener('click', () => singleFilterModal.classList.remove('active'));
document.getElementById('reset-single-filter-btn').addEventListener('click', () => { singleFilter.maxDifficulty = null; singleFilter.tastes = []; singleFilter.genres = []; singleFilter.mealTypes = []; singleFilter.sortBy = 'missing'; syncSingleFilterModal(); });
document.getElementById('apply-single-filter-btn').addEventListener('click', () => {
  const d = getSelectedChipValues('sf-difficulty-chips'); singleFilter.maxDifficulty = d.length ? parseInt(d[0], 10) : null;
  singleFilter.tastes = getSelectedChipValues('sf-taste-chips'); singleFilter.genres = getSelectedChipValues('sf-genre-chips'); singleFilter.mealTypes = getSelectedChipValues('sf-type-chips');
  singleFilter.sortBy = document.querySelector('input[name="sf-sort"]:checked').value;
  singleFilterModal.classList.remove('active'); renderFilterSummary(); renderRecipes();
});
document.getElementById('close-kondate-filter-btn').addEventListener('click', () => kondateFilterModal.classList.remove('active'));
document.getElementById('reset-kondate-filter-btn').addEventListener('click', () => { kondateFilter.genres = []; kondateFilter.comboType = 'main+side'; kondateFilter.mainTaste = null; kondateFilter.tastePairing = 'opposite'; kondateFilter.sortBy = 'missing'; syncKondateFilterModal(); });
document.getElementById('apply-kondate-filter-btn').addEventListener('click', () => {
  kondateFilter.genres = getSelectedChipValues('kf-genre-chips'); kondateFilter.comboType = document.querySelector('input[name="kf-combo"]:checked').value;
  const t = getSelectedChipValues('kf-main-taste-chips'); kondateFilter.mainTaste = t.length ? t[0] : null;
  kondateFilter.tastePairing = document.querySelector('input[name="kf-taste-pair"]:checked').value;
  kondateFilter.sortBy = document.querySelector('input[name="kf-sort"]:checked').value;
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
  recipes = recipes.filter(r => r.id !== currentDetailRecipeId);
  localStorage.setItem('my_recipes', JSON.stringify(recipes));
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
  localStorage.setItem('my_fridge', JSON.stringify(myFridge));

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
  localStorage.setItem('cooking_history', JSON.stringify(cookingHistory));
}

// ============================================================
// タブ切り替え
// ============================================================
document.querySelectorAll('.search-mode-tabs .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.search-mode-tabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active'); currentTab = tab.dataset.tab;
    if (currentTab === 'single') { recipeListContainer.style.display = 'flex'; kondateResults.classList.remove('active'); }
    else { recipeListContainer.style.display = 'none'; kondateResults.classList.add('active'); generateKondateSuggestions(); }
    renderFilterSummary();
  });
});

// ============================================================
// 献立検索
// ============================================================
function generateKondateSuggestions() {
  kondateResults.innerHTML = '';
  const gf = kondateFilter.genres.length > 0 ? r => kondateFilter.genres.includes((r.features||{}).genre) : () => true;
  const all = recipes.filter(gf);
  const mains = all.filter(r => (r.features||{}).mealType === 'メインおかず');
  const sides = all.filter(r => (r.features||{}).mealType === 'サブおかず');
  const soups = all.filter(r => (r.features||{}).mealType === 'スープ/汁物');
  const staples = all.filter(r => { const m = (r.features||{}).mealType; return m === 'ごはん系' || m === 'めん系'; });
  const opp = { 'あっさり': 'こってり', 'こってり': 'あっさり' };
  function tasteFilter(dishes, role) {
    if (!kondateFilter.mainTaste) return dishes;
    if (role === 'main' || role === 'staple') return dishes.filter(r => (r.features||{}).taste === kondateFilter.mainTaste);
    if (role === 'side') {
      if (kondateFilter.tastePairing === 'opposite') { const o = opp[kondateFilter.mainTaste]; return o ? dishes.filter(r => (r.features||{}).taste === o) : dishes; }
      if (kondateFilter.tastePairing === 'same') return dishes.filter(r => (r.features||{}).taste === kondateFilter.mainTaste);
      return dishes;
    }
    return dishes;
  }
  let sets = [];
  if (kondateFilter.comboType === 'main+side') {
    const fm = tasteFilter(mains, 'main'), fs = tasteFilter(sides, 'side'), sl = soups.length ? soups : [null];
    if (fm.length && fs.length) { for (const m of fm) for (const s of fs) for (const sp of sl) { const items = [{ recipe: m, role: 'メインおかず' }, { recipe: s, role: 'サブおかず' }]; if (sp) items.push({ recipe: sp, role: 'スープ/汁物' }); else items.push({ recipe: null, role: 'スープ/汁物', placeholder: '適当な味噌汁' }); sets.push(buildSetData(items)); } }
  } else {
    const fst = tasteFilter(staples, 'staple'), fsd = tasteFilter(sides, 'side');
    const comps = [...fsd, ...soups];
    if (fst.length) { if (!comps.length) { fst.forEach(s => { const rl = (s.features||{}).mealType === 'めん系' ? 'めん系' : 'ごはん系'; sets.push(buildSetData([{ recipe: s, role: rl }, { recipe: null, role: 'スープ/汁物', placeholder: '適当なコンソメスープ' }])); }); }
    else { for (const st of fst) { const rl = (st.features||{}).mealType === 'めん系' ? 'めん系' : 'ごはん系'; for (const c of comps) { const cr = (c.features||{}).mealType === 'スープ/汁物' ? 'スープ/汁物' : 'サブおかず'; sets.push(buildSetData([{ recipe: st, role: rl }, { recipe: c, role: cr }])); } } } }
  }
  function setHasRecentMain(set) {
    return set.items.some(item => {
      if (!item.recipe) return false;
      if (['メインおかず', 'ごはん系', 'めん系'].includes(item.role)) {
        return !!getRecentCookingInfo(item.recipe);
      }
      return false;
    });
  }

  if (recentSettings.mode === 'exclude') {
    sets = sets.filter(s => !setHasRecentMain(s));
  }

  if (!sets.length) { kondateResults.innerHTML = '<p class="kondate-empty-msg">条件に合う献立が見つかりません。</p>'; return; }

  sets.sort((a, b) => {
    if (recentSettings.mode === 'lower_priority') {
      const aRecent = setHasRecentMain(a) ? 1 : 0;
      const bRecent = setHasRecentMain(b) ? 1 : 0;
      if (aRecent !== bRecent) return aRecent - bRecent;
    }
    return kondateFilter.sortBy === 'difficulty' ? a.totalDifficulty - b.totalDifficulty : a.missingCount - b.missingCount;
  });

  const label = kondateFilter.comboType === 'main+side' ? '🍱 メインおかず＋サブおかず' : '🍝 ごはん系/めん系＋サブ or スープ';
  const sec = document.createElement('div'); sec.className = 'kondate-type-section'; sec.innerHTML = `<h3>${label}</h3>`;
  sets.slice(0, 8).forEach((s, i) => sec.appendChild(createKondateCard(s, i + 1)));
  kondateResults.appendChild(sec);
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

  localStorage.setItem('my_fridge', JSON.stringify(myFridge));
  renderRecipes();
  generateKondateSuggestions();
  alert(`「${names}」をカレンダーに記録しました！`);
}
function getRoleClass(r) { return { 'メインおかず': 'main-dish', 'サブおかず': 'side-dish', 'スープ/汁物': 'soup', 'ごはん系': 'staple', 'めん系': 'staple' }[r] || ''; }

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
  localStorage.setItem('my_fridge', JSON.stringify(myFridge));
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
  localStorage.setItem('recent_settings', JSON.stringify(recentSettings));
  renderRecipes();
  if (currentTab === 'kondate') generateKondateSuggestions();
});

document.querySelectorAll('input[name="recent-mode"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    recentSettings.mode = e.target.value;
    localStorage.setItem('recent_settings', JSON.stringify(recentSettings));
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
        localStorage.setItem('cooking_history', JSON.stringify(cookingHistory));
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

  localStorage.setItem('cooking_history', JSON.stringify(cookingHistory));
  calendarAddModal.classList.remove('active');

  selectedCalDateStr = dateVal;
  renderCalendar();
  renderDayHistory();
  renderRecipes();
  if (currentTab === 'kondate') generateKondateSuggestions();
});

// ============================================================
// 初期実行
// ============================================================
renderFeatureSummary();
renderFilterSummary();
renderRecipes();