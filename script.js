// 初始化餐厅选项
const restaurants = [
  '中式快餐',
  '日料寿司',
  '西式简餐',
  '重庆小面',
  '港式茶餐厅'
];

// DOM元素引用
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn');
const result = document.getElementById('result');

// 旋转状态跟踪
let isSpinning = false;
let lastRotation = 0;

// 随机生成旋转角度
function getRandomRotation() {
  const segments = restaurants.length;
  const segmentDegree = 360 / segments;
  // 增加随机性：基础旋转圈数 + 随机圈数 + 随机扇区
  const baseRotations = 5; // 基础旋转圈数
  const randomRotations = Math.floor(Math.random() * 3); // 0-2圈随机旋转
  const randomSegment = Math.floor(Math.random() * segments); // 随机扇区
  return 360 * (baseRotations + randomRotations) + randomSegment * segmentDegree;
}

// 处理旋转逻辑
function spinWheel() {
  if (isSpinning) return;
  
  isSpinning = true;
  spinBtn.disabled = true;
  
  const rotation = getRandomRotation();
  const sectorWidth = 360 / restaurants.length;
  // 修正计算选中索引的逻辑，确保12点方向对应第一个扇区
  const finalAngle = (rotation + lastRotation) % 360;
  const selectedIndex = (restaurants.length - Math.floor(finalAngle / sectorWidth) - 1) % restaurants.length;
  console.log('旋转角度:', rotation, '计算索引:', selectedIndex, '实际角度:', finalAngle);
  
  // 确保旋转逻辑仅作用于转盘元素，避免指针跟随旋转
  if (wheel) {
    wheel.style.transform = `rotate(${rotation + lastRotation}deg)`;
  }
  lastRotation += rotation;
  
  setTimeout(() => {
    result.textContent = `今日午餐：${restaurants[selectedIndex]} 🍴`;
    isSpinning = false;
    spinBtn.disabled = false;
  }, 5000);
}

// 事件监听
spinBtn.addEventListener('click', spinWheel);
spinBtn.addEventListener('touchstart', function(e) {
  e.preventDefault();
  spinWheel();
});

// 初始化提示
result.textContent = '点击开始选择午餐！';

// 为每个餐厅选项创建标签
restaurants.forEach((restaurant, index) => {
  const segmentDegree = 360 / restaurants.length;
  const span = document.createElement('span');
  span.style.transform = `rotate(${index * segmentDegree}deg) translate(130px) rotate(-${index * segmentDegree}deg)`;
  span.textContent = restaurant;
  span.classList.add('wheel-label');
  wheel.appendChild(span);
});