(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  var data = [
    { name: 'Claude Opus 5.5 (Max)', lab: 'Anthropic', v: 20.77 },
    { name: 'Claude Sonnet 5.5 (Max)', lab: 'Anthropic', v: 13.99 },
    { name: 'GPT-6 Astra (Max)', lab: 'OpenAI', v: 13.96 },
    { name: 'Claude Fable 5.1 (Max)', lab: 'Anthropic', v: 13.94 },
    { name: 'GPT-6.1 Sol (Max)', lab: 'OpenAI', v: 13.64 },
    { name: 'Gemini 4 Argon (High)', lab: 'Google', v: 11.75 },
    { name: 'Muse Wonder Full (Max)', lab: 'Meta', v: 10.74 },
    { name: 'GPT-6 Sol (Max)', lab: 'OpenAI', v: 8.57 },
    { name: 'Claude Opus 5 (Max)', lab: 'Anthropic', v: 8.22 },
    { name: 'Claude Fable 5 (High)', lab: 'Anthropic', v: 7.75 },
    { name: 'Kimi K3.1 Pro (Max)', lab: 'Moonshot', v: 7.61 },
    { name: 'GPT-5.6 Sol (xHigh)', lab: 'OpenAI', v: 6.06 },
    { name: 'DeepSeek-V4.1-Flash (Max)', lab: 'DeepSeek', v: 4.37 },
    { name: 'Claude Sonnet 5 (High)', lab: 'Anthropic', v: 3.75 },
    { name: 'Muse Wonder (Max)', lab: 'Meta', v: 3.31 },
    { name: 'MiMo-V2.6-Pro', lab: 'Xiaomi', v: 3.30 },
    { name: 'Gemini 3.8 Flash (High)', lab: 'Google', v: 3.17 },
    { name: 'Muse Spark 1.3 (Max)', lab: 'Meta', v: 3.05 },
    { name: 'Grok 4.7 (xHigh)', lab: 'xAI', v: 3.02 },
    { name: 'GPT-6 Luna (Max)', lab: 'OpenAI', v: 2.79 }
  ];

  var labColors = {
    'Anthropic': accent,
    'OpenAI': accent2,
    'Google': '#4285F4',
    'Meta': '#0081FB',
    'Moonshot': '#E85D4A',
    'DeepSeek': '#5B8DEF',
    'Xiaomi': '#FF6900',
    'xAI': '#1D1D1F'
  };

  var chart = echarts.init(document.getElementById('chart-leaderboard'), null, { renderer: 'svg' });
  chart.setOption({
    animation: false,
    grid: { left: 8, right: 70, top: 8, bottom: 8, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink, fontFamily: 'InstrumentSans, sans-serif', fontSize: 12 },
      formatter: function(params) {
        var d = params[0];
        return '<strong>' + d.name + '</strong><br/>' + data[d.dataIndex].lab + ' · Net Improvement ' + d.value + '%';
      }
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: data.map(function(d) { return d.name; }),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: ink,
        fontSize: 11.5,
        fontFamily: 'JetBrainsMono, monospace',
        formatter: function(value) {
          return value.length > 26 ? value.slice(0, 24) + '…' : value;
        }
      }
    },
    series: [{
      type: 'bar',
      data: data.map(function(d) {
        return { value: d.v, itemStyle: { color: labColors[d.lab] || accent, borderRadius: [0, 3, 3, 0] } };
      }),
      barWidth: '62%',
      label: {
        show: true,
        position: 'right',
        formatter: '{c}%',
        color: ink,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: 'JetBrainsMono, monospace'
      }
    }]
  });

  window.addEventListener('resize', function() { chart.resize(); });
})();
