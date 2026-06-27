---
id: "before"
title: "调货前"
sort: 20
status: "published"
---
<h2>调货前</h2>
        <p>订单尚未占用任何库存，处理最简单。</p>

        <div class="flow-canvas">
          <div class="flow">
            <span class="step step--terminal">业务通过</span>
            <span class="line"></span>
            <span class="step step--decision">退款 / 换货</span>

            <div class="branches">
              <div class="branch">
                <span class="branch-label">退款</span>
                <span class="line"></span>
                <span class="step">修改原订单状态</span>
                <span class="line"></span>
                <span class="step step--output">生成退款单</span>
              </div>
              <div class="branch">
                <span class="branch-label">换货</span>
                <span class="line"></span>
                <span class="step step--stack">
                  <span>修改原订单状态</span>
                  <span class="step-sub">例：尺码 130 → 140</span>
                </span>
              </div>
            </div>

            <span class="merge"></span>
            <span class="step step--terminal">工单结束</span>
          </div>
        </div>
