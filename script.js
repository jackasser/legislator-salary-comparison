// 各国のデータ
const countries = [
  { 
    id: 'japan', 
    name: '日本', 
    salary: 3014, 
    salaryRatio: 6.6,
    averageSalary: 457, // 3014÷6.6で計算
    emoji: '🇯🇵',
    color: 'rgba(59, 130, 246, 0.7)'
  },
  { 
    id: 'usa', 
    name: 'アメリカ', 
    salary: 1914, 
    salaryRatio: 2.2,
    averageSalary: 870, // 1914÷2.2で計算
    emoji: '🇺🇸',
    color: 'rgba(139, 92, 246, 0.7)'
  },
  { 
    id: 'germany', 
    name: 'ドイツ', 
    salary: 1466, 
    salaryRatio: 1.6,
    averageSalary: 916, // 1466÷1.6で計算
    emoji: '🇩🇪',
    color: 'rgba(16, 185, 129, 0.7)'
  },
  { 
    id: 'korea', 
    name: '韓国', 
    salary: 800, 
    salaryRatio: 3.8,
    averageSalary: 211, // 800÷3.8で計算
    emoji: '🇰🇷',
    color: 'rgba(245, 158, 11, 0.7)'
  }
];

// 日本の平均年収
const japanAverageSalary = countries.find(country => country.id === 'japan').averageSalary;

// 現在選択されている国
let selectedCountry = 'japan';

// カスタム年収
let customSalary = 300;

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
  // グラフを描画
  drawSalaryChart();
  drawAverageSalaryChart();
  drawRatioChart();
  
  // 国ごとのボタンを生成
  generateCountryButtons();
  
  // 国の詳細情報を表示
  updateCountryDetails();
  
  // カスタム計算機能を設定
  setupCustomCalculator();
});

// 国会議員の年収グラフを描画
function drawSalaryChart() {
  const ctx = document.getElementById('salaryChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: countries.map(country => `${country.emoji} ${country.name}`),
      datasets: [{
        label: '国会議員の年収（万円）',
        data: countries.map(country => country.salary),
        backgroundColor: countries.map(country => country.color),
        borderColor: countries.map(country => country.color.replace('0.7', '1')),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '年収（万円）'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    }
  });
}

// 国民平均年収グラフを描画
function drawAverageSalaryChart() {
  const ctx = document.getElementById('averageSalaryChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: countries.map(country => `${country.emoji} ${country.name}`),
      datasets: [{
        label: '国民平均年収（万円）',
        data: countries.map(country => country.averageSalary),
        backgroundColor: countries.map(country => country.color),
        borderColor: countries.map(country => country.color.replace('0.7', '1')),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '年収（万円）'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    }
  });
}

// 平均年収比較グラフを描画
function drawRatioChart() {
  const ctx = document.getElementById('ratioChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: countries.map(country => `${country.emoji} ${country.name}`),
      datasets: [{
        label: '国民平均年収の何倍か',
        data: countries.map(country => country.salaryRatio),
        backgroundColor: countries.map(country => country.color),
        borderColor: countries.map(country => country.color.replace('0.7', '1')),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '平均年収の何倍？'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    }
  });
}

// 国ごとのボタンを生成
function generateCountryButtons() {
  const buttonContainer = document.getElementById('countryButtons');
  
  countries.forEach(country => {
    const button = document.createElement('button');
    button.className = `px-4 py-2 rounded-full country-button ${country.id === selectedCountry ? 'bg-blue-600 text-white active' : 'bg-gray-200'}`;
    button.innerHTML = `${country.emoji} ${country.name}`;
    button.dataset.country = country.id;
    
    button.addEventListener('click', function() {
      selectedCountry = this.dataset.country;
      
      // ボタンのスタイルを更新
      document.querySelectorAll('.country-button').forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white', 'active');
        btn.classList.add('bg-gray-200');
      });
      
      this.classList.remove('bg-gray-200');
      this.classList.add('bg-blue-600', 'text-white', 'active');
      
      // 国の詳細情報を更新
      updateCountryDetails();
    });
    
    buttonContainer.appendChild(button);
  });
}

// 国の詳細情報を表示
function updateCountryDetails() {
  const country = countries.find(c => c.id === selectedCountry);
  const detailsContainer = document.getElementById('countryDetails');
  
  if (!country) return;
  
  detailsContainer.innerHTML = `
    <h3 class="text-xl font-bold mb-2 flex items-center">
      <span class="text-2xl mr-2">${country.emoji}</span> 
      ${country.name}の給料比較
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p class="mb-2">
          <span class="font-semibold">国会議員の年収：</span> 
          <span class="text-lg font-bold">${country.salary}万円</span>
        </p>
        <p class="mb-2">
          <span class="font-semibold">国民の平均年収：</span> 
          <span class="text-lg font-bold">${country.averageSalary}万円</span>
        </p>
        <p class="mb-2">
          <span class="font-semibold">国民平均との比率：</span> 
          <span class="text-lg font-bold text-red-600">${country.salaryRatio}倍</span>
        </p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-inner">
        <p class="text-center font-bold mb-2">もし国会議員が平均年収の2倍の給料だったら？</p>
        <div class="flex justify-center items-center">
          <span class="text-3xl font-bold text-green-600">
            ${country.averageSalary * 2}万円
          </span>
        </div>
        <p class="text-center text-sm mt-2 text-gray-600">
          （実際より${country.salary > country.averageSalary * 2 ? '少ない' : '多い'}）
        </p>
      </div>
    </div>
  `;
}

// カスタム計算機能を設定
function setupCustomCalculator() {
  const slider = document.getElementById('customSalarySlider');
  const valueDisplay = document.getElementById('customSalaryValue');
  const ratioDisplay = document.getElementById('customSalaryRatio');
  const mpRatioDisplay = document.getElementById('mpRatio');
  const mpRatioTextDisplay = document.getElementById('mpRatioText');
  const salaryDifferenceContainer = document.getElementById('salaryDifference');
  
  // 初期値を設定
  updateCustomCalculation();
  
  // スライダーの値が変更されたときの処理
  slider.addEventListener('input', function() {
    customSalary = parseInt(this.value);
    updateCustomCalculation();
  });
  
  // 計算結果を更新
  function updateCustomCalculation() {
    // 表示を更新
    valueDisplay.textContent = `${customSalary}万円`;
    
    // 平均年収との比率
    const customRatio = (customSalary / japanAverageSalary).toFixed(1);
    ratioDisplay.textContent = `${customRatio}倍`;
    
    // 国会議員との比率
    const mpRatio = Math.round((3014 / customSalary) * 10) / 10;
    mpRatioDisplay.textContent = `${mpRatio}分の1`;
    mpRatioTextDisplay.textContent = `${mpRatio}倍`;
    
    // 差額情報
    if (customSalary > 3014) {
      salaryDifferenceContainer.innerHTML = `
        <p class="text-2xl font-bold mt-2 text-green-600">
          国会議員より高い給料です！
        </p>
      `;
    } else {
      salaryDifferenceContainer.innerHTML = `
        <p class="text-lg font-semibold mt-2">
          国会議員の給料になるには、あと
          <span class="mx-1 text-blue-600 text-xl font-bold">
            ${3014 - customSalary}万円
          </span>
          足りません
        </p>
      `;
    }
  }
}
