---
id: "prep"
title: "五、出库准备"
sort: 70
status: "published"
---
<h2>五、出库准备</h2>
        <p>合单的目的是把同一客户的多笔订单合并、节省运费；然后生成给仓库的拣货 Excel。</p>

        <h3>5.1 合单判定</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">一批订单全部 <span class="chip chip--state">锁库存</span> 后，准备出库前。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">整单出库快速判定单</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>选 <span class="chip chip--state">锁库存</span> 状态出库单 <span class="arrow">→</span> 转 <span class="chip chip--state">推单中</span>。</li>
                <li>新建一条 <span class="chip chip--sheet">整单出库快速判定单</span>。</li>
                <li><span class="chip chip--btn">发起判定</span>。</li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body"><span class="auto">系统标记疑似拆单 / 可合单</span>。</div>
          </div>
        </div>

        <h3>5.2 处理欠货订单</h3>
        <p>触发：合单判定标记"疑似拆单"。位置：<span class="chip chip--sheet">合单判定-快速辅助</span> <span class="arrow">→</span> <span class="chip chip--view">疑似拆单</span>。</p>

        <div class="dtree">
          <div class="dtree-q">订单允许拆单?</div>
          <div class="dtree-branches">
            <div class="dtree-branch">
              <span class="dtree-tag dtree-tag--yes">是</span>
              <div class="dtree-body">
                <ol>
                  <li>确认 <span class="chip chip--state">推单中</span>。</li>
                  <li>有货商品正常出库（先发）。</li>
                  <li>欠货商品到货后补发。</li>
                </ol>
              </div>
            </div>
            <div class="dtree-branch">
              <span class="dtree-tag dtree-tag--no">否</span>
              <div class="dtree-body">
                <ol>
                  <li><span class="chip chip--btn">退单中退回锁库存</span>。</li>
                  <li>订单保持 <span class="chip chip--state">锁库存</span>。</li>
                  <li>等欠货到齐一起发。</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="notice"><strong>异常</strong>　欠货已到但仍在 <span class="chip chip--state">锁库存</span> 状态 → <span class="chip chip--sheet">合单判定-快速辅助</span> <span class="arrow">→</span> <span class="chip chip--view">有欠货</span> <span class="arrow">→</span> 选订单 <span class="arrow">→</span> <span class="chip chip--btn">欠货锁库存转移到推单中</span>。通常是之前漏操作。</div>

        <h3>5.3 一键出库准备</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">5.2 所有欠货已处理。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">整单出库快速判定单</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body"><strong>必须先完成 5.2</strong>（否则报错）<span class="arrow">→</span> <span class="chip chip--btn">一键出库准备</span>。</div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body"><span class="auto"><span class="chip chip--state">推单中</span> → <span class="chip chip--state">等待出库</span></span>。</div>
          </div>
        </div>

        <h3>5.4 生成配货资料</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">进入 <span class="chip chip--state">等待出库</span> 状态、准备发给仓库。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">整单出库快速判定单</span> <span class="arrow">→</span> <span class="chip chip--sheet">配货单生成</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li><span class="chip chip--btn">生成配货资料</span> <span class="arrow">→</span> <span class="auto">自动跳转</span>。</li>
                <li>输入 <span class="chip chip--field">合单判定批次号</span>（如 <code style="font-family: var(--font-mono); font-size: 13px;">20260515</code>）。</li>
                <li><span class="chip chip--btn">导出</span> 下载 Excel。</li>
                <li>发给仓库拣货。</li>
              </ol>
            </div>
          </div>
        </div>
