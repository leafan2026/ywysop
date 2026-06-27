---
id: "offline"
title: "十、线下换货（收发一体化）"
sort: 120
status: "published"
---
<h2>十、线下换货（收发一体化）</h2>
        <p>在学校现场直接换货：仓库当场收回一件、发出一件，无需走快递流程；用一张单据同时完成入库与出库。</p>

        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">学校现场换货。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">线下调换收发一体化</span></span>（模板：<code style="font-family: var(--font-mono); font-size: 13px;">线下调换换入+换出流程模板.xlsx</code>）</div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>按模板填 <span class="chip chip--sheet">线下调换收发一体化</span>。</li>
                <li><span class="chip chip--btn">收支台账计算</span>。</li>
                <li><span class="chip chip--btn">生成入库单</span> <span class="arrow">→</span> <span class="auto">生成退换入库单</span>。</li>
                <li><span class="chip chip--btn">发起出库单审核</span> <span class="arrow">→</span> <span class="auto">生成出库单 + 渠道批次</span>。</li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body">同一笔流程同时产出入库单 + 出库单，账实一致。</div>
          </div>
        </div>

        <div class="alert alert--severe">
          <div class="alert-head">
            <span class="alert-tag">不可逆 · 警示</span>
            <span class="alert-title">不要重复点【生成入库单】</span>
          </div>
          <div class="alert-body">
            <p>会生成多张入库单导致库存错乱。</p>
          </div>
        </div>
