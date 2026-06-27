---
id: "after"
title: "调货后"
sort: 30
status: "published"
---
<h2>调货后</h2>
        <p>订单已经过快速库存判定，处于以下五种状态之一。</p>

        <h3 id="after-states">五种状态</h3>
        <p>状态差异由「指定发货仓库 / 移仓明细 / 拆换标备注 / 入库明细」四个字段共同决定。</p>

        <div class="tbl">
          <table>
            <thead>
              <tr>
                <th>编号</th><th>状态</th><th>指定发货仓库</th><th>移仓明细</th><th>拆换标</th><th>入库明细</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>①</td><td>大仓直接锁库存</td><td>空</td><td>—</td><td>—</td><td>—</td></tr>
              <tr><td>②</td><td>非大仓锁库存</td><td>学校仓</td><td>✓</td><td>—</td><td>—</td></tr>
              <tr><td>③</td><td>大仓拆换标锁库存</td><td>空</td><td>—</td><td>✓</td><td>✓</td></tr>
              <tr><td>④</td><td>非大仓拆换标锁库存</td><td>学校仓</td><td>✓</td><td>✓</td><td>—</td></tr>
              <tr><td>⑤</td><td>库存不足调货中</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>
            </tbody>
          </table>
        </div>

        <h3 id="after-main">主流程</h3>

        <div class="flow-canvas">
          <div class="flow">
            <span class="step step--terminal">业务通过</span>
            <span class="line"></span>
            <span class="step step--decision">当前库存状态</span>

            <div class="paths">
              <div class="path">
                <span class="path-tag">① / ③</span>
                <span class="line"></span>
                <span class="step">释放到大仓</span>
                <span class="line"></span>
                <span class="step step--stack">
                  <span>生成剩货记录单</span>
                  <span class="step-sub">锁库存区取出重新上架</span>
                </span>
              </div>
              <div class="path">
                <span class="path-tag">⑤</span>
                <span class="line"></span>
                <span class="step">不释放</span>
                <span class="line"></span>
                <span class="step step--stack">
                  <span>生成剩货记录单</span>
                  <span class="step-sub">调货到货后取出上架</span>
                </span>
              </div>
              <div class="path">
                <span class="path-tag">② / ④</span>
                <span class="line"></span>
                <span class="step step--special">跳转 · 回仓判定</span>
              </div>
            </div>

            <span class="merge merge--tall"></span>
            <span class="step step--decision">退款 / 换货</span>

            <div class="branches">
              <div class="branch">
                <span class="branch-label">退款</span>
                <span class="line"></span>
                <span class="step step--output">改状态 + 生成退款单</span>
              </div>
              <div class="branch">
                <span class="branch-label">换货</span>
                <span class="line"></span>
                <span class="step">修改原订单状态</span>
              </div>
            </div>

            <span class="merge"></span>
            <span class="step step--terminal">工单结束</span>
          </div>
        </div>

        <h3 id="after-judge">回仓判定 · 子流程</h3>
        <p>仅针对 ② / ④ 触发。系统默认把库存释放到大仓，但这两种状态的库存原本来自学校仓——若货物还没发到大仓，统一释放会让学校仓账实不符。</p>

        <div class="flow-canvas">
          <div class="flow">
            <span class="step step--terminal">触发 · ② / ④</span>
            <span class="line"></span>
            <span class="step step--stack">
              <span>弹窗</span>
              <span class="step-sub">货物是否已从学校仓发至大仓</span>
            </span>
            <span class="line"></span>
            <span class="step step--muted">参考依据</span>
            <span class="line"></span>
            <span class="step step--decision">审核人选择</span>

            <div class="branches">
              <div class="branch">
                <span class="branch-label">未发</span>
                <span class="line"></span>
                <span class="step">释放到大仓</span>
                <span class="line"></span>
                <span class="step step--output">生成虚拟移仓单</span>
                <span class="line"></span>
                <span class="step step--stack">
                  <span>库存位置</span>
                  <span class="step-sub">学校仓</span>
                </span>
              </div>
              <div class="branch">
                <span class="branch-label">已发</span>
                <span class="line"></span>
                <span class="step">释放到大仓</span>
                <span class="line"></span>
                <span class="step step--stack">
                  <span>库存位置</span>
                  <span class="step-sub">大仓</span>
                </span>
              </div>
            </div>

            <span class="merge"></span>
            <span class="step step--terminal">返回主流程</span>
          </div>
        </div>

        <h3>审核参考依据</h3>
        <div class="tbl">
          <table>
            <thead>
              <tr><th>信号</th><th>未发</th><th>已发</th></tr>
            </thead>
            <tbody>
              <tr><td>移仓单状态</td><td>待发出</td><td>已签收</td></tr>
              <tr><td>大仓入库记录</td><td>无</td><td>有</td></tr>
              <tr><td>学校仓当前库存</td><td>&gt; 0</td><td>= 0</td></tr>
            </tbody>
          </table>
        </div>

        <h3>虚拟移仓单字段</h3>
        <p>仅在「未发」时生成。</p>
        <div class="tbl">
          <table>
            <thead><tr><th>字段</th><th>取值</th></tr></thead>
            <tbody>
              <tr><td>移出仓库</td><td>大仓</td></tr>
              <tr><td>移入仓库</td><td>原单「指定发货仓库」</td></tr>
              <tr><td>SKU / 数量</td><td>退换货明细</td></tr>
              <tr><td>备注</td><td>退换货自动回库_单号_判断人_时间</td></tr>
              <tr><td>状态</td><td>直接完成</td></tr>
              <tr><td>标识</td><td>虚拟移仓</td></tr>
            </tbody>
          </table>
        </div>
        <div class="notice">虚拟移仓单只调整账面库存，不产生实际物流。</div>
