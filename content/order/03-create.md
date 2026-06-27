---
id: "create"
title: "一、订单创建"
sort: 30
status: "published"
---
<h2>一、订单创建</h2>
        <p>把多渠道家长下单的数据统一汇聚到 <span class="chip chip--sheet">商品出库单明细</span>，作为后续所有流程的源头。</p>

        <h3>1.1 线上 · 金数据 → 明道云</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">家长在金数据下单后，由 webhook 自动推送。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span>金数据后台 <span class="arrow">→</span> 表单设置 <span class="arrow">→</span> 数据推送</span>。接收方为 <span class="chip chip--sheet">销售订单</span>。</div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>配置 webhook 地址（按场景选择）：
                  <div class="tbl">
                    <table>
                      <thead><tr><th>场景</th><th>地址前缀 <code>https://api.mingdao.com</code></th></tr></thead>
                      <tbody>
                        <tr><td>需要在线支付</td><td>…/workflow/hooks/NjdkY2MyNzJmYTFkMDk1YmIwZWNlNGYw</td></tr>
                        <tr><td>无需在线支付 / 混合</td><td>…/workflow/hooks/Njg2MzNjNDJjNDRmYTUwMzExMDFiNDQ1</td></tr>
                        <tr><td>伊为伊</td><td>…/workflow/hooks/Njg2MzcxNGRjNDJjNzAzZmVjZmU5YmJm</td></tr>
                      </tbody>
                    </table>
                  </div>
                </li>
                <li>家长提交后 <span class="auto">自动推送至</span> <span class="chip chip--sheet">销售订单</span>。</li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body">订单出现在 <span class="chip chip--sheet">销售订单</span>，并同步生成 <span class="chip chip--sheet">商品出库单明细</span>。</div>
          </div>
          <div class="op-row">
            <span class="op-label">异常</span>
            <div class="op-body">漏推 → 金数据后台 <span class="arrow">→</span> 数据页面 <span class="arrow">→</span> 给目标数据打任意颜色标记 <span class="arrow">→</span> <span class="auto">触发补推送</span>，回 <span class="chip chip--sheet">销售订单</span> 验证；记录在 <span class="chip chip--sheet">金数据漏推记录表</span>。</div>
          </div>
        </div>

        <h3>1.2 线下批量导入 · 审批</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">学校批量订购、需一次性导入多笔订单。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body">
              <span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">线下导入出库单（非调换）</span></span>　·　<span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">付款记录</span></span>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>在 <span class="chip chip--sheet">线下导入出库单（非调换）</span>：
                  <ul>
                    <li>按模板填 Excel（学校 / 款号 / 规格 / 数量 / 收件人 / 金额）。</li>
                    <li>导入 <span class="arrow">→</span> 核对字段映射 <span class="arrow">→</span> 确定。</li>
                  </ul>
                </li>
                <li>在 <span class="chip chip--sheet">付款记录</span> 点击按钮发起审批，登记付款情况：
                  <ul>
                    <li>未收款 <span class="arrow">→</span> 付款渠道选 <span class="chip chip--state">欠款</span></li>
                    <li>不需要付款 <span class="arrow">→</span> 付款渠道选 <span class="chip chip--state">无需付款</span></li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body">审批通过后，订单进入 <span class="chip chip--sheet">商品出库单明细</span>，等待二、订单审核。</div>
          </div>
          <div class="op-row">
            <span class="op-label">异常</span>
            <div class="op-body">
              <div class="tbl">
                <table>
                  <thead><tr><th>原因</th><th>检查方法</th><th>解决</th></tr></thead>
                  <tbody>
                    <tr><td>无存货档案 / SKU</td><td>在 <span class="chip chip--sheet">商品 SKU 及库存状态</span> 搜「款号+规格」</td><td>按 A.6 商品 SKU 维护添加</td></tr>
                    <tr><td>学校商品目录无此 SKU</td><td>在 <span class="chip chip--sheet">学校商品目录名册</span> 搜「款号+学校」</td><td>新增目录记录</td></tr>
                    <tr><td>款号格式错误</td><td>看导入报错</td><td>修 Excel</td></tr>
                    <tr><td>必填字段空</td><td>看报错</td><td>补字段</td></tr>
                  </tbody>
                </table>
              </div>
              <div class="notice">维护 <span class="chip chip--sheet">学校商品目录名册</span> 时，推荐从 <span class="chip chip--sheet">商品属性（辅助批次管理单价）</span> 导出已推送过的数据 → 导入到目录，比手填准确；<strong>导入前先备份</strong>。</div>
            </div>
          </div>
        </div>

        <h3>1.3 客服联系订购</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">家长零散付款、未走标准下单流程，由客服补单。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">其他业务付款收款记录</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>客服与家长沟通，家长填收件信息 + 金额。</li>
                <li>家长付款 <span class="arrow">→</span> 记收件手机号。</li>
                <li>找到对应付款记录 <span class="arrow">→</span> <span class="chip chip--btn">一键创建客服销售订单</span>。</li>
                <li>补订单信息 <span class="arrow">→</span> <span class="chip chip--btn">推送订单</span>。</li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body">订单进入 <span class="chip chip--sheet">商品出库单明细</span>。</div>
          </div>
        </div>
