---
id: "shipped"
title: "发货后"
sort: 40
status: "published"
---
<h2>发货后</h2>
        <p>审批角色由业务转交仓库。必须实物收回并入库后才能审批通过。</p>

        <div class="flow-canvas">
          <div class="flow">
            <span class="step step--terminal">业务通过 · 转仓库</span>
            <span class="line"></span>
            <span class="step">仓库拆快递核对</span>
            <span class="line"></span>
            <span class="step step--stack">
              <span>系统自动核对申请</span>
              <span class="step-sub">快递单号 + 款号匹配</span>
            </span>
            <span class="line"></span>
            <span class="step">仓库做入库单</span>
            <span class="line"></span>
            <span class="step step--decision">仓库审批</span>

            <div class="branches">
              <div class="branch">
                <span class="branch-label">退款</span>
                <span class="line"></span>
                <span class="step step--output">生成退款单</span>
              </div>
              <div class="branch">
                <span class="branch-label">换货</span>
                <span class="line"></span>
                <span class="step step--output">生成新售后出库明细单</span>
              </div>
            </div>

            <span class="merge"></span>
            <span class="step step--terminal">工单结束</span>
          </div>
        </div>
