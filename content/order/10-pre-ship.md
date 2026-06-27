---
id: "pre-ship"
title: "八、发货前退换货"
sort: 100
status: "published"
---
<h2>八、发货前退换货</h2>
        <p>订单尚未出库时申请退换。系统会根据 <span class="chip chip--field">出库状态</span> 自动判断审核流程，无需财务手动调整库存。</p>

        <h3>8.1 调货前 / 调货后退换货</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">订单状态为 <span class="chip chip--state">锁库存</span> / <span class="chip chip--state">拆换标</span> / <span class="chip chip--state">待判定</span>——库存未发生采购动作。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">内部退换货申请表</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>填申请 → 选商品退换 / 仅退款（填金额）。</li>
                <li><span class="chip chip--btn">发起审批</span>。</li>
                <li><span class="auto">生成 <span class="chip chip--sheet">退换货明细审核</span></span>。</li>
                <li><span class="chip chip--btn">业务审核通过</span>。</li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body"><span class="auto">自动释放库存 / 取消采购单</span>。</div>
          </div>
          <div class="op-row">
            <span class="op-label">异常</span>
            <div class="op-body">学校仓拆换标场景 → 触发 9.3 回仓判定 的虚拟移仓单流程。</div>
          </div>
        </div>
