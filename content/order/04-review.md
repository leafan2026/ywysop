---
id: "review"
title: "二、订单审核"
sort: 40
status: "published"
---
<h2>二、订单审核</h2>
        <p>在订单进入库存判定之前，确认每条明细的 SKU 关联、尺码合理性、付款类型。三件事都在 <a class="chip chip--sheet" href="https://www.mingdao.com/app/8bb27a4a-87c0-4a49-8adf-052857408bb6/67dcc27570570d576ae2234a/67dcc273a24baef2d71a4754" target="_blank" rel="noopener">商品出库单明细</a> 完成。</p>

        <h3>2.1 关联 SKU</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">订单创建后系统自动尝试关联；需要审核确认是否全部匹配成功。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><a class="chip chip--sheet" href="https://www.mingdao.com/app/8bb27a4a-87c0-4a49-8adf-052857408bb6/67dcc27570570d576ae2234a/67dcc273a24baef2d71a4754" target="_blank" rel="noopener">商品出库单明细</a> <span class="arrow">→</span> <a class="chip chip--view" href="https://www.mingdao.com/app/8bb27a4a-87c0-4a49-8adf-052857408bb6/67dcc27570570d576ae2234a/67dcc273a24baef2d71a4754/67dcc273a24baef2d71a476f" target="_blank" rel="noopener">🔥 关联 SKU 为空</a></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>打开视图 → 若为空，跳过本节。</li>
                <li>视图有数据 → <span class="chip chip--btn">关联商品 SKU</span> 让系统重试。</li>
                <li>仍有数据 → 检查 <span class="chip chip--sheet">商品 SKU 及库存状态</span> 是否存在该商品；不存在按 A.6 商品 SKU 维护 添加后回视图重试。</li>
              </ol>
            </div>
          </div>
          <div class="screenshot">
            <img src="images/order/review-bind-sku-retry.png" alt="在之间订单管理｜商品出库单明细｜关联SKU为空视图中勾选记录并点击绑定库存sku" loading="lazy">
            <p class="caption">在 <a class="chip chip--view" href="https://www.mingdao.com/app/8bb27a4a-87c0-4a49-8adf-052857408bb6/67dcc27570570d576ae2234a/67dcc273a24baef2d71a4754/67dcc273a24baef2d71a476f" target="_blank" rel="noopener">🔥 关联 SKU 为空</a> 视图中勾选记录，然后点击 <span class="chip chip--btn">绑定库存sku</span> 让系统重新关联。</p>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body">视图为空即视为通过。</div>
          </div>
          <div class="op-row">
            <span class="op-label">异常</span>
            <div class="op-body">关联逻辑：<span class="chip chip--field">商品款号-辅助</span> = SKU 表款号 <strong>且</strong> <span class="chip chip--field">规格-辅助</span> = SKU 表规格，缺一不可。</div>
          </div>
        </div>

        <h3>2.2 尺码审核</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">系统标记"标准尺码与选择尺码相差 > 3"或对照表缺数据。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><a class="chip chip--sheet" href="https://www.mingdao.com/app/8bb27a4a-87c0-4a49-8adf-052857408bb6/67dcc27570570d576ae2234a/67dcc273a24baef2d71a4754" target="_blank" rel="noopener">商品出库单明细</a> <span class="arrow">→</span> <a class="chip chip--view" href="https://www.mingdao.com/app/8bb27a4a-87c0-4a49-8adf-052857408bb6/67dcc27570570d576ae2234a/67dcc273a24baef2d71a4754/67dcc273a24baef2d71a4770" target="_blank" rel="noopener">🔍 尺码审核</a></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>打开视图，逐条查看异常类型。</li>
                <li>按下表对应处理：
                  <div class="tbl">
                    <table>
                      <thead><tr><th>异常</th><th>示例</th><th>处理</th></tr></thead>
                      <tbody>
                        <tr><td>体重单位错</td><td>50 公斤填成 50（系统按斤算）</td><td>联系家长改</td></tr>
                        <tr><td>对照表缺数据</td><td>身高 185 无对应尺码</td><td>按 A.5 身高尺码对照表 补</td></tr>
                        <tr><td>家长故意选大 / 小码</td><td>想买大一码明年穿</td><td>备注 + 保留家长选择</td></tr>
                        <tr><td>BMI 偏离正常区间</td><td>体型显示"超重 / 偏瘦"</td><td>结合 <span class="chip chip--field">体型</span> 字段提示，与家长确认款式</td></tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body">视图为空 / 数据合理 → 进入下一节。</div>
          </div>
        </div>

        <h3>2.3 只付运费订单</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">家长支付金额仅覆盖运费，未付商品款。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">销售订单</span> <span class="arrow">→</span> <span class="chip chip--view">可能只付了运费</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>应用筛选 <span class="chip chip--view">只付运费不看他</span>。</li>
                <li>全选 <span class="arrow">→</span> <span class="chip chip--btn">编辑</span>，在 <span class="chip chip--field">备注</span> 填"只付运费"。</li>
                <li><span class="chip chip--btn">只付物流费退款</span> 完成。</li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body"><span class="auto">系统排队退款</span>。</div>
          </div>
        </div>
