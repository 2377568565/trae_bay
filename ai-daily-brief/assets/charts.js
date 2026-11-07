// assets/charts.js
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart: Arena Agent Leaderboard Top 20 IPS Scores ---
  var chartDom = document.getElementById('chart-lb');
  if (!chartDom) return;
  var chart = echarts.init(chartDom, null, { renderer: 'svg' });

  var models = [
    'Claude Opus 5.5',
    'Gemini 4 Carbon',
    'Claude Sonnet 5.5',
    'GPT-6 Astra',
    'Claude Fable 5.1',
    'GPT-6.1 Sol',
    'Gemini 4 Argon',
    'GPT-6.1 Terra',
    'Muse Wonder Full',
    'Claude Fable 5',
    'Claude Opus 5',
    'GPT-6 Sol',
    'Kimi K3.1 Pro',
    'GPT-5.6 Sol',
    'Claude Sonnet 5',
    'Grok 4.7',
    'Gemini 3.8 Flash',
    'Muse Wonder',
    'Muse Spark 1.3',
    'MiMo-V2.6-Pro'
  ];
  var scores = [20.04, 16.56, 14.62, 13.68, 13.15, 12.24, 10.61, 10.19, 9.63, 7.78, 7.60, 6.95, 4.70, 4.56, 2.84, 2.64, 2.56, 2.51, 2.44, 2.44];

  // Top 3 highlighted with accent2, rest with accent
  var colors = scores.map(function(v, i) {
    return i < 3 ? accent2 : accent;
  });

  chart.setOption({
    animation: false,
    grid: {
      left: 10,
      right: 30,
      top: 20,
      bottom: 10,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var p = params[0];
        return p.name + '<br/>IPS: <strong>' + p.value + '%</strong>';
      },
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink, fontFamily: 'InstrumentSans, sans-serif' }
    },
    xAxis: {
      type: 'value',
      max: 22,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: {
        color: muted,
        fontFamily: 'JetBrainsMono, monospace',
        fontSize: 11,
        formatter: '{value}%'
      },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: models,
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false },
      axisLabel: {
        color: ink,
        fontFamily: 'InstrumentSans, sans-serif',
        fontSize: 12,
        fontWeight: function(i) { return i < 3 ? 'bold' : 'normal'; }
      }
    },
    series: [{
      type: 'bar',
      data: scores.map(function(v, i) {
        return {
          value: v,
          itemStyle: {
            color: colors[i],
            borderRadius: [0, 3, 3, 0]
          }
        };
      }),
      barWidth: 16,
      label: {
        show: true,
        position: 'right',
        color: muted,
        fontFamily: 'JetBrainsMono, monospace',
        fontSize: 11,
        formatter: '{c}%'
      }
    }]
  });

  window.addEventListener('resize', function() { chart.resize(); });
})();
